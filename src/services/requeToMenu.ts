import { dataMerchend } from '../app/data/dataMerchend';
import { Injectable } from '@angular/core';
import { getFirestore, setDoc, doc, getDoc, DocumentData, CollectionReference } from 'firebase/firestore';
import { Menu } from '../app/data/menu';
import { DataService } from './data.service';
import { requeToFastFood } from './requeToFastFood';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { BehaviorSubject, catchError, finalize, from, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { showLoaderToast } from './showLoaderToast';

// let uploadTask!:AngularFireUploadTask
let subscription: Subscription;
let intervalId!: NodeJS.Timeout;
let err: any = '';
@Injectable({
  providedIn: 'root',
})
export class requeToMenu {
  constructor(private storage: AngularFireStorage, private service: DataService, private requeteToFasFood: requeToFastFood, private toast: showLoaderToast) {}

  // Déclarez une variable pour stocker la tâche d'upload
  private uploadTask!: AngularFireUploadTask;
  private cancelUpload$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  errorAction(err: any) {
    if (err.message === 'Failed to get document because the client is offline.') {
      // Arrêter la tâche d'upload si elle existe
      if (this.uploadTask) {
        this.cancelUpload$.next(true); // Émettre un signal pour annuler l'upload
        this.uploadTask.cancel(); // Annuler l'upload
        console.log('cancel appliquerrrrrrrrr');
      }

      this.toast.hideLoader('lodaerTab3Menu');
      this.toast.showErrorToast(err);
      console.log('Erreur détectée avec souscription', err);
    } else {
      console.log('Erreur détectée sans souscription', err);
    }
  }

  uploadFile(file: File, nomMenu: string): Observable<string> {
    const filePath = `fastfood/${this.service.FastFood.proprietaire.infos.uid}/${this.service.FastFood.nom}/${nomMenu}_${Date.now()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);

    this.uploadTask = this.storage.upload(filePath, file);

    return new Observable<string>(observer => {
      const timeoutId = setTimeout(() => {
        if (!this.cancelUpload$.getValue()) {
          // this.cancelUpload$.next(true); // Émettre un signal pour annuler l'upload
          // this.uploadTask.cancel(); // Annuler l'upload
          // observer.error('Upload cancelled due to timeout.');
        }
      }, 10000); // 10 secondes

      this.uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            clearTimeout(timeoutId); // Clear the timeout once upload is complete

            if (this.cancelUpload$.getValue()) {
              observer.error('Upload cancelled due to offline error.');
              this.toast.hideLoader('lodaerTab3Menu');
              this.toast.presentToast('bottom', 'verifier votre connexion et ressayer');
              return;
            }

            // Récupérer l'URL de téléchargement après la fin de l'upload
            fileRef
              .getDownloadURL()
              .pipe(
                switchMap(url => of(url)), // Retourner l'URL comme Observable<string>
                catchError(error => {
                  console.error('Error getting download URL:', error);

                  return of(''); // Retourner une chaîne vide en cas d'erreur
                })
              )
              .subscribe(observer);
          }),
          catchError(error => {
            clearTimeout(timeoutId); // Clear the timeout on error
            console.error('Error during upload:', error);

            return of(''); // Retourner une chaîne vide en cas d'erreur
          })
        )
        .subscribe();
    });
  }

  listImages(): Observable<string[]> {
    const ref = this.storage.ref('images');
    return ref.listAll().pipe(
      switchMap(result => {
        const urls$ = result.items.map(item => item.getDownloadURL());
        return from(Promise.all(urls$));
      })
    );
  }
  async addMenuToFirestore(menu: Menu[]): Promise<void> {
    const firestore = getFirestore();

    const usersCollection = doc(firestore, 'infinityfastfood', 'menu');

    try {
      const jsonArray: any[] = await this.convertUserArrayToJsonArray(menu);

      // Ajouter le tableau JSON à la base de données
      await setDoc(usersCollection, { menu: jsonArray });

      console.log('menu added to Firestore successfully');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addMenuToFirestore2(menu: Menu[]): Promise<void> {
    const firestore = getFirestore();

    const usersCollection = doc(firestore, 'fast-food', '0', 'menu', 'menu1');

    try {
      const jsonArray: any[] = await this.convertUserArrayToJsonArray(menu);

      // Ajouter le tableau JSON à la base de données
      await setDoc(usersCollection, { menu: jsonArray });

      console.log('menu added to Firestore successfully');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getMenuFromFirestore(): Promise<Menu[]> {
    const firestore = getFirestore();
    const usersCollection = doc(firestore, 'infinityfastfood', 'menu');

    try {
      const docSnapshot = await getDoc(usersCollection);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data && Array.isArray(data['menu'])) {
          const userArray = this.convertJsonArrayToUserArray(data['menu']);
          return userArray;
        } else {
          console.log('Le document ne contient pas le champ attendu.');
          return [];
        }
      } else {
        console.log("Le document n'existe pas.");
        return [];
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteMenuTabToFirestore(idx: number) {
    try {
      const tempFastFoodGet = await this.requeteToFasFood.getFastFoodFromFirestore(this.service.FastFood.id.toString());

      if (tempFastFoodGet != null) {
        const fastFoodToAdd = tempFastFoodGet;

        fastFoodToAdd.menu.splice(idx, 1);

        await this.requeteToFasFood.addFastFoodToFirestore(fastFoodToAdd, this.service.FastFood.id.toString());
        this.service.menuTab = fastFoodToAdd.menu;
      } else {
        console.log('No fast food found with the given ID.');
      }
    } catch (err) {
      console.log('Error updating the command status:', err);
    }
  }

  async convertUserArrayToJsonArray(menuArray: Menu[]): Promise<any[]> {
    // Convertir le tableau d'utilisateurs en un tableau JSON
    const jsonArray = menuArray.map(menu => ({
      titre: menu.titre,
      prix1: menu.prix1,
      prix2: menu.prix2,
      prix3: menu.prix3,
      disponibilite: menu.disponibilite,
    }));
    return jsonArray;
  }

  async convertJsonArrayToUserArray(jsonArray: any[]): Promise<Menu[]> {
    // Convertir le tableau JSON en tableau d'objets dataMerchend
    const menuArray: Menu[] = jsonArray.map(
      (menu: any) => new Menu(menu.titre, menu.prix1, menu.prix2, menu.prix3, menu.optionPrix1, menu.optionPrix2, menu.optionPrix3, menu.image, menu.disponibilite)
    );
    return menuArray;
  }
}

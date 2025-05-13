import { AfterContentChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Menu } from 'src/app/data/menu';
import { getFirestore, setDoc, doc, getDoc, DocumentData, CollectionReference, getDocs, collection, Firestore } from 'firebase/firestore';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { CardService } from 'src/services/card.service';
import { DataService } from 'src/services/data.service';
import { requeToMenu } from 'src/services/requeToMenu';
import { environment } from 'src/environments/environment.prod';
import { requeToFastFood } from 'src/services/requeToFastFood';
import { showLoaderToast } from 'src/services/showLoaderToast';
import { FastFood } from 'src/app/data/fastFood';
import { requeToUser } from 'src/services/requeToUser';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit, AfterContentChecked {
  menuTab: Menu[] = [];

  isUplodading = false;
  email: string = '';
  password: string = '';
  intervalId!: NodeJS.Timeout;
  subscription!: Subscription;
  err: any = 'init';
  @Input() nbr = '1';
  @Input() colSize = '12';
  @Input() bottom = '20px';
  @Input() marginGrid = '';
  @Input() paddingText4 = '0 0 20px 0';
  @Input() paddingText8 = '0 0 0px 0';
  @Input() hide = '';
  @Input() showColNbr = false;
  @Input() showAvatar = false;
  @Input() showIcon = true;
  @Input() shadowText2 = false;
  @Input() shadowText3 = false;
  @Input() shadowText4 = true;
  @Input() shadowText5 = true;
  @Input() shadowText6 = true;
  @Input() shadowText7 = false;
  @Input() shadowText8 = true;
  @Input() text1 = 'Welecome Fernand';
  @Input() text4: number = 1500;
  @Input() text5: number = 2000;
  @Input() text6: number = 2500;
  @Input() text8 = 'Disponible';
  @Input() idx!: number;

  @Input() optionPrix1 = 'optionPrix1';
  @Input() optionPrix2 = 'optionPrix2';
  @Input() optionPrix3 = 'optionPrix3';
  photo: string = '';

  @Input() labelOptionPrix1 = 'option Prix1';
  @Input() labelOptionPrix2 = 'option Prix2';
  @Input() labelOptionPrix3 = 'option Prix3';

  @Input() labeLext1 = 'Disponible';
  @Input() labeLext2 = 'Disponible';
  @Input() labeLext3 = 'Disponible';
  @Input() labeLext4 = 'prix1';
  @Input() labeLext5 = 'prix2';
  @Input() labeLext6 = 'prix3';
  @Input() labeLext7 = 'prix3';

  @Input() labeLext8 = 'statut';
  @Input() imageUrl: string | ArrayBuffer | null = null;

  isLoadingImage: boolean = true;
  isErrorLoadingImage: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  file!: File | null;

  constructor(
    private service: DataService,
    private toast: showLoaderToast,

    // private afs: AngularFirestore,
    private requeToMenu: requeToMenu,

    private cardControle: CardService,
    private requeteToUser: requeToUser,

    private requeteToFasFood: requeToFastFood
  ) {}

  ngAfterContentChecked(): void {
    // this.testConnection()
  }

  ngOnInit() {
    // this.testConnection()
    // this.checkFirestoreConnection();
  }

  public hideBottomCard0() {
    this.cardControle.hideBottomCard1('bottom-card');

    console.log(this.text1);
    this.isLoadingImage = false;
    this.isErrorLoadingImage = false;
    this.cardControle.action = '';
    this.imageUrl = '';
  }

  public hideBottomCard1() {
    this.toast.showLoader('lodaerTab3Menu');
    console.log('action appppppppppppeleeeeeeeer', this.cardControle.action);

    console.log('valeur de file au click du update', this.file);
    console.log("valeur de l'url de image au click de update avant", this.imageUrl);
    if (this.cardControle.action == 'add' && this.file !== null) {
      this.menuAction(this.file, 'add', null);
    }

    if (this.cardControle.action == 'update') {
      if (this.file !== null) {
        this.menuAction(this.file, 'update', null);
      }
      if (this.file === null && typeof this.imageUrl == 'string') {
        try {
          this.updateMenuTabToFirestore(this.imageUrl);
        } catch (error) {
          console.error('Error updating menu:', error);
        }
      }
    }
  }

  async checkFirestoreConnection() {
    try {
      const testCollection = collection(getFirestore(), 'users');
      setInterval(async () => {
        const snapshot = await getDocs(testCollection);

        if (!snapshot.empty) {
          console.log('Firestore connection is successful!');
        } else {
          console.log('Firestore connection established but no documents found.');
        }
      }, 3000);
    } catch (error) {
      console.error('Failed to access Firestore:', error);
    }
  }

  async addMenuTabToFirestore(menu: Menu) {
    let fastAdded: FastFood | null = null;

    try {
      const tempFastFoodGet = await this.requeteToFasFood.getFastFoodFromFirestore(this.service.FastFood.id.toString());

      if (tempFastFoodGet != null) {
        const fastFoodToAdd = tempFastFoodGet;

        fastFoodToAdd.menu.push(menu);

        fastAdded = await this.requeteToFasFood.addFastFoodToFirestore(fastFoodToAdd, this.service.FastFood.id.toString());
        if (fastAdded != null) {
          this.service.FastFood = fastFoodToAdd;
          this.service.menuTab = this.service.FastFood.menu;
        }
        console.log('nouveauuuuuuuuuuuuuuuuu menu', this.service.FastFood.menu);
      } else {
        console.log('No fast food found with the given ID.');
      }

      this.toast.hideLoader('lodaerTab3Menu');
      this.toast.presentToast('bottom', 'ajout reussi');
      this.cardControle.hideBottomCard1('bottom-card');
      this.cardControle.action = '';
    } catch (err) {
      throw err;

      console.log('Error updating the command status:', err);
    }
  }

  async updateMenuTabToFirestore(url: string) {
    let fastAdd: FastFood | null = null;
    try {
      const tempFastFoodGet = await this.requeteToFasFood.getFastFoodFromFirestore(this.service.FastFood.id.toString());

      if (tempFastFoodGet != null) {
        const fastFoodToAdd = tempFastFoodGet;

        fastFoodToAdd.menu[this.cardControle.idx].titre = this.text1;
        fastFoodToAdd.menu[this.cardControle.idx].prix1 = this.text4;
        fastFoodToAdd.menu[this.cardControle.idx].prix2 = this.text5;
        fastFoodToAdd.menu[this.cardControle.idx].prix3 = this.text6;
        fastFoodToAdd.menu[this.cardControle.idx].optionPrix1 = this.optionPrix1;
        fastFoodToAdd.menu[this.cardControle.idx].optionPrix2 = this.optionPrix2;
        fastFoodToAdd.menu[this.cardControle.idx].optionPrix3 = this.optionPrix3;
        fastFoodToAdd.menu[this.cardControle.idx].image = url;
        fastFoodToAdd.menu[this.cardControle.idx].disponibilite = this.text8;

        console.log('valeur de file avant', this.file);
        fastAdd = await this.requeteToFasFood.addFastFoodToFirestore(fastFoodToAdd, this.service.FastFood.id.toString());

        if (fastAdd != null) {
          this.service.FastFood = fastFoodToAdd;
          this.service.menuTab = this.service.FastFood.menu;

          this.file = null;
          console.log('valeur de file apres', this.file);
        }
        console.log('nouveauuuuuuuuuuuuuuuuu menu', this.service.FastFood.menu);
      } else {
        console.log('No fast food found with the given ID.');
      }

      this.toast.hideLoader('lodaerTab3Menu');
      this.toast.presentToast('bottom', 'modification effectuer avec succes');
      this.cardControle.hideBottomCard1('bottom-card');
      this.cardControle.action = '';
    } catch (err) {
      console.log('Error updating the command status:', err);
      throw err;
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click(); // Déclencher l'ouverture du sélecteur de fichiers
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result; // Mettre à jour l'imageUrl avec l'aperçu de l'image
      };
      reader.readAsDataURL(this.file);

      // Vous pouvez également uploader le fichier ici
      // this.uploadFile(file);
    }
  }
  stopSub() {
    setInterval(() => {}, 1);
  }
  menuAction(fileGet: File, actions: string, menuGet: Menu | null) {
    setTimeout(() => {
      if (this.subscription && this.photo == '') {
        this.subscription.unsubscribe();
        this.toast.hideLoader('lodaerTab3Menu');
        this.toast.presentToast('bottom', 'verifier votre connexion et ressayer');
      }
    }, 15000);
    if (actions === 'add') {
      const newMenu = new Menu(this.text1, this.text4, this.text5, this.text6, this.optionPrix1, this.optionPrix2, this.optionPrix3, this.photo, this.text8);

      // Reset fields
      this.text1 = ' ';
      this.text4 = 0;
      this.text5 = 0;
      this.text6 = 0;
      this.text8 = ' ';
      this.optionPrix1 = ' ';
      this.optionPrix2 = ' ';
      this.optionPrix3 = ' ';
      this.photo = '';

      try {
        const file: File = fileGet;
        if (file) {
          try {
            this.subscription = this.requeToMenu.uploadFile(file, this.text1).subscribe(url => {
              this.imageUrl = url;
              console.log(url);

              if (url !== '') {
                this.photo = url;
                console.log('Photo uploaded:', this.photo);
                try {
                  this.addMenuTabToFirestore(newMenu);
                } catch (error) {
                  console.error('Error adding menu:', error);
                }
                console.log('Success:', url);
              } else {
                console.log('URL not obtained yet.');
              }
            });
          } catch (error) {
            console.error('Upload error:', error);
          }
        } else {
          this.toast.presentToast('bottom', 'Veuillez choisir une photo pour le menu');
          this.toast.hideLoader('lodaerTab3Menu');
        }
      } catch (error) {
        this.toast.showErrorToast(error);
        this.toast.hideLoader('lodaerTab3Menu');
        console.error(error);
        console.log('User UID:', this.service.FastFood.proprietaire.infos.uid);
      }
    }

    if (actions === 'update') {
      const imageUrlGet = this.imageUrl;
      // if (typeof imageUrlGet === 'string') {
      console.log("url de l'image recuperer depuis la base de donne", imageUrlGet);

      console.log('valeur du file get ', fileGet);

      try {
        const file: File = fileGet;
        if (file && file != null && file != undefined) {
          this.subscription = this.requeToMenu.uploadFile(file, this.text1).subscribe(
            url => {
              this.imageUrl = url;

              if (url !== '') {
                this.photo = url;
                console.log('Photo uploaded:', this.photo);
                try {
                  this.updateMenuTabToFirestore(url);
                } catch (error) {
                  console.error('Error updating menu:', error);
                }
                console.log('Success:', url);
              } else {
                console.log('URL not obtained yet.');
              }
            },
            error => {
              console.error('Error during upload:', error);
              this.toast.showErrorToast('Upload error');
              this.toast.hideLoader('lodaerTab3Menu');
            }
          );
        } else {
          if (typeof imageUrlGet == 'string') {
            try {
              this.updateMenuTabToFirestore(imageUrlGet);
            } catch (error) {
              console.error('Error updating menu:', error);
            }
          }
        }
      } catch (error) {
        this.toast.showErrorToast(error);
        this.toast.hideLoader('lodaerTab3Menu');
        console.error(error);
        console.log('User UID:', this.service.FastFood.proprietaire.infos.uid);
      }
      // }
    }
  }
  testConnection() {
    this.intervalId = setInterval(async () => {
      try {
        const firestore = getFirestore();
        const usersCollection = doc(firestore, 'users', '0');

        try {
          const docSnapshot = await getDoc(usersCollection);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data && data['user']) {
              console.log('Connection successful');
            } else {
              console.log('Document does not contain the expected field.');
            }
          } else {
            console.log('The document does not exist.');
          }
        } catch (error) {
          // console.log('premierrrrrreeee    errrrrrrrr detecter',error);
          this.err = error;
          // throw error;
        }
      } catch (error) {
        console.log('eeeeeeeeeeeeeeerrrrrrrrrrrrrrrrsssss', error);
      }

      this.errorAction(this.err);
    }, 1000);
  }

  errorAction(err: any) {
    // if (error !='') {
    // console.log('Clearing interval...');

    if (err.message == 'Failed to get document because the client is offline.') {
      // clearInterval(this.intervalId);
      if (this.subscription) {
        this.subscription.unsubscribe();

        this.toast.hideLoader('lodaerTab3Menu');

        this.toast.showErrorToast(err);

        console.log('errrrrrrrr detecter aaaaaaavcvvvvvvvvvvvec  souscription', err);
      } else {
        console.log('errrrrrrrr detecter saaaaaans  souscription', err);
      }
    }
    // console.log('Interval cleared.');

    // this.toast.hideLoader('lodaerTab3Menu');

    // }
    // this.err = ''
  }

  // Cette méthode est appelée lorsque l'image est correctement chargée
  onImageLoad() {
    this.isLoadingImage = false;
    this.isErrorLoadingImage = false;
    console.log('Image chargée avec succès.');
    console.log('is loading image', this.isLoadingImage);
    console.log('is error loading image', this.isErrorLoadingImage);
  }

  // Cette méthode est appelée si une erreur survient lors du chargement de l'image
  onImageError() {
    this.isLoadingImage = false;
    this.isErrorLoadingImage = true;
    console.log("Erreur lors du chargement de l'image.");
    console.log('is loading image', this.isLoadingImage);
    console.log('is error loading image', this.isErrorLoadingImage);
  }

  reloadImage() {
    this.isLoadingImage = true;
    this.isErrorLoadingImage = false;
    // Forcer le rechargement en assignant à nouveau la valeur
    const currentUrl = this.imageUrl;
    this.imageUrl = ''; // Remettre à vide temporairement
    setTimeout(() => {
      this.imageUrl = currentUrl; // Réassigner l'URL après un court délai
    }, 100); // Le délai peut être ajusté si nécessaire
  }
}

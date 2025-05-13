import { FastFood } from '../app/data/fastFood';
import { dataMerchend } from '../app/data/dataMerchend';
import { Injectable } from '@angular/core';
import { Menu } from '../app/data/menu';
import { getFirestore, setDoc, doc, getDoc, DocumentData, CollectionReference } from 'firebase/firestore';
import { Users } from '../app/data/Users';
import { generalDataFastFood } from '../app/data/generalDataFastFood';
import { generalDataUser } from '../app/data/generalDataUser';

@Injectable({
  providedIn: 'root',
})
export class requeToGeneralDataUsers {
  constructor() {}

  async addUserGeneralDataToFirestore(generalDataUser: generalDataUser): Promise<void> {
    const firestore = getFirestore();

    // const nbreTotalDeFastFood = doc(firestore, 'fast-fodd', 'nombre total de fast food');

    const usersCollection = doc(firestore, 'users', 'general-Data');

    try {
      const generalDataConvet: any = await this.convertGeneralDataUserToJson(generalDataUser);

      // Ajouter le tableau JSON à la base de données
      await setDoc(usersCollection, { Data: generalDataConvet });

      console.log('general data added to Firestore successfully');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserGeneralDataFromFirestore(): Promise<generalDataUser | null> {
    const firestore = getFirestore();
    const usersCollection = doc(firestore, 'users', 'general-Data');

    try {
      const docSnapshot = await getDoc(usersCollection);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data && data['Data']) {
          const generalDataConvet = await this.converGeneralDataUserJsonToUser(data['Data']);
          console.log('genereal user successsful DB');
          return generalDataConvet;
        } else {
          console.log('general user introuvable');
          return null; // Retourne null si le champ attendu n'est pas trouvé
        }
      } else {
        console.log("general user introuvable n'existe pas.");
        return null; // Retourne null si le document n'existe pas
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async convertGeneralDataUserToJson(generalDataUser: generalDataUser): Promise<any> {
    const dataConvert = {
      nbrTotalUser: generalDataUser.nbrTotalUser,
      utilisateurConnecte: generalDataUser.utilisateurConnecte,
      nbrTotalCommande: generalDataUser.nbrTotalCommande,
      montantTotalCmd: generalDataUser.montantTotalCmd,
    };
    return dataConvert;
  }

  async converGeneralDataUserJsonToUser(generalDataUserJson: any): Promise<generalDataUser> {
    // Créer l'objet FastFood
    const dataConvert = new generalDataUser(
      generalDataUserJson.nbrTotalUser,
      generalDataUserJson.utilisateurConnecte,
      generalDataUserJson.nbrTotalCommande,
      generalDataUserJson.montantTotalCmd
    );

    return dataConvert;
  }
}

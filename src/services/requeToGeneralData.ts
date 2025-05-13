import { FastFood } from '../app/data/fastFood';
import { dataMerchend } from '../app/data/dataMerchend';
import { Injectable } from '@angular/core';
import { Menu } from '../app/data/menu';
import { getFirestore, setDoc, doc, getDoc, DocumentData, CollectionReference } from 'firebase/firestore';
import { Users } from '../app/data/Users';
import { generalDataFastFood } from '../app/data/generalDataFastFood';

@Injectable({
  providedIn: 'root',
})
export class requeToGeneralData {
  constructor() {}

  async addFastFoodGeneralDataToFirestore(generalDataFastFood: generalDataFastFood): Promise<void> {
    const firestore = getFirestore();

    // const nbreTotalDeFastFood = doc(firestore, 'fast-fodd', 'nombre total de fast food');

    const usersCollection = doc(firestore, 'fast-food', 'general-Data');

    try {
      const generalDataConvet: any = await this.convertGeneralDataFastFoodToJson(generalDataFastFood);

      // Ajouter le tableau JSON à la base de données
      await setDoc(usersCollection, { Data: generalDataConvet });

      console.log('general data added to Firestore successfully');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getFastFoodGeneralDataFromFirestore(): Promise<generalDataFastFood | null> {
    const firestore = getFirestore();
    const usersCollection = doc(firestore, 'fast-food', 'general-Data');

    try {
      const docSnapshot = await getDoc(usersCollection);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data && data['Data']) {
          const generalDataConvet = await this.converGeneralDataFastFoodJsonToObjet(data['Data']);
          console.log('genereal data get successsful');
          return generalDataConvet;
        } else {
          console.log('Le document ne contient pas le champ attendu.');
          return null; // Retourne null si le champ attendu n'est pas trouvé
        }
      } else {
        console.log("Le document n'existe pas.");
        return null; // Retourne null si le document n'existe pas
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async convertGeneralDataFastFoodToJson(generalDataFastFood: generalDataFastFood): Promise<any> {
    const generalDataFastFoodJson = {
      nbrTotalFastFood: generalDataFastFood.nbrTotalFastFood,
      commande: generalDataFastFood.commande,
      montant: generalDataFastFood.montant,
    };
    return generalDataFastFoodJson;
  }

  async converGeneralDataFastFoodJsonToObjet(generalDataFastFoodJson: any): Promise<generalDataFastFood> {
    // Créer l'objet FastFood
    const generalDataFastFoodObject = new generalDataFastFood(generalDataFastFoodJson.nbrTotalFastFood, generalDataFastFoodJson.commande, generalDataFastFoodJson.montant);

    return generalDataFastFoodObject;
  }
}

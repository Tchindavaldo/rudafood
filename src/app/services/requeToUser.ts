import { dataMerchend } from '../data/dataMerchend';
import { Injectable } from '@angular/core';
import { Menu } from '../data/menu';
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  DocumentData,
  CollectionReference,
} from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  User,
  UserCredential,
} from 'firebase/auth';
import { Users } from '../data/Users';
import { UsersInfos } from '../data/UsersInfos';
import { Commande, boisson, embalage, livraison } from '../data/commande';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root',
})
export class requeToUser {

  user!: User;
  userExist = ''
  mailFind = ''
  mailDiff: string = ''
  mailcoress: string = ''
  passInco: string = ''
  userFind: Users | string = ''
  resu: string | Users = ''
  resu2: string | Users = ''
  resu3: string | Users = ''
  userIsUpdate = false

  constructor(
    public data: DataService
  ) { }

  async addUserToFirestore(userToAdd: Users, idx: string): Promise<void> {
    const firestore = getFirestore();

    const usersCollection = doc(firestore, 'users', idx);

    try {
      const user: any = await this.convertUserToJson(userToAdd);

      // Ajouter le tableau JSON à la base de données
      await setDoc(usersCollection, { user });

      // console.log('Users added to Firestore successfully');
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  async addSpecifiUser(idx: number, userToAdd: Users): Promise<boolean> {
    try {

      for (let index = 0; index < idx; index++) {

        const idxConvert = index.toString()
        await this.getUsersFromFirestore(idxConvert).then(

          userget2 => {

            if (userget2 != null) {

              if (userget2.infos.email == userToAdd.infos.email &&
                userget2.infos.password == '' &&
                userget2.infos.numero == 0 &&
                userget2.infos.uid == '') {

                const userUpdate = userget2
                userUpdate.infos.password = userToAdd.infos.password
                userUpdate.infos.numero = userToAdd.infos.numero
                userUpdate.infos.uid = userToAdd.infos.uid

                this.addUserToFirestore(userUpdate, index.toString())
                this.userIsUpdate = true
                // console.log('update effectuer sur mail existant');

              }


              if (userget2.infos.email == '' &&
                userget2.infos.password == '' &&
                userget2.infos.numero == userToAdd.infos.numero &&
                userget2.infos.uid == '') {

                const userUpdate = userget2
                userUpdate.infos.email = userToAdd.infos.email
                userUpdate.infos.password = userToAdd.infos.password
                userUpdate.infos.uid = userToAdd.infos.uid

                this.addUserToFirestore(userUpdate, index.toString())
                this.userIsUpdate = true
                // console.log('update effectuer sur num existant');

              }

            }



          }
        )
      }




      return this.userIsUpdate;

    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  async updateUser(userToGet: Users, nbrTotalUser: number): Promise<Users | null> {
    var Userget: Users | null = null
    try {
      for (let index = 0; index < nbrTotalUser; index++) {

        try {
          const idxConvert = index.toString()
          const TempUserget = await this.getUsersFromFirestore(idxConvert)






          if (TempUserget != null && TempUserget.infos.email == userToGet.infos.email && TempUserget.infos.uid == userToGet.infos.uid) {


            Userget = userToGet
            this.addUserToFirestore(userToGet, index.toString())

            // console.log('update effectuer sur le user correspondant existant');

            break; // Exit the loop since user is found
          }
        } catch (error) {
          // console.log('erreur lord de la boucle sur les utilisateur pour update');
          throw error;

        }
      }


      return Userget
    } catch (error) {
      // console.log('erreur lors de la recup du specify user');
      throw error;

    }
  }



  async getUsersFromFirestore(idx: string): Promise<Users | null> {
    const firestore = getFirestore();
    const usersCollection = doc(firestore, 'users', idx);

    try {
      const docSnapshot = await getDoc(usersCollection);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data && data['user']) {
          const user = this.convertJsonToUser(data['user']);
          return user;
        } else {
          // console.log('Le document ne contient pas le champ attendu.');
          return null;
        }
      } else {
        // console.log("Le document n'existe pas.");

        return null;
      }
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }


  async testConnections(): Promise<any> {
    const firestore = getFirestore();
    const usersCollection = doc(firestore, 'users', '0');

    try {
      const docSnapshot = await getDoc(usersCollection);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data && data['user']) {
          // console.log('connexion pas');
          return 'kkk'
        } else {
          // console.log('Le document ne contient pas le champ attendu.');
          return null;
        }
      } else {
        // console.log("Le document n'existe pas.");

        return null;
      }
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }


  async connectUser(idx: number, mail: string, pass: string): Promise<string | Users> {
    try {
      // this.userFind=''
      this.mailDiff = ''
      this.mailcoress = ''
      for (let index = 0; index < idx; index++) {

        const idxConvert = index.toString()
        await this.getUsersFromFirestore(idxConvert).then(

          userget2 => {

            if (userget2 != null) {

              // console.log(index);
              // console.log(mail);
              // console.log(userget2.infos.email);


              if (userget2.infos.email !== mail) {
                this.mailDiff = 'mail pas trouver'; // Email matches but password is incorrect
                // console.log('mail pas trouver');

              }

              if (userget2.infos.email === mail) {

                // console.log('correspond');
                this.mailcoress = index.toString()
                // console.log(mail);
                // console.log(userget2.infos.email);
                // this.userFind =  userget2;

              }
            }



          }
        )
      }



      if (this.mailDiff != '') {
        this.resu = this.mailDiff
      }

      // console.log('mailcoress', this.mailcoress);
      // console.log('userfind', this.userFind);
      // console.log('');


      if (this.mailcoress != '') {

        // console.log('mailcoress', this.mailcoress);
        // console.log('userfind', this.userFind);
        // console.log('');
        await this.getUsersFromFirestore(this.mailcoress).then(

          userget2 => {

            if (userget2 != null) {

              if (userget2.infos.password === pass) {
                this.resu = userget2
              }


              if (userget2.infos.password !== pass) {
                this.passInco = 'pass incorrect';
                this.resu = this.passInco;
              }


              if (userget2.infos.password === '') {
                this.passInco = 'auth google';
                this.resu = this.passInco;
              }
            }
          }
        )


      }








      // console.log('val final');
      // console.log('pass', this.passInco);
      // console.log('mail', this.mailDiff);
      // console.log('mailcoress', this.mailcoress);

      // console.log('val resu');
      // console.log(this.resu);
      return this.resu;

    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  async connectUserWithNumAndUid(idx: number, num: number, uid: string): Promise<string | Users> {
    try {

      for (let index = 0; index < idx; index++) {

        const idxConvert = index.toString()
        await this.getUsersFromFirestore(idxConvert).then(

          userget2 => {

            if (userget2 != null) {

              if (userget2.infos.numero == num && userget2.infos.uid == uid) {

                this.resu2 = userget2; // num and password match


              } else {

                if (!this.resu2) {
                  this.resu2 = 'num pas trouver'; // Email matches but password is incorrect

                }
              }
            }



          }
        )
      }




      return this.resu2;

    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  async connectUserWithEmailAndUid(idx: number, mail: string, uid: string): Promise<string | Users> {
    try {
      this.userExist = ''
      this.mailFind = ''
      this.resu3 = ''
      for (let index = 0; index < idx; index++) {

        const idxConvert = index.toString()
        await this.getUsersFromFirestore(idxConvert).then(

          userget2 => {

            if (userget2 != null) {

              if (userget2.infos.email == mail && userget2.infos.uid == uid) {

                this.userExist = idxConvert
                this.data.user = userget2
                if (userget2.isMarchand) {

                }
                this.data.idxUser = index
                // console.log('mail triuver', userget2);

              }
            }



          }
        )
      }

      if (this.userExist === '') {
        this.resu3 = 'mail pas trouver';

        // console.log('mail pas trouver');
      }

      if (this.userExist !== '') {
        this.getUsersFromFirestore(this.userExist).then(
          userget2 => {
            if (userget2 != null) {
              this.resu3 = userget2;
              // console.log('mail trouver');

            }
          }
        )
      }

      // console.log('val de resu3', this.resu3);

      return this.resu3;

    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  async convertUserToJson(user: Users): Promise<any> {
    // Convertir le tableau d'utilisateurs en un tableau JSON
    const userConvert = {
      infos: {

        nom: user.infos.nom,
        prenom: user.infos.prenom,
        age: user.infos.age,
        numero: user.infos.numero,
        uid: user.infos.uid,
        email: user.infos.email,
        password: user.infos.password,
      },
      isMarchand: user.isMarchand,
      statistique: user.statistique,
      commande: user.cmd.map((item) => ({
        uidUser: item.uidUser,
        idCmd: item.idCmd,
        idFastFood: item.idFastFood,
        menu: {
          titre: item.menu.titre,
          prix1: item.menu.prix1,
          prix2: item.menu.prix2,
          prix3: item.menu.prix3,


          optionPrix1: item.menu.optionPrix1,
          optionPrix2: item.menu.optionPrix2,
          optionPrix3: item.menu.optionPrix3,


          image: item.menu.image,

          disponibilite: item.menu.disponibilite,
        },
        quantite: item.quantite,

        embalage: item.embalage.map((item) => ({
          type: item.type,
          prix: item.prix,
        })),




        boisson: {
          type: item.boisson.type,
          prix: item.boisson.prix
        },

        livraison: {
          statut: item.livraison.statut,
          prix: item.livraison.prix
        },

        prixTotal: item.prixTotal,
        staut: item.staut,
        isBuy: item.isBuy,
        ispending: item.ispending
      })),

    }
    return userConvert;
  }

  async convertJsonToUser(user: any): Promise<Users> {
    // Convertir le tableau JSON en tableau d'objets dataMerchend
    const infos = new UsersInfos(
      user.infos.nom,
      user.infos.prenom,
      user.infos.age,
      user.infos.numero,
      user.infos.uid,
      user.infos.email,
      user.infos.password,
    );



    const commande: Commande[] = user.commande.map((item: any) => new Commande(
      item.uidUser,
      item.idCmd,
      item.idFastFood,
      new Menu(
        item.menu.titre,
        item.menu.prix1,
        item.menu.prix2,
        item.menu.prix3,


        item.menu.optionPrix1,
        item.menu.optionPrix2,
        item.menu.optionPrix3,


        item.menu.image,
        item.menu.disponibilite
      ),
      item.quantite,
      item.embalage.map((item: any) => new embalage(
        item.type,
        item.prix,
      )),
      new boisson(
        item.boisson.type,
        item.boisson.prix,
      ),
      new livraison(
        item.livraison.statut,
        item.livraison.prix,
      ),
      item.prixTotal,
      item.staut,
      item.isBuy,
      item.ispending
    ));



    const userConvert = new Users(
      infos,
      user.isMarchand,
      user.statistique,
      commande,
    );


    return userConvert;
  }



  //   async createUser(email: string, password: string): Promise<void> {
  //     return new Promise<void>(async (resolve, reject) => {
  //       const app = initializeApp(environment.firebase);
  //       const auth = getAuth(app);

  //       try {
  //         const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
  //         this.user = userCredential.user;

  //         // Envoyer un email de vérification
  //         await sendEmailVerification(this.user);

  //         const newUser = new dataMerchend(this.user.uid, this.email, this.password);

  //         const userGet: dataMerchend[] = await this.getUsersFromFirestore();
  //         this.service.userTab.splice(0, this.service.userTab.length, ...userGet);

  //         this.service.userTab.push(newUser);

  //         await this.addUserToFirestore(this.service.userTab);

  // console.log('User created successfully, verification email sent.');
  // console.log('User UID:', this.user.uid);

  // console.log(this.service.userTab);

  //         resolve();
  //       } catch (error) {
  // console.log(error);
  //         reject(error);
  //       }
  //     });
  //   }
  // }
}
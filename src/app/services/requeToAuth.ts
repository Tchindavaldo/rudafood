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

import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  User,
  UserCredential,
  AuthCredential,
} from 'firebase/auth';
import { Users } from '../data/Users';
import { UsersInfos } from '../data/UsersInfos';
import { Commande, boisson, embalage, livraison } from '../data/commande';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class requeToAuth {
  valToReturn: any
  user!: User;
  constructor(private afAuth: AngularFireAuth,) { }


  async createUser(email: string, password: string): Promise<User | null> {
    return new Promise<User | null>(async (resolve, reject) => {
      const app = initializeApp(environment.firebase);
      const auth = getAuth(app);

      try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;

        // Envoyer un email de vérification
        await sendEmailVerification(this.user);

        // console.log('User created successfully, verification email sent.');
        // console.log('infos User created:', this.user.uid);

        resolve(this.user);
      } catch (error: any) {
        // console.log(error);
        reject(error.code);
      }
    });
  }



  async createUser2(cred: AuthCredential): Promise<User | null> {
    return new Promise<User | null>(async (resolve, reject) => {
      const app = initializeApp(environment.firebase);
      const auth = getAuth(app);

      try {

        const userCredential = await this.afAuth.signInWithCredential(cred);

        // const firebaseUser:any = userCredential.user;

        // const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);


        const user = userCredential.user;

        // Envoyer un email de vérification
        // await sendEmailVerification(this.user);
        if (user != null) {

          // console.log('User created successfully, verification email sent.');
          // console.log('infos User created:', user.uid);
        } else {

          // console.log('User null.');
        }


        // resolve(user);
      } catch (error: any) {
        // console.log(error);
        reject(error.code);
      }
    });
  }



  async signInUser(email: string, password: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      const app = initializeApp(environment.firebase);
      const auth = getAuth(app);

      try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;

        // Vérifier si l'email est vérifié
        if (!this.user.emailVerified) {
          await sendEmailVerification(this.user);
          const error = new Error('Email non vérifié. Cliquez sur le lien envoyé à votre compte pour vérifier et valider votre email.');
          (error as any).code = 'email-not-verified';
          throw error;
        }

        // console.log('User logged in successfully');
        // console.log('User UID:', this.user.uid);

        resolve(this.user);
      } catch (error: any) {
        // console.log('debut de l\'erreur',error.code,'fin de erreur');
        reject(error);
      }
    });
  }


}
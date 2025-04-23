
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { requeToAuth } from 'src/app/services/requeToAuth';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-auth-verify-number',
  templateUrl: './auth-verify-number.page.html',
  styleUrls: ['./auth-verify-number.page.scss'],
})
export class AuthVerifyNumberPage implements OnInit {


  recaptchaVerifier!: firebase.auth.RecaptchaVerifier;
  verificationId: string = '';
  m: string | null = null;

  numero: string = '';
  code: string = '';
  verificationCode: string = '';
  smsIsSend = false
  constructor

    (private afAuth: AngularFireAuth,
      private requeteToAuth: requeToAuth,
      // private googlePlus: GooglePlus,
      private router: Router,
      private toastController: ToastController
    ) {
    // Initialize Firebase in the constructor
    firebase.initializeApp({
      // Your Firebase config here
      apiKey: "AIzaSyAxFemQ3WoHgrgpvvjeQLhk2ZJOaQZ0QQQ",
      authDomain: "infinity-fastfood.firebaseapp.com",
      projectId: "infinity-fastfood",
      storageBucket: "infinity-fastfood.appspot.com",
      messagingSenderId: "496693477037",
      appId: "1:496693477037:web:d1819debb382b12c611024"

    });
  }

  ngOnInit() {
    // Initialize reCAPTCHA verifier
    this.initializeRecaptchaVerifier();
  }

  initializeRecaptchaVerifier() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback: (_response: any) => {
        // reCAPTCHA solved
      },
    });
  }
  direct(rout: String) {
    this.router.navigate(['/', rout]);
  }
  sendCode() {
    this.sendVerificationCode(this.numero, this.recaptchaVerifier)
      .then((result) => {
        this.verificationId = result.verificationId;
        // Code envoyé, demandez à l'utilisateur de saisir le code de vérification

        console.log('Code envoyé avec succès.');
        console.log('ID de vérification:', this.verificationId);
        console.log('Détails de résultat:', result);

        this.smsIsSend = true
      })
      .catch((error) => {
        console.error('Error during signInWithPhoneNumber', error);
      });
  }

  sendVerificationCode(phoneNumber: string, appVerifier: firebase.auth.RecaptchaVerifier) {
    return this.afAuth.signInWithPhoneNumber(phoneNumber, appVerifier);
  }

  verifyCode() {
    this.verifyCode1(this.verificationId, this.verificationCode)
      .then((result: any) => {
        // Utilisateur connecté
        console.log('uid auth number', result.uid);
        console.log('User signed in successfully', result);
      })
      .catch((error) => {
        console.error('Error during verification', error);
      });
  }
  // Fonction pour vérifier le code reçu par SMS
  verifyCode1(verificationId: string, verificationCode: string) {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );


    return this.afAuth.signInWithCredential(credential);
  }
  // googleSignIn() {
  //   this.googlePlus
  //     .login({
  //       webClientId:
  //         '496693477037-dac1deftue3qgnnb7aa8337irj62dffe.apps.googleusercontent.com',
  //       offline: true,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       // Afficher l'email de l'utilisateur connecté
  //       console.log("Email de l'utilisateur :", res.email);
  //       this.m = res.email;
  //       // Vous pouvez également faire d'autres traitements avec les données de l'utilisateur
  //     })
  //     .catch((err) => {
  //       console.error('Error during Google login', err);
  //       this.m = err;
  //     });
  // }



  connectUser() {

    if (this.verificationCode != '') {
      this.verifyCode()

    } else {
      this.presentToast('bottom', 'veuiller entrer le code envoyer')

    }




  }

  async showErrorToast(error: any) {
    let message: string;
    switch (error) {
      case 'auth/invalid-email':
        message = 'L\'e-mail doit avoir une syntaxe valide.';
        break;
      case 'email-not-verified':
        message = 'Email non vérifié. Cliquez sur le lien envoyé à votre compte pour vérifier et valider votre email';
        break;
      case 'auth/email-already-in-use':
        message = 'L\'adresse e-mail est déjà utilisée par un autre compte.';
        break;
      case 'auth/weak-password':
        message = 'Le mot de passe est trop faible.';
        break;
      case 'auth/wrong-password':
        message = 'Le mot de passe est incorrect.';
        break;
      case 'auth/missing-password':
        message = 'Le mot de passe ne doit pas etre vide.';
        break;
      case 'auth/user-not-found':
        message = 'Aucun utilisateur ne correspond à ces identifiants.';
        break;
      case 'auth/too-many-requests':
        message = 'Trop de requêtes ont été envoyées depuis cette adresse IP, veuillez réessayer plus tard.';
        break;
      case 'auth/operation-not-allowed':
        message = 'Cette opération n\'est pas autorisée pour ce type de compte.';
        break;
      case 'auth/user-disabled':
        message = 'L\'utilisateur a été désactivé.';
        break;
      case 'auth/account-exists-with-different-credential':
        message = 'Le compte existe déjà avec un identifiant différent.';
        break;
      case 'auth/requires-recent-login':
        message = 'L\'opération nécessite une connexion récente de l\'utilisateur.';
        break;
      case 'auth/invalid-verification-code':
        message = 'Le code de vérification est incorrect.';
        break;
      case 'auth/invalid-verification-id':
        message = 'L\'ID de vérification est incorrect.';
        break;
      case 'auth/network-request-failed':
        message = 'La requête réseau a échoué.';
        break;
      case 'auth/internal-error':
        message = 'Une erreur interne s\'est produite.';
        break;
      default:
        message = 'Une erreur est survenue.';
    }

    // Afficher le message d'erreur sous forme de toast
    console.log(message);
    this.presentToast('bottom', message)
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 10000,
      position: position,
    });

    await toast.present();
  }

}

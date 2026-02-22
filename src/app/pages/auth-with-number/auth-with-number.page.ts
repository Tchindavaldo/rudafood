import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { requeToAuth } from 'src/services/requeToAuth';
import { ToastButton, ToastController } from '@ionic/angular';
import { requeToUser } from 'src/services/requeToUser';
import { UsersInfos } from 'src/app/data/UsersInfos';
import { Users } from 'src/app/data/Users';
import { DataService } from 'src/services/data.service';
@Component({
  selector: 'app-auth-with-number',
  templateUrl: './auth-with-number.page.html',
  styleUrls: ['./auth-with-number.page.scss'],
})
export class AuthWithNumberPage implements OnInit {
  recaptchaVerifier!: firebase.auth.RecaptchaVerifier;
  verificationId: string = '';
  m: string | null = null;

  connect = false;
  numero: string = '';
  code: string = '';
  verificationCode: string = '';
  smsIsSend = false;
  showLoaderCaptcha = false;
  constructor(
    private afAuth: AngularFireAuth,
    private requeteToAuth: requeToAuth,
    // private googlePlus: GooglePlus,
    private router: Router,
    private toastController: ToastController,
    private requeteToUser: requeToUser,
    private data: DataService
  ) {
    // Firebase is initialized in AppModule
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

  sendCode() {
    this.showLoaderCaptcha = true;
    this.sendVerificationCode(this.numero, this.recaptchaVerifier)
      .then(result => {
        this.verificationId = result.verificationId;
        // Code envoyé, demandez à l'utilisateur de saisir le code de vérification

        console.log('Code envoyé avec succès.');
        console.log('ID de vérification:', this.verificationId);
        console.log('Détails de résultat:', result);
        this.presentToast(1000, 'bottom', 'code envoyer');

        this.showLoaderCaptcha = false;
        this.smsIsSend = true;
      })
      .catch(error => {
        this.connect = false;
        // this.showLoaderCaptcha = false
        console.error('Error during signInWithPhoneNumber', error);
        this.showErrorToast(error.code);
      });
  }

  sendVerificationCode(phoneNumber: string, appVerifier: firebase.auth.RecaptchaVerifier) {
    return this.afAuth.signInWithPhoneNumber('+237' + phoneNumber, appVerifier);
  }

  verifyCode() {
    this.verifyCode1(this.verificationId, this.verificationCode)
      .then(async (result: any) => {
        const uid = result.user.uid;
        console.log('uid number', uid);
        this.presentToast(1200, 'bottom', 'connexion reussi');

        try {
          // 1. Recherche directe par UID (PRO)
          let userFound = await this.requeteToUser.getUsersFromFirestore(uid);

          if (!userFound) {
            // 2. Si pas trouvé, on crée un profil vide
            userFound = new Users(new UsersInfos('', '', 0, +this.numero, uid, '', ''), false, 100, []);
            await this.requeteToUser.addUserToFirestore(userFound, uid);
          }

          this.data.user = userFound;
        } catch (error) {
          console.error("Erreur lors de la récupération/création de l'utilisateur:", error);
        }

        this.router.navigate(['/tabs']);
      })
      .catch(error => {
        this.connect = false;
        console.error('Error during verification', error);
        this.showErrorToast(error.code);
      });
  }
  // Fonction pour vérifier le code reçu par SMS
  verifyCode1(verificationId: string, verificationCode: string) {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    return this.afAuth.signInWithCredential(credential);
  }
  // googleSignIn() {
  //   this.googlePlus
  //     .login({
  //       webClientId:
  //         '496693477037-dac1deftue3qgnnb7aa8337irj62dffe.apps.googleusercontent.com',
  //       offline: true,
  //     })
  //     .then((res:any) => {
  //       console.log(res);

  //       // Afficher l'email de l'utilisateur connecté
  //       console.log(" l'utilisateur :", res.email);
  //       this.m = res.email;
  //       // Vous pouvez également faire d'autres traitements avec les données de l'utilisateur
  //     })
  //     .catch((err:any) => {
  //       console.error('Error during Google login', err);
  //       this.m = err;
  //     });
  // }

  connectUser() {
    if (this.smsIsSend == false) {
      if (this.numero != '') {
        this.sendCode();
        this.presentToast(2500, 'bottom', 'veuiller valider le captcha pour que le code soit envoyer ');
      } else {
        this.presentToast(1200, 'bottom', 'veuiller entrer le numero de telephone ');
      }
    } else {
      if (this.verificationCode != '') {
        this.connect = true;

        this.verifyCode();
      } else {
        this.connect = false;
        this.presentToast(1200, 'bottom', 'veuiller entrer le code envoyer');
      }
    }
  }

  async showErrorToast(error: any) {
    let message: string;
    switch (error) {
      case 'auth/invalid-email':
        message = "L'e-mail doit avoir une syntaxe valide.";
        break;
      case 'email-not-verified':
        message = 'Email non vérifié. Cliquez sur le lien envoyé à votre compte pour vérifier et valider votre email';
        break;
      case 'auth/email-already-in-use':
        message = "L'adresse e-mail est déjà utilisée par un autre compte.";
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
        message = 'Trop de requêtes ont été envoyées  veuillez réessayer demain.';
        break;
      case 'auth/operation-not-allowed':
        message = "Cette opération n'est pas autorisée pour ce type de compte.";
        break;
      case 'auth/user-disabled':
        message = "L'utilisateur a été désactivé.";
        break;
      case 'auth/account-exists-with-different-credential':
        message = 'Le compte existe déjà avec un identifiant différent.';
        break;
      case 'auth/requires-recent-login':
        message = "L'opération nécessite une connexion récente de l'utilisateur.";
        break;
      case 'auth/invalid-verification-code':
        message = 'Le code de vérification est incorrect.';
        break;
      case 'auth/invalid-phone-number':
        this.showLoaderCaptcha = false;
        message = 'numero de telephone incorrect.';
        break;
      case 'auth/code-expired':
        message = 'Le code de vérification a expirer Renvoyer a nouveau le code';
        break;
      case 'auth/invalid-verification-id':
        message = "L'ID de vérification est incorrect.";
        break;
      case 'auth/network-request-failed':
        this.showLoaderCaptcha = false;
        message = 'connexion internet indisponible';
        break;
      case 'auth/internal-error':
        this.showLoaderCaptcha = false;
        message = 'connexion internet indisponible.';
        break;
      default:
        message = 'Une erreur est survenue.';
    }

    // Afficher le message d'erreur sous forme de toast
    console.log(message);
    this.presentToast(2500, 'bottom', message);
  }

  async presentToast(dure: number, position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: dure,
      position: position,
      cssClass: 'monToast',
      swipeGesture: 'vertical',
      buttons: this.toastButtons,
    });

    await toast.present();
  }
  public toastButtons: (string | ToastButton)[] = [
    {
      side: 'end' as 'end', // Ensuring the type is correct
      icon: 'close-circle-outline',
      role: 'cancel',
      handler: () => {
        console.log('Dismiss clicked');
      },
    },
  ];

  setRoleMessage(ev: any) {
    const { role } = ev.detail;
    console.log(`Dismissed with role: ${role}`);
  }
  direct(rout: String) {
    this.router.navigate(['/', rout]);
  }
}

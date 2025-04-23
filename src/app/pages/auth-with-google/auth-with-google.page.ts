
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { requeToAuth } from 'src/app/services/requeToAuth';
import { ToastButton, ToastController } from '@ionic/angular';
import { Users } from 'src/app/data/Users';
import { UsersInfos } from 'src/app/data/UsersInfos';
import { requeToUser } from 'src/app/services/requeToUser';
import { requeToGeneralDataUsers } from 'src/app/services/requeToGeneralDataUsers';

@Component({
  selector: 'app-auth-with-google',
  templateUrl: './auth-with-google.page.html',
  styleUrls: ['./auth-with-google.page.scss', './auth-with-google.page2.scss'],
})
export class AuthWithGooglePage implements OnInit {

  recaptchaVerifier!: firebase.auth.RecaptchaVerifier;
  verificationId: string = '';
  m: string | null = null;
  passwordIsShow = false
  infos1ISCheck = false
  infos2ISCheck = false
  infos3ISCheck = false
  connect = false


  nom = ''
  birth = ''
  prenom = ''
  email: string = '';
  tel: string = '';
  password: string = '';
  verificationCode: string = '';
  constructor

    (private afAuth: AngularFireAuth,
      private requeteToAuth: requeToAuth,
      // private googlePlus: GooglePlus,
      private router: Router,
      private toastController: ToastController,
      private requeteToUser: requeToUser,
      private requeteToGeneralDataUser: requeToGeneralDataUsers
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
    // this.initializeRecaptchaVerifier();
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
    this.sendVerificationCode('+237696080087', this.recaptchaVerifier)
      .then((result) => {
        this.verificationId = result.verificationId;
        // Code envoyé, demandez à l'utilisateur de saisir le code de vérification

        console.log('Code envoyé avec succès.');
        console.log('ID de vérification:', this.verificationId);
        console.log('Détails de résultat:', result);
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
      .then((result) => {
        // Utilisateur connecté
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
  //     .then((res:any) => {
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

  createUser() {



    if (this.infos2ISCheck) {
      this.infos3ISCheck = true

    }


    if (this.infos2ISCheck && this.infos3ISCheck) {
      this.connect = true

      if (this.email != '' && this.password != '') {
        const userCreate = this.requeteToAuth.createUser(this.email, this.password).then(user => {
          console.log('User created:', user);
          this.presentToast('bottom', 'compte creer avec succes un lien de verification a ete envoyer a votre email')

          if (user?.email != null) {
            const newUser = new Users(new UsersInfos(this.nom, this.prenom, +this.birth, +this.tel, user.uid, user.email, this.password), true, 100,
              [])
            this.requeteToGeneralDataUser.getUserGeneralDataFromFirestore().then(
              data => {
                if (data?.nbrTotalUser != undefined) {
                  const idxConvert = data.nbrTotalUser

                  this.requeteToUser.addUserToFirestore(newUser, idxConvert.toString())
                  const dataUpdate = data
                  data.nbrTotalUser = data.nbrTotalUser + 1
                  this.requeteToGeneralDataUser.addUserGeneralDataToFirestore(dataUpdate)
                }
              }



            )
          }

          this.router.navigate(['/auth']);
        })
          .catch(errorCode => {
            this.connect = false

            this.showErrorToast(errorCode)

          })
      } else {
        this.presentToast('bottom', 'l\'email ou le mot de passe ne doit etre vide')
      }

      console.log('reuissite de creation');

    }
    // console.log('user created',userCreate);

    // this.router.navigate(['/tabs']);

    if (this.infos1ISCheck) {
      if (this.tel == '') {

        this.presentToast('bottom', 'le numero ne doit pas etre vide')
        console.log('tel vide');

      } else {

        if (this.email == '') {

          this.presentToast('bottom', 'le mail ne doit pas etre vide')
          console.log('mail vide');

        } else {
          if (this.password == '') {

            this.presentToast('bottom', 'la mot de passe ne doit pas etre vide')
            console.log('pass vide');

          }
        }
      }



      if (this.tel != '' && this.email != '' && this.password != '') {
        this.infos2ISCheck = true
      }
      console.log('chech2', this.infos2ISCheck);

    }
    if (!this.infos1ISCheck) {
      if (this.nom == '') {

        this.presentToast('bottom', 'le nom ne doit pas etre vide')
        console.log('nom vide');

      } else {

        if (this.prenom == '') {

          this.presentToast('bottom', 'le prenom ne doit pas etre vide')
          console.log('prenom vide');

        } else {
          if (this.birth == '') {

            this.presentToast('bottom', 'la date de naissance ne doit pas etre vide')
            console.log('birth vide');

          }
        }
      }



      if (this.nom != '' && this.prenom != '' && this.birth != '') {
        this.infos1ISCheck = true
      }
      console.log('chech', this.infos1ISCheck);

    }


    console.log(this.infos1ISCheck, this.infos2ISCheck, this.infos3ISCheck);
  }

  back() {
    if (this.infos1ISCheck && !this.infos2ISCheck) {
      this.infos1ISCheck = false
      this.infos2ISCheck = false
      this.infos3ISCheck = false
      console.log(this.infos1ISCheck, this.infos2ISCheck, this.infos3ISCheck);

    }


    if (this.infos1ISCheck && this.infos2ISCheck) {
      this.infos1ISCheck = true
      this.infos2ISCheck = false
      this.infos3ISCheck = false
    }



  }
  connectUser() {

    if (this.email != '' || this.password != '') {
      this.requeteToAuth.signInUser(this.email, this.password).then(user => {
        console.log('User created:', user);
        this.presentToast('bottom', 'connexion reussi')
        this.router.navigate(['/tabs']);
      })
        .catch(errorCode => {

          this.showErrorToast(errorCode.code)


        })
    } else {
      this.presentToast('bottom', 'l\'email ou le mot de passe ne doit etre vide')
    }
    // console.log('user created',userCreate);



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
        message = 'connexion internet Indisponible.';
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
      cssClass: 'monToast',
      swipeGesture: 'vertical',
      buttons: this.toastButtons
    });

    toast.onDidDismiss().then((event) => this.setRoleMessage(event));
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

  showCarat() {
    const passwordInput = document.getElementById('password-input') as HTMLIonInputElement

    if (this.passwordIsShow) {
      passwordInput.type = 'password'
      this.passwordIsShow = false
    } else {

      passwordInput.type = 'text'
      this.passwordIsShow = true
    }
  }
}

import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { requeToAuth } from 'src/app/services/requeToAuth';
import { ToastButton, ToastController } from '@ionic/angular';
import { requeToUser } from 'src/app/services/requeToUser';
import { requeToGeneralDataUsers } from 'src/app/services/requeToGeneralDataUsers';
import { DataService } from 'src/app/services/data.service';
import { Users } from 'src/app/data/Users';
import { UsersInfos } from 'src/app/data/UsersInfos';
import { UserStorageService } from 'src/app/services/storgae/user-storage';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss', './auth.page2.scss', './auth.page3.scss'],
})
export class AuthPage implements OnInit {
  recaptchaVerifier!: firebase.auth.RecaptchaVerifier;
  verificationId: string = '';
  m: string | null = null;

  connect = false
  passwordIsShow = false
  googleAuthIscliked = false
  email: string = '';
  password: string = '';
  verificationCode: string = '';
  constructor

    (private afAuth: AngularFireAuth,
      private requeteToAuth: requeToAuth,
      // private googlePlus: GooglePlus,
      private router: Router,
      private toastController: ToastController,
      private requeteToUser: requeToUser,
      private requeteToGeneralDataUser: requeToGeneralDataUsers,
      public data: DataService,
      private userStorage: UserStorageService

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


  }



  //   Keyboard.addListener('keyboardWillHide', () => {
  //    this.setElementHeight()
  //   });
  // });





  setElementHeight() {
    const screenHeight = window.screen.height;
    const element = document.querySelector('.el') as HTMLElement;
    if (element) {
      element.style.height = `${screenHeight}px`;
    }
    console.log('taille', screenHeight);

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

  // getUser(){
  //   this.googleSignIn().then((res:any) => {
  //     console.log(res);
  //     // Afficher l'email de l'utilisateur connecté
  //     console.log("user uid  :", res.user.uid);

  //     // Vous pouvez également faire d'autres traitements avec les données de l'utilisateur
  //   }).catch((err:any) => {
  //     console.error('Error during Google login', err);
  //     this.m = err;
  //   });
  // }

  // googleSignIn():any {
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

  //   const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);

  //       this.m = res.email;
  //       return this.afAuth.signInWithCredential(googleCredential)

  //       // Vous pouvez également faire d'autres traitements avec les données de l'utilisateur
  //     })
  //     .catch((err) => {
  //       console.error('Error during Google login', err);
  //       this.m = err;
  //     });
  // }



  // fonctin utiliser operationel
  // async googleSignIn(): Promise<firebase.auth.UserCredential | null> {
  //   this.googleAuthIscliked = true
  //   // this.presentToast('middle',"veuiller patienter")
  //   console.log(this.googleAuthIscliked);

  //   try {
  //     const res = await this.googlePlus.login({
  //       webClientId: '496693477037-dac1deftue3qgnnb7aa8337irj62dffe.apps.googleusercontent.com',
  //       offline: true,
  //     });
  //     console.log(res);

  //     const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
  //     const userCredential = await this.afAuth.signInWithCredential(googleCredential);

  //     this.requeteToGeneralDataUser.getUserGeneralDataFromFirestore().then(
  //       data => {
  //         if (data?.nbrTotalUser != undefined) {
  //           this.requeteToUser.connectUserWithEmailAndUid(data.nbrTotalUser, userCredential.user?.email as string, userCredential.user?.uid as string).then(

  //             resul => {
  //               if (typeof resul !== 'string') {

  //                 // this.data.user = resul 

  //               }



  //               if (resul == 'mail pas trouver') {


  //                 const newUser = new Users(new UsersInfos('', '', 0, 0, userCredential.user?.uid as string, userCredential.user?.email as string, ''), false, 100,
  //                   [])
  //                 this.requeteToGeneralDataUser.getUserGeneralDataFromFirestore().then(
  //                   data => {
  //                     if (data?.nbrTotalUser != undefined) {
  //                       const idxConvert = data.nbrTotalUser.toString()
  //                       this.requeteToUser.addUserToFirestore(newUser, idxConvert).then(
  //                         () => {

  //                           this.data.user = newUser
  //                           const dataUpdate = data
  //                           data.nbrTotalUser = data.nbrTotalUser + 1
  //                           this.requeteToGeneralDataUser.addUserGeneralDataToFirestore(dataUpdate)
  //                           console.log('mail pas trouver', this.data.user);
  //                         }
  //                       )

  //                     }
  //                   }



  //                 )
  //               }

  //             }
  //           )

  //         }
  //       })







  //     this.router.navigate(['/tabs'])

  //     // L'utilisateur Firebase
  //     const firebaseUser = userCredential.user;
  //     console.log("Firebase user ID:", firebaseUser?.uid);
  //     console.log('credential', userCredential);

  //     // this.m = firebaseUser?.email;

  //     // Retourner les informations de l'utilisateur
  //     return userCredential;
  //   } catch (err: any) {
  //     this.googleAuthIscliked = false
  //     this.presentToast('bottom', "verifier votre connexion internet et cliquer a nouveau sur l'icone Google pour vous connecter")
  //     console.error('Error during Google login', err);
  //     this.m = err.message;
  //     return null;
  //   }
  // }

  // getUser() {
  //   this.googleSignIn().then((userCredential) => {
  //     if (userCredential) {
  //       // Afficher l'email de l'utilisateur connecté
  //       console.log("user uid:", userCredential.user?.uid);
  //       // Vous pouvez également faire d'autres traitements avec les données de l'utilisateur
  //     } else {
  //       console.log("User login failed");
  //     }
  //   }).catch((err) => {
  //     console.error('Error during getUser', err);
  //     this.m = err;
  //   });
  // }



  connectUser() {

    if (this.email != '' && this.password != '') {
      let er = false

      this.connect = true


      this.requeteToGeneralDataUser.getUserGeneralDataFromFirestore().then(

        data => {
          this.connect = true

          if (data?.nbrTotalUser != undefined) {
            this.requeteToUser.connectUser(data.nbrTotalUser, this.email, this.password).then(

              resul => {
                if (typeof resul !== 'string') {
                  this.requeteToAuth.signInUser(this.email, this.password).then(user => {
                    if (resul.infos.uid === user.uid) {

                      this.userStorage.set('photoUrl', user.photoURL)
                      this.userStorage.set('user', resul)



                      console.log('User connecter:', user);
                      console.log('User connecter  photoooooo de profillllllllll:', user.photoURL);
                      this.data.photoProfil = user.photoURL
                      this.data.user = resul




                      console.log('user get 2  ', this.data.user)
                      this.presentToast('bottom', 'connexion reussi')
                      this.router.navigate(['/tabs']);



                    } else {
                      this.connect = false
                      this.presentToast('bottom', 'UID error')
                    }

                  })
                    .catch(errorCode => {
                      this.connect = false

                      this.showErrorToast(errorCode.code)


                    })
                }


                if (resul == 'pass incorrect') {
                  this.connect = false

                  this.presentToast('bottom', 'Mot de pass incorrect')
                }


                if (resul == 'mail pas trouver') {
                  this.connect = false

                  this.presentToast('bottom', 'cet email ne possede pas de compte')
                }


                if (resul == 'auth google') {
                  this.connect = false

                  this.presentToast('bottom', 'cet email est lié à une authentification via Google veuillez cliquer sur l\'icone de google en haut pour vous connecter')
                }

              }
            )

          }
        }).catch(
          err => {
            if (err) {

              this.connect = false
              console.error('verifier votre connexion internet et ressayer');
              this.presentToast('bottom', 'verifier votre connexion internet et ressayer')
              er = true
            }

          }
        )


    } else {
      this.connect = false

      this.presentToast('bottom', 'l\'email ou le mot de passe ne doit pas etre vide')
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
        message = 'Connexion Internet indisponible.';
        break;
      case 'auth/internal-error':
        message = 'Une erreur interne s\'est produite.';
        break;
      case 'auth/invalid-credential':
        message = 'porbleme lié avec cette email et mot de passe essayer une authentification via google en clicquant sur l\'icone google en haut.';
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

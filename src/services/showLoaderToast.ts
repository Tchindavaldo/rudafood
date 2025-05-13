import { Menu } from 'src/app/data/menu';
import { Injectable } from '@angular/core';
import { Commande, boisson, embalage, livraison } from '../app/data/cmd';
import { ToastButton, ToastController } from '@ionic/angular';
// import { UserData } from '../data/user'; // Utilisez le chemin relatif correct

@Injectable({
  providedIn: 'root',
})
export class showLoaderToast {
  constructor(private toastController: ToastController) {}
  show1 = true;
  show2 = false;

  public showLoader(id: string) {
    const element = document.getElementById(id);
    if (element != null) {
      element.style.visibility = 'visible';
    }
  }
  public hideLoader(id: string) {
    const element = document.getElementById(id);
    if (element != null) {
      element.style.visibility = 'hidden';
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
        message = 'Trop de requêtes ont été envoyées depuis cette adresse IP, veuillez réessayer plus tard.';
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
      case 'auth/invalid-verification-id':
        message = "L'ID de vérification est incorrect.";
        break;
      case 'auth/network-request-failed':
        message = 'Connexion Internet indisponible.';
        break;
      case 'auth/internal-error':
        message = "Une erreur interne s'est produite.";
        break;
      case 'auth/invalid-credential':
        message = "porbleme lié avec cette email et mot de passe essayer une authentification via google en clicquant sur l'icone google en haut.";
        break;
      default:
        message = 'Une erreur est survenue.';
        console.log('Une erreur interne est survenue veillez ressayez plustart', error.message);
    }

    if (error.message == 'Failed to get document because the client is offline.') {
      message = 'internet indisponinle verifier votre connexion et ressayer';
    }

    // Afficher le message d'erreur sous forme de toast
    console.log(message);
    this.presentToast('bottom', message);
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 10000,
      position: position,
      cssClass: 'monToast',
      swipeGesture: 'vertical',
      buttons: this.toastButtons,
    });

    toast.onDidDismiss().then(event => this.setRoleMessage(event));
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
}

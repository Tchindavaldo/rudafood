import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { requeToAuth } from 'src/app/services/requeToAuth';
import { requeToGeneralDataUsers } from 'src/app/services/requeToGeneralDataUsers';
import { requeToUser } from 'src/app/services/requeToUser';

import { FormsModule } from '@angular/forms';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ToastButton } from '@ionic/angular';
import { Users } from 'src/app/data/Users';
import { UsersInfos } from 'src/app/data/UsersInfos';
import { Location } from '@angular/common';
import { postMenuService } from 'src/app/services/menu/requet/post-menu.service';
import { postImageService } from 'src/app/services/image/post-image.service';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.scss', './new-menu.component2.scss', './new-menu.component3.scss'],
})
export class NewMenuComponent {
  recaptchaVerifier!: firebase.auth.RecaptchaVerifier;
  verificationId: string = '';
  m: string | null = null;
  passwordIsShow = false;
  infos1ISCheck = false;
  infos2ISCheck = false;
  infos3ISCheck = false;
  postingMenu = false;

  showImageInput = true;

  showNameInput = false;
  showPriceInput = false;
  showStatusInput = false;

  showPrice1DescriptionInput = false;
  showPrice2DescriptionInput = false;
  showPrice3DescriptionInput = false;
  availability: string = 'avaible'; // coché par défaut

  nom = '';
  birth = '';
  prenom = '';

  price2: Number | null = null;
  price1: Number | null = null;
  price3: Number | null = null;

  isLoadingImg1 = false;
  image2Url: string | ArrayBuffer | null = '';
  image1Url: string | ArrayBuffer | null = '';
  image3Url = '';

  descriptionPrice2: string = '';
  descriptionPrice1: string = '';
  descriptionPrice3: string = '';

  verificationCode: string = '';

  file1!: File | null;
  uploadProgress = 0;
  isLoadingImage: boolean = true;
  isErrorLoadingImage: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private postImageService: postImageService,
    private psotMenuServices: postMenuService,
    private router: Router,
    private toastController: ToastController,
    private location: Location
  ) {}

  goBack = () => this.location.back();

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

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
  async onFileSelected(event: any) {
    this.file1 = event.target.files[0];
    if (this.file1) {
      this.isLoadingImg1 = true;

      this.uploadProgress = 0;

      const reader = new FileReader();
      reader.onload = () => (this.image1Url = reader.result);
      const { data, isPosting, isError } = await this.postImageService.postImage(this.file1, (progress: number) => {
        this.uploadProgress = progress;
      });

      reader.readAsDataURL(this.file1);
      this.isLoadingImg1 = false;
    }
  }
  postMenu = async (data: any) => {
    this.postingMenu = true;
    const { isPosting, isError } = await this.psotMenuServices.postMenu(data);
    this.postingMenu = isPosting;
    this.goBack();
  };

  setAvailability(value: string) {
    this.availability = value;
    console.log('avaibaility', this.availability);
  }

  next() {
    if (this.showImageInput) {
      if (this.image1Url === '' || this.image2Url === '' || this.image3Url === '') {
        this.presentToast('bottom', '3 Images doivent etre selectioner');
        return;
      } else {
        this.showImageInput = false;
        this.showNameInput = true;
        return;
      }
    }

    if (this.showNameInput) {
      if (this.nom === '') {
        this.presentToast('bottom', 'le nom ne doit pas être vide');
        return;
      } else {
        this.showNameInput = false;
        this.showPriceInput = true;
        return;
      }
    }

    if (this.showPriceInput) {
      if (this.price1 === null) {
        this.presentToast('bottom', 'le prix 1 ne doit pas être vide');
        return;
      } else {
        this.showPriceInput = false;
        this.showPrice1DescriptionInput = true;
        return;
      }
    }

    if (this.showPrice1DescriptionInput) {
      if (this.descriptionPrice1 === '') {
        this.presentToast('bottom', 'la description du prix 1 ne doit pas être vide');
        return;
      } else {
        this.showPrice1DescriptionInput = false;
        this.showPrice2DescriptionInput = this.price2 !== null;
        this.showStatusInput = this.price2 === null;
        return;
      }
    }

    if (this.showPrice2DescriptionInput) {
      if (this.descriptionPrice2 === '') {
        this.presentToast('bottom', 'la description du prix 2 ne doit pas être vide');
        return;
      } else {
        this.showPrice2DescriptionInput = false;
        this.showPrice3DescriptionInput = this.price3 !== null;
        this.showStatusInput = this.price3 === null;
        return;
      }
    }

    if (this.showPrice3DescriptionInput) {
      if (this.descriptionPrice3 === '') {
        this.presentToast('bottom', 'la description du prix 3 ne doit pas être vide');
        return;
      } else {
        this.showPrice3DescriptionInput = false;
        this.showStatusInput = true;
        return;
      }
    }

    if (this.showStatusInput) {
      const menuObject = {
        name: this.nom,
        prices: [
          { price: this.price1 || 0, description: this.descriptionPrice1 },
          { price: this.price2 || 0, description: this.descriptionPrice2 },
          { price: this.price3 || 0, description: this.descriptionPrice3 },
        ],
        status: this.availability,
      };
      this.postMenu(menuObject);
    }
  }

  back() {
    if (this.showStatusInput) {
      this.showStatusInput = false;
      if (this.price3 !== null) {
        this.showPrice3DescriptionInput = true;
      } else if (this.price2 !== null) {
        this.showPrice2DescriptionInput = true;
      } else {
        this.showPrice1DescriptionInput = true;
      }
      return;
    }

    if (this.showPrice3DescriptionInput) {
      this.showPrice3DescriptionInput = false;
      this.showPrice2DescriptionInput = true;
      return;
    }

    if (this.showPrice2DescriptionInput) {
      this.showPrice2DescriptionInput = false;
      this.showPrice1DescriptionInput = true;
      return;
    }

    if (this.showPrice1DescriptionInput) {
      this.showPrice1DescriptionInput = false;
      this.showPriceInput = true;
      return;
    }

    if (this.showPriceInput) {
      this.showPriceInput = false;
      this.showNameInput = true;
      return;
    }

    if (this.showNameInput) {
      this.showNameInput = false;
      this.showImageInput = true;
      return;
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
        message = 'connexion internet Indisponible.';
        break;
      case 'auth/internal-error':
        message = "Une erreur interne s'est produite.";
        break;
      default:
        message = 'Une erreur est survenue.';
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

  direct(rout: String) {
    this.router.navigate(['/', rout]);
  }

  showCarat() {
    const passwordInput = document.getElementById('password-input') as HTMLIonInputElement;

    if (this.passwordIsShow) {
      passwordInput.type = 'password';
      this.passwordIsShow = false;
    } else {
      passwordInput.type = 'text';
      this.passwordIsShow = true;
    }
  }
}

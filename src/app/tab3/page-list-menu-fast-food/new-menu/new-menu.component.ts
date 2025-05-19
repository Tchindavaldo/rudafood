import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastService } from 'src/services/toast/toast.service';
import { requeToAuth } from 'src/services/requeToAuth';
import { requeToGeneralDataUsers } from 'src/services/requeToGeneralDataUsers';
import { requeToUser } from 'src/services/requeToUser';

import { FormsModule } from '@angular/forms';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ToastButton } from '@ionic/angular';
import { Users } from 'src/app/data/Users';
import { UsersInfos } from 'src/app/data/UsersInfos';
import { Location } from '@angular/common';
import { postMenuService } from 'src/services/menu/requet/post-menu.service';
import { UpdateMenuService } from 'src/services/menu/requet/update-menu.service';
import { postImageService } from 'src/services/image/post-image.service';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.scss', './new-menu.component2.scss', './new-menu.component3.scss'],
})
export class NewMenuComponent implements OnInit {
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
  availability: string = 'available'; // coché par défaut

  nom = '';
  birth = '';
  prenom = '';

  price2: Number | null = null;
  price1: Number | null = null;
  price3: Number | null = null;

  isLoadingImg1 = false;
  isLoadingImg2 = false;
  isLoadingImg3 = false;
  // Variables pour l'affichage des aperçus d'images
  image2Url: string | ArrayBuffer | null = '';
  image1Url: string | ArrayBuffer | null = '';
  image3Url: string | ArrayBuffer | null = '';

  // Variables pour stocker les URLs des images téléchargées sur le serveur
  uploadedImage1Url: string = '';
  uploadedImage2Url: string = '';
  uploadedImage3Url: string = '';

  descriptionPrice2: string = '';
  descriptionPrice1: string = '';
  descriptionPrice3: string = '';

  verificationCode: string = '';

  file1!: File | null;
  uploadProgress1 = 0;
  uploadProgress2 = 0;
  uploadProgress3 = 0;
  isLoadingImage: boolean = true;
  isErrorLoadingImage: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput2') fileInput2!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput3') fileInput3!: ElementRef<HTMLInputElement>;

  // Variable pour stocker le menu reçu du state
  menuFromState: any = null;

  constructor(
    private postImageService: postImageService,
    private psotMenuServices: postMenuService,
    private updateMenuService: UpdateMenuService,
    private router: Router,
    private toast: ToastService,
    private location: Location
  ) {}

  ngOnInit() {
    // Récupérer le menu passé via le router state
    this.menuFromState = null;

    // Vérifier d'abord dans history.state qui est plus fiable
    if (history.state && history.state.data) {
      this.menuFromState = history.state.data;
    }

    if (this.menuFromState) {
      console.log('Menu reçu pour modification:', this.menuFromState);

      // Initialiser les champs du formulaire avec les données du menu
      this.nom = this.menuFromState.name || '';
      this.availability = this.menuFromState.status || 'available';

      // Initialiser les prix et descriptions si disponibles
      if (this.menuFromState.prices && this.menuFromState.prices.length > 0) {
        if (this.menuFromState.prices[0]) {
          this.price1 = this.menuFromState.prices[0].price || null;
          this.descriptionPrice1 = this.menuFromState.prices[0].description || '';
        }

        if (this.menuFromState.prices[1]) {
          this.price2 = this.menuFromState.prices[1].price || null;
          this.descriptionPrice2 = this.menuFromState.prices[1].description || '';
        }

        if (this.menuFromState.prices[2]) {
          this.price3 = this.menuFromState.prices[2].price || null;
          this.descriptionPrice3 = this.menuFromState.prices[2].description || '';
        }
      }

      // Initialiser les images si disponibles
      if (this.menuFromState.images && Array.isArray(this.menuFromState.images)) {
        // Initialiser jusqu'à 3 images si disponibles
        if (this.menuFromState.images[0]) {
          this.image1Url = this.menuFromState.images[0];
        }

        if (this.menuFromState.images[1]) {
          this.image2Url = this.menuFromState.images[1];
        }

        if (this.menuFromState.images[2]) {
          this.image3Url = this.menuFromState.images[2];
        }
      } else if (this.menuFromState.image) {
        // Fallback pour la compatibilité avec l'ancien format
        this.image1Url = this.menuFromState.image;
      }
    }
  }

  goBack = () => this.location.back();

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  triggerFileInput2() {
    this.fileInput2.nativeElement.click();
  }

  triggerFileInput3() {
    this.fileInput3.nativeElement.click();
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
      this.uploadProgress1 = 0;

      // Télécharger l'image sur le serveur
      try {
        const { data, isPosting, isError } = await this.postImageService.postImage(this.file1, (progress: number) => {
          this.uploadProgress1 = progress;
        });

        // Stocker l'URL retournée par le serveur
        if (data && typeof data === 'string') {
          console.log('Image 1 téléchargée avec succès:', data);
          this.uploadedImage1Url = data;

          // Afficher l'image locale seulement après le téléchargement réussi
          const reader = new FileReader();
          reader.onload = () => (this.image1Url = reader.result);
          reader.readAsDataURL(this.file1);
        }
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image 1:", error);
        this.toast.presentToast('top', "Erreur: L'image 1 n'a pas pu être téléchargée");
      }

      this.isLoadingImg1 = false;
    }
  }

  async onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isLoadingImg2 = true;
      this.uploadProgress2 = 0;

      // Télécharger l'image sur le serveur
      try {
        const { data, isPosting, isError } = await this.postImageService.postImage(file, (progress: number) => {
          this.uploadProgress2 = progress;
        });

        // Stocker l'URL retournée par le serveur
        if (data && typeof data === 'string') {
          console.log('Image 2 téléchargée avec succès:', data);
          this.uploadedImage2Url = data;

          // Afficher l'image locale seulement après le téléchargement réussi
          const reader = new FileReader();
          reader.onload = () => (this.image2Url = reader.result);
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image 2:", error);
        this.toast.presentToast('top', "Erreur: L'image 2 n'a pas pu être téléchargée");
      }

      this.isLoadingImg2 = false;
    }
  }

  async onFileSelected3(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isLoadingImg3 = true;
      this.uploadProgress3 = 0;

      // Télécharger l'image sur le serveur
      try {
        const { data, isPosting, isError } = await this.postImageService.postImage(file, (progress: number) => {
          this.uploadProgress3 = progress;
        });

        // Stocker l'URL retournée par le serveur
        if (data && typeof data === 'string') {
          console.log('Image 3 téléchargée avec succès:', data);
          this.uploadedImage3Url = data;

          // Afficher l'image locale seulement après le téléchargement réussi
          const reader = new FileReader();
          reader.onload = () => (this.image3Url = reader.result);
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image 3:", error);
        this.toast.presentToast('top', "Erreur: L'image 3 n'a pas pu être téléchargée");
      }

      this.isLoadingImg3 = false;
    }
  }
  postMenu = async (data: any) => {
    this.postingMenu = true;

    // Si nous avons reçu un menu dans le state, c'est une mise à jour
    if (this.menuFromState && this.menuFromState.id) {
      console.log('Mise à jour du menu existant:', this.menuFromState.id);
      try {
        const result = await this.updateMenuService.updateMenu(this.menuFromState.id, data);
        this.postingMenu = false;
        this.goBack();
      } catch (error) {
        console.error('Erreur lors de la mise à jour du menu:', error);
        this.postingMenu = false;
        this.toast.presentToast('bottom', 'Erreur lors de la mise à jour du menu');
      }
    } else {
      // Sinon, c'est une création
      console.log("Création d'un nouveau menu");
      try {
        const { isPosting, isError } = await this.psotMenuServices.postMenu(data);
        this.toast.presentToast('bottom', 'Menu ajouter avec succes');
        this.postingMenu = isPosting;
        this.goBack();
      } catch (error) {
        console.error('Erreur lors de la création du menu:', error);
        this.postingMenu = false;
        this.toast.presentToast('bottom', 'Erreur lors de la création du menu');
      }
    }
  };

  setAvailability(value: string) {
    this.availability = value;
    console.log('avaibaility', this.availability);
  }

  next() {
    if (this.showImageInput) {
      if (this.image1Url === '' || this.image2Url === '' || this.image3Url === '') {
        this.toast.presentToast('bottom', '3 Images doivent etre selectioner');
        return;
      } else {
        this.showImageInput = false;
        this.showNameInput = true;
        return;
      }
    }

    if (this.showNameInput) {
      if (this.nom === '') {
        this.toast.presentToast('bottom', 'le nom ne doit pas être vide');
        return;
      } else {
        this.showNameInput = false;
        this.showPriceInput = true;
        return;
      }
    }

    if (this.showPriceInput) {
      if (this.price1 === null) {
        this.toast.presentToast('bottom', 'le prix 1 ne doit pas être vide');
        return;
      } else {
        this.showPriceInput = false;
        this.showPrice1DescriptionInput = true;
        return;
      }
    }

    if (this.showPrice1DescriptionInput) {
      if (this.descriptionPrice1 === '') {
        this.toast.presentToast('bottom', 'la description du prix 1 ne doit pas être vide');
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
        this.toast.presentToast('bottom', 'la description du prix 2 ne doit pas être vide');
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
        this.toast.presentToast('bottom', 'la description du prix 3 ne doit pas être vide');
        return;
      } else {
        this.showPrice3DescriptionInput = false;
        this.showStatusInput = true;
        return;
      }
    }

    if (this.showStatusInput) {
      // Créer un tableau d'images en filtrant les valeurs vides
      // Utiliser les URLs retournées par le serveur plutôt que les aperçus locaux
      const images = [this.uploadedImage1Url, this.uploadedImage2Url, this.uploadedImage3Url].filter(img => img !== '' && img !== null);

      const menuObject = {
        name: this.nom,
        prices: [
          { price: this.price1 || 0, description: this.descriptionPrice1 },
          { price: this.price2 || 0, description: this.descriptionPrice2 },
          { price: this.price3 || 0, description: this.descriptionPrice3 },
        ],
        status: this.availability,
        images: images,
        coverImage: images.length > 0 ? images[0] : '',
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

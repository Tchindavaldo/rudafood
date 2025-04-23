import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';

import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { boisson, Commande, embalage, livraison } from 'src/app/data/commande';
import { Menu } from 'src/app/data/menu';
import { CardService } from 'src/app/services/card.service';
import { requeToMenu } from 'src/app/services/requeToMenu';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { showPages } from 'src/app/services/showPages';
import { ToastButton, ToastController } from '@ionic/angular';
import { FastFood } from 'src/app/data/fastFood';
import { showLoaderToast } from 'src/app/services/showLoaderToast';
import { requeToFastFood } from 'src/app/services/requeToFastFood';
@Component({
  selector: 'app-page-list-menu-fast-food',
  templateUrl: './page-list-menu-fast-food.page.html',
  styleUrls: ['./page-list-menu-fast-food.page.scss'],
})
export class PageListMenuFastFoodPage implements OnInit, AfterViewInit {
  menuTab: Menu[] = [];
  menuTab2: Menu[] = [];
  MenuIsGet = false;
  erroDataGeting = false;

  managerFastFoodFound!: boolean;
  menuTabToPass: Menu[] = [new Menu('', 0, 0, 0, '', '', '', '', '')];
  focus = 'gestionCmd';
  focus3 = 'pendingCmd';
  focus2 = 'GM';
  idMenuClick: number = 0;
  cardIsShow!: boolean;
  marginGrid = '0 0 45px 0';

  constructor(
    public showPages: showPages,
    public cardControle: CardService,
    private requeToMenu: requeToMenu,
    public dataGet: DataService,
    private toastController: ToastController,
    private router: Router,
    private toast: showLoaderToast,
    private requeteToFastFood: requeToFastFood
  ) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log("height apres l'init de la page", window.innerHeight);

      this.getMEnu();
    }, 5000);
  }

  ngOnInit() {
    const height = window.innerHeight;
    if (height < 650) {
      this.marginGrid = '0 0 25px 0';
    }
    // console.log('height', height);

    // this.menuTab2=[]

    //  this.menuTab = this.dataGet.menuTab
    //  this.menuTab2 = this.dataGet.menuTab
    this.idMenuClick = 0;
  }

  getMEnu() {
    try {
      this.MenuIsGet = false;
      this.erroDataGeting = false;
      if (this.dataGet.FastFoodTab.length == 0) {
        console.log('tableau de fastfood vide');
        this.erroDataGeting = true;
      }
      // console.log(this.dataGet.user.isMarchand);

      this.dataGet.FastFoodTab.forEach(TempFastFood => {
        if (
          this.dataGet.user.isMarchand &&
          TempFastFood.proprietaire.infos.email == this.dataGet.user.infos.email &&
          TempFastFood.proprietaire.infos.uid == this.dataGet.user.infos.uid
        ) {
          this.dataGet.FastFood = TempFastFood;
          this.dataGet.menuTab = this.dataGet.FastFood.menu;
          this.menuTab = this.dataGet.menuTab;

          console.log('menu de daftfood trouver fast ajouterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
          console.log('fast ajouter', this.dataGet.FastFood);
          this.MenuIsGet = true;
        } else {
          console.log('gerant pas trouver');
          this.managerFastFoodFound = false;
          this.erroDataGeting = true;
        }
      });
    } catch (error) {
      console.log('errrrrrrrrrrrrrrrrrrr', error);
      this.erroDataGeting = true;
      this.toast.showErrorToast(error);
    }
  }

  value(val: string) {
    this.focus = val;
  }
  value3(val: string) {
    this.focus3 = val;
  }
  value2(val2: string) {
    this.focus2 = val2;
  }

  public showBottomCard(actions: string, i: number) {
    if (actions == 'update') {
      this.cardControle.action = 'update';
      this.cardControle.idx = i;
      this.menuTabToPass = this.dataGet.FastFood.menu;
      this.idMenuClick = i;
      this.cardControle.idx = i;
      this.cardControle.showBottomCard('bottom-card');
      console.log(this.cardIsShow);
    }
    if (actions == 'add') {
      this.cardControle.action = 'add';
      this.menuTabToPass = [new Menu('', 0, 0, 0, '', '', '', '', '')];
      this.idMenuClick = 0;
      this.cardControle.showBottomCard('bottom-card');
    }
  }
  public hideBottomCard1() {
    this.cardControle.hideBottomCard1('bottom-card');

    this.cardIsShow = this.cardControle.bottomCardIsShow;
    console.log(this.cardIsShow);
  }
  deleteMenu(idx: number) {
    this.toast.showLoader('lodaerTab3MenuDelete');
    let fastFoodGet: FastFood | null = null;
    let tempsFastFood: FastFood;
    let execCode = true;
    this.menuTabToPass = [new Menu('', 0, 0, 0, '', '', '', '', '')];
    this.idMenuClick = 0;
    tempsFastFood = JSON.parse(JSON.stringify(this.dataGet.FastFood));
    tempsFastFood.menu.splice(idx, 1);
    try {
      this.addMenuTabToFirestore(tempsFastFood);
    } catch (error) {
      console.log('erreur lord de la suppression', error);
      this.toast.hideLoader('lodaerTab3MenuDelete');
      this.toast.showErrorToast(error);
    }
  }

  del(tempsFastFood: FastFood) {
    this.toast.showLoader('lodaerTab3MenuDelete');
    this.requeteToFastFood
      .updateFastFood(tempsFastFood, tempsFastFood.id.toString())
      .then(fastFoodGet => {
        if (fastFoodGet != null) {
          this.menuTab = [];
          console.log('valeur de menu tabbbbbbb', this.menuTab);

          this.dataGet.FastFood = tempsFastFood;
          this.menuTab = this.dataGet.FastFood.menu;
          console.log('valeur de menu tabbbbbbb', this.menuTab);
          console.log('apres suppression nouveau menu', this.dataGet.FastFood.menu);
          this.toast.hideLoader('lodaerTab3MenuDelete');
          this.toast.presentToast('bottom', 'suppression reussi');
        }
      })
      .catch(error => {
        console.log('erreur lord de la suppression', error);
        this.toast.hideLoader('lodaerTab3MenuDelete');
        this.toast.showErrorToast(error);
      });
  }

  async addMenuTabToFirestore(fastFoodToAddGet: FastFood) {
    let fastAdded: FastFood | null = null;

    try {
      const tempFastFoodGet = await this.requeteToFastFood.getFastFoodFromFirestore(
        this.dataGet.FastFood.id.toString()
      );

      if (tempFastFoodGet != null) {
        let fastFoodToAdd = tempFastFoodGet;

        fastFoodToAdd = fastFoodToAddGet;

        fastAdded = await this.requeteToFastFood.addFastFoodToFirestore(
          fastFoodToAdd,
          this.dataGet.FastFood.id.toString()
        );
        if (fastAdded != null) {
          this.dataGet.FastFood = fastFoodToAdd;
          this.menuTab = this.dataGet.FastFood.menu;

          console.log('valeur de menu tabbbbbbb', this.menuTab);
          console.log('apres suppression nouveau menu', this.dataGet.FastFood.menu);
          this.toast.hideLoader('lodaerTab3MenuDelete');
          this.toast.presentToast('bottom', 'suppression reussi');
        }
        console.log('nouveauuuuuuuuuuuuuuuuu menu', this.dataGet.FastFood.menu);
      } else {
        console.log('No fast food found with the given ID.');
      }
    } catch (err) {
      console.log('erreur lord de la suppression', err);
      this.toast.hideLoader('lodaerTab3MenuDelete');
      this.toast.showErrorToast(err);
      throw err;
    }
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }
}

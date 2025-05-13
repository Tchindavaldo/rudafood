import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FastFood } from 'src/app/data/fastFood';
import { Menu } from 'src/app/data/menu';
import { CardService } from 'src/services/card.service';
import { DataService } from 'src/services/data.service';
import { getMenuService } from 'src/services/menu/requet/get-menu.service';
import { requeToFastFood } from 'src/services/requeToFastFood';
import { requeToMenu } from 'src/services/requeToMenu';
import { showLoaderToast } from 'src/services/showLoaderToast';
import { showPages } from 'src/services/showPages';
import { showCardTranslateY } from 'src/app/utils/showCard';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss'],
})
export class ListMenuComponent implements OnInit {
  menuTab: any;
  menuTab2: Menu[] = [];
  ispending = true;
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
    private requeteToFastFood: requeToFastFood,

    private getMenuService: getMenuService
  ) {}
  ngOnInit() {
    const height = window.innerHeight;
    if (height < 650) {
      this.marginGrid = '0 0 25px 0';
    }

    this.fetchMenu();
    this.idMenuClick = 0;
  }

  fetchMenu = async () => {
    const { data, isError, ispending } = await this.getMenuService.getMenu();

    this.menuTab = data;
    this.ispending = ispending;
    console.log('menu obtenu', this.menuTab, isError, ispending);
  };

  value(val: string) {
    this.focus = val;
  }
  value3(val: string) {
    this.focus3 = val;
  }
  value2(val2: string) {
    this.focus2 = val2;
  }

  redirect(path: string) {
    this.router.navigate([path]);
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
      this.cardControle.showBottomCard('menu-card');
      showCardTranslateY('menu-card', '0px');
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
      const tempFastFoodGet = await this.requeteToFastFood.getFastFoodFromFirestore(this.dataGet.FastFood.id.toString());

      if (tempFastFoodGet != null) {
        let fastFoodToAdd = tempFastFoodGet;

        fastFoodToAdd = fastFoodToAddGet;

        fastAdded = await this.requeteToFastFood.addFastFoodToFirestore(fastFoodToAdd, this.dataGet.FastFood.id.toString());
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
}

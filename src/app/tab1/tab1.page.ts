import { AfterViewChecked, Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { boisson, embalage, livraison } from './../data/commande';
import { FastFood } from './../data/fastFood';
import { generalDataFastFood } from './../data/generalDataFastFood';
import { requeToGeneralData } from './../services/requeToGeneralData';
import { environment } from 'src/environments/environment';
import { requeToFastFood } from './../services/requeToFastFood';
import { initializeApp } from 'firebase/app';
import { Users } from '../data/Users';
import { Menu } from '../data/menu';
import { DataService } from '../services/data.service';
import { CardService } from '../services/card.service';
import { Commande } from '../data/commande';
import { UsersInfos } from '../data/UsersInfos';
import { requeToUser } from '../services/requeToUser';
import { generalDataUser } from '../data/generalDataUser';
import { requeToGeneralDataUsers } from '../services/requeToGeneralDataUsers';
import { UserStorageService } from '../services/storgae/user-storage';
import { getFastFoodsService } from '../services/FastFood/get/get-fastFoods.service';
import { fastFoodsDataService } from '../services/FastFood/data/fastFood-data.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  searchIconIsClicked = false;
  // declaration of fata from services
  FastFoodTab: FastFood[] = [];
  FastFoodLenght: number[] = [];
  isloading = false;

  // declaration of fata from data
  cmd!: Commande;
  embalage = [new embalage('gamelle', 100), new embalage('sac platique', 100)];
  quantiteCmd = 0;
  prixTotal = 5120;
  livraison = new livraison(false, 0);
  boisson = new boisson('djino', 700);
  fastfoodAllTabIsGet = false;
  erroDataGeting = false;

  menuTabToPass: Menu = new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo');
  idMenuClick: number = 0;
  idxFastFood = 0;
  valTostop!: number;
  photo!: any | null;
  userData: any;

  fastfoods = this.fastFoodData.getFastfoods();
  displayLimit = 3; // nombre initial à afficher

  constructor(
    private requeToFastFood: requeToFastFood,
    private DataFastFood: DataService,
    public cardControle: CardService,
    public dataGet: DataService,

    private fastFoodService: getFastFoodsService,
    public fastFoodData: fastFoodsDataService,
    private userStorage: UserStorageService
  ) {}
  ngOnInit(): void {
    const app = initializeApp(environment.firebase);

    this.setKey();
    this.fetchFastFood();
    this.photo = this.userStorage.get('photoUrl');
  }

  async fetchFastFood() {
    try {
      this.isloading = true;
      await this.fastFoodService.getFastFoods();
      this.isloading = false;
    } catch (error) {
      this.isloading = false;
      console.log(error);
    }
  }

  async setKey() {
    const userData = await this.userStorage.get('user');
    // const all = await this.userStorage.listAll()
    this.userData = userData;
    // console.log('user get onInit  ', userData);
    // console.log('all lllllll ', all);
  }

  setClickedMenu = (menu: any) => (this.menuTabToPass = menu);

  async addData(idx: number): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const app = initializeApp(environment.firebase);
      const dataToAdd = new FastFood(
        idx,
        'king',
        new Users(new UsersInfos('valdo', 'blair', 23, 33333, 'uid', 'mail', 'default password'), true, 100, [
          new Commande(
            'uid1',
            0,
            idx,
            new Menu('menu1', 1500, 2000, 3000, 'option1', 'option2', 'option3', 'photo', 'dispo'),
            2,
            this.embalage,
            this.boisson,
            this.livraison,
            this.prixTotal,
            '',
            true,
            false
          ),
        ]),
        [
          new Menu('menu1', 1500, 2000, 3000, 'option1', 'option2', 'option3', 'photo', 'dispo'),
          new Menu('menu1', 1500, 2000, 3000, 'option1', 'option2', 'option3', 'photo', 'dispo'),
        ],
        [
          new Commande(
            'uid1',
            0,
            idx,
            new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'),
            this.quantiteCmd,
            this.embalage,
            this.boisson,
            this.livraison,
            this.prixTotal,
            'isPendingToFastFood',
            false,
            true
          ),
        ],
        334
      );
      try {
        await this.requeToFastFood.addFastFoodToFirestore(dataToAdd, idx.toString());

        if (this.DataFastFood.generalDataFastFood?.nbrTotalFastFood != undefined) {
          this.DataFastFood.generalDataFastFood.nbrTotalFastFood++;
        }

        console.log('menuTab created successfully');

        console.log(dataToAdd);

        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

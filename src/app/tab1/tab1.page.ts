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
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, AfterViewChecked {
  searchIconIsClicked = false
  // declaration of fata from services
  FastFoodTab: FastFood[] = []
  FastFoodLenght: number[] = []
  isload = false

  // declaration of fata from data
  cmd!: Commande
  embalage = [new embalage('gamelle', 100), new embalage('sac platique', 100)]
  quantiteCmd = 0
  prixTotal = 5120
  livraison = new livraison(false, 0)
  boisson = new boisson('djino', 700)
  fastfoodAllTabIsGet = false
  erroDataGeting = false
  userss = new Users(new UsersInfos('valdo', 'blair', 23, 33333, 'uid', 'mail', 'default password'), true, 100,
    [new Commande(
      'uid1',
      0,
      0,
      new Menu('menu1', 1500, 2000, 3000, 'option1', 'option2', 'option3', 'photo', 'dispo'),
      2, this.embalage, this.boisson, this.livraison,
      this.prixTotal,
      '',
      true, false
    )
    ])
  //declaration of variable for state

  menuTabToPass: Menu = new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo')
  idMenuClick: number = 0;
  idxFastFood = 0
  valTostop!: number
  photo!: any | null
  userData: any
  constructor(
    private requeToUser: requeToUser,
    private requeToFastFood: requeToFastFood,
    private requeToGeneralData: requeToGeneralData,
    private requeToGeneralDataUser: requeToGeneralDataUsers,
    private DataFastFood: DataService,
    public cardControle: CardService,
    public dataGet: DataService,


    private userStorage: UserStorageService
  ) { }
  ngOnInit(): void {
    const app = initializeApp(environment.firebase);
    this.getGeneralData();
    this.getGeneralDataUser();
    this.setKey()
    this.photo = this.userStorage.get('photoUrl')
  }

  ngAfterViewChecked(): void {



  }

  async setKey() {
    const userData = await this.userStorage.get('user')
    // const all = await this.userStorage.listAll()
    this.userData = userData
    console.log('user get onInit  ', userData);
    // console.log('all lllllll ', all);


  }
  public showBottomCard(actions: string, i: number, ii: number) {
    this.cardControle.bottomCardIsShow = false
    this.cardControle.action = 'newCmd'
    this.cardControle.idxFastFood = i
    this.cardControle.idxMenu = ii
    this.idMenuClick = i
    this.menuTabToPass = this.dataGet.FastFoodTab[i].menu[ii]
    this.cardControle.cmd.menu = this.dataGet.FastFoodTab[i].menu[ii]
    this.cardControle.prixTotal = this.dataGet.FastFoodTab[i].menu[ii].prix1 + 150
    this.cardControle.showBottomCard('bottom-card-home')
    console.log('click effectuer', i);

    this.dataGet.idxFastFood = i

  }






  push() {
    this.DataFastFood.FastFoodTab.push(
      new FastFood(
        0,
        'king',
        this.userss,
        [new Menu('menu1', 1500, 2000, 3000, 'option1', 'option2', 'option3', 'photo', 'dispo'), new Menu('menu1', 1500, 2000, 3000, 'option1', 'option2', 'option3', 'photo', 'dispo')],
        [new Commande('uid1', 0, this.DataFastFood.FastFoodTab.length - 1, new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'), this.quantiteCmd, this.embalage, this.boisson, this.livraison, this.prixTotal, 'isPendingToFastFood', false, true),
        new Commande('uid8', 1, this.DataFastFood.FastFoodTab.length - 1, new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'), this.quantiteCmd, this.embalage, this.boisson, this.livraison, this.prixTotal, 'isPendingToFastFood', false, true),
        new Commande('uid1', 2, this.DataFastFood.FastFoodTab.length - 1, new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'), this.quantiteCmd, this.embalage, this.boisson, this.livraison, this.prixTotal, 'isPendingToFastFood', false, true),
        new Commande('uid5', 3, this.DataFastFood.FastFoodTab.length - 1, new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'), this.quantiteCmd, this.embalage, this.boisson, this.livraison, this.prixTotal, 'isPendingToFastFood', false, true),
        ],
        334
      )
    )
    // this.itemIsShow(this.DataFastFood.FastFoodTab.length)
    this.FastFoodLenght.length = this.definirTailleTab(this.DataFastFood.FastFoodTab.length)
    console.log('taille tab fastfood', this.DataFastFood.FastFoodTab.length)
    console.log('taille tab div', this.FastFoodLenght.length)

  }
  definirTailleTab(tailleTab: number): number {
    const tailleDivisee = Math.floor(tailleTab / 4);
    if (tailleTab % 4 === 0) {
      return tailleDivisee;
    } else {
      return tailleDivisee + 1;
    }
  }

  getGeneralAndFastFoodTab() {
    this.getGeneralData()
    this.getAllFastFood()
  }

  async getData(idx: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {

      const app = initializeApp(environment.firebase);

      try {



        const dataGet = await this.requeToFastFood.getFastFoodFromFirestore(idx)


        console.log('menuTab getted successfully');

        console.log(dataGet);

        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  async addData(idx: number): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {

      const app = initializeApp(environment.firebase);
      const dataToAdd = new FastFood(
        idx,
        'king',
        new Users(new UsersInfos('valdo', 'blair', 23, 33333, 'uid', 'mail', 'default password'), true, 100,
          [new Commande(
            'uid1',
            0,
            idx,
            new Menu('menu1', 1500, 2000, 3000, 'option1', 'option2', 'option3', 'photo', 'dispo'),
            2, this.embalage, this.boisson, this.livraison,
            this.prixTotal,
            '',
            true, false
          )
          ])
        ,
        [new Menu('menu1', 1500, 2000, 3000, 'option1', 'option2', 'option3', 'photo', 'dispo'), new Menu('menu1', 1500, 2000, 3000, 'option1', 'option2', 'option3', 'photo', 'dispo')],
        [new Commande('uid1', 0, idx, new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'), this.quantiteCmd, this.embalage, this.boisson, this.livraison, this.prixTotal, 'isPendingToFastFood', false, true),
        ],
        334
      )
      try {


        await this.requeToFastFood.addFastFoodToFirestore(dataToAdd, idx.toString());

        if (this.DataFastFood.generalDataFastFood?.nbrTotalFastFood != undefined) {

          this.DataFastFood.generalDataFastFood.nbrTotalFastFood++
          this.addGeneralData(this.DataFastFood.generalDataFastFood)

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
  async addUser(idx: number): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {

      const userToAdd = new Users(new UsersInfos('tchinda', 'valdo', 23, 33333, 'uid', 'mail', 'default PassWord'),
        true,
        100,
        [new Commande(
          'uid1',
          0,
          idx,
          new Menu('menu1', 1500, 2000, 3000, 'option1', 'option2', 'option3', 'photo', 'dispo'),
          2, this.embalage, this.boisson, this.livraison,
          this.prixTotal,
          '',
          true, false
        )
        ])

      try {


        await this.requeToUser.addUserToFirestore(userToAdd, idx.toString());

        console.log('user created successfully');

        console.log(userToAdd);

        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }



  async getGeneralData(): Promise<generalDataFastFood | null> {
    this.fastfoodAllTabIsGet = false
    this.erroDataGeting = false
    try {
      const data = await this.requeToGeneralData.getFastFoodGeneralDataFromFirestore();
      if (data != null) {
        this.DataFastFood.generalDataFastFood = data;

      }
      console.log('general data get successful from home Page');

      const fastfoodIsget = await this.getAllFastFood()
      if (fastfoodIsget.length != 0) {
        this.fastfoodAllTabIsGet = true
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      this.erroDataGeting = true
      throw error;
    }

  }


  async getGeneralDataUser(): Promise<generalDataUser | null> {
    try {
      const data = await this.requeToGeneralDataUser.getUserGeneralDataFromFirestore();
      this.DataFastFood.generalDataUser = data;
      console.log('user get ', this.DataFastFood.generalDataUser);

      this.getUser()


      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }

  }


  async getAllFastFood(): Promise<FastFood[]> {
    try {
      const nbrFastFoodTotal = this.DataFastFood.generalDataFastFood?.nbrTotalFastFood
      if (nbrFastFoodTotal != undefined) {

        for (let index = 0; index < nbrFastFoodTotal; index++) {

          const idxConvert = index.toString()
          const FastFoodGet = await this.requeToFastFood.getFastFoodFromFirestore(idxConvert)
          if (FastFoodGet !== null) {
            this.DataFastFood.FastFoodTab.push(FastFoodGet)

          }

        }
      } else {
        console.log('nbrFastFood undifened')
      }
      //  this.itemIsShow(this.DataFastFood.FastFoodTab.length)

      this.FastFoodTab = this.DataFastFood.FastFoodTab
      this.FastFoodLenght.length = this.definirTailleTab(this.DataFastFood.FastFoodTab.length)

      console.log('tab of data get succsseful', this.DataFastFood.FastFoodTab)
      console.log('fast food get', this.FastFoodTab)
      return this.DataFastFood.FastFoodTab

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }

  }

  async getAllUser(): Promise<any> {
    try {
      const nbrUserTotal = this.DataFastFood.generalDataUser?.nbrTotalUser
      if (nbrUserTotal != undefined) {

        for (let index = 0; index < nbrUserTotal; index++) {

          const idxConvert = index.toString()
          const userGet = await this.requeToUser.getUsersFromFirestore(idxConvert)
          if (userGet !== null) {
            this.DataFastFood.userTab.push(userGet)

          }

        }
      } else {
        console.log('nbrFastFood undifened')
      }
      //  this.itemIsShow(this.DataFastFood.FastFoodTab.length)

      //   this.FastFoodTab = this.DataFastFood.FastFoodTab
      //   this.FastFoodLenght.length = this.definirTailleTab(this.DataFastFood.FastFoodTab.length)

      console.log(this.DataFastFood.userTab)
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }

  }

  async getUser(): Promise<any> {
    try {
      //       const nbrUserTotal= this.DataFastFood.generalDataUser?.nbrTotalUser

      //   console.log('idx total',this.DataFastFood.generalDataUser?.nbrTotalUser)
      //      if (nbrUserTotal!=undefined) {

      //       for (let index = 0; index < nbrUserTotal ;index++) {

      //         const idxConvert = index.toString()
      //         console.log('index TO pass',idxConvert)
      //         const userGet = await this.requeToUser.getUsersFromFirestore(idxConvert)
      // if (userGet!==null) {
      //  if (userGet.infos.nom=='tchinda' || userGet.infos.prenom=='valdo') {
      //   this.DataFastFood.user = userGet
      //   console.log('utilisateur trouver',this.DataFastFood.user = userGet)
      //  }else{
      //   console.log('utilisateur introuvable')
      //  }

      // }       

      //       }
      //      }else{
      //       console.log('nbrFastFood undifened')
      //      }
      //  this.itemIsShow(this.DataFastFood.FastFoodTab.length)

      //   this.FastFoodTab = this.DataFastFood.FastFoodTab
      //   this.FastFoodLenght.length = this.definirTailleTab(this.DataFastFood.FastFoodTab.length)

      console.log('utilisateur connecter', this.DataFastFood.user)
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }

  }

  async addGeneralData(dataToAdd: generalDataFastFood): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {


      try {


        await this.requeToGeneralData.addFastFoodGeneralDataToFirestore(dataToAdd);
        console.log(dataToAdd);

        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  async addGeneralDataUser(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {

      const dataToAdd = new generalDataUser(

        2,
        4,
        4,
        15014
      )
      try {


        await this.requeToGeneralDataUser.addUserGeneralDataToFirestore(dataToAdd);
        console.log(dataToAdd);

        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

}

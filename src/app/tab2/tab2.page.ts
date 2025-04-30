import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { Commande } from '../data/commande';
import { DataService } from '../services/data.service';
import { requeToFastFood } from '../services/requeToFastFood';
import { requeToUser } from '../services/requeToUser';
import { FastFood } from '../data/fastFood';
import { Users } from '../data/Users';
import { showLoaderToast } from '../services/showLoaderToast';
import { userOrderRouteAnimation } from '../animations/user-order-route-animations';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [userOrderRouteAnimation],
})
export class Tab2Page implements OnInit, AfterContentChecked {
  tempElement1: Commande[] = [];
  tempElement2: Commande[] = [];
  BuyCmd: Commande[] = [];
  tempUserCmdTab: Commande[] = [];
  pendingCmd: Commande[] = [];
  cmdTab: Commande[] = [];
  cmdTab2: Commande[] = [];
  chip1ISFocused = true;
  chip3ISFocused = false;
  chip2ISFocused = false;
  dataIspass: boolean = false;
  CmdAllIsGet = false;
  erroDataGeting = false;
  constructor(
    private dataService: DataService,
    private requeteToFasFood: requeToFastFood,
    private requeteToUsers: requeToUser,
    private showloader: showLoaderToast
  ) {}
  ngOnInit(): void {
    // this.loadData()
    // this.loadData2()

    this.loadDatax();
  }

  ngAfterContentChecked(): void {
    //  if (!this.dataIspass) {
    // this.loadData()
    // this.loadData2()
    //  }

    this.loadDatax();
  }
  getCmd() {
    //   this.loadData()
    // this.loadData2()
    this.loadDatax();
  }
  loadData() {
    this.tempElement1 = []; // Réinitialiser le tableau temporaire ici
    try {
      this.erroDataGeting = false;

      // if (this.dataService.user) {
      this.dataService.user.cmd.forEach(element => {
        if (element.isBuy === true) {
          this.tempElement1.push(element);
        }
      });
      this.CmdAllIsGet = true;
      this.cmdTab2 = this.tempElement1; // Assigner le tableau temporaire au tableau final
      // console.log('payer', this.cmdTab2);
      // }
    } catch (error) {
      console.log('erreur sur loaddata1 lors de linit', error);
      this.erroDataGeting = true;
    }
  }

  loadData2() {
    this.erroDataGeting = false;
    this.tempElement2 = []; // Réinitialiser le tableau temporaire ici
    try {
      // if (this.dataService.user) {
      this.dataService.user.cmd.forEach(element => {
        if (element.ispending === true) {
          this.tempElement2.push(element);
        }
      });

      this.cmdTab = this.tempElement2; // Assigner le tableau temporaire au tableau final
      // console.log('attente', this.cmdTab);
      // console.log('cmd general', this.dataService.user.cmd);
      this.dataIspass = true;
      this.CmdAllIsGet = true;

      // } else {
      //   // console.log('pas recu', this.dataService.user);
      // }
    } catch (error) {
      console.log('erreur sur la tab2 lors de linit', error);
      this.erroDataGeting = true;
    }
  }

  loadDatax() {
    try {
      this.erroDataGeting = false;
      this.tempElement1 = []; // Réinitialiser le tableau temporaire ici
      this.tempElement2 = []; // Réinitialiser le tableau temporaire ici
      // if (this.dataGet.user) {
      // this.dataGet.user.cmd.forEach(element => {
      this.tempUserCmdTab = this.dataService.user.cmd;
      this.tempUserCmdTab.forEach(element => {
        if (element.isBuy === true) {
          this.tempElement1.push(element);
        }
        if (element.ispending === true) {
          this.tempElement2.push(element);
        }
      });

      this.BuyCmd = this.tempElement1; // Assigner le tableau temporaire au tableau final

      this.pendingCmd = this.tempElement2; // Assigner le tableau temporaire au tableau final

      // }

      this.dataIspass = true;
      this.CmdAllIsGet = true;
    } catch (error) {
      this.tempUserCmdTab = [];

      this.erroDataGeting = true;
    }
  }
  show(i: number) {
    this.chip1ISFocused = false;
    this.chip2ISFocused = false;
    this.chip3ISFocused = false;

    if (i == 1) {
      this.chip1ISFocused = true;
      console.log(i);
    }
    if (i == 2) {
      this.chip2ISFocused = true;
      console.log(i);
    }
    if (i == 3) {
      this.chip3ISFocused = true;
      console.log(i);
    }
  }
  async buy() {
    this.showLoad();
    let idxUserGet = '';
    let datachanged = false;
    let tempUserGet!: Users;
    let tempUserToUpdate!: Users;
    let userUpdate: Users | null = null;

    // for (let index = 0; index < this.dataService.generalDataUser.nbrTotalUser; index++) {
    // const userGet = await this.requeteToUsers.getUsersFromFirestore(index.toString());
    // if (userGet != null && userGet.infos.email === this.dataService.user.infos.email) {
    // console.log('user trouvé à l\'index', index);
    // idxUserGet = index.toString();
    // tempUserGet = userGet;

    tempUserToUpdate = JSON.parse(JSON.stringify(this.dataService.user));
    // for (let i = 0; i < tempUserToUpdate.cmd.length; i++) {
    //   if (tempUserToUpdate.cmd[i].ispending === true) {
    //     // datachanged = true;
    //     tempUserGet.cmd[i].ispending = false;
    //     tempUserGet.cmd[i].isBuy = true;
    //     console.log('id ffffff', this.dataService.idxFastFood);
    //     console.log('id ffffff in cmmddddd', tempUserGet.cmd[i].idFastFood);

    //     const FastFoodGet = await this.requeteToFasFood.getFastFoodFromFirestore(tempUserGet.cmd[i].idFastFood.toString());
    //     if (FastFoodGet != null) {
    //       FastFoodGet.commande.push(tempUserGet.cmd[i]);
    //       await this.requeteToFasFood.addFastFoodToFirestore(FastFoodGet, tempUserGet.cmd[i].idFastFood.toString());
    //       console.log('ajout réussi du update du fastfood');
    //     } else {
    //       console.log('FastFoodGet is null');
    //     }
    //   }
    // }

    try {
      for (let i = 0; i < tempUserToUpdate.cmd.length; i++) {
        if (tempUserToUpdate.cmd[i].ispending === true) {
          // datachanged = true;
          tempUserToUpdate.cmd[i].ispending = false;
          tempUserToUpdate.cmd[i].isBuy = true;
        }
      }

      if (this.dataService.generalDataUser != null) {
        userUpdate = await this.requeteToUsers.updateUser(tempUserToUpdate, this.dataService.generalDataUser.nbrTotalUser);
      }

      if (userUpdate != null) {
        this.dataService.user = userUpdate;
        this.hideLoaderr();
        this.showloader.presentToast('bottom', 'commande enregistrer');
      }
    } catch (error) {
      console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrr   update', error);
      this.hideLoaderr();
      this.showloader.showErrorToast(error);
    }

    //   break; // Exit the loop since user is found
    // } else {
    //   console.log('aucun user trouvé');

    //         if (datachanged) {
    //   try {
    //     await this.requeteToUsers.addUserToFirestore(tempUserGet, idxUserGet);
    //     this.dataService.user.cmd = tempUserGet.cmd
    //     console.log('User updated successfully');
    //   } catch (err) {
    //     console.log('erreur lors de l\'ajout depuis la tab1', err);
    //   }
    // }

    // }
  }

  hideLoaderr() {
    this.showloader.hideLoader('lodaerTab2');
    console.log('hide appellllllerrrrrrrrrrrrrr');
  }
  showLoad() {
    this.showloader.showLoader('lodaerTab2');
    console.log('loader appellllllerrrrrrrrrrrrrr');
  }
}

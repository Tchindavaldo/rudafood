import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { CardService } from 'src/app//services/card.service';
import { requeToMenu } from 'src/app//services/requeToMenu';
import { DataService } from 'src/app//services/data.service';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { boisson, Commande, embalage, livraison } from 'src/app//data/commande';
import { Commande2 } from 'src/app//data/commande2';
import { Router } from '@angular/router';
import { Menu } from 'src/app/data/menu';
import { showPages } from 'src/app/services/showPages';
import { ToastButton, ToastController } from '@ionic/angular';
import { UserStorageService } from 'src/app/services/storgae/user-storage';
import { navigateWithState } from 'src/app/services/functions/routes/navigateWithState';
import { getOrdersService } from 'src/app/services/orders/get-orders.service';
import { OrderDataService } from 'src/app/services/orders/order-data.service';

@Component({
  selector: 'app-page-list-cmd-fast-food',
  templateUrl: './page-list-cmd-fast-food.page.html',
  styleUrls: ['./page-list-cmd-fast-food.page.scss'],
})
export class PageListCmdFastFoodPage implements OnInit, AfterContentChecked {
  show1 = true;
  show2 = false;
  managerFastFoodFound!: boolean;
  tempFatsFoodCmdTab: Commande[] = [];
  menuTab: Menu[] = [];
  menuTab2: Menu[] = [];
  pendingCmd: Commande[] = [];
  proccessCmd: Commande[] = [];
  finishCmd: Commande[] = [];
  tempPendingCmd: Commande[] = [];
  tempProccessCmd: Commande[] = [];
  tempFinishCmd: Commande[] = [];
  embalage = [new embalage('gamelle', 100), new embalage('sac platique', 100)];
  menu = new Menu('poulet DG', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo');
  quantiteCmd = 0;
  prixTotal = 0;
  livraison = new livraison(false, 0);
  boisson = new boisson('djino', 700);

  cmd2: Commande[] = [];
  cmdTab2: Commande[] = [];
  menuTabToPass: Menu[] = [new Menu('', 0, 0, 0, '', '', '', '', '')];
  focus = 'gestionCmd';
  focus3 = 'pendingCmd';
  focus2 = 'MM';
  idMenuClick: number = 0;
  cardIsShow!: boolean;
  marginGrid = '0 0 45px 0';
  userData: any;

  constructor(
    public showPages: showPages,
    private router: Router,
    public cardControle: CardService,
    private requeToMenu: requeToMenu,
    public dataGet: DataService,
    private toastController: ToastController,
    private userStorage: UserStorageService,
    private getOrdersService: getOrdersService,
    private orderData: OrderDataService
  ) {}

  ngOnInit() {
    const height = window.innerHeight;
    if (height < 650) {
      this.marginGrid = '0 0 25px 0';
    }
    // console.log('height', height);

    this.menuTab2 = [];
    // this.getData()

    this.dataGet.menuTab = [
      new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'),
      new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'),
      new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'),
      new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'),
      new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'),
      new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'),
      new Menu('menu1', 0, 0, 0, 'option1', 'option2', 'option3', 'photo', 'dispo'),
    ];
    this.menuTab = this.dataGet.menuTab;
    this.menuTab2 = this.dataGet.menuTab;
    this.idMenuClick = 0;

    this.fetchFastFoodDataFromAPI();
    // this.redirectStore();
  }

  ngAfterContentChecked(): void {
    //  if (!this.dataIspass) {
    // this.loadData()
    //  }
  }

  async setKey() {
    const userData = await this.userStorage.get('user');
    // const all = await this.userStorage.listAll()
    this.userData = userData;
    console.log('user get onInit  ', userData);
    // console.log('all lllllll ', all);
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
  async getData(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const app = initializeApp(environment.firebase);

      try {
        this.dataGet.menuTab = await this.requeToMenu.getMenuFromFirestore();
        this.menuTab = this.dataGet.menuTab;
        this.menuTab2 = this.dataGet.menuTab;

        console.log('menuTab getted successfully');

        console.log(this.dataGet.menuTab);

        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  public showBottomCard(actions: string, i: number) {
    if (actions == 'update') {
      this.cardControle.action = 'update';
      this.cardControle.idx = i;
      this.menuTabToPass = this.dataGet.menuTab;
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
    this.dataGet.menuTab.splice(idx, 1);
  }
  translate(name: string, id: string, id2: string) {
    const menuRow = document.getElementById(id);
    const menuCmd = document.getElementById(id2);
    if (name == 'menu') {
      menuRow!.style.transform = 'translateX(0%)';
      menuCmd!.style.transform = 'translateX(-110%)';
    } else {
      menuRow!.style.transform = 'translateX(110%)';
      menuCmd!.style.transform = 'translateX(0%)';
    }
  }

  loadData() {
    try {
      this.tempPendingCmd = []; // Réinitialiser le tableau temporaire ici
      this.tempProccessCmd = []; // Réinitialiser le tableau temporaire ici
      this.tempFinishCmd = []; // Réinitialiser le tableau temporaire ici
      // if (this.userData?) {
      // this.userData?.cmd.forEach(element => {
      this.tempFatsFoodCmdTab = this.dataGet.FastFood.commande;
      this.tempFatsFoodCmdTab.forEach(element => {
        if (element.staut === 'isPendingToFastFood') {
          this.tempPendingCmd.push(element);
        }
        if (element.staut === 'isProccess') {
          this.tempProccessCmd.push(element);
        }
        if (element.staut === 'isFinish') {
          this.tempFinishCmd.push(element);
        }
      });

      this.pendingCmd = this.tempPendingCmd; // Assigner le tableau temporaire au tableau final

      this.proccessCmd = this.tempProccessCmd; // Assigner le tableau temporaire au tableau final

      this.finishCmd = this.tempFinishCmd; // Assigner le tableau temporaire au tableau final
      console.log('finish', this.tempFinishCmd);
      console.log('proccess', this.tempProccessCmd);
      console.log('pending', this.tempPendingCmd);
      // }
    } catch (error) {
      this.tempFatsFoodCmdTab = [];
    }
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }
  navigate(route: any) {
    // console.log('etat', this.orderData.getOrderTabs());
    if (!this.orderData.getOrderTabs()) {
      this.fetchFastFoodDataFromAPI().then(() => {
        navigateWithState(this.router, route, this.orderData.getOrderTabs(), 'fastFoodOrder');
      });
    } else {
      navigateWithState(this.router, route, this.orderData.getOrderTabs(), 'fastFoodOrder');
    }
  }

  async fetchFastFoodDataFromAPI(): Promise<void> {
    try {
      await this.getOrdersService.getFastFoodOrders();
    } catch (error) {
      console.error('Erreur lors de la récupération des données FastFood:', error);
      this.presentToast('bottom', 'Erreur lors de la récupération des données. Veuillez réessayer.');
    }
  }

  changeMenu() {
    console.log(this.cmd2[1].menu.titre);
    console.log(this.cmd2[2].menu.titre);
  }

  getFastFoodCorespond() {
    try {
      this.dataGet.FastFoodTab.forEach(TempFastFood => {
        if (
          this.userData?.isMarchand &&
          TempFastFood.proprietaire.infos.email == this.userData?.infos.email &&
          TempFastFood.proprietaire.infos.uid == this.userData?.infos.uid
        ) {
          this.dataGet.FastFood = TempFastFood;
          console.log('gerant de daftfood trouver fast ajouterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
          console.log('fast trouverrrrrrrrrrrrrrrrrr', this.dataGet.FastFood);
        } else {
          console.log('gerant pas trouver');
          this.managerFastFoodFound = false;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async redirectStore() {
    try {
      await this.setKey();
      console.log(this.userData, 'pour redirect');

      this.getFastFoodCorespond();

      if (!this.userData?.isMarchand) {
        this.presentToast(
          'bottom',
          "vous n'estes pas un marchand veuiller creer un comptes pour un acces a votre boutique"
        );
      }

      if (this.userData?.isMarchand && !this.managerFastFoodFound) {
        this.presentToast(
          'bottom',
          'Probleme lors de la recuperation de votre compte marchand veuillez contacter RudaFood'
        );
      }

      if (this.userData?.isMarchand) {
        this.redirect('/tabs/tab3/commande');
      }

      if (!this.userData?.isMarchand) {
        this.redirect('/tabs/tab3/historique');
      }
    } catch (error) {
      this.redirect('/tabs/tab3/historique');
      console.log('errrrrrrrrrrrrrrrrrrr', error);
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
        message =
          "porbleme lié avec cette email et mot de passe essayer une authentification via google en clicquant sur l'icone google en haut.";
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
}

// requete vers la bd apres appel de la fonction de suppression
// requete vers la bd apres appel de la fonction d'ajout
// requete vers la bd apres appel de la fonction de modification update
// implementation de la logique de de mise a jour des disponiilite des menu
// IMPLEMENTER UN LOADER LORDS DE L'EXECUTION DES REAUTE D'AJOUT MODIF SUPPRESSION ET UN TOAST EN CAS DE RUSSITE OU D'ECHEC AVEC ERREUR CORRESPONDANT (PAS DE CONNEXION OU AUTRE ETC)

// les requetes vont de faire vers le fastfood correspondant

import { Menu } from 'src/app/data/menu';
import { Injectable } from '@angular/core';
import { Commande, boisson, embalage, livraison } from '../app/data/cmd';
// import { UserData } from '../data/user'; // Utilisez le chemin relatif correct

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor() {}
  dataList: any[] = [];
  action!: string;

  // declaration of fata from data
  embalage = [new embalage('gamelle', 100), new embalage('sac platique', 100)];
  menu = new Menu('', 0, 0, 0, '', '', '', '', '');
  quantiteCmd = 0;
  prixTotal = 0;
  livraison = new livraison(false, 0);
  boisson = new boisson('djino', 700);

  idx!: number;
  idxMenu!: number;
  idxFastFood!: number;
  idxCmdToModify!: number;
  cmd: Commande = new Commande('uid1', 0, 0, this.menu, this.quantiteCmd, this.embalage, this.boisson, this.livraison, this.prixTotal, '', true, false);

  // userTab: UserData[] = [];

  bottomCardIsShow = false;

  public showBottomCard(bottomCard: string) {
    const element = document.getElementById(bottomCard);
    if (!this.bottomCardIsShow) {
      console.log('addichier');
      if (element) {
        element.style.transform = 'translateY(0)';

        this.bottomCardIsShow = true;
      }
    }
  }
  public hideBottomCard1(bottomCard: string) {
    const element = document.getElementById(bottomCard);

    {
      if (element) {
        element.style.transform = 'translateY(105%)';

        this.bottomCardIsShow = false;
        // console.log(this.bottomCardIsShow);
      }
    }
  }
}

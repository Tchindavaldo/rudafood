import { Menu } from 'src/app/data/menu';
import { Injectable } from '@angular/core';
import { Commande, boisson, embalage, livraison } from '../app/data/cmd';
import { ToastButton, ToastController } from '@ionic/angular';
// import { UserData } from '../data/user'; // Utilisez le chemin relatif correct

@Injectable({
  providedIn: 'root',
})
export class showPages {
  constructor() {}
  show1 = true;
  show2 = false;

  public showBottomCard(bottomCard: string) {
    const element = document.getElementById(bottomCard);
  }
  public hideBottomCard1(bottomCard: string) {
    const element = document.getElementById(bottomCard);
  }
}

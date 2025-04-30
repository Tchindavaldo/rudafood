import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { Commande, boisson, embalage, livraison } from 'src/app/data/commande';
import { Menu } from 'src/app/data/menu';
import { CardService } from 'src/app/services/card.service';
import { DataService } from 'src/app/services/data.service';
import { PostOrdersService } from 'src/app/services/orders/get/post-orders.service';

@Component({
  selector: 'app-pannier-tobuy',
  templateUrl: './pannier-tobuy.page.html',
  styleUrls: ['./pannier-tobuy.page.scss'],
})
export class PannierTobuyPage implements OnInit {
  @Input() menu!: any;
  // @Input() cmd!:Commande;

  // declaration of fata from data
  embalage = [new embalage('gamelle', 100), new embalage('sac platique', 100)];
  // menu = new Menu('',0,0,0,'')
  quantiteCmd = 0;
  prixTotal = 0;
  livraison = new livraison(false, 0);
  boisson = new boisson('djino', 700);

  constructor(private postOrderSerice: PostOrdersService) {}

  ngOnInit() {
    // console.log('menu get', this.menu);
  }

  postOrder = (status: any) => {
    const data = {
      fastfoodId: this.menu.fastfoodId,
      clientName: 'front 6x  cmd',
      items: [{ name: 'Burger', quantity: 2 }],
      total: 20,
    };
    if (status !== 'pending') {
      this.postOrderSerice.postOrder(data);
      return;
    }
    this.postOrderSerice.postOrder({ ...data, status });
  };
}

import { Component, OnInit, Input } from '@angular/core';
import { Commande, boisson, embalage, livraison } from 'src/app/data/cmd';
import { Menu } from 'src/app/data/menu';
import { CardService } from 'src/services/card.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-cmd-bottom-card',
  templateUrl: './cmd-bottom-card.page.html',
  styleUrls: ['./cmd-bottom-card.page.scss'],
})
export class CmdBottomCardPage implements OnInit {
  @Input() menu = new Menu('menu1', 1500, 2000, 3000, 'option1', 'option2', 'option3', 'photo', 'dispo');
  @Input() idxMenuToModify = 2;

  dataIspass = false;
  quantiteCmd = 0;
  prixTotal = 0;
  livraison = new livraison(false, 0);
  boisson = new boisson('djino', 700);
  embalage = [new embalage('gamelle', 100), new embalage('sac platique', 100)];

  idx!: number;

  constructor(private data: DataService, public cardControl: CardService) {}

  ngOnInit() {}
}

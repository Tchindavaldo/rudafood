import { Users } from './Users';
import { Commande } from './cmd';
import { Menu } from './menu';

export class FastFood {
  id: number;
  nom: string;
  proprietaire: Users;
  menu: Menu[];
  commande: Commande[];
  statistique: number;

  constructor(id: number, nom: string, proprietaire: Users, menu: Menu[], commande: Commande[], statistique: number) {
    this.id = id;
    this.nom = nom;
    this.proprietaire = proprietaire;
    this.menu = menu;
    this.commande = commande;
    this.statistique = statistique;
  }
}

 import { Menu } from "./menu";

  export class Commande {
    uidUser = '';
  idCmd = 0;
  idFastFood = 0;
  menu = new Menu('',0,0,0,'','','','','');
  quantite = 0;
  embalage : embalage[] ;
  boisson :  boisson;
  livraison :  livraison;
  prixTotal = 0
  staut='ispending'; 
  isBuy=false;
  ispending=true;
  
  constructor(
    uidUser:string,
    idCmd:number,
    idFastFood:number,
    menu: Menu,
    quantite :number,
    embalage : embalage[],
    boisson : boisson,
    livraison : livraison,
    prixTotal = 0,
    staut='ispending',
  isBuy=false,
  ispending=true,
  
  ) {
    this.uidUser = uidUser
    this.idCmd = idCmd;
    this.idFastFood = idFastFood;
    this.menu = menu;
    this.quantite = quantite;
    this.embalage = embalage;
    this.boisson = boisson;
    this.livraison = livraison;
    this.prixTotal = prixTotal;
    this.staut=staut; 
    this.isBuy=isBuy;
    this.ispending=ispending;
  }
}
export class embalage {
 type = ''
 prix = 0 ;

 constructor(
  type : string,
 prix : number
 
 ) {
   this.type = type; 
   this.prix = prix;
 }
}
export class boisson {
  type = ''
  prix = 0 ;
 
  constructor(
   type : string,
  prix : number
  
  ) {
    this.type = type; 
    this.prix = prix;
  }
}
export class livraison {
  statut : boolean
  prix = 0 ;
 
  constructor(
    statut : boolean,
  prix : number
  
  ) {
    this.statut = statut; 
    this.prix = prix;
  }
}

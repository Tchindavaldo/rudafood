import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { showPages } from 'src/app/services/showPages';

import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { boisson, Commande, embalage, livraison } from 'src/app/data/commande';
import { Menu } from 'src/app/data/menu';
import { CardService } from 'src/app/services/card.service';
import { requeToMenu } from 'src/app/services/requeToMenu';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-page-dispo',
  templateUrl: './page-dispo.page.html',
  styleUrls: ['./page-dispo.page.scss'],
})
export class PageDispoPage implements OnInit  {
  menuTab:Menu[]=[]
  menuTab2:Menu[]=[]
  pendingCmd:Commande[] = []
  proccessCmd:Commande[] = []
  finishCmd:Commande[] = []
  tempPendingCmd:Commande[] = []
  tempProccessCmd:Commande[] = []
  tempFinishCmd:Commande[] = []
  embalage = [new embalage('gamelle',100),new embalage('sac platique',100)]
  menu = new Menu('poulet DG',0,0,0,'option1','option2','option3','photo','dispo')
  quantiteCmd = 0
  prixTotal = 0
  livraison = new livraison(false,0)
  boisson = new boisson('djino',700)
   
   
  cmd2:Commande[] = []
  cmdTab2:Commande[] = []
  menuTabToPass:Menu[]=[new Menu('',0,0,0,'','','','',''),]
  focus = "gestionCmd";
  focus3 = "pendingCmd";
  focus2 = "GM";
  idMenuClick:number=0;
   cardIsShow!:boolean
   marginGrid = "0 0 45px 0" 


  constructor(
    public showPages : showPages,
    public cardControle:CardService,
    private requeToMenu:requeToMenu,
    public dataGet:DataService,
    private router:Router
  ) { }

  ngOnInit() {
    const height = window.innerHeight
    if (height<650) {
      this.marginGrid = "0 0 25px 0" 

    }
    console.log('height', height);
    
    this.menuTab2=[]
    // this.getData()

    
   this.dataGet.menuTab = [new Menu('menu1',0,0,0,'option1','option2','option3','photo','dispo'),new Menu('menu1',0,0,0,'option1','option2','option3','photo','dispo'),new Menu('menu1',0,0,0,'option1','option2','option3','photo','dispo'),new Menu('menu1',0,0,0,'option1','option2','option3','photo','dispo'),new Menu('menu1',0,0,0,'option1','option2','option3','photo','dispo'),new Menu('menu1',0,0,0,'option1','option2','option3','photo','dispo'),new Menu('menu1',0,0,0,'option1','option2','option3','photo','dispo')]
   this.menuTab = this.dataGet.menuTab
   this.menuTab2 = this.dataGet.menuTab
    this.idMenuClick=0



    this.cmd2.push(new Commande('uid1',0,0,new Menu('menu1',0,0,0,'option1','option2','option3','photo','dispo'),this.quantiteCmd,this.embalage,this.boisson,this.livraison,this.prixTotal, 'isPendingToFastFood',false,true))
    this.cmd2.push(new Commande('uid8',1,0,new Menu('menu1',0,0,0,'option1','option2','option3','photo','dispo'),this.quantiteCmd,this.embalage,this.boisson,this.livraison,this.prixTotal,'isPendingToFastFood',false,true))
    this.cmd2.push(new Commande('uid1',2,0,new Menu('menu1',0,0,0,'option1','option2','option3','photo','dispo'),this.quantiteCmd,this.embalage,this.boisson,this.livraison,this.prixTotal,'isPendingToFastFood',false,true))
    this.cmd2.push(new Commande('uid5',3,0,new Menu('menu1',0,0,0,'option1','option2','option3','photo','dispo'),this.quantiteCmd,this.embalage,this.boisson,this.livraison,this.prixTotal,'isPendingToFastFood',false,true))

    

    this.cmd2[1].menu.titre = 'ndole revisiter'
    this.cmd2[2].menu.titre = 'cous cous'
    this.cmd2[3].menu.titre = 'pomme piler'
console.log('init tab',this.cmd2);

    this.dataGet.cmdTab = this.cmd2
    console.log('init tab services',this.dataGet.cmdTab);
  }

  // ngAfterContentChecked(): void {
  
  //   //  if (!this.dataIspass) {
  //   this.loadData() 
  //   //  }

  //   }
  

    value(val:string){
      
      this.focus=val
     }
     value3(val:string){
       
       this.focus3=val
      }
    value2(val2:string){
       this.focus2=val2
    }
  async getData(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
     
      const app = initializeApp(environment.firebase);

      try {
    

  
   this.dataGet.menuTab = await this.requeToMenu.getMenuFromFirestore()
   this.menuTab = this.dataGet.menuTab
   this.menuTab2 = this.dataGet.menuTab

  console.log('menuTab getted successfully');

  console.log(this.dataGet.menuTab);

        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
  
  public showBottomCard(actions:string,i:number) {
    
 if (actions=='update') {
  this.cardControle.action= 'update'
  this.cardControle.idx=i
  this.menuTabToPass = this.dataGet.menuTab
  this.idMenuClick=i
  this.cardControle.idx=i
  this.cardControle.showBottomCard('bottom-card')
  console.log(this.cardIsShow);
  
  }
 if(actions=='add'){
  
  this.cardControle.action= 'add'
  this.menuTabToPass=[new Menu('',0,0,0,'','','','','')]
  this.idMenuClick=0
  this.cardControle.showBottomCard('bottom-card')
 }
  }
  public hideBottomCard1() {
    this.cardControle.hideBottomCard1('bottom-card')
    
    this.cardIsShow=this.cardControle.bottomCardIsShow
    console.log(this.cardIsShow);
  }
  deleteMenu(idx:number){

    this.dataGet.menuTab.splice(idx,1)
  }
  translate(name:string,id:string,id2:string){
    
    const menuRow = document.getElementById(id)
    const menuCmd = document.getElementById(id2)
    if (name == 'menu' ) {
      menuRow!.style.transform = 'translateX(0%)'
      menuCmd!.style.transform = 'translateX(-110%)'
    } else {
      menuRow!.style.transform = 'translateX(110%)'
      menuCmd!.style.transform = 'translateX(0%)'
    }
  }

  


loadData() {
  this.tempPendingCmd = []; // Réinitialiser le tableau temporaire ici
  this.tempProccessCmd = []; // Réinitialiser le tableau temporaire ici
  this.tempFinishCmd = []; // Réinitialiser le tableau temporaire ici
  // if (this.dataGet.user) {
    // this.dataGet.user.cmd.forEach(element => {
      this.dataGet.cmdTab.forEach(element => {
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
  
}


redirect(path:string){
  this.router.navigate([path])

}
}

import { Component, OnInit,Input, AfterViewChecked } from '@angular/core';
import { Commande } from 'src/app/data/commande';
import { Users } from 'src/app/data/Users';
import { CardService } from 'src/app/services/card.service';
import { DataService } from 'src/app/services/data.service';
import { requeToUser } from 'src/app/services/requeToUser';
import { showLoaderToast } from 'src/app/services/showLoaderToast';

@Component({
  selector: 'app-pannier-achat-or',
  templateUrl: './pannier-achat-or.page.html',
  styleUrls: ['./pannier-achat-or.page.scss'],
})
export class PannierAchatOrPage implements OnInit, AfterViewChecked {
  constructor(
    public dataService : DataService,
    private cardControl:CardService,
    private requeteToUser:requeToUser,
    private showloader:showLoaderToast
  ) {}
  @Input() widthCard = '';
  @Input() heightCard = '';
  @Input() marginLeftCard = '';

  @Input() backgroundItem = '';
  @Input() paddingTopItem = '';

  @Input() text1Ligne1? = 'Pain amelettes';
  @Input() colorText1Ligne1? = '';

  @Input() text1Ligne2? = 'Modifier';
  @Input() showText1Ligne2? = true;

  @Input() text2Ligne2?: String;
  @Input() showText2Ligne2? = true;

  @Input() text1Ligne3? = '500f';
  @Input() colorText1Ligne3? = '';

  @Input() textIonChip? = '1';
  @Input() colorIonChip? = 'danger';
  @Input() colorIonChip2? = '';
  @Input() backgoundColorIonChip2? = '';
  @Input() showIcon? = true;
  @Input() idxCmd! :number;
  @Input()cmdGet!:Commande

  // @Input()userCmd2! : Commande 
 userCmd! : Commande 
  ngOnInit() {
  

    // console.log(this.dataService.user.cmd[this.idxCmd])
  }
async deleteCmd()
  {
    let tempUser:Users
    let userUpdate:Users|null =null
    let tempScmd :Commande[] =[]
    this.showloader.showLoader('lodaerTab2')
    tempUser = JSON.parse(JSON.stringify(  this.dataService.user ))
    // tempUser =  this.dataService.user 
    for (let index = 0; index < tempUser.cmd.length; index++) {

      if (tempUser.cmd[index].idCmd==this.idxCmd) {
        tempUser.cmd.splice(index,1)

      }
    }
    for (let index = 0; index < tempUser.cmd.length; index++) {
      tempUser.cmd[index].idCmd = index
    }
  

    try {
      if (this.dataService.generalDataUser!=null) {
         userUpdate = await  this.requeteToUser.updateUser(tempUser,this.dataService.generalDataUser.nbrTotalUser)
        if (userUpdate != null) {
          this.dataService.user = userUpdate
          
      this.showloader.hideLoader('lodaerTab2')
      
      this.showloader.presentToast('bottom','suppression reussie')
        }
      }
      
    } catch (error) {
     console.log('erreur lors de la suppression');
     this.showloader.hideLoader('lodaerTab2')
     this.showloader.showErrorToast(error)
    } 
  }
  ngAfterViewChecked(): void {
    // console.log('cmd',this.dataService.user.cmd[this.idxCmd])
  }

  public showBottomCard() {


    this.cardControl.bottomCardIsShow=false
    this.cardControl.idxCmdToModify=this.idxCmd
    this.cardControl.cmd= this.dataService.user.cmd[this.idxCmd]
    this.cardControl.showBottomCard('bottom-card-cmd')
   console.log('cmd a modifier ',this.idxCmd);
   
 
    }
 
 
}

import { Component, OnInit, Input } from '@angular/core';
import { boisson, Commande, embalage, livraison } from 'src/app/data/cmd';
import { Menu } from 'src/app/data/menu';
import { Users } from 'src/app/data/Users';
import { CardService } from 'src/services/card.service';
import { DataService } from 'src/services/data.service';
import { requeToFastFood } from 'src/services/requeToFastFood';
import { requeToUser } from 'src/services/requeToUser';
import { showLoaderToast } from 'src/services/showLoaderToast';

@Component({
  selector: 'app-pannier-achat',
  templateUrl: './pannier-achat.page.html',
  styleUrls: ['./pannier-achat.page.scss'],
})
export class PannierAchatPage implements OnInit {
  @Input() widthCard = '';
  @Input() heightCard = '';
  @Input() marginLeftCard = '';

  @Input() backgroundItem = '';
  @Input() paddingTopItem = '';

  @Input() text1Ligne1 = 'Pain amelettes';
  @Input() colorText1Ligne1? = '';

  @Input() text1Ligne2? = 'Modifier';
  @Input() showText1Ligne2? = true;

  @Input() text2Ligne2?: String;
  @Input() showText2Ligne2? = true;

  @Input() text1Ligne3: number | string = 500;
  @Input() colorText1Ligne3? = '';

  @Input() textIonChip? = '1';
  @Input() colorIonChip? = 'danger';
  @Input() colorIonChip2? = '';
  @Input() backgoundColorIonChip2? = '';
  @Input() boxShadow? = '';
  @Input() leftChip? = '';
  @Input() righttChip2? = '';
  @Input() showIcon? = true;
  @Input() showIconCart? = false;
  @Input() showIBtnBuy? = false;
  @Input() showIconCancel? = false;
  @Input() menuu!: Menu;
  @Input() idxFastFood = 0;
  @Input() idxUSer = 0;

  constructor(
    private cardControle: CardService,
    private dataService: DataService,
    private requeteToFasFood: requeToFastFood,
    private requeteToUsers: requeToUser,
    private show: showLoaderToast
  ) {}
  ngOnInit() {}

  public hideBottomCard() {
    this.cardControle.hideBottomCard1('bottom-card-home');

    // this.cardIsShow=this.cardControle.bottomCardIsShow
    console.log('click to hode');
  }

  async actionToCmd(action: string) {
    let userUpdate: Users | null = null;
    const embalagee = [new embalage('gamelle', 100), new embalage('sac platique', 100)];
    const menu = this.menuu;
    const quantiteCmd = 0;
    let prixTotal = 0;
    const livraisonn = new livraison(false, 0);
    const boissonn = new boisson('djino', 700);

    if (action == 'buy') {
      try {
        this.show.showLoader('ctnLoaderBottomCard');

        prixTotal = menu.prix1 + 150;
        const cmd = new Commande(
          this.dataService.user.infos.uid,
          this.dataService.user.cmd.length,
          this.dataService.idxFastFood,
          menu,
          quantiteCmd,
          embalagee,
          boissonn,
          livraisonn,
          prixTotal,
          'isPendingToFastFood',
          true,
          false
        );
        const tempUser: Users = JSON.parse(JSON.stringify(this.dataService.user));
        tempUser.cmd.push(cmd);

        if (this.dataService.generalDataUser != null) {
          userUpdate = await this.requeteToUsers.updateUser(tempUser, this.dataService.generalDataUser.nbrTotalUser);
        }

        if (userUpdate != null) {
          this.dataService.user = userUpdate;
          this.show.hideLoader('ctnLoaderBottomCard');
          this.show.presentToast('bottom', 'commande enregistrer');
          this.hideBottomCard();
        }
      } catch (error) {
        this.show.hideLoader('ctnLoaderBottomCard');

        this.show.showErrorToast(error);
      }
    }
    if (action == 'pannier') {
      try {
        this.show.showLoader('ctnLoaderBottomCard');

        prixTotal = menu.prix1 + 150;
        const cmd = new Commande(
          this.dataService.user.infos.uid,
          this.dataService.user.cmd.length,
          this.dataService.idxFastFood,
          menu,
          quantiteCmd,
          embalagee,
          boissonn,
          livraisonn,
          prixTotal,
          'isPendingToFastFood',
          false,
          true
        );
        const tempUser = JSON.parse(JSON.stringify(this.dataService.user));
        tempUser.cmd.push(cmd);

        if (this.dataService.generalDataUser != null) {
          userUpdate = await this.requeteToUsers.updateUser(tempUser, this.dataService.generalDataUser.nbrTotalUser);
        }

        if (userUpdate != null) {
          this.dataService.user = userUpdate;
          this.show.hideLoader('ctnLoaderBottomCard');
          this.show.presentToast('bottom', 'commande enregistrer');
          this.hideBottomCard();
        }
      } catch (error) {
        this.show.hideLoader('ctnLoaderBottomCard');

        this.show.showErrorToast(error);
      }
    }

    if (action == '') {
      this.hideBottomCard();
    }
  }
}

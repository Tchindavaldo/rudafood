import { Component, Input, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Menu } from 'src/app/data/menu';
import { CardService } from 'src/services/card.service';
import { DataService } from 'src/services/data.service';
import { requeToMenu } from 'src/services/requeToMenu';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.scss'],
})
export class Component3Component implements OnInit {
  menuTab: Menu[] = [];
  email: string = '';
  password: string = '';

  @Input() nbr = '1';
  @Input() colSize = '12';
  @Input() bottom = '20px';
  @Input() marginGrid = '';
  @Input() paddingText4 = '0 0 20px 0';
  @Input() paddingText8 = '0 0 0px 0';
  @Input() hide = '';
  @Input() showColNbr = false;
  @Input() showAvatar = false;
  @Input() showIcon = true;
  @Input() shadowText2 = false;
  @Input() shadowText3 = false;
  @Input() shadowText4 = true;
  @Input() shadowText5 = true;
  @Input() shadowText6 = true;
  @Input() shadowText7 = false;
  @Input() shadowText8 = true;
  @Input() text1 = 'Welecome Fernand';
  @Input() text4: number = 1500;
  @Input() text5: number = 2000;
  @Input() text6: number = 2500;
  @Input() text8 = 'Disponible';
  @Input() idx!: number;

  @Input() optionPrix1 = 'optionPrix1';
  @Input() optionPrix2 = 'optionPrix2';
  @Input() optionPrix3 = 'optionPrix3';

  @Input() labeLext1 = 'Disponible';
  @Input() labeLext2 = 'Disponible';
  @Input() labeLext3 = 'Disponible';
  @Input() labeLext4 = 'prix1';
  @Input() labeLext5 = 'prix2';
  @Input() labeLext6 = 'prix3';
  @Input() labeLext7 = 'prix3';
  @Input() labeLext8 = 'statut';

  constructor(private cardControle: CardService, private requeToMenu: requeToMenu, private service: DataService) {}

  ngOnInit() {}

  public hideBottomCard0() {
    this.cardControle.hideBottomCard1('bottom-card');

    console.log(this.text1);

    this.cardControle.action = '';
  }

  public hideBottomCard1() {
    // this.cardControle.hideBottomCard1('bottom-card')
    if (this.cardControle.action == 'add') {
      // const newmenu = new Menu(this.text1, this.text4, this.text5,this.text6,this.text8);

      // this.service.menuTab.push(newmenu);

      this.cardControle.action = '';
      // this.addData(newmenu)

      this.cardControle.hideBottomCard1('bottom-card');
    }

    if (this.cardControle.action == 'update') {
      this.service.menuTab[this.cardControle.idx].titre = this.text1;
      this.service.menuTab[this.cardControle.idx].prix1 = this.text4;
      this.service.menuTab[this.cardControle.idx].prix2 = this.text5;
      this.service.menuTab[this.cardControle.idx].prix3 = this.text6;
      this.service.menuTab[this.cardControle.idx].disponibilite = this.text8;

      // this.updateData(this.service.menuTab)

      this.cardControle.action = '';

      this.cardControle.hideBottomCard1('bottom-card');
    }
  }

  async updateData(dataToUpdate: Menu[]): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const app = initializeApp(environment.firebase);

      try {
        await this.requeToMenu.addMenuToFirestore(dataToUpdate);

        console.log('menuTab update successfully');

        console.log(this.service.menuTab);

        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  async addData(dataToAdd: Menu): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const app = initializeApp(environment.firebase);

      try {
        const menuGet: Menu[] = await this.requeToMenu.getMenuFromFirestore();
        this.service.menuTab.splice(0, this.service.menuTab.length, ...menuGet);

        this.service.menuTab.push(dataToAdd);

        await this.requeToMenu.addMenuToFirestore2(this.service.menuTab);

        console.log('menuTab created successfully');

        console.log(this.service.menuTab);

        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

import { AfterViewChecked, Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { UserStorageService } from '../../services/storgae/user-storage';
import { getFastFoodsService } from '../../services/FastFood/requet/get-fastFoods.service';
import { fastFoodsDataService } from '../../services/FastFood/data/fastFood-data.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  userData: any;
  photo!: any | null;
  menuTabToPass!: any;

  isloading = false;
  erroDataGeting = false;
  searchIconIsClicked = false;

  fastfoods = this.fastFoodData.getFastfoods();
  constructor(private fastFoodService: getFastFoodsService, public fastFoodData: fastFoodsDataService, private userStorage: UserStorageService) {}

  setClickedMenu = (menu: any) => (this.menuTabToPass = menu);

  ngOnInit(): void {
    // this.setKey();
    this.fetchFastFood();
    // this.photo = this.userStorage.get('photoUrl');
  }

  async fetchFastFood() {
    try {
      this.isloading = true;
      await this.fastFoodService.getFastFoods();
      console.log('fastfood on tab 1', this.fastFoodData.getFastfoods());
      const userData = await this.userStorage.get('user');
      console.log('user get a la tab1 ', userData);

      this.isloading = false;
    } catch (error) {
      console.log(error);
      this.isloading = false;
      this.erroDataGeting = true;
    }
  }

  async setKey() {
    const userData = await this.userStorage.get('user');
    this.userData = userData;
  }
}

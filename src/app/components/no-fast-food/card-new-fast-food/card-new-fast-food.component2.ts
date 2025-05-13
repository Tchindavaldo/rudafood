import { Component, OnInit } from '@angular/core';
import { postFastFoodService } from 'src/services/FastFood/requet/post-fastFood.service';
import { showCard, showCardTranslateY, toggleElementVisibility } from 'src/app/utils/showCard';

@Component({
  selector: 'app-card-new-fast-food',
  templateUrl: './card-new-fast-food.component.html',
  styleUrls: ['./card-new-fast-food.component.scss', 'card-new-fast-food.component2.scss'],
})
export class CardNewFastFoodComponent implements OnInit {
  name = '';
  img = '';
  number = null;
  openTime = null;
  closeTime = null;

  isPosting = false;
  isError = false;

  constructor(private postFastFood: postFastFoodService) {}

  ngOnInit() {}

  hideCard() {
    showCard('newFastFood', 'x', '100%');
    setTimeout(() => {
      toggleElementVisibility('manage', true);
    }, 1500);
  }

  async postfastFood() {
    this.isPosting = true;
    const dataToPost = { name: this.name, openTime: this.openTime, closeTime: this.closeTime, img: this.img };
    const { data, isPosting, isError } = await this.postFastFood.postFastFood(dataToPost);
    this.isPosting = isPosting;
    this.isError = isError;
    this.hideCard();
  }
}

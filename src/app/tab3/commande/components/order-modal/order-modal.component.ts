import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit, OnChanges {
  @Input() modalId!: string;
  @Input() data?: any;
  @Input() showLoader = false;
  @Output() closeModal = new EventEmitter<any>();
  @Output() confirmBtnClick = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    // console.log('data de puis le modal ctn', this.data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      // console.log('data changed to:', this.data);
    }
    if (changes['showLoader']) {
      // console.log('showLoader changed to:', this.showLoader);
    }
  }

  emitCloseModl() {
    this.closeModal.emit();
  }

  emitConfirmBtnClick() {
    this.confirmBtnClick.emit();
  }

  postOrder = async (status: any) => {
    // const data = {
    //   fastFoodId: this.menu.fastFoodId,
    //   menu: this.menu,
    //   items: [{ name: 'Burger', quantity: 2, Pu: 2000 }],
    //   total: 20,
    // };
    // if (status !== 'pending') {
    //   const { isPosting, isError } = await this.postOrderSerice.postOrder(data);
    //   if (!isError) showCard('bottom-card-home', 'y', '230px');
    //   return;
    // }
    // const { isPosting, isError } = await this.postOrderSerice.postOrder({ ...data, status });
    // if (!isError) showCard('bottom-card-home', 'y', '230px');
  };
}

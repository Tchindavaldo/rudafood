import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { updateOrdersRequetService } from 'src/services/FastFood/requet/update-orders-requet.service';
import { showCard } from 'src/utils/showCard';

@Component({
  selector: 'app-confirm-procesing-order-item1',
  templateUrl: './confirm-procesing-order-item1.component.html',
  styleUrls: ['./confirm-procesing-order-item1.component.scss'],
})
export class ConfirmProcesingOrderItem1Component {
  iconBtn1 = 'checkmark-outline';
  titleColor = 'danger';
  confirmationColor = 'darkRed';
  titleAction = 'Voulez vous vraiment Annuler ?';
  textConfirmation = '  OUI  ';

  @Input() id!: string;
  @Input() data?: any;
  @Output() outputConfirmBtnClick = new EventEmitter<any>();
  @Output() outputBtn2Click = new EventEmitter<any>();

  isUpdating = false;

  constructor(private updateOrdersRequet: updateOrdersRequetService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      // console.log('data recu ', this.data);
    }
  }

  async emitConfirmBtnClick() {
    await this.statutChange(this.data);
    this.outputConfirmBtnClick.emit();
  }
  async statutChange(order: any) {
    try {
      if (order.status !== 'finished') {
        this.isUpdating = true;

        await this.updateOrdersRequet.updateOrders({ status: order.status, id: order.id, fastFoodId: order.fastFoodId });
        this.isUpdating = false;
      }

      if (order.status === 'finished') {
        console.log('fini');
      }

      // await this.updateOrdersRequet.updateFastFood({ status: 'pending', id: this.order.id });
    } catch (error) {
      console.log('error', error);

      this.isUpdating = false;
    }
  }
  emitBtn2Click() {
    this.outputBtn2Click.emit();
  }
}

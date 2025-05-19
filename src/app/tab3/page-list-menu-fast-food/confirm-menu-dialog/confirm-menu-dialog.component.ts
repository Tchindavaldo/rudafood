import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-confirm-menu-dialog',
  templateUrl: './confirm-menu-dialog.component.html',
  styleUrls: ['./confirm-menu-dialog.component.scss'],
})
export class ConfirmMenuDialogComponent implements OnInit, OnChanges {
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
}

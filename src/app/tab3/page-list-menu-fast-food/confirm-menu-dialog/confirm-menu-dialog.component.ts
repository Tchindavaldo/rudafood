import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-confirm-menu-dialog',
  templateUrl: './confirm-menu-dialog.component.html',
  styleUrls: ['./confirm-menu-dialog.component.scss'],
})
export class ConfirmMenuDialogComponent implements OnInit {
  @Input() idConfirmModal!: string;
  @Output() closeModal = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  emitCloseModl() {
    this.closeModal.emit();
  }
}

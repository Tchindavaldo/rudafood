import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { markNotificationAsReadService } from 'src/services/notifications/request/updater-notification-readStatus.service';
import { UserStorageService } from 'src/services/storgae/user-storage';
import { markNotifcationAsRead } from 'src/utils/markNotifcationAsRead';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.page.html',
  styleUrls: ['./notif.page.scss'],
})
export class NotifPage implements OnInit {
  @Input() userId!: any;
  @Input() notif: any;
  @Input() notifId: any;
  @Input() selectedId: any;
  @Input() isRead: any;
  @Output() handleNotifyClick = new EventEmitter<void>();
  @Input() showLabel!: (idxtoget: any) => void;

  @Input() idxToGet2: undefined | string = '';
  @Input() iconn = 'pizza';
  @Input() titre = 'Commande enregistrer';
  @Input() valeuNotif =
    'la commande que vous venew de passer a ete enregistrer avec success gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg';
  @Input() nbrNotif = 2;
  @Input() date = '16h';

  dynamicStyles: { [key: string]: string } = {};

  grid!: HTMLCollectionOf<HTMLElement>;
  label!: HTMLCollectionOf<HTMLElement>;
  icon!: HTMLCollectionOf<HTMLElement>;
  gridElement!: HTMLElement;

  // @ViewChild(this.idxToGet2, { static: false }) notifLabel!: ElementRef;
  constructor() {}

  async ngOnInit() {
    console.log('isread', this.isRead, this.userId, 'idxToGet2', this.idxToGet2);
  }
  // onClick(labelEl: ElementRef) {
  //   this.handleNotifyClick.emit();
  //   this.showLabel(this.idxToGet2);
  //   const fakeElementRef = { nativeElement: labelEl };
  //   this.dynamicStyles = this.getDynamicHeight(true, fakeElementRef);
  // }

  onClick() {
    if (!this.isRead.includes(this.userId)) {
      this.handleNotifyClick.emit();
      console.log('servie de mise a jour du statuts appler');
    }
    this.showLabel(this.idxToGet2);

    setTimeout(() => {
      const el = document.getElementById('label' + this.idxToGet2 || '');
      if (el) {
        this.dynamicStyles = this.getDynamicHeight(true, { nativeElement: el } as ElementRef);
      } else {
        console.warn('Element avec id non trouvé');
      }
    });
  }

  async markRead() {
    // await this.handleNotifyClick();
    this.showLabel(this.idxToGet2);
  }

  getDynamicHeight(isSelected: boolean, elRef: ElementRef): { [key: string]: string } {
    this.setDynamicHeightOnClass('15px');
    if (!isSelected || !elRef?.nativeElement) return {};

    const el: HTMLElement = elRef.nativeElement;

    let lineHeightStr = getComputedStyle(el).lineHeight;
    let lineHeight = parseFloat(lineHeightStr);

    if (isNaN(lineHeight)) {
      const fontSizeStr = getComputedStyle(el).fontSize;
      lineHeight = parseFloat(fontSizeStr) * 1.2;
    }

    const totalHeight = el.scrollHeight;
    const lineCount = Math.round(totalHeight / lineHeight);

    console.log('lineHeight:', lineHeight);
    console.log('totalHeight:', totalHeight);
    console.log('Nombre de lignes:', lineCount);

    const calculatedHeight = lineCount * lineHeight + 'px'; // On peut multiplier par lineHeight directement

    this.setDynamicHeightOnId(calculatedHeight);
    return {
      height: calculatedHeight,
      overflow: 'visible',
      transition: 'height 0.3s ease',
    };
  }

  setDynamicHeightOnClass(height: string) {
    const elements = document.getElementsByClassName('valNotif');
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLElement;
      el.style.height = height;
      el.style.overflow = 'hidden';
    }
  }
  setDynamicHeightOnId(height: string) {
    const el = document.getElementById('label' + this.idxToGet2);
    if (el) {
      el.style.height = height;
      el.style.overflow = 'visible';
      el.style.transition = 'height 0.4s ease';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { IonLabel, NavController, ToastButton, ToastController } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket/socket.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  allLabel!: HTMLCollectionOf<HTMLIonLabelElement>;
  constructor(private socketService: SocketService) {
    socketService.initializeAllSockets();
  }
  ngOnInit(): void {
    this.allLabel = document.getElementsByClassName('label') as HTMLCollectionOf<HTMLIonLabelElement>;
    this.allLabel[0].style.display = 'flex';
  }

  // showLabel(idx: number) {
  //   console.log('fonction appeler');

  //   for (let index = 0; index < this.allLabel.length; index++) {
  //     this.allLabel[index].style.display = 'none';
  //     console.log('boucle appeler');
  //   }

  //   this.allLabel[idx].style.display = 'flex';
  // }
}

import { Component, OnInit } from '@angular/core';
import { IonLabel, NavController, ToastButton, ToastController } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  allLabel!: HTMLCollectionOf<HTMLIonLabelElement>
  constructor(
    private data: DataService,
    private router: Router,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }
  managerFastFoodFound!: boolean
  path: string = 'tabs/tab3/manage/menu'
  ngOnInit(): void {
    this.allLabel = document.getElementsByClassName("label") as HTMLCollectionOf<HTMLIonLabelElement>
    this.allLabel[0].style.display = 'flex'

  }

  showLabel(idx: number) {
    console.log("fonction appeler");

    for (let index = 0; index < this.allLabel.length; index++) {

      this.allLabel[index].style.display = 'none'
      console.log("boucle appeler");

    }

    this.allLabel[idx].style.display = 'flex'
  }

  redirectStore() {
    try {
 
      if (this.data.user.isMarchand) {
        this.redirect('/tabs/tab3/manage/commande')

      }


      if (!this.data.user.isMarchand) {
        this.redirect('/tabs/tab3/manage/historique')

      }




    } catch (error) {
      this.redirect('/tabs/tab3/manage/historique')
      console.error('Error in redirectStore:', error);
    }

  }


  redirect(path: string) {
    this.router.navigate([path])

  }
}

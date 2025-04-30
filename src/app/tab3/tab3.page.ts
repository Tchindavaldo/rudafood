import { User } from 'firebase/auth';
import { Component, OnInit } from '@angular/core';
import { Users } from '../data/Users';
import { dataMerchend } from '../data/dataMerchend';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { ToastButton, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user!: Users;

  focus2 = 'FastFood';
  showFatsFood = true;
  constructor(private data: DataService, private toastController: ToastController, private router: Router) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    console.log('tab3 appeler');
  }
}

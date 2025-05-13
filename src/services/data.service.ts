import { dataMerchend } from '../app/data/dataMerchend';
import { Injectable } from '@angular/core';
import { Menu } from '../app/data/menu';
import { generalDataFastFood } from '../app/data/generalDataFastFood';
import { FastFood } from '../app/data/fastFood';
import { User } from 'firebase/auth';
import { Users } from '../app/data/Users';
import { generalDataUser } from '../app/data/generalDataUser';
import { Commande } from '../app/data/cmd';
import { Commande2 } from '../app/data/commande2';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  photoProfil!: string | null;
  idxFastFood!: number;
  idxUser!: number;
  menu!: Menu;
  cmdTab!: Commande[];
  // menuTab:Menu[]=[new Menu('',0,0,0,'','','','','')]
  menuTab: Menu[] = [];
  dataList: any[] = [];
  userTab: Users[] = [];
  generalDataFastFood!: generalDataFastFood;
  generalDataUser!: generalDataUser | null;
  FastFoodTab: FastFood[] = [];
  FastFood!: FastFood;
  user!: Users;
  userN: Users | null = null;
}

import { UsersInfos } from './UsersInfos';
import { Commande } from './cmd';
import { Menu } from './menu';

export class Users {
  infos!: UsersInfos;
  isMarchand!: boolean;
  statistique!: number;
  cmd!: Commande[];

  constructor(infos: UsersInfos, isMarchand: boolean, stat: number, cmd: Commande[]) {
    this.infos = infos;
    this.isMarchand = isMarchand;
    this.statistique = stat;
    this.cmd = cmd;
  }
}

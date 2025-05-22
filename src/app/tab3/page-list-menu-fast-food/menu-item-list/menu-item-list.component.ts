import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.scss'],
})
export class MenuItemListComponent implements OnInit {
  @Output() openModal = new EventEmitter<{ menu: any }>();
  @Input() idDialog!: string;
  @Input() menu!: any;
  @Input() nbr = 0;
  @Input() paddingText7 = '';
  @Input() text8 = 'Disponible';
  @Input() text9 = 'Indisponible';
  @Input() iconName = '';
  @Input() showCheck = false;
  @Input() showOrderNbr = false;
  @Input() orderNbr = '50';
  @Input() totalOrder = '50';
  constructor(private router: Router) {}

  ngOnInit() {}

  triggerModal(menu = this.menu) {
    // Si l'icône est 'options', rediriger vers la page de modification de menu
    if (this.iconName === 'options') {
      // Stocker le menu dans le state (à implémenter si nécessaire)
      // Rediriger vers la page de modification
      this.router.navigate(['tabs/tab3/menu/new-menu'], { state: { data: menu } });
    } else {
      // Comportement par défaut - émettre l'événement pour ouvrir le modal
      this.openModal.emit({ menu });
    }
  }

  triggerModalWithStatus(status: string) {
    // Ne rien faire si le statut actuel est déjà celui demandé
    if (this.menu.status === status) {
      console.log('Le menu a déjà ce statut:', status);
      return;
    }

    // Create a new menu object with the updated status
    const updatedMenu = { ...this.menu, status: status };
    this.openModal.emit({ menu: updatedMenu });
  }
}

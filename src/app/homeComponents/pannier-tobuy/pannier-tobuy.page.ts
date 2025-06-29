import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { Commande, boisson, embalage, livraison } from 'src/app/data/cmd';
import { Menu } from 'src/app/data/menu';
import { CardService } from 'src/services/card.service';
import { DataService } from 'src/services/data.service';
import { PostOrdersService } from 'src/services/orders/get/post-orders.service';
import { showCard } from 'src/utils/showCard';

@Component({
  selector: 'app-pannier-tobuy',
  templateUrl: './pannier-tobuy.page.html',
  styleUrls: ['./pannier-tobuy.page.scss'],
})
export class PannierTobuyPage implements OnInit {
  // Index signature to allow dynamic property access
  [key: string]: any;
  @Input() menu!: any;
  // @Input() cmd!:Commande;

  // declaration of fata from data
  embalage = [new embalage('gamelle', 100), new embalage('sac platique', 100)];
  // menu = new Menu('',0,0,0,'')
  quantiteCmd = 0;
  prixTotal = 0;
  livraison = new livraison(false, 0);
  boisson = new boisson('djino', 700);

  // Panel state variables
  isDetailPanelAnimating = false;
  isExtrasPanelAnimating = false;
  isDrinkPanelAnimating = false;
  isDeliveryPanelAnimating = false;

  isDetailPanelVisible = false;
  isExtrasPanelVisible = false;
  isDrinkPanelVisible = false;
  isDeliveryPanelVisible = false;

  // Tableau de données pour les détails de la commande
  commandDetails = [
    { textLigne1: 'Planete cocktail', textLigne2: '44f' },
    { textLigne1: 'top grenaldine', textLigne2: '2' },
    { textLigne1: 'vinto', textLigne2: '1000f' },
    { textLigne1: 'top pamplemousse', textLigne2: '222f' },
    { textLigne1: 'coca cola', textLigne2: '333f' },
    { textLigne1: 'top grenaldine', textLigne2: '2' },
    { textLigne1: 'vinto', textLigne2: '1000f' },
  ];

  // Fonction pour diviser le tableau en deux parties pour l'affichage sur deux lignes
  get firstRowItems() {
    return this.commandDetails.slice(0, Math.ceil(this.commandDetails.length / 2));
  }

  get secondRowItems() {
    return this.commandDetails.slice(Math.ceil(this.commandDetails.length / 2));
  }

  constructor(private postOrderSerice: PostOrdersService) {}

  ngOnInit() {
    console.log('menu getddddddddddddddddddddddddddd', this.menu);
  }

  postOrder = async (status: any) => {
    const data = {
      fastFoodId: this.menu.fastFoodId,
      menu: this.menu,
      items: [{ name: 'Burger', quantity: 2, Pu: 2000 }],
      total: 20,
    };
    if (status !== 'pending') {
      const { isPosting, isError } = await this.postOrderSerice.postOrder(data);
      if (!isError) showCard('bottom-card-home', 'y', '230px');
      return;
    }

    const { isPosting, isError } = await this.postOrderSerice.postOrder({ ...data, status });
    if (!isError) showCard('bottom-card-home', 'y', '230px');
  };
  closeBottomCard() {
    showCard('bottom-card-home', 'y', '230px');
  }
  resetPanels() {
    // If any animation is in progress, do nothing
    if (this.isDetailPanelAnimating || this.isExtrasPanelAnimating || this.isDrinkPanelAnimating || this.isDeliveryPanelAnimating) return;

    // Update states - show detail panel by default, hide others
    this.isDetailPanelVisible = true;
    this.isExtrasPanelVisible = false;
    this.isDrinkPanelVisible = false;
    this.isDeliveryPanelVisible = false;

    // Hide all panels with translation animation
    const panelIds = [this.menu?.id + '-extra', this.menu?.id + '-drink', this.menu?.id + '-delivery'];

    // Show the detail panel
    const detailPanelId = this.menu?.id + '-detail';
    showCard(detailPanelId, 'y', '0px');

    // Hide other panels
    panelIds.forEach(id => showCard(id, 'y', '200%'));

    // Mark animations as in progress
    this.isDetailPanelAnimating = true;
    this.isExtrasPanelAnimating = true;
    this.isDrinkPanelAnimating = true;
    this.isDeliveryPanelAnimating = true;

    // Reset animation states after animations complete
    setTimeout(() => {
      this.isDetailPanelAnimating = false;
      this.isExtrasPanelAnimating = false;
      this.isDrinkPanelAnimating = false;
      this.isDeliveryPanelAnimating = false;
    }, 500);
  }
  hideExtrasPanel(id: string) {
    const panelIds = [
      { id: id + '-detail', visible: this.isDetailPanelVisible, animating: 'isDetailPanelAnimating' },
      { id: id + '-extra', visible: this.isExtrasPanelVisible, animating: 'isExtrasPanelAnimating' },
      { id: id + '-drink', visible: this.isDrinkPanelVisible, animating: 'isDrinkPanelAnimating' },
      { id: id + '-delivery', visible: this.isDeliveryPanelVisible, animating: 'isDeliveryPanelAnimating' },
    ];

    // If any animation is in progress, do nothing
    if (this.isDetailPanelAnimating || this.isExtrasPanelAnimating || this.isDrinkPanelAnimating || this.isDeliveryPanelAnimating) return;

    // Hide panels with translation animation and update states
    panelIds.forEach(panel => {
      if (panel.visible) {
        showCard(panel.id, 'y', '200%');
        this[panel.animating] = true;

        // Reset animation state after animation completes
        setTimeout(() => {
          this[panel.animating] = false;
        }, 500); // Animation duration
      }
    });

    // Update visibility states
    this.isDetailPanelVisible = false;
    this.isExtrasPanelVisible = false;
    this.isDrinkPanelVisible = false;
    this.isDeliveryPanelVisible = false;
  }

  toggleExtrasPanel(event: Event, id: string) {
    event.stopPropagation();

    // Define panel configuration
    const panelConfig = {
      [this.menu?.id + '-detail']: {
        visible: 'isDetailPanelVisible',
        animating: 'isDetailPanelAnimating',
        hideOthers: ['isExtrasPanelVisible', 'isDrinkPanelVisible', 'isDeliveryPanelVisible']
      },
      [this.menu?.id + '-extra']: {
        visible: 'isExtrasPanelVisible',
        animating: 'isExtrasPanelAnimating',
        hideOthers: ['isDetailPanelVisible', 'isDrinkPanelVisible', 'isDeliveryPanelVisible']
      },
      [this.menu?.id + '-drink']: {
        visible: 'isDrinkPanelVisible',
        animating: 'isDrinkPanelAnimating',
        hideOthers: ['isDetailPanelVisible', 'isExtrasPanelVisible', 'isDeliveryPanelVisible']
      },
      [this.menu?.id + '-delivery']: {
        visible: 'isDeliveryPanelVisible',
        animating: 'isDeliveryPanelAnimating',
        hideOthers: ['isDetailPanelVisible', 'isExtrasPanelVisible', 'isDrinkPanelVisible']
      },
    };

    const panel = panelConfig[id];
    if (!panel || this[panel.animating]) return;

    // Get all panel IDs for hiding
    const allPanelIds = [
      this.menu?.id + '-detail',
      this.menu?.id + '-extra',
      this.menu?.id + '-drink',
      this.menu?.id + '-delivery'
    ];

    // Hide all panels except the one being shown
    allPanelIds.forEach(panelId => {
      if (panelId !== id) {
        showCard(panelId, 'y', '200%');
        // Update visibility state for all other panels
        const otherPanel = panelConfig[panelId];
        if (otherPanel) {
          this[otherPanel.visible] = false;
        }
      }
    });

    // Check if panel is currently visible
    const isCurrentlyVisible = this[panel.visible];

    // If panel is already visible, just hide others and keep it visible
    if (isCurrentlyVisible) {
      return;
    }

    // Show the panel if it was hidden
    showCard(id, 'y', '0px');
    this[panel.visible] = true;

    // Set animation state
    this[panel.animating] = true;

    // Reset animation state after animation completes
    setTimeout(() => {
      this[panel.animating] = false;
    }, 500); // Animation duration
  }
}

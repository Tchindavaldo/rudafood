import { Component, ElementRef, Input, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { showCard } from 'src/utils/showCard';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/indx';
import { updateOrdersRequetService } from 'src/services/FastFood/requet/update-orders-requet.service';
import { TextExpansionService } from './text-expansion.service';
import { ToastService } from 'src/services/toast/toast.service';

@Component({
  selector: 'app-fast-food-order',
  templateUrl: './fast-food-order.component.html',
  styleUrls: ['./fast-food-order.component.scss'],
})
export class FastFoodOrderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() procededAction = '';
  @Input() showedAction = '';
  @Input() order: any = {};
  @Input() background = 'none';
  @Input() padding = '1px 12px 17px';
  @Input() borderRadius = '18px';
  @Input() backdropFilter = 'blur(0px)';
  @Input() marginBottom = '26px';
  @Input() checkboxBackgroundChecked = '';
  @Input() checkboxBorderColorChecked = '';
  @Input() showCrossIcon = false;
  @Input() extras: any[] = [];
  @Input() extrasDrink: any[] = [];
  shouldShowExtrasPanel = false;
  isExtrasPanelVisible = false;
  isDrinkPanelVisible = false;
  extraAlreadyVisited = false;
  boissonAlreadyVisited = false;
  isExtrasPanelAnimating = false;
  isDrinkPanelAnimating = false;
  @Input() truncateDeliveryAddress = false;
  @Output() openModal = new EventEmitter<{ order: any }>();

  // Nombre maximum d'extras à afficher avant de montrer l'indicateur "+X éléments"
  private maxExtrasToShow = 5;

  // Variable pour suivre si tous les extras sont affichés
  private showingAllExtras = false;

  // Méthode pour obtenir les extras à afficher (limités à maxExtrasToShow ou tous si showingAllExtras est true)
  get extrasToShow(): any[] {
    if (!this.extras || this.extras.length === 0) {
      return [];
    }

    return this.showingAllExtras ? this.extras : this.extras.slice(0, this.maxExtrasToShow);
  }

  // Méthode pour obtenir le nombre d'extras supplémentaires non affichés
  get additionalExtrasCount(): number {
    if (this.showingAllExtras) {
      return 0;
    }
    return this.extras && this.extras.length > this.maxExtrasToShow ? this.extras.length - this.maxExtrasToShow : 0;
  }

  // Vérifier si des extras supplémentaires existent
  get hasAdditionalExtras(): boolean {
    return !this.showingAllExtras && this.additionalExtrasCount > 0;
  }

  // Style combiné pour l'élément ion-item
  get itemStyle() {
    return {
      background: this.background,
      position: 'relative',
      padding: this.padding,
      'border-radius': this.borderRadius,
      'backdrop-filter': this.backdropFilter,
      'margin-bottom': this.marginBottom,
    };
  }

  // Classe CSS pour la case à cocher
  get checkboxClass(): string {
    // Si les deux propriétés sont définies avec les valeurs spécifiques pour le rouge
    if (this.checkboxBackgroundChecked === '#ff0000' && this.checkboxBorderColorChecked === 'darkred') {
      return 'custom-checkbox-red';
    }
    // Si les deux propriétés sont définies avec les valeurs spécifiques pour le vert
    else if (this.checkboxBackgroundChecked === '#00ff00' && this.checkboxBorderColorChecked === 'darkgreen') {
      return 'custom-checkbox-green';
    }
    // Si les deux propriétés sont définies avec les valeurs spécifiques pour le bleu
    else if (this.checkboxBackgroundChecked === '#0000ff' && this.checkboxBorderColorChecked === 'darkblue') {
      return 'custom-checkbox-blue';
    }
    // Par défaut, utiliser la classe rouge si des valeurs sont définies
    else if (this.checkboxBackgroundChecked || this.checkboxBorderColorChecked) {
      return 'custom-checkbox-red';
    }
    // Aucune classe spéciale si aucune propriété n'est définie
    return '';
  }

  // Style pour la case à cocher (conservé pour référence mais non utilisé)
  get checkboxStyle() {
    const baseStyle = {
      'margin-left': '5px',
      '--size': '15px',
      color: 'white',
      'font-weight': 'bold',
      '--border-radius': '15px',
    };

    // Objet pour stocker les styles conditionnels
    const conditionalStyles: any = {};

    // Ajouter la couleur de fond si elle est définie
    if (this.checkboxBackgroundChecked) {
      conditionalStyles['--checkbox-background-checked'] = this.checkboxBackgroundChecked;
    }

    // Ajouter la couleur de bordure si elle est définie
    if (this.checkboxBorderColorChecked) {
      conditionalStyles['--border-color-checked'] = this.checkboxBorderColorChecked;
    }

    // Combiner les styles de base avec les styles conditionnels
    return {
      ...baseStyle,
      ...conditionalStyles,
    };
  }
  noDef = 'pas def';
  // Texte du menu à afficher
  get logText(): string {
    const result = this.order?.menu?.name || 'Nom du menu non disponible';

    return result;
  }

  public isUpdating = false;
  fastfoodOrder!: any[];
  fastFoodOrderReducer!: Observable<any[]>;

  // Propriétés pour la gestion de la taille du texte
  menuNameExpanded = false;
  dynamicStyles: { [key: string]: string } = {};
  maxLength = 20; // Longueur maximale du texte avant troncature
  truncatedText = ''; // Texte tronqué pour l'affichage

  // Variable pour stocker le texte actuellement affiché
  displayedText = '';
  isAnimating = false;

  // Propriétés pour la gestion de l'adresse de livraison
  deliveryAddressExpanded = false;
  deliveryAddressTruncated = 'Adresse non spécifiéessssssssssssssssssssssssssssssss dddddddddddddddddddddddddddddd';
  deliveryAddressDisplayed = 'Adresse non spécifiéessssssssssssssssssssssssssssssss dddddddddddddddddddddddddddddd';
  isDeliveryAnimating = false;

  // ID unique pour cette instance du composant
  private uniqueId: string = Math.random().toString(36).substring(2, 9);

  // Abonnement aux événements d'expansion
  private expansionSubscription: Subscription = new Subscription();

  constructor(public updateOrdersRequet: updateOrdersRequetService, private store: Store<AppState>, private toast: ToastService) {
    this.fastFoodOrderReducer = this.store.select(state => state.fastFoodOrder.orders);
    this.fastFoodOrderReducer.subscribe(order => (this.fastfoodOrder = order));
  }

  ngOnInit() {
    // Préparer le texte tronqué dès l'initialisation
    this.prepareTruncatedText();
    this.prepareDeliveryAddressTruncated();

    // Initialiser le texte affiché avec le texte tronqué
    this.displayedText = this.truncatedText;

    this.deliveryAddressDisplayed = this.deliveryAddressTruncated;

    // S'abonner aux événements d'expansion
    this.expansionSubscription = TextExpansionService.expansionEmitter.subscribe((expandedId: string) => {
      // Si un autre élément est ouvert et que celui-ci est ouvert, le fermer
      if (expandedId !== this.uniqueId && this.menuNameExpanded) {
        this.collapseText();
      }

      // Fermer également l'adresse de livraison si elle est ouverte
      if (expandedId !== this.uniqueId && this.deliveryAddressExpanded) {
        this.collapseDeliveryAddress();
      }
    });
  }

  ngAfterViewInit() {
    // Initialiser les éléments après le rendu de la vue
    setTimeout(() => {
      this.initMenuNameElements();
    }, 0);
  }

  // Préparer le texte tronqué pour l'affichage
  prepareTruncatedText() {
    const menuName = this.logText;

    if (menuName && menuName.length > this.maxLength) {
      this.truncatedText = menuName.substring(0, this.maxLength) + '...';
    } else {
      this.truncatedText = menuName;
    }
  }

  // Préparer le texte tronqué pour l'adresse de livraison
  prepareDeliveryAddressTruncated() {
    // Vérifier si order.delivery.location existe
    let deliveryAddress = '';

    if (this.order && this.order.delivery && this.order.delivery.location) {
      deliveryAddress = this.order.delivery.location;
    } else {
      // Texte par défaut de 100 caractères si l'adresse n'existe pas
      deliveryAddress = 'Quartier Nkomo, après le marché central, à côté de la pharmacie du soleil, immeuble bleu à 3 étages, 2ème étage, porte 204';
    }

    if (deliveryAddress.length > this.maxLength) {
      this.deliveryAddressTruncated = deliveryAddress.substring(0, this.maxLength) + '...';
    } else {
      this.deliveryAddressTruncated = deliveryAddress;
    }
  }

  // Initialiser les éléments du nom du menu
  initMenuNameElements() {
    const menuNameElements = document.getElementsByClassName('NomCmdUser');
    for (let i = 0; i < menuNameElements.length; i++) {
      const el = menuNameElements[i] as HTMLElement;
      this.truncateText(el);
    }
  }

  // Tronquer le texte s'il dépasse la longueur maximale
  truncateText(element: HTMLElement) {
    const text = element.textContent || '';
    if (text.trim().length > this.maxLength) {
      element.setAttribute('data-full-text', text);
      element.textContent = text.substring(0, this.maxLength) + '...';
      element.style.cursor = 'pointer';
    }
  }

  // Méthode pour fermer le texte (collapse)
  collapseText() {
    if (!this.menuNameExpanded || this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.menuNameExpanded = false;

    // Attendre la fin de l'animation avant de changer le texte
    setTimeout(() => {
      this.displayedText = this.truncatedText;
      this.isAnimating = false;
    }, 700); // Durée de l'animation (0.7s)
  }

  // Méthode pour fermer l'adresse de livraison (collapse)
  collapseDeliveryAddress() {
    if (!this.deliveryAddressExpanded || this.isDeliveryAnimating) {
      return;
    }

    this.isDeliveryAnimating = true;
    this.deliveryAddressExpanded = false;

    // Attendre la fin de l'animation avant de changer le texte
    setTimeout(() => {
      this.deliveryAddressDisplayed = this.deliveryAddressTruncated;
      this.isDeliveryAnimating = false;
    }, 700); // Durée de l'animation (0.7s)
  }

  // Basculer l'affichage de l'adresse de livraison (expand/collapse)
  toggleDeliveryAddressExpand(event: Event) {
    // Récupérer l'adresse de livraison
    let deliveryAddress = '';

    if (this.order && this.order.delivery && this.order.delivery.location) {
      deliveryAddress = this.order.delivery.location;
    } else {
      // Texte par défaut de 100 caractères si l'adresse n'existe pas
      deliveryAddress = 'Quartier Nkomo, après le marché central, à côté de la pharmacie du soleil, immeuble bleu à 3 étages, 2ème étage, porte 204';
    }

    // Si le texte est plus court que la limite, ne rien faire
    if (deliveryAddress.length <= this.maxLength) {
      return;
    }

    // Si une animation est déjà en cours, ne rien faire
    if (this.isDeliveryAnimating) {
      return;
    }

    this.isDeliveryAnimating = true;

    if (this.deliveryAddressExpanded) {
      // Collapse: d'abord lancer l'animation de hauteur, puis changer le texte
      this.deliveryAddressExpanded = false;

      // Attendre la fin de l'animation avant de changer le texte
      setTimeout(() => {
        this.deliveryAddressDisplayed = this.deliveryAddressTruncated;
        this.isDeliveryAnimating = false;
      }, 700); // Durée de l'animation (0.7s)
    } else {
      // Expand: changer le texte immédiatement, puis lancer l'animation
      this.deliveryAddressDisplayed = deliveryAddress;
      this.deliveryAddressExpanded = true;

      // Notifier les autres instances qu'un élément a été ouvert
      TextExpansionService.expandItem(this.uniqueId);

      // Réinitialiser l'état d'animation après la fin de l'animation
      setTimeout(() => {
        this.isDeliveryAnimating = false;
      }, 700);
    }
  }

  // Basculer l'affichage du texte complet/tronqué
  toggleMenuNameExpand(event: Event) {
    // Si le texte est plus court que la limite, ne rien faire
    if (this.logText.length <= this.maxLength) {
      return;
    }

    // Si une animation est déjà en cours, ne rien faire
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;

    if (this.menuNameExpanded) {
      // Collapse: d'abord lancer l'animation de hauteur, puis changer le texte
      this.menuNameExpanded = false;

      // Attendre la fin de l'animation avant de changer le texte
      setTimeout(() => {
        this.displayedText = this.truncatedText;
        this.isAnimating = false;
      }, 700); // Durée de l'animation (0.7s)
    } else {
      // Expand: changer le texte immédiatement, puis lancer l'animation
      this.displayedText = this.logText;
      this.menuNameExpanded = true;

      // Notifier les autres instances qu'un élément a été ouvert
      TextExpansionService.expandItem(this.uniqueId);

      // Réinitialiser l'état d'animation après la fin de l'animation
      setTimeout(() => {
        this.isAnimating = false;
      }, 700);
    }
  }

  // Implémentation de l'interface OnDestroy
  ngOnDestroy() {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.expansionSubscription) {
      this.expansionSubscription.unsubscribe();
    }
  }

  async statutChange() {
    try {
      if (this.order.status !== 'finished') {
        this.isUpdating = true;

        await this.updateOrdersRequet.updateOrders({ status: this.order.status, id: this.order.id, fastFoodId: this.order.fastFoodId });
        this.isUpdating = false;
      }

      if (this.order.status === 'finished') {
        // Première notification en haut pour informer que la notification a été envoyée au client
        this.toast.presentToast('top', 'Notification déjà envoyée au client', 5000);

        // Deuxième notification en bas après 3 secondes
        setTimeout(() => {
          this.toast.presentToast('bottom', "L'envoi de nouvelles notifications sera possible dans les mises à jour à venir", 3000);
        }, 3000);
      }

      // await this.updateOrdersRequet.updateFastFood({ status: 'pending', id: this.order.id });
    } catch (error) {
      this.isUpdating = false;
    }
  }

  /**
   * Affiche tous les extras en désactivant la limitation
   */
  showAllExtras() {
    this.showingAllExtras = true;
  }

  toggleExtrasPanel(event: Event, id: string) {
    event.stopPropagation();

    if (id === this.order.id + '-extra') {
      // Si une animation est déjà en cours, ne rien faire
      if (this.isExtrasPanelAnimating) return;

      // Mettre à jour immédiatement les états pour changer les classes
      this.isExtrasPanelVisible = true;
      this.isDrinkPanelVisible = false;
      this.isExtrasPanelAnimating = true;

      // Déclencher l'animation de translation
      showCard(id, 'y', '0px');

      // Réinitialiser l'état d'animation après la fin de l'animation
      setTimeout(() => {
        this.isExtrasPanelAnimating = false;
      }, 500); // Durée de l'animation de translation
    } else if (id === this.order.id + '-drink') {
      // Si une animation est déjà en cours, ne rien faire
      if (this.isDrinkPanelAnimating) return;

      // Mettre à jour immédiatement les états pour changer les classes
      this.isDrinkPanelVisible = true;
      this.isExtrasPanelVisible = false;
      this.isDrinkPanelAnimating = true;

      // Déclencher l'animation de translation
      showCard(id, 'y', '0px');

      // Réinitialiser l'état d'animation après la fin de l'animation
      setTimeout(() => {
        this.isDrinkPanelAnimating = false;
      }, 500); // Durée de l'animation de translation
    }
  }

  showExtrasPanel() {
    this.isExtrasPanelVisible = !this.isExtrasPanelVisible;
    this.isDrinkPanelVisible = false;
    this.extraVisited();
  }

  extraVisited() {
    this.extraAlreadyVisited = true;
  }

  showDrinkPanel() {
    this.isDrinkPanelVisible = !this.isDrinkPanelVisible;
    this.isExtrasPanelVisible = false;
    this.drinkVisited();
  }

  drinkVisited() {
    this.boissonAlreadyVisited = true;
  }

  hideExtrasPanel(id: string) {
    const extraId = id + '-extra';
    const drinkId = id + '-drink';

    // Si des animations sont déjà en cours, ne rien faire
    if (this.isExtrasPanelAnimating || this.isDrinkPanelAnimating) return;

    // Cacher les panneaux avec animation de translation
    showCard(extraId, 'y', '200%');
    showCard(drinkId, 'y', '200%');

    // Mettre à jour immédiatement les états pour changer les classes
    this.isExtrasPanelVisible = false;
    this.isDrinkPanelVisible = false;

    // Marquer que les animations sont en cours
    if (this.isExtrasPanelVisible) {
      this.isExtrasPanelAnimating = true;
      setTimeout(() => {
        this.isExtrasPanelAnimating = false;
      }, 500); // Durée de l'animation
    }

    if (this.isDrinkPanelVisible) {
      this.isDrinkPanelAnimating = true;
      setTimeout(() => {
        this.isDrinkPanelAnimating = false;
      }, 500); // Durée de l'animation
    }
  }

  onItemClick() {
    // Gérer le clic sur l'item
  }

  /**
   * Réinitialise l'affichage en masquant tous les panneaux d'extras
   * et en affichant le contenu principal
   */
  resetPanels() {
    // Si des animations sont déjà en cours, ne rien faire
    if (this.isExtrasPanelAnimating || this.isDrinkPanelAnimating) return;

    // Mettre à jour immédiatement les états pour changer les classes
    this.isExtrasPanelVisible = false;
    this.isDrinkPanelVisible = false;

    // Cacher tous les panneaux avec animation de translation
    const extraId = this.order.id + '-extra';
    const drinkId = this.order.id + '-drink';

    showCard(extraId, 'y', '200%');
    showCard(drinkId, 'y', '200%');

    // Marquer que les animations sont en cours
    this.isExtrasPanelAnimating = true;
    this.isDrinkPanelAnimating = true;

    // Réinitialiser les états d'animation après la fin des animations
    setTimeout(() => {
      this.isExtrasPanelAnimating = false;
      this.isDrinkPanelAnimating = false;
    }, 500);
  }

  showConfirmCancelOrder(id: string) {
    if (this.order.status === 'processing' || this.order.status === 'pending') {
      showCard(id);
    }
  }

  validateOrder() {
    // Vérifier si l'utilisateur a consulté les extras et les boissons
    if (this.order.status === 'pending') {
      const hasExtras = this.extras && this.extras.length > 0;
      const hasDrinks = this.extrasDrink && this.extrasDrink.length > 0;

      // Ne vérifier que si les inputs contiennent des données
      if (hasExtras && hasDrinks && !this.extraAlreadyVisited && !this.boissonAlreadyVisited) {
        this.toast.presentToast('top', 'Veuillez consulter les extras et les boissons avant de valider la commande.', 3000);
        return;
      }
      if (hasExtras && !this.extraAlreadyVisited) {
        this.toast.presentToast('top', 'Veuillez consulter les extras avant de valider la commande.', 3000);
        return;
      }

      if (hasDrinks && !this.boissonAlreadyVisited) {
        this.toast.presentToast('top', 'Veuillez consulter les boissons avant de valider la commande.', 3000);
        return;
      }
    }
    // Préparer l'objet order à envoyer
    // const orderToSend = { ...this.order };

    // // Si order.extras n'existe pas, ajouter des extras par défaut
    // if (!orderToSend.extras) {
    //   orderToSend.extras = this.extras;
    // }

    // Si la commande est en attente (pending) et que tous les extras ne sont pas affichés
    if (this.order.status !== 'delivered') {
      this.statutChange();
    }
  }
}

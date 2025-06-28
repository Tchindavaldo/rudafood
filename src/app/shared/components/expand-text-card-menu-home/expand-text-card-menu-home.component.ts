import { Component, ElementRef, Input, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TextExpansionService } from './text-expansion.service';

@Component({
  selector: 'app-expand-text-card-menu-home',
  templateUrl: './expand-text-card-menu-home.component.html',
  styleUrls: ['./expand-text-card-menu-home.component.scss'],
})
export class ExpandTextCardMenuHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = '';
  @Input() maxLength: number = 30;
  @Input() icon: string = '';
  @Input() iconColor: string = '';
  @Input() label: string = '';
  @Input() chipColor: string | undefined = '';
  @Input() truncate: boolean = true;
  @Input() expandedHeight: string = '6em';
  @Input() expandWidth: boolean = false;
  @Input() expandedWidth: string = 'auto';
  @Input() collapsedWidth: string = 'max-content'; // Nouvel input pour la largeur réduite
  @Input() expandedWhiteSpace: string = 'normal'; // Contrôle le white-space du texte étendu
  @Input() disableCloseAnimation: boolean = false;
  @Input() textColor: string = '';
  @ViewChild('textElement', { static: false }) textElement!: ElementRef;

  // Variables pour la gestion de l'expansion
  expanded: boolean = false;
  displayedText: string = '';
  truncatedText: string = '';
  isAnimating: boolean = false;
  isCollapsing: boolean = false;
  uniqueId: string = 'text-' + Math.random().toString(36).substring(2, 9);
  expansionSubscription: Subscription = new Subscription();

  constructor() {}

  ngOnInit() {
    // Initialiser le texte affiché
    this.prepareText();

    // S'abonner aux événements d'expansion pour fermer ce texte quand un autre est ouvert
    // Ne pas s'abonner si truncate est false
    if (this.truncate) {
      this.expansionSubscription = TextExpansionService.expansionEmitter.subscribe((itemId: string) => {
        if (itemId !== this.uniqueId && this.expanded) {
          this.collapseText();
        }
      });
    }
  }

  ngAfterViewInit() {
    // Initialiser les éléments du texte après le rendu du DOM
    setTimeout(() => {
      this.initTextElements();
    }, 0);
  }

  // Préparer le texte tronqué pour l'affichage
  prepareText() {
    if (!this.text) {
      this.text = '';
    }

    // Si truncate est désactivé, afficher le texte complet
    if (!this.truncate) {
      this.truncatedText = this.text;
      this.expanded = true;
      return;
    }

    // Si le texte est plus court que la longueur maximale, pas besoin de le tronquer
    if (this.text.length <= this.maxLength) {
      this.truncatedText = this.text;
    } else {
      this.truncatedText = this.text.substring(0, this.maxLength) + '...';
    }
  }

  // Initialiser les éléments du texte
  initTextElements() {
    if (this.textElement) {
      // Vérifier si le texte doit être tronqué
      if (this.text.length > this.maxLength && this.truncate) {
        this.truncateText(this.textElement.nativeElement);
      }
    }
  }

  // Tronquer le texte s'il dépasse la longueur maximale
  truncateText(element: HTMLElement) {
    if (this.text.length > this.maxLength && this.truncate) {
      this.truncatedText = this.text.substring(0, this.maxLength) + '...';
    }
  }

  // Méthode pour fermer le texte (collapse)
  collapseText() {
    // Ne pas fermer si truncate est false
    if (!this.expanded || this.isAnimating || !this.truncate) {
      return;
    }

    this.isAnimating = true;
    this.isCollapsing = true;
    this.expanded = false;

    // Attendre la fin de l'animation avant de réinitialiser l'état d'animation et de tronquer le texte
    setTimeout(() => {
      this.isCollapsing = false;
      this.isAnimating = false;
    }, 700); // Durée de l'animation (0.7s)
  }

  // Basculer l'affichage du texte complet/tronqué
  toggleExpand(event: Event) {
    // Si truncate est désactivé, ne rien faire
    if (!this.truncate) {
      return;
    }
    // Si le texte est plus court que la limite, ne rien faire
    if (this.text.length < this.maxLength) {
      console.log("Texte trop court pour l'expansion:", this.text, 'taille', this.text.length);
      console.log("taille max l'expansion:", this.maxLength);
      return;
    }

    // Si une animation est déjà en cours, ne rien faire
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;

    if (this.expanded) {
      // Collapse: activer l'état de collapse et changer l'état expanded
      this.isCollapsing = true;
      this.expanded = false;

      // Attendre la fin de l'animation avant de réinitialiser les états

      setTimeout(() => {
        this.isCollapsing = false;
        this.isAnimating = false;
      }, 700); // Durée de l'animation (0.7s)
    } else {
      // Expand: changer l'état expanded
      this.expanded = true;

      // Notifier les autres instances qu'un élément a été ouvert
      TextExpansionService.expandItem(this.uniqueId);

      // Réinitialiser l'état d'animation après la fin de l'animation

      setTimeout(() => {
        this.isAnimating = false;
      }, 700);
    }
  }

  ngOnDestroy() {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.expansionSubscription) {
      this.expansionSubscription.unsubscribe();
    }
  }
}

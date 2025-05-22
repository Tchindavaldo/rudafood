import { EventEmitter } from '@angular/core';

/**
 * Service statique pour gérer l'expansion des textes
 * Permet de fermer tous les autres éléments lorsqu'un élément est ouvert
 */
export class TextExpansionService {
  // Émetteur d'événements statique partagé entre toutes les instances
  public static expansionEmitter = new EventEmitter<string>();

  // Méthode pour notifier qu'un élément a été ouvert
  public static expandItem(itemId: string) {
    this.expansionEmitter.emit(itemId);
  }
}

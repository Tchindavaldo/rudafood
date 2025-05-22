# Composant ExpandableText

Ce composant réutilisable permet d'afficher du texte avec une fonctionnalité d'expansion/collapse. Il est particulièrement utile pour afficher des textes longs dans un espace limité, avec la possibilité de les développer pour voir le contenu complet.

## Fonctionnalités

- Troncature automatique du texte avec des points de suspension
- Animation fluide pour l'expansion et le collapse
- Coordination avec les autres éléments expansibles via le TextExpansionService
- Gestion de l'état d'animation pour éviter les problèmes pendant les transitions
- Support pour les icônes et les étiquettes
- Deux modes d'affichage: avec ou sans chip

## Utilisation

### Exemple basique

```html
<app-expandable-text 
  [text]="'Voici un texte qui sera tronqué si trop long'" 
  [maxLength]="30">
</app-expandable-text>
```

### Avec icône et chip

```html
<app-expandable-text 
  [text]="'Nom du menu: Poulet grillé avec frites et sauce'" 
  [maxLength]="30" 
  [icon]="'restaurant-outline'" 
  [chipColor]="'success'" 
  [truncate]="true">
</app-expandable-text>
```

### Pour une adresse avec icône et étiquette

```html
<app-expandable-text 
  [text]="'Quartier Nkomo, après le marché central, à côté de la pharmacie du soleil'" 
  [maxLength]="40" 
  [icon]="'navigate-outline'" 
  [iconColor]="'red'" 
  [label]="'Livraison:'" 
  [truncate]="true">
</app-expandable-text>
```

## Propriétés d'entrée (Inputs)

| Propriété | Type | Description | Valeur par défaut |
|-----------|------|-------------|------------------|
| text | string | Le texte à afficher | '' |
| maxLength | number | Longueur maximale avant troncature | 30 |
| icon | string | Nom de l'icône Ionic à afficher | '' |
| iconColor | string | Couleur de l'icône | '' |
| label | string | Étiquette à afficher avant le texte | '' |
| chipColor | string | Couleur du chip (si utilisé) | '' |
| truncate | boolean | Activer/désactiver la troncature | true |
| expandedHeight | string | Hauteur maximale en mode étendu | '6em' |

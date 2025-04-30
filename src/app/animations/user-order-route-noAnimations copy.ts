import { group, style, transition, trigger, query, animate } from '@angular/animations';

export const userOrderRouteNoAnimation = trigger('userOrderRouteNoAnimation', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    // query(':enter, :leave', [style({ position: 'absolute', width: '100%' })], { optional: true }),

    group([
      query(':leave', [style({ opacity: 1 }), animate('0ms ease', style({ opacity: 0.5 }))], { optional: true }),
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('0ms ease', style({ transform: 'translateX(0%)' }))], { optional: true }),
    ]),
  ]),
]);

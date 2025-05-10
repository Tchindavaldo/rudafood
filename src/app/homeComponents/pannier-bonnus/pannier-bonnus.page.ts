import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { bonusDataService } from 'src/app/services/bonus/data/bonus-data.service';
import { getBonusService } from 'src/app/services/bonus/get-bonus.service';
import { OrderDataService } from 'src/app/services/orders/data/order-data.service';
import { getUserOrdersService } from 'src/app/services/orders/get/get-user-orders.service';
import { AppState } from 'src/app/store/indx';
import { filterByArgs } from 'src/app/utils/filterByArg';
import Swiper from 'swiper';

@Component({
  selector: 'app-pannier-bonnus',
  templateUrl: './pannier-bonnus.page.html',
  styleUrls: ['./pannier-bonnus.page.scss'],
})
export class PannierBonnusPage implements AfterViewInit {
  paidOrder: any = [];
  userOrder!: Observable<any[]>;
  slides: any = [];
  bonus!: Observable<any[]>;

  isloading = false;
  erroDataGeting = false;

  constructor(
    public bonusData: bonusDataService,
    private bonusRequet: getBonusService,
    public orderData: OrderDataService,
    private getUserOrdersService: getUserOrdersService,
    private store: Store<AppState>
  ) {}
  swiperInstance: Swiper | undefined;
  // slides = bonusData.getbonus();
  isSliding = false; // Flag pour éviter les clics multiples pendant une animation

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.initSwiper();
    // }, 5000);

    this.initData();
  }

  initSwiper() {
    // Destruction de l'instance précédente si elle existe
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }

    this.swiperInstance = new Swiper('.carousel-slider', {
      grabCursor: true,
      watchSlidesProgress: true,
      loop: true,
      loopAdditionalSlides: 1,
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 50,
      initialSlide: 0,
      on: {
        progress(swiper: any) {
          const t = swiper.slides.length;
          for (let r = 0; r < swiper.slides.length; r++) {
            const slide = swiper.slides[r];
            const progress = (slide as any).progress;
            const i = Math.abs(progress);
            let scaleFactor = 1;
            if (i > 1) scaleFactor = 0.3 * (i - 1) + 1;
            const offset = progress * scaleFactor * 50 + '%';
            const scale = 1 - 0.7 * i;
            const zIndex = t - Math.abs(Math.round(progress));
            slide.style.transform = `translateX(${offset}) scale(${scale})`;
            slide.style.zIndex = zIndex.toString();

            // Gère la visibilité :
            if (i <= 1) {
              // Slide centrale ou voisine directe
              slide.style.opacity = '1';
            } else if (i <= 2) {
              // Voisines éloignées, affichées mais atténuées
              slide.style.opacity = '0.3';
            } else {
              // Trop éloignées, cachées
              slide.style.opacity = '0';
            }
            slide.querySelectorAll('.item-content').forEach((el: any) => {
              el.style.opacity = (1 - i / 2).toString();
            });
          }
        },
        setTransition(swiper: any, duration: any) {
          swiper.slides.forEach((slide: any) => {
            slide.style.transitionDuration = `${duration}ms`;
            slide.querySelectorAll('.item-content').forEach((el: any) => (el.style.transitionDuration = `${duration}ms`));
          });
        },
        init: (swiper: any) => {
          // Ajouter les écouteurs de clic après l'initialisation
          this.addClickListeners(swiper);
        },
        slideChangeTransitionStart: () => {
          this.isSliding = true;
        },
        slideChangeTransitionEnd: () => {
          this.isSliding = false;
        },
      },
    });
  }

  addClickListeners(swiper: any) {
    const originalSlidesCount = this.slides.length;

    // Attacher un événement de clic à chaque slide
    swiper.slides.forEach((slide: HTMLElement) => {
      // Supprimer les anciens écouteurs si présents (pour éviter les doublons)
      slide.removeEventListener('click', this.slideClickHandler);

      // Ajouter un nouvel écouteur
      slide.addEventListener('click', (event: Event) => {
        if (this.isSliding) return; // Ne pas permettre de cliquer pendant l'animation

        const clickedSlide = event.currentTarget as HTMLElement;
        if (!clickedSlide || !swiper) return;

        // Vérifier si c'est déjà la slide active
        if (clickedSlide.classList.contains('swiper-slide-active')) {
          return;
        }

        // Trouver la position horizontale relative
        const swiperEl = document.querySelector('.carousel-slider');
        if (!swiperEl) return;

        const swiperRect = swiperEl.getBoundingClientRect();
        const clickEvent = event as MouseEvent;
        const clickX = clickEvent.clientX;
        const swiperCenterX = swiperRect.left + swiperRect.width / 2;

        // Décider de la direction en fonction de la position du clic
        if (clickX < swiperCenterX) {
          // Définir isSliding pour éviter les clics pendant l'animation
          this.isSliding = true;
          swiper.slidePrev();
        } else {
          // Définir isSliding pour éviter les clics pendant l'animation
          this.isSliding = true;
          swiper.slideNext();
        }
      });
    });
  }

  // Définir la référence de fonction pour pouvoir la supprimer plus tard
  slideClickHandler = (event: Event) => {};

  async initData() {
    try {
      this.isloading = true;
      if (this.bonusData.getbonus() === null) await this.bonusRequet.getBonus();
      if (this.orderData.getUserOrders() === null) await this.getUserOrdersService.getFastUserOrders();

      this.userOrder = this.store.select(state => state.userOrder.orders);
      this.userOrder.subscribe(order => {
        this.paidOrder = filterByArgs(order, 'status', ['processing', 'pending', 'finished']);
        console.log('taille mis a jour', this.paidOrder.length);
      });

      this.bonus = this.store.select(state => state.bonus.bonus);
      this.bonus.subscribe(bonus => {
        this.slides = bonus;
        setTimeout(() => {
          this.initSwiper();
        }, 5000);
        console.log('sliddee', this.slides);
      });

      this.isloading = false;
    } catch (error) {
      console.log(error);
      this.isloading = false;
      this.erroDataGeting = true;
    }
  }
}

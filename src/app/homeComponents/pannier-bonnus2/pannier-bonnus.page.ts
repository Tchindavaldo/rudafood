import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { bonusDataService } from 'src/services/bonus/data/bonus-data.service';
import { AppState } from 'src/store/indx';
import { filterByArgs } from 'src/utils/filterByArg';
import { getBonusEligibility } from 'src/utils/getBonusEligibility';
import Swiper from 'swiper';

@Component({
  selector: 'app-pannier-bonnus',
  templateUrl: './pannier-bonnus.page.html',
  styleUrls: ['./pannier-bonnus.page.scss'],
})
export class PannierBonnusPage implements AfterViewInit, OnInit {
  paidOrder: any = [];
  userOrder!: Observable<any[]>;
  constructor(public bonusData: bonusDataService, private store: Store<AppState>) {}
  swiperInstance: Swiper | undefined;
  slides = this.bonusData.getbonus();
  isSliding = false;

  isPostingUserBonus = true;

  ngOnInit(): void {
    this.setOrderLength();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initSwiper();
    }, 900);
  }

  initSwiper() {
    // Destruction de l'instance précédente si elle existe
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }

    this.swiperInstance = new Swiper('.carousel-slider', {
      // loopAdditionalSlides: 2,
      grabCursor: true,
      watchSlidesProgress: true,
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 50,
      initialSlide: 1,
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
      },
    });
  }

  scrollLeft() {
    if (this.swiperInstance) {
      this.swiperInstance.slidePrev();
    }
  }

  scrollRight() {
    if (this.swiperInstance) {
      this.swiperInstance.slideNext();
    }
  }

  setOrderLength() {
    this.userOrder = this.store.select(state => state.userOrder.orders);
    this.userOrder.subscribe(order => {
      this.paidOrder = filterByArgs(order, 'status', ['processing', 'pending', 'finished']);
      console.log('taille mis a jour', this.paidOrder.length);
    });
  }

  getBonusEligibility(palier: number): {
    eligible: boolean;
    restant: number;
    totalBonus: number;
  } {
    return getBonusEligibility(this.paidOrder.length, palier);
  }
}

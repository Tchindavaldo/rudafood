import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { bonusDataService } from 'src/services/bonusRequest/data/bonusRequest-data.service';
import { postBonusRequestService } from 'src/services/bonusRequest/post-bonusRequest.service';
import { ToastService } from 'src/services/toast/toast.service';
import { AppState } from 'src/store/indx';
import { filterByArgs } from 'src/utils/filterByArg';
import { getBonusEligibility } from 'src/utils/getBonusEligibility';
import Swiper from 'swiper';

@Component({
  selector: 'app-menu-design4',
  templateUrl: './menu-design4.component.html',
  styleUrls: ['./menu-design4.component.scss'],
})
export class MenuDesign4Component implements OnInit {
  paidOrder: any = [];
  @Input() fastFood!: any;
  userOrder!: Observable<any[]>;

  constructor(public bonusData: bonusDataService, private store: Store<AppState>, private toast: ToastService, private bonusRequestService: postBonusRequestService) {}
  swiperInstance: Swiper | undefined;
  @Input() slides = [1, 2, 3];
  isSliding = false;

  isPostingUserBonusRequest = false;

  ngOnInit(): void {
    this.initSwiper();
    console.log(this.fastFood);
    console.log('menu', this.slides);
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
      spaceBetween: 60,
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
            // Clamp scale to avoid negative values when there are many slides. A minimum of 0.2 keeps the slide visible but small.
            const scale = Math.max(0.2, 1 - 0.4 * i);
            const zIndex = t - Math.abs(Math.round(progress));
            slide.style.transform = `translateX(${offset}) scale(${scale})`;
            slide.style.zIndex = zIndex.toString();
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
}

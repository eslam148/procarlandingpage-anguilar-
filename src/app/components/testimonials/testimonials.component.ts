import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy, ViewChild, HostListener, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';
import { LandingpageService, Testimonial } from '../../services/landingpage.service';

@Component({
  selector: 'app-landing-testimonials',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class LandingTestimonialsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('animateElement') animateElements!: QueryList<ElementRef>;
  @ViewChild('slider', { static: false }) sliderRef!: ElementRef;

  private observer!: IntersectionObserver;
  private autoPlayInterval!: any;
  private touchStartX = 0;
  private touchEndX = 0;
  private languageSubscription!: Subscription;
  private mutationObserver!: MutationObserver;

  // Slider Properties
  currentSlide = 0;
  isAutoPlaying = true;
  autoPlayDelay = 5000; // 5 seconds
  isRTL = false; // RTL direction flag

  // API State Properties
  isLoading = false;
  hasError = false;
  errorMessage = '';
  testimonialsData: Testimonial[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translationService: TranslationService,
    private landingpageService: LandingpageService
  ) {}

  ngOnInit() {
    // Load testimonials from API
    this.loadTestimonials();

    // Initial RTL detection
    this.detectRTL();

    // Subscribe to language changes
    this.languageSubscription = this.translationService.getCurrentLang().subscribe(lang => {
      this.detectRTL();
    });

    // Watch for dir attribute changes
    this.setupDirectionObserver();

    // Setup intersection observer for scroll animations
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          this.startAutoPlay();
        } else {
          this.stopAutoPlay();
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
  }

  ngAfterViewInit() {
    // Observe all animate elements
    this.animateElements.forEach(element => {
      this.observer.observe(element.nativeElement);
    });

    // Add touch event listeners
    if (this.sliderRef) {
      const slider = this.sliderRef.nativeElement;
      slider.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
      slider.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
      slider.addEventListener('mouseenter', this.pauseAutoPlay.bind(this));
      slider.addEventListener('mouseleave', this.resumeAutoPlay.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    this.stopAutoPlay();
  }

  // API Methods
  loadTestimonials(): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    this.landingpageService.getTestimonials().subscribe({
      next: (response) => {
        console.log('Testimonials loaded:', response);
        if (response.status == 0 && response.data) {
          this.testimonialsData = response.data;
          this.currentSlide = 0; // Reset to first slide
        } else {
          this.handleError('Failed to load testimonials: ' + response.message);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading testimonials:', error);
        this.handleError('Failed to load testimonials. Please try again.');
        this.isLoading = false;
      }
    });
  }

  private handleError(message: string): void {
    this.hasError = true;
    this.errorMessage = message;
    this.testimonialsData = [];
  }

  // Helper Methods
  getStarsArray(count: number): any[] {
    return new Array(Math.max(0, Math.min(5, count))); // Ensure count is between 0-5
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(this.isRTL ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  }

  // Enhanced RTL Detection Method
  private detectRTL(): void {
    const htmlElement = this.document.documentElement;
    const bodyElement = this.document.body;

    // Check multiple sources for direction
    const htmlDir = htmlElement.getAttribute('dir');
    const bodyDir = bodyElement.getAttribute('dir');
    const computedDir = window.getComputedStyle(htmlElement).direction;
    const lang = htmlElement.getAttribute('lang') || this.document.documentElement.lang;

    // Set RTL if any of these conditions are true
    this.isRTL = htmlDir === 'rtl' ||
                 bodyDir === 'rtl' ||
                 computedDir === 'rtl' ||
                 lang === 'ar';

    console.log('RTL Detection:', {
      htmlDir,
      bodyDir,
      computedDir,
      lang,
      isRTL: this.isRTL
    });
  }

  // Setup observer for direction changes
  private setupDirectionObserver(): void {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' &&
            (mutation.attributeName === 'dir' || mutation.attributeName === 'lang')) {
          this.detectRTL();
        }
      });
    });

    // Observe both html and body elements
    this.mutationObserver.observe(this.document.documentElement, {
      attributes: true,
      attributeFilter: ['dir', 'lang']
    });

    this.mutationObserver.observe(this.document.body, {
      attributes: true,
      attributeFilter: ['dir']
    });
  }

  // Get RTL-aware transform value
  getSliderTransform(): string {
    const translateValue = this.currentSlide * 100;
    if (this.isRTL) {
      return `translateX(${translateValue}%)`;
    } else {
      return `translateX(-${translateValue}%)`;
    }
  }

  // Get current direction for debugging/testing
  getCurrentDirection(): string {
    return this.isRTL ? 'rtl' : 'ltr';
  }

  // Update RTL detection (call this when language changes)
  updateDirection(): void {
    this.detectRTL();
  }

  // Test method to toggle RTL (for development/testing only)
  toggleRTLForTesting(): void {
    const htmlElement = this.document.documentElement;
    if (htmlElement.getAttribute('dir') === 'rtl') {
      htmlElement.setAttribute('dir', 'ltr');
      htmlElement.setAttribute('lang', 'en');
    } else {
      htmlElement.setAttribute('dir', 'rtl');
      htmlElement.setAttribute('lang', 'ar');
    }
    this.detectRTL();
  }

  // Slider Navigation Methods
  nextSlide(): void {
    if (this.testimonialsData.length === 0) return;

    if (this.currentSlide < this.testimonialsData.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Loop back to first slide
    }
    this.resetAutoPlay();
  }

  previousSlide(): void {
    if (this.testimonialsData.length === 0) return;

    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.testimonialsData.length - 1; // Loop to last slide
    }
    this.resetAutoPlay();
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.testimonialsData.length) {
      this.currentSlide = index;
      this.resetAutoPlay();
    }
  }

  // Auto-play Methods
  startAutoPlay(): void {
    if (this.isAutoPlaying && this.testimonialsData.length > 1) {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoPlayDelay);
    }
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  pauseAutoPlay(): void {
    this.stopAutoPlay();
  }

  resumeAutoPlay(): void {
    if (this.isAutoPlaying && this.testimonialsData.length > 1) {
      this.startAutoPlay();
    }
  }

  resetAutoPlay(): void {
    this.stopAutoPlay();
    if (this.isAutoPlaying && this.testimonialsData.length > 1) {
      this.startAutoPlay();
    }
  }

  // Touch Event Handlers with RTL support
  private handleTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  private handleTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipeGesture();
  }

  private handleSwipeGesture(): void {
    const swipeThreshold = 50; // Minimum distance for swipe
    const swipeDistance = this.touchStartX - this.touchEndX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (this.isRTL) {
        // In RTL, reverse the swipe logic
        if (swipeDistance > 0) {
          // Swipe left in RTL - previous slide
          this.previousSlide();
        } else {
          // Swipe right in RTL - next slide
          this.nextSlide();
        }
      } else {
        // Normal LTR behavior
        if (swipeDistance > 0) {
          // Swipe left - next slide
          this.nextSlide();
        } else {
          // Swipe right - previous slide
          this.previousSlide();
        }
      }
    }
  }

  // Keyboard Navigation with RTL support
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.testimonialsData.length <= 1) return;

    if (this.isRTL) {
      // In RTL, reverse arrow key behavior
      if (event.key === 'ArrowLeft') {
        this.nextSlide();
      } else if (event.key === 'ArrowRight') {
        this.previousSlide();
      }
    } else {
      // Normal LTR behavior
      if (event.key === 'ArrowLeft') {
        this.previousSlide();
      } else if (event.key === 'ArrowRight') {
        this.nextSlide();
      }
    }
  }
}

import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LandingHeaderComponent } from '../header/header.component';
import { LandingFooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, LandingHeaderComponent, LandingFooterComponent],
  template: `
    <app-landing-header></app-landing-header>
    <section class="privacy-section"  [attr.data-direction]="getCurrentDirection()">
      <div class="container mx-auto max-w-4xl px-6 py-16">
        <!-- Hero Section -->
        <div class="hero-section text-center mb-16" style="margin-top: 80px;">
          <div class="hero-icon mb-6">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.1 7 14 7.9 14 9S13.1 11 12 11 10 10.1 10 9 10.9 7 12 7ZM12 17C10.9 17 10 16.1 10 15S10.9 13 12 13 14 13.9 14 15 13.1 17 12 17Z" fill="currentColor"/>
            </svg>
          </div>
          <h1 class="hero-title">{{ 'privacy.title' | translate | async }}</h1>
          <p class="hero-subtitle">{{ 'privacy.subtitle' | translate | async }}</p>
        </div>

        <!-- Privacy Content -->
        <div class="privacy-content">
          <!-- Introduction -->
          <section class="privacy-section-item">
            <h2 class="section-title">{{ 'privacy.introduction.title' | translate | async }}</h2>
            <p class="section-content">{{ 'privacy.introduction.content' | translate | async }}</p>
          </section>

          <!-- Information We Collect -->
          <section class="privacy-section-item">
            <h2 class="section-title">{{ 'privacy.dataCollection.title' | translate | async }}</h2>
            <p class="section-content">{{ 'privacy.dataCollection.content' | translate | async }}</p>
            <ul class="privacy-list">
              <li>{{ 'privacy.dataCollection.items.fullName' | translate | async }}</li>
              <li>{{ 'privacy.dataCollection.items.email' | translate | async }}</li>
              <li>{{ 'privacy.dataCollection.items.phone' | translate | async }}</li>
              <li>{{ 'privacy.dataCollection.items.gender' | translate | async }}</li>
              <li>{{ 'privacy.dataCollection.items.birthDate' | translate | async }}</li>
              <li>{{ 'privacy.dataCollection.items.location' | translate | async }}</li>
              <li>{{ 'privacy.dataCollection.items.address' | translate | async }}</li>
              <li>{{ 'privacy.dataCollection.items.healthData' | translate | async }}</li>
              <li>{{ 'privacy.dataCollection.items.usageData' | translate | async }}</li>
              <li>{{ 'privacy.dataCollection.items.cookies' | translate | async }}</li>
            </ul>
          </section>

          <!-- How We Use Information -->
          <section class="privacy-section-item">
            <h2 class="section-title">{{ 'privacy.dataUsage.title' | translate | async }}</h2>
            <p class="section-content">{{ 'privacy.dataUsage.content' | translate | async }}</p>
            <ul class="privacy-list">
              <li>{{ 'privacy.dataUsage.purposes.serviceDelivery' | translate | async }}</li>
              <li>{{ 'privacy.dataUsage.purposes.userExperience' | translate | async }}</li>
              <li>{{ 'privacy.dataUsage.purposes.communication' | translate | async }}</li>
              <li>{{ 'privacy.dataUsage.purposes.notifications' | translate | async }}</li>
              <li>{{ 'privacy.dataUsage.purposes.serviceImprovement' | translate | async }}</li>
            </ul>
          </section>

          <!-- Information Sharing -->
          <section class="privacy-section-item">
            <h2 class="section-title">{{ 'privacy.dataSharing.title' | translate | async }}</h2>
            <p class="section-content">{{ 'privacy.dataSharing.content' | translate | async }}</p>
            <ul class="privacy-list">
              <li>{{ 'privacy.dataSharing.cases.consent' | translate | async }}</li>
              <li>{{ 'privacy.dataSharing.cases.legal' | translate | async }}</li>
              <li>{{ 'privacy.dataSharing.cases.partners' | translate | async }}</li>
            </ul>
          </section>

          <!-- Security -->
          <section class="privacy-section-item">
            <h2 class="section-title">{{ 'privacy.security.title' | translate | async }}</h2>
            <p class="section-content">{{ 'privacy.security.content' | translate | async }}</p>
          </section>

          <!-- Cookies -->
          <section class="privacy-section-item">
            <h2 class="section-title">{{ 'privacy.cookies.title' | translate | async }}</h2>
            <p class="section-content">{{ 'privacy.cookies.content' | translate | async }}</p>
          </section>

          <!-- User Rights -->
          <section class="privacy-section-item">
            <h2 class="section-title">{{ 'privacy.userRights.title' | translate | async }}</h2>
            <p class="section-content">{{ 'privacy.userRights.content' | translate | async }}</p>
            <ul class="privacy-list">
              <li>{{ 'privacy.userRights.rights.access' | translate | async }}</li>
              <li>{{ 'privacy.userRights.rights.modify' | translate | async }}</li>
              <li>{{ 'privacy.userRights.rights.withdraw' | translate | async }}</li>
            </ul>
          </section>

          <!-- Contact Information -->
          <section class="privacy-section-item">
            <h2 class="section-title">{{ 'privacy.contact.title' | translate | async }}</h2>
            <p class="section-content">{{ 'privacy.contact.content' | translate | async }}</p>
            <div class="contact-info">
              <p><strong>{{ 'privacy.contact.email' | translate | async }}</strong> info&#64;procare.live</p>
              <p><strong>{{ 'privacy.contact.phone' | translate | async }}</strong> +201119858928</p>
            </div>
          </section>

          <!-- Last Updated -->
          <section class="privacy-section-item">
            <h2 class="section-title">{{ 'privacy.lastUpdated.title' | translate | async }}</h2>
            <p class="section-content">{{ 'privacy.lastUpdated.content' | translate | async }}</p>
          </section>
        </div>

        <!-- Back to Home Button -->
        <div class="back-to-home text-center my-12">
          <button routerLink="/landing" class="btn-primary" style="margin-block: 3%;">
            {{ 'privacy.backToHome' | translate | async }}
          </button>
        </div>
      </div>
    </section>
    <app-landing-footer></app-landing-footer>
  `,
  styles: [`
    .privacy-section {
      background: var(--secondary);
      min-height: 100vh;
    }

    .hero-section {
      .hero-icon {
        color: var(--primary);
        margin-bottom: 1.5rem;
      }

      .hero-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 1rem;
      }

      .hero-subtitle {
        font-size: 1.2rem;
        color: var(--text);
        opacity: 0.8;
      }
    }

    .privacy-content {
      background: white;
      border-radius: 16px;
      padding: 3rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(205, 44, 78, 0.1);
    }

    .privacy-section-item {
      margin-bottom: 3rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .section-title {
      color: var(--primary);
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--secondary);
    }

    .section-content {
      color: var(--text);
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }

    .privacy-list {
      list-style: none;
      padding: 0;
      margin: 1.5rem 0;

      li {
        color: var(--text);
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 0.8rem;
        position: relative;
        padding-left: 2rem;

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--primary);
          font-weight: bold;
          font-size: 1.2rem;
        }
      }
    }

    .contact-info {
      background: var(--secondary);
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 1rem;

      p {
        margin-bottom: 0.5rem;
        color: var(--text);

        &:last-child {
          margin-bottom: 0;
        }
      }

      strong {
        color: var(--primary);
      }
    }

    .btn-primary {
      background: var(--primary);
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;

      &:hover {
        background: #b8244a;
        transform: translateY(-2px);
      }
    }

    /* RTL Support */
    [dir="rtl"] .privacy-list li,
    [data-direction="rtl"] .privacy-list li {
      padding-right: 2rem;
      padding-left: 0;
      text-align: right;

      &::before {
        right: 0;
        left: auto;
      }
    }

    [dir="rtl"] .section-title,
    [data-direction="rtl"] .section-title {
      text-align: right;
    }

    [dir="rtl"] .section-content,
    [data-direction="rtl"] .section-content {
      text-align: right;
    }

    [dir="rtl"] .contact-info,
    [data-direction="rtl"] .contact-info {
      text-align: right;
    }

    @media (max-width: 768px) {
      .hero-section .hero-title {
        font-size: 2rem;
      }

      .privacy-content {
        padding: 2rem;
      }

      .section-title {
        font-size: 1.5rem;
      }

      .section-content {
        font-size: 1rem;
      }
    }
  `]
})
export class PrivacyComponent implements OnInit, OnDestroy {
  isRTL = false;
  private mutationObserver?: MutationObserver;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.detectRTL();
    this.setupDirectionObserver();
  }

  ngOnDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  // RTL Detection Method
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

  // Get current direction for template usage
  getCurrentDirection(): string {
    return this.isRTL ? 'rtl' : 'ltr';
  }
}

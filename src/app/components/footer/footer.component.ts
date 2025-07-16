import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section animate-slide-up" #animateElement [style.--delay]="'0s'">
            <h3 class="footer-title">ProCare</h3>
            <p>{{ 'landing.footer_description' | translate | async }}</p>
            <div class="social-links">
              <a href="https://www.facebook.com/share/1Brzg9uWRF/?mibextid=wwXIfr" target="_blank" aria-label="Facebook" class="social-link facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <!--
              <a href="#" aria-label="Twitter" class="social-link"><i class="bi bi-twitter-x"></i></a>
              <a href="#" aria-label="Instagram" class="social-link"><i class="bi bi-instagram"></i></a>
              <a href="#" aria-label="YouTube" class="social-link"><i class="bi bi-youtube"></i></a>
--></div>
          </div>

          <div class="footer-section animate-slide-up" #animateElement [style.--delay]="'0.1s'">
            <h4>{{ 'landing.footer_quick_links' | translate | async }}</h4>
            <ul>
              <li><a href="#features">{{ 'landing.features' | translate | async }}</a></li>
              <li><a href="#how-it-works">{{ 'landing.how_it_works' | translate | async }}</a></li>
              <li><a href="#why-choose">{{ 'landing.why_choose' | translate | async }}</a></li>
              <li><a href="#faq">{{ 'landing.faq' | translate | async }}</a></li>
              <li><a routerLink="/terms">{{ 'terms.title' | translate | async }}</a></li>
            </ul>
          </div>

          <div class="footer-section animate-slide-up" #animateElement [style.--delay]="'0.2s'">
            <h4>{{ 'landing.footer_contact' | translate | async }}</h4>
            <ul>
              <li>📞 <a href="tel:+201097478188">{{ 'landing.footer_phone' | translate | async }}</a></li>
              <li>✉️ <a href="mailto:info@procare.live">{{ 'landing.footer_email' | translate | async }}</a></li>
              <li>👥 <a href="mailto:hr@procare.live">{{ 'landing.footer_email_hr' | translate | async }}</a></li>
              <li>🛠️ <a href="mailto:support@procare.live">{{ 'landing.footer_email_support' | translate | async }}</a></li>
              <li><i class="bi bi-geo-alt-fill"></i> <a href="https://maps.app.goo.gl/JmxQnrNFHcw6eRhU9?g_st=ac" target="_blank">{{ 'landing.footer_address' | translate | async }}</a></li>
            </ul>
          </div>

          <div class="footer-section animate-slide-up" #animateElement [style.--delay]="'0.3s'">
            <h4>{{ 'landing.footer_download' | translate | async }}</h4>
            <div class="app-buttons">
              <a href="#" class="app-button">
                <img src="assets/images/app-store.svg" alt="App Store">
              </a>
              <a href="#" class="app-button">
                <img src="assets/images/google-play.svg" alt="Google Play">
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom animate-fade-in" #animateElement [style.--delay]="'0.4s'">
          <p>&copy; {{ year }} ProCare. {{ 'landing.footer_rights' | translate | async }}</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--primary);
      color: white;
      padding: 3rem 0 1rem;
      margin-top: 0rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section {
      h3, h4 {
        color: white;
        margin-bottom: 1rem;
        font-size: 1.2rem;
      }

      p {
        line-height: 1.6;
        margin-bottom: 1rem;
        opacity: 0.9;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 0.5rem;

          a {
            color: white;
            text-decoration: none;
            opacity: 0.9;
            transition: opacity 0.3s;

            &:hover { opacity: 1; }
          }
        }
      }
    }

    .social-links {
      display: flex;
      gap: 1rem;

      .social-link {
        color: white;
        font-size: 1.5rem;
        text-decoration: none;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);

        &:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.2);
        }

        &.facebook:hover {
          background: #1877f2;
        }

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }

    .app-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .app-button {
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-2px);
        }
      }

      img {
        height: 40px;
        width: auto;
      }
    }

    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.2);

      p {
        opacity: 0.8;
        font-size: 0.9rem;
      }
    }

    /* Scroll Animations */
    .animate-slide-up {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transition-delay: var(--delay);
    }

    .animate-fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transition-delay: var(--delay);
    }

    /* Active state when in view */
    .animate-slide-up.in-view {
      opacity: 1;
      transform: translateY(0);
    }

    .animate-fade-in.in-view {
      opacity: 1;
      transform: translateY(0);
    }

    /* Original keyframes */
    @keyframes slideUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      to {
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .app-buttons {
        align-items: center;
      }
    }
  `]
})
export class LandingFooterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('animateElement') animateElements!: QueryList<ElementRef>;

  private observer!: IntersectionObserver;
  year = new Date().getFullYear();

  ngOnInit() {
    // Setup intersection observer for scroll animations
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
  }

  ngAfterViewInit() {
    // Observe all animate elements
    this.animateElements.forEach(element => {
      this.observer.observe(element.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

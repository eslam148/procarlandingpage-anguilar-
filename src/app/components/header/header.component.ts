import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <header [class.scrolled]="isScrolled">
      <nav>
        <div class="container">
          <div class="logo">ProCare</div>
          <button
            class="mobile-menu-toggle"
            [class.active]="isMobileMenuOpen"
            (click)="toggleMobileMenu()"
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div class="nav-links" [class.mobile-open]="isMobileMenuOpen">
            <a href="#features" (click)="closeMobileMenu()">{{ 'landing.features' | translate | async }}</a>
            <a href="#how-it-works" (click)="closeMobileMenu()">{{ 'landing.how_it_works' | translate | async }}</a>
            <a href="#why-choose" (click)="closeMobileMenu()">{{ 'landing.why_choose' | translate | async }}</a>
            <a href="#faq" (click)="closeMobileMenu()">{{ 'landing.faq' | translate | async }}</a>
            <a routerLink="/terms" (click)="closeMobileMenu()">{{ 'terms.title' | translate | async }}</a>

            <!-- Language Switcher -->
            <div class="lang-switcher">
              <button class="lang-btn" (click)="toggleLanguage()">
                {{ currentLang === 'ar' ? 'English':'العربية' }}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    header {
      background: var(--light);
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    /* Scrolled state with enhanced styling */
    header.scrolled {
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    nav {
      padding: 1rem 0;
      transition: padding 0.3s ease;

      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
    }

    /* Compact nav when scrolled */
    header.scrolled nav {
      padding: 0.75rem 0;
    }

    .logo {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--primary);
      transition: all 0.3s ease;
    }

    header.scrolled .logo {
      font-size: 1.6rem;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      a {
        text-decoration: none;
        color: var(--text);
        font-weight: 600;
        transition: all 0.3s ease;
        position: relative;
        padding: 0.5rem 0;

        &:hover {
          color: var(--primary);
          transform: translateY(-1px);
        }

        /* Underline animation */
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.3s ease;
        }

        &:hover::after {
          width: 100%;
        }
      }
    }

    .lang-switcher {
      .lang-btn {
        background: var(--primary);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        &:hover {
          background: var(--primary);
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(205, 44, 78, 0.3);

          &::before {
            left: 100%;
          }
        }

        &:active {
          transform: translateY(0);
        }
      }
    }

    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      flex-direction: column;
      justify-content: space-around;
      width: 2rem;
      height: 2rem;
      position: relative;

      span {
        display: block;
        height: 3px;
        width: 100%;
        background-color: var(--primary);
        border-radius: 3px;
        transition: all 0.3s ease;
        transform-origin: center;
      }

      &.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }

      &.active span:nth-child(2) {
        opacity: 0;
      }

      &.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
    }



    /* Mobile responsiveness */
    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: flex;
      }

      .nav-links {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--light);
        flex-direction: column;
        padding: 2rem 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        gap: 1rem;

        &.mobile-open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        a {
          padding: 1rem 0;
          font-size: 1.1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          width: 100%;
          text-align: center;

          &:last-child {
            border-bottom: none;
          }
        }

        .lang-switcher {
          margin-top: 1rem;

          .lang-btn {
            width: 100%;
            padding: 1rem;
            font-size: 1.1rem;
          }
        }
      }

      nav {
        padding: 0.75rem 0;
      }

      header.scrolled nav {
        padding: 0.5rem 0;
      }

      .logo {
        font-size: 1.6rem;
      }

      header.scrolled .logo {
        font-size: 1.4rem;
      }
    }

    /* Tablet responsiveness */
    @media (max-width: 1024px) and (min-width: 769px) {
      .nav-links {
        gap: 1rem;
      }

      .nav-links a {
        font-size: 0.9rem;
      }

      .lang-switcher .lang-btn {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      header, nav, .logo, .nav-links a, .lang-btn, .mobile-menu-toggle span {
        transition: none;
      }
    }
  `]
})
export class LandingHeaderComponent implements OnInit, OnDestroy {
  currentLang = 'ar';
  isScrolled = false;
  isMobileMenuOpen = false;
  private destroy$ = new Subject<void>();
  isChangingLanguage = false;

  constructor(private translationService: TranslationService) {
    this.translationService.getCurrentLang()
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLang = lang;
      });
    this.translationService.getIsChangingLanguage()
      .pipe(takeUntil(this.destroy$))
      .subscribe(isChanging => {
        this.isChangingLanguage = isChanging;
      });
  }

  ngOnInit() {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }

  private checkScrollPosition(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50; // Add scrolled class after 50px
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.translationService.setLanguageWithApi(this.currentLang);
    // Apply direction changes
    const htmlElement = document.documentElement;
    if (this.currentLang === 'ar') {
      htmlElement.setAttribute('dir', 'rtl');
      htmlElement.setAttribute('lang', 'ar');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
      htmlElement.setAttribute('lang', 'en');
    }
    // Close mobile menu after language change
    this.closeMobileMenu();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

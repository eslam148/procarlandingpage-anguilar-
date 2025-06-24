import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingHeaderComponent } from './components/header/header.component';
import { LandingHeroComponent } from './components/hero/hero.component';
import { LandingFeaturesComponent } from './components/features/features.component';
import { LandingHowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { LandingWhyChooseComponent } from './components/why-choose/why-choose.component';
import { LandingTestimonialsComponent } from './components/testimonials/testimonials.component';
import { LandingFooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
   imports: [
    CommonModule,
    RouterOutlet,
    LandingHeaderComponent,
    LandingHeroComponent,
    LandingFeaturesComponent,
    LandingHowItWorksComponent,
    LandingWhyChooseComponent,
    LandingTestimonialsComponent,
    LandingFooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
showBackToTopButton = false;
  isOnFooter = false;
  isContactExpanded = false;

  ngOnInit() {
    // Initial check for scroll position
    this.checkScrollPosition();
  }

  ngOnDestroy() {
    // Component cleanup is handled automatically for HostListener
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  private checkScrollPosition(): void {
    // Show button after scrolling down 300px
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showBackToTopButton = scrollPosition > 300;

    // Check if user is near footer
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const footerThreshold = documentHeight - windowHeight - 200; // 200px before footer

    this.isOnFooter = scrollPosition > footerThreshold;
  }

  scrollToTop(): void {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  toggleContact(): void {
    this.isContactExpanded = !this.isContactExpanded;

    // Auto-close after 5 seconds if expanded
    if (this.isContactExpanded) {
      setTimeout(() => {
        this.isContactExpanded = false;
      }, 5000);
    }
  }}

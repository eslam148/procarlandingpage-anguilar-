import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LandingHeaderComponent } from '../header/header.component';
import { LandingFooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, LandingHeaderComponent, LandingFooterComponent],
  template: `
    <app-landing-header></app-landing-header>
    <section class="terms-section">
      <div class="container mx-auto max-w-5xl px-6 py-16" >
        <!-- Hero Section -->
        <div class="hero-section text-center mb-16" >
          <div class="hero-icon mb-6" style="margin-top: 80px;">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 class="hero-title">{{ 'terms.title' | translate | async }}</h1>
          <p class="hero-subtitle">{{ 'terms.intro' | translate | async }}</p>
          <div class="hero-divider"></div>
        </div>

        <!-- Content Sections -->
        <div class="content-wrapper">
          <div class="terms-card">
            <div class="section-header">
              <span class="section-number">01</span>
              <h2 class="section-title">{{ 'terms.acceptance.title' | translate | async }}</h2>
            </div>
            <div class="section-content">
              <p>{{ 'terms.acceptance.content' | translate | async }}</p>
            </div>
          </div>

          <div class="terms-card">
            <div class="section-header">
              <span class="section-number">02</span>
              <h2 class="section-title">{{ 'terms.dataCollection.title' | translate | async }}</h2>
            </div>
            <div class="section-content">
              <p class="mb-4">{{ 'terms.dataCollection.content' | translate | async }}</p>
              <ul class="custom-list">
                <li *ngFor="let point of (('terms.dataCollection.points' | translate) | async)">{{ point }}</li>
              </ul>
              <p class="mt-4">{{ 'terms.dataCollection.conclusion' | translate | async }}</p>
            </div>
          </div>

          <div class="terms-card">
            <div class="section-header">
              <span class="section-number">03</span>
              <h2 class="section-title">{{ 'terms.privacy.title' | translate | async }}</h2>
            </div>
            <div class="section-content">
              <p>{{ 'terms.privacy.content' | translate | async }}</p>
            </div>
          </div>

          <div class="terms-card">
            <div class="section-header">
              <span class="section-number">04</span>
              <h2 class="section-title">{{ 'terms.cookies.title' | translate | async }}</h2>
            </div>
            <div class="section-content">
              <p>{{ 'terms.cookies.content' | translate | async }}</p>
            </div>
          </div>

          <div class="terms-card">
            <div class="section-header">
              <span class="section-number">05</span>
              <h2 class="section-title">{{ 'terms.intellectualProperty.title' | translate | async }}</h2>
            </div>
            <div class="section-content">
              <p>{{ 'terms.intellectualProperty.content' | translate | async }}</p>
            </div>
          </div>

          <div class="terms-card">
            <div class="section-header">
              <span class="section-number">06</span>
              <h2 class="section-title">{{ 'terms.disclaimer.title' | translate | async }}</h2>
            </div>
            <div class="section-content">
              <ul class="custom-list">
                <li *ngFor="let point of (('terms.disclaimer.points' | translate) | async)">{{ point }}</li>
              </ul>
            </div>
          </div>

          <div class="terms-card">
            <div class="section-header">
              <span class="section-number">07</span>
              <h2 class="section-title">{{ 'terms.changes.title' | translate | async }}</h2>
            </div>
            <div class="section-content">
              <p>{{ 'terms.changes.content' | translate | async }}</p>
            </div>
          </div>

          <div class="terms-card" style="margin-bottom: 80px;">
            <div class="section-header">
              <span class="section-number">08</span>
              <h2 class="section-title">{{ 'terms.governingLaw.title' | translate | async }}</h2>
            </div>
            <div class="section-content">
              <p>{{ 'terms.governingLaw.content' | translate | async }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <app-landing-footer></app-landing-footer>
  `,
  styles: [`
    .terms-section {
      background: var(--secondary);
      min-height: 100vh;

      position: relative;
    }

    .terms-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 25% 25%, rgba(205, 44, 78, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
    }

    .container {
      position: relative;
      z-index: 1;
    }

    /* Hero Section */
    .hero-section {
      margin-bottom: 4rem;
    }

    .hero-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 120px;
      background: var(--primary);
      border-radius: 50%;
      margin: 0 auto;
      color: white;
      box-shadow: 0 20px 40px rgba(205, 44, 78, 0.3);
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: var(--text);
      max-width: 600px;
      margin: 0 auto 2rem;
      line-height: 1.6;
      opacity: 0.8;
    }

    .hero-divider {
      width: 100px;
      height: 4px;
      background: var(--primary);
      margin: 0 auto;
      border-radius: 2px;
    }

    /* Content Wrapper */
    .content-wrapper {
      display: grid;
      gap: 2rem;
      max-width: 4xl;
      margin: 0 auto;
    }

    /* Terms Cards */
    .terms-card {
      background: var(--light);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(205, 44, 78, 0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .terms-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--primary);
    }

    .terms-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(205, 44, 78, 0.15), 0 10px 10px -5px rgba(205, 44, 78, 0.1);
      border-color: var(--primary);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--secondary);
    }

    .section-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: var(--primary);
      color: white;
      font-weight: 700;
      font-size: 1.125rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(205, 44, 78, 0.3);
      flex-shrink: 0;
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      margin: 0;
      line-height: 1.3;
    }

    .section-content {
      color: var(--text);
      line-height: 1.7;
      font-size: 1rem;
    }

    .section-content p {
      margin-bottom: 1rem;
    }

    .section-content p:last-child {
      margin-bottom: 0;
    }

    /* Custom List Styles */
    .custom-list {
      list-style: none;
      padding: 0;
      margin: 1rem 0;
    }

    .custom-list li {
      position: relative;
      padding-left: 2rem;
      margin-bottom: 0.75rem;
      line-height: 1.6;
    }

    .custom-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      background: var(--primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.125rem;
      }

      .terms-card {
        padding: 1.5rem;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }

      .section-title {
        font-size: 1.25rem;
      }
    }

    @media (max-width: 480px) {
      .hero-icon {
        width: 80px;
        height: 80px;
      }

      .hero-title {
        font-size: 2rem;
      }

      .terms-card {
        padding: 1rem;
      }
    }
  `]
})
export class TermsComponent {}

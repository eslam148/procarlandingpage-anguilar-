import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LandingHeaderComponent } from '../header/header.component';
import { LandingFooterComponent } from '../footer/footer.component';
import { AccountDeletionService } from '../../services/account-deletion.service';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe, LandingHeaderComponent, LandingFooterComponent],
  template: `
    <app-landing-header></app-landing-header>
    <section class="delete-account-section" [attr.data-direction]="getCurrentDirection()">
      <div class="container mx-auto max-w-3xl px-6 py-16">
        <!-- Hero Section -->
        <div class="hero-section text-center mb-16" style="margin-top: 80px;">
          <div class="hero-icon mb-6">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 7L18.1 19.9C18 21 17 22 15.9 22H8.1C7 22 6 21 5.9 19.9L5 7M10 11V17M14 11V17M15 7V4C15 3.4 14.6 3 14 3H10C9.4 3 9 3.4 9 4V7M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 class="hero-title">{{ 'deleteAccount.title' | translate | async }}</h1>
          <p class="hero-subtitle">{{ 'deleteAccount.subtitle' | translate | async }}</p>
        </div>

        <!-- Warning Card -->
        <div class="warning-card mb-8" *ngIf="currentStep === 1">
          <div class="warning-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="warning-content">
            <h3>{{ 'deleteAccount.warning.title' | translate | async }}</h3>
            <ul>
              <li>{{ 'deleteAccount.warning.point1' | translate | async }}</li>
              <li>{{ 'deleteAccount.warning.point2' | translate | async }}</li>
              <li>{{ 'deleteAccount.warning.point3' | translate | async }}</li>
              <li>{{ 'deleteAccount.warning.point4' | translate | async }}</li>
            </ul>
          </div>
        </div>

        <!-- Step 1: Email Verification -->
        <div class="delete-card" *ngIf="currentStep === 1">
          <div class="step-header">
            <span class="step-number">01</span>
            <h2 class="step-title">{{ 'deleteAccount.step1.title' | translate | async }}</h2>
          </div>
          <div class="step-content">
            <p class="step-description">{{ 'deleteAccount.step1.description' | translate | async }}</p>
            <div class="form-group">
              <label for="email">{{ 'deleteAccount.step1.emailLabel' | translate | async }}</label>
              <input
                type="email"
                id="email"
                [(ngModel)]="email"
                name="email"
                [placeholder]="('deleteAccount.step1.emailPlaceholder' | translate | async) || ''"
                required
                [disabled]="isLoading"
                (keyup.enter)="sendOTP()">
              <button type="button" class="btn-primary" [disabled]="!email || isLoading" (click)="sendOTP()">
                <span *ngIf="!isLoading">{{ 'deleteAccount.step1.sendOTP' | translate | async }}</span>
                <span *ngIf="isLoading" class="loading-spinner"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Step 2: OTP Verification -->
        <div class="delete-card" *ngIf="currentStep === 2">
          <div class="step-header">
            <span class="step-number">02</span>
            <h2 class="step-title">{{ 'deleteAccount.step2.title' | translate | async }}</h2>
          </div>
          <div class="step-content">
            <p class="step-description">{{ 'deleteAccount.step2.description' | translate | async }} <strong>{{email}}</strong></p>
            <div class="form-group">
              <label for="otp">{{ 'deleteAccount.step2.otpLabel' | translate | async }}</label>
              <input
                type="text"
                id="otp"
                [(ngModel)]="otpCode"
                name="otp"
                [placeholder]="('deleteAccount.step2.otpPlaceholder' | translate | async) || ''"
                maxlength="6"
                required
                [disabled]="isLoading"
                (keyup.enter)="verifyOTP()">
              <div class="otp-actions">
                <button type="button" class="btn-primary" [disabled]="!otpCode || otpCode.length !== 6 || isLoading" (click)="verifyOTP()">
                  <span *ngIf="!isLoading">{{ 'deleteAccount.step2.verify' | translate | async }}</span>
                  <span *ngIf="isLoading" class="loading-spinner"></span>
                </button>
                <button type="button" class="btn-secondary" (click)="resendOTP()" [disabled]="isLoading || resendCooldown > 0">
                  <span *ngIf="resendCooldown === 0">{{ 'deleteAccount.step2.resend' | translate | async }}</span>
                  <span *ngIf="resendCooldown > 0">{{ 'deleteAccount.step2.resendIn' | translate | async }} ({{resendCooldown}}s)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div class="success-card" *ngIf="currentStep === 3">
          <div class="success-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h2>{{ 'deleteAccount.success.title' | translate | async }}</h2>
          <p>{{ 'deleteAccount.success.message' | translate | async }}</p>
          <button class="btn-primary" routerLink="/landing">
            {{ 'deleteAccount.success.backToHome' | translate | async }}
          </button>
        </div>

        <!-- Error Message -->
        <div class="error-message" *ngIf="errorMessage">
          <div class="error-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span>{{ errorMessage }}</span>
        </div>
      </div>
    </section>
    <app-landing-footer></app-landing-footer>
  `,
  styles: [`
    .delete-account-section {
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

    .warning-card {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 12px;
      padding: 2rem;
      display: flex;
      gap: 1rem;
      align-items: flex-start;

      .warning-icon {
        color: #856404;
        flex-shrink: 0;
      }

      .warning-content {
        h3 {
          color: #856404;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        ul {
          list-style: none;
          padding: 0;

          li {
            color: #856404;
            margin-bottom: 0.5rem;
            position: relative;
            padding-left: 1.5rem;

            &::before {
              content: '⚠️';
              position: absolute;
              left: 0;
            }
          }
        }
      }
    }

    .delete-card, .success-card {
      background: white;
      border-radius: 16px;
      padding: 2.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(205, 44, 78, 0.1);
    }

    .step-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;

      .step-number {
        background: var(--primary);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1.1rem;
      }

      .step-title {
        color: var(--primary);
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0;
      }
    }

    .step-content {
      .step-description {
        color: var(--text);
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 2rem;

        &.danger {
          color: #dc3545;
          font-weight: 500;
        }
      }

      .form-group {
        label {
          display: block;
          color: var(--text);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          transition: border-color 0.3s ease;

          &:focus {
            outline: none;
            border-color: var(--primary);
          }

          &:disabled {
            background-color: #f8f9fa;
            opacity: 0.6;
          }
        }
      }
    }

    .otp-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .confirmation-checkbox {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 2rem;

      input[type="checkbox"] {
        width: auto;
        margin: 0;
      }

      label {
        margin: 0;
        color: var(--text);
        cursor: pointer;
      }
    }

    .final-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary, .btn-danger {
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .btn-primary {
      background: var(--primary);
      color: white;

      &:hover:not(:disabled) {
        background: #b8244a;
        transform: translateY(-2px);
      }
    }

    .btn-secondary {
      background: #6c757d;
      color: white;

      &:hover:not(:disabled) {
        background: #5a6268;
        transform: translateY(-2px);
      }
    }

    .btn-danger {
      background: #dc3545;
      color: white;

      &:hover:not(:disabled) {
        background: #c82333;
        transform: translateY(-2px);
      }
    }

    .success-card {
      text-align: center;

      .success-icon {
        color: #28a745;
        margin-bottom: 1.5rem;
      }

      h2 {
        color: #28a745;
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      p {
        color: var(--text);
        font-size: 1.1rem;
        margin-bottom: 2rem;
      }
    }

    .error-message {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .error-icon {
        flex-shrink: 0;
      }
    }

    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* RTL Support */
    [dir="rtl"] .warning-card,
    [data-direction="rtl"] .warning-card {
      text-align: right;

      .warning-content {
        ul li {
          padding-right: 1.5rem;
          padding-left: 0;

          &::before {
            right: 0;
            left: auto;
          }
        }
      }
    }

    [dir="rtl"] .step-header,
    [data-direction="rtl"] .step-header {
      text-align: right;
    }

    [dir="rtl"] .step-content,
    [data-direction="rtl"] .step-content {
      text-align: right;

      .step-description {
        text-align: right;
      }

      .form-group {
        label {
          text-align: right;
        }

        input {
          text-align: right;
        }
      }
    }

    [dir="rtl"] .confirmation-checkbox,
    [data-direction="rtl"] .confirmation-checkbox {
      flex-direction: row-reverse;
      text-align: right;

      label {
        text-align: right;
      }
    }

    [dir="rtl"] .success-card,
    [data-direction="rtl"] .success-card {
      text-align: right;
    }

    [dir="rtl"] .error-message,
    [data-direction="rtl"] .error-message {
      text-align: right;
    }

    @media (max-width: 768px) {
      .hero-section .hero-title {
        font-size: 2rem;
      }

      .delete-card, .success-card {
        padding: 1.5rem;
      }

      .step-header {
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;

        .step-title {
          font-size: 1.5rem;
        }
      }

      .otp-actions, .final-actions {
        flex-direction: column;
      }

      .btn-primary, .btn-secondary, .btn-danger {
        width: 100%;
        justify-content: center;
      }

      /* RTL Mobile adjustments */
      [dir="rtl"] .step-header,
      [data-direction="rtl"] .step-header {
        text-align: center;
      }
    }
  `]
})
export class DeleteAccountComponent implements OnInit, OnDestroy {
  currentStep = 1;
  email = '';
  otpCode = '';
  isLoading = false;
  errorMessage = '';
  resendCooldown = 0;
  isRTL = false;
  private mutationObserver?: MutationObserver;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private accountDeletionService: AccountDeletionService
  ) {}

  ngOnInit() {
    // Initialize component
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

  // Debug method to test step progression
  debugGoToStep(step: number): void {
    console.log(`Debug: Moving to step ${step}`);
    this.currentStep = step;
  }

  // Debug method to test API call
  debugTestAPI(): void {
    console.log('Debug: Testing API with test email');
    this.email = 'test@example.com';
    this.sendOTP();
  }

  // Debug method to simulate successful OTP send
  debugSimulateOTPSent(): void {
    console.log('Debug: Simulating successful OTP send');
    this.currentStep = 2;
    this.startResendCooldown();
  }

  sendOTP() {
    if (!this.email) return;

    this.isLoading = true;
    this.errorMessage = '';

    console.log('Sending OTP request for email:', this.email);

    this.accountDeletionService.requestAccountDeletion(this.email).subscribe({
      next: (response) => {
        console.log('OTP Response:', response);

        // Check different possible response structures
        if (response.success === true || response.status === 200 || response.status === 0) {
          console.log('OTP sent successfully, moving to step 2');
          this.currentStep = 2;
          this.startResendCooldown();
        } else {
          console.log('OTP failed with response:', response);
          this.errorMessage = response.message || 'Failed to send OTP. Please try again.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error sending OTP:', error);
        console.error('Error status:', error.status);
        console.error('Error statusText:', error.statusText);
        console.error('Error error:', error.error);

        let errorMsg = 'Failed to send OTP. Please try again.';
        if (error.status === 0) {
          errorMsg = 'Network error. Please check your internet connection.';
        } else if (error.error?.message) {
          errorMsg = error.error.message;
        } else if (error.message) {
          errorMsg = error.message;
        }

        this.errorMessage = errorMsg;
        this.isLoading = false;
      }
    });
  }

  verifyOTP() {
    if (!this.otpCode || this.otpCode.length !== 6) return;

    this.isLoading = true;
    this.errorMessage = '';

    console.log('Verifying OTP:', this.otpCode, 'for email:', this.email);

    this.accountDeletionService.confirmAccountDeletion(this.email, this.otpCode).subscribe({
      next: (response) => {
        console.log('OTP Verification Response:', response);

        // Check different possible response structures
        if (response.success === true || response.status === 200 || response.status === 0) {
          console.log('OTP verified successfully, moving to success step');
          this.currentStep = 3; // Go to success step after OTP verification
        } else {
          console.log('OTP verification failed with response:', response);
          this.errorMessage = response.message || 'Invalid OTP. Please try again.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error verifying OTP:', error);
        this.errorMessage = error.error?.message || error.message || 'Invalid OTP. Please try again.';
        this.isLoading = false;
      }
    });
  }

  resendOTP() {
    this.isLoading = true;
    this.errorMessage = '';

    console.log('Resending OTP for email:', this.email);

    this.accountDeletionService.resendAccountDeletionOtp(this.email).subscribe({
      next: (response) => {
        console.log('Resend OTP Response:', response);

        // Check different possible response structures
        if (response.success === true || response.status === 200 || response.status === 0) {
          console.log('OTP resent successfully');
          this.startResendCooldown();
        } else {
          console.log('Resend OTP failed with response:', response);
          this.errorMessage = response.message || 'Failed to resend OTP. Please try again.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error resending OTP:', error);
        this.errorMessage = error.error?.message || error.message || 'Failed to resend OTP. Please try again.';
        this.isLoading = false;
      }
    });
  }



  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  private startResendCooldown() {
    this.resendCooldown = 60;
    const interval = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }


}

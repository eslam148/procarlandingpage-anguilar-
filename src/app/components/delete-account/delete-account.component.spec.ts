import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { of, throwError } from 'rxjs';
import { DeleteAccountComponent } from './delete-account.component';
import { AccountDeletionService } from '../../services/account-deletion.service';

describe('DeleteAccountComponent', () => {
  let component: DeleteAccountComponent;
  let fixture: ComponentFixture<DeleteAccountComponent>;
  let mockDocument: any;
  let mockAccountDeletionService: jasmine.SpyObj<AccountDeletionService>;

  beforeEach(async () => {
    // Create a mock document
    mockDocument = {
      documentElement: {
        getAttribute: jasmine.createSpy('getAttribute').and.returnValue('ltr'),
        lang: 'en'
      },
      body: {
        getAttribute: jasmine.createSpy('getAttribute').and.returnValue('ltr')
      }
    };

    // Create mock service
    mockAccountDeletionService = jasmine.createSpyObj('AccountDeletionService', [
      'requestAccountDeletion',
      'confirmAccountDeletion',
      'resendAccountDeletionOtp'
    ]);

    // Mock window.getComputedStyle
    spyOn(window, 'getComputedStyle').and.returnValue({
      direction: 'ltr'
    } as CSSStyleDeclaration);

    await TestBed.configureTestingModule({
      imports: [DeleteAccountComponent],
      providers: [
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: AccountDeletionService, useValue: mockAccountDeletionService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect LTR direction by default', () => {
    expect(component.isRTL).toBeFalse();
    expect(component.getCurrentDirection()).toBe('ltr');
  });

  it('should detect RTL when dir attribute is rtl', () => {
    mockDocument.documentElement.getAttribute.and.returnValue('rtl');
    component['detectRTL']();
    expect(component.isRTL).toBeTrue();
    expect(component.getCurrentDirection()).toBe('rtl');
  });

  it('should detect RTL when lang is ar', () => {
    mockDocument.documentElement.getAttribute.and.callFake((attr: string) => {
      if (attr === 'lang') return 'ar';
      return 'ltr';
    });
    component['detectRTL']();
    expect(component.isRTL).toBeTrue();
    expect(component.getCurrentDirection()).toBe('rtl');
  });

  it('should detect RTL when computed style direction is rtl', () => {
    (window.getComputedStyle as jasmine.Spy).and.returnValue({
      direction: 'rtl'
    } as CSSStyleDeclaration);
    component['detectRTL']();
    expect(component.isRTL).toBeTrue();
    expect(component.getCurrentDirection()).toBe('rtl');
  });

  it('should start at step 1', () => {
    expect(component.currentStep).toBe(1);
  });

  it('should initialize with empty form values', () => {
    expect(component.email).toBe('');
    expect(component.otpCode).toBe('');
    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBe('');
    expect(component.resendCooldown).toBe(0);
  });

  it('should progress to step 2 after sending OTP successfully', () => {
    mockAccountDeletionService.requestAccountDeletion.and.returnValue(
      of({ success: true, message: 'OTP sent successfully', status: 200 })
    );

    component.email = 'test@example.com';
    component.sendOTP();

    expect(mockAccountDeletionService.requestAccountDeletion).toHaveBeenCalledWith('test@example.com');
    expect(component.currentStep).toBe(2);
  });

  it('should show error message when sending OTP fails', () => {
    mockAccountDeletionService.requestAccountDeletion.and.returnValue(
      of({ success: false, message: 'Email not found', status: 400 })
    );

    component.email = 'test@example.com';
    component.sendOTP();

    expect(component.errorMessage).toBe('Email not found');
    expect(component.currentStep).toBe(1);
  });

  it('should progress to step 3 (success) after verifying OTP', () => {
    mockAccountDeletionService.confirmAccountDeletion.and.returnValue(
      of({ success: true, message: 'Account deleted successfully', status: 200 })
    );

    component.email = 'test@example.com';
    component.otpCode = '123456';
    component.verifyOTP();

    expect(mockAccountDeletionService.confirmAccountDeletion).toHaveBeenCalledWith('test@example.com', '123456');
    expect(component.currentStep).toBe(3);
  });

  it('should show error message when OTP verification fails', () => {
    mockAccountDeletionService.confirmAccountDeletion.and.returnValue(
      of({ success: false, message: 'Invalid OTP', status: 400 })
    );

    component.email = 'test@example.com';
    component.otpCode = '123456';
    component.verifyOTP();

    expect(component.errorMessage).toBe('Invalid OTP');
    expect(component.currentStep).toBe(2);
  });

  it('should resend OTP successfully', () => {
    mockAccountDeletionService.resendAccountDeletionOtp.and.returnValue(
      of({ success: true, message: 'OTP resent successfully', status: 200 })
    );

    component.email = 'test@example.com';
    component.resendOTP();

    expect(mockAccountDeletionService.resendAccountDeletionOtp).toHaveBeenCalledWith('test@example.com');
    expect(component.resendCooldown).toBe(60);
  });

  it('should go back to previous step', () => {
    component.currentStep = 2;
    component.goBack();
    expect(component.currentStep).toBe(1);
  });

  it('should not go back from step 1', () => {
    component.currentStep = 1;
    component.goBack();
    expect(component.currentStep).toBe(1);
  });

  it('should clean up mutation observer on destroy', () => {
    const disconnectSpy = jasmine.createSpy('disconnect');
    component['mutationObserver'] = { disconnect: disconnectSpy } as any;
    component.ngOnDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});

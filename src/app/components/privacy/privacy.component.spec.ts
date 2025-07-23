import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { PrivacyComponent } from './privacy.component';

describe('PrivacyComponent', () => {
  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;
  let mockDocument: any;

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

    // Mock window.getComputedStyle
    spyOn(window, 'getComputedStyle').and.returnValue({
      direction: 'ltr'
    } as CSSStyleDeclaration);

    await TestBed.configureTestingModule({
      imports: [PrivacyComponent],
      providers: [
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyComponent);
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

  it('should clean up mutation observer on destroy', () => {
    const disconnectSpy = jasmine.createSpy('disconnect');
    component['mutationObserver'] = { disconnect: disconnectSpy } as any;
    component.ngOnDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});

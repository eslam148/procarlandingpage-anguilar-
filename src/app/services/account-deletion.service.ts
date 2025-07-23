import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AccountDeletionRequest {
  email: string;
}

export interface AccountDeletionConfirmation {
  email: string;
  otpCode: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  success: boolean;
  message: string;
  internalMessage?: string;
  status: number;
  subStatus?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AccountDeletionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Request account deletion - sends OTP to user's email
   * POST /api/Auth/RequestAccountDeletion
   */
  requestAccountDeletion(email: string): Observable<ApiResponse> {
    const payload: AccountDeletionRequest = { email };
    const url = `${this.apiUrl}/api/Auth/RequestAccountDeletion`;

    console.log('Making request to:', url);
    console.log('With payload:', payload);

    return this.http.post<ApiResponse>(url, payload);
  }

  /**
   * Confirm account deletion with OTP
   * POST /api/Auth/ConfirmAccountDeletion
   */
  confirmAccountDeletion(email: string, otpCode: string): Observable<ApiResponse> {
    const payload: AccountDeletionConfirmation = { email, otpCode };
    const url = `${this.apiUrl}/api/Auth/ConfirmAccountDeletion`;

    console.log('Making confirm request to:', url);
    console.log('With payload:', payload);

    return this.http.post<ApiResponse>(url, payload);
  }

  /**
   * Resend account deletion OTP
   * POST /api/Auth/ResendAccountDeletionOtp
   */
  resendAccountDeletionOtp(email: string): Observable<ApiResponse> {
    const payload: AccountDeletionRequest = { email };
    const url = `${this.apiUrl}/api/Auth/ResendAccountDeletionOtp`;

    console.log('Making resend request to:', url);
    console.log('With payload:', payload);

    return this.http.post<ApiResponse>(url, payload);
  }
}

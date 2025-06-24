import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Response<T> {
  data: T[];
  success: boolean;
  message: string;
  internalMessage: string;
  status: number;
  subStatus: number;
}
export interface Testimonial {
  id: number;
  name: string;
  comment: string;
  rating: number;
  patientName: string;
  createdAt: string;
  nurseId: string;
  nurseFullName: string;
  isUsedInPublic: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LandingpageService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTestimonials(): Observable<Response<Testimonial>> {
    return this.http.get<Response<Testimonial>>(`${this.apiUrl}/api/Review/GetAllPublicReviews`);
  }
}

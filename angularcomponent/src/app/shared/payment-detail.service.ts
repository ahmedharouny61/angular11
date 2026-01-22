import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentDetail } from './payment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http: HttpClient) { }

  // Variables to hold form data and list data
  formData: PaymentDetail = new PaymentDetail();
  list: PaymentDetail[] = [];

  readonly baseURL = 'http://localhost:5107/api/paymentdetail';

  // 1. Post (Save)
  postPaymentDetail() {
    return this.http.post(this.baseURL, this.formData);
  }

  // 2. Put (Update)
  putPaymentDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.paymentDetailId}`, this.formData);
  }

  // 3. Delete
  deletePaymentDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  // 4. Get All (Refresh List)
  refreshList() {
    this.http.get(this.baseURL)
      .subscribe({
        next: res => {
          this.list = res as PaymentDetail[];
        },
        error: err => { console.log(err); }
      });
  }
}
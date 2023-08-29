import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StripeService,StripePaymentElementComponent} from 'ngx-stripe';
import {
  StripeElementsOptions,
  PaymentIntent
} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ngx-stripe',
  templateUrl: './ngx-stripe.component.html',
  styleUrls: ['./ngx-stripe.component.scss'],
})  
export class NgxStripeComponent {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  paying = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {
    this.stripeService.setKey(environment.STRIPE_KEY)
  }

  ngOnInit() {}

  pay() {
   
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${environment.URL}/create-payment-intent`,
      { amount }
    );
  }

}

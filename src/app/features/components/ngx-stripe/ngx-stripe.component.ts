import { Component, Inject, InjectionToken, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { StripeService, StripePaymentElementComponent } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import Stripe from 'stripe';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
// export const PLUTO_ID = new InjectionToken<string>('[PLUTO] ClientID');

@Component({
  selector: 'app-ngx-stripe',
  templateUrl: './ngx-stripe.component.html',
  styleUrls: ['./ngx-stripe.component.scss'],
})
export class NgxStripeComponent {
  // @ViewChild(StripePaymentElementComponent)
  // paymentElement!: StripePaymentElementComponent;
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  paying = false;

  appearance: any = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
      colorPrimary: '#673ab7',
    },
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {
    const data = localStorage.getItem('customer_ID');
    // this.stripeService.setKey(environment.STRIPE_KEY);
    // this.createPaymentIntent1({
    //   amount: 3000,
    //   currency: 'eur',
    // }).subscribe((pi: any) => {
    //   this.elementsOptions.clientSecret = data || '';
    // });
  }

  pay() {}

  // private createPaymentIntent(amount: number): Observable<PaymentIntent> {
  //   return this.http.post<PaymentIntent>(
  //     `${environment.URL}/create-payment-intent`,
  //     { amount }
  //   );
  // }
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '35px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  stripeTest!: FormGroup;

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      email:['',Validators.required],
      address: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      city:['',Validators.required],
    });
  }

  createToken(): void {
    if (this.stripeTest) {
      const name = this.stripeTest.value.name;
      this.stripeService
        .createToken(this.card.element, { name })
        .subscribe((result) => {
          if (result.token) {
            // Use the token
            console.log(result.token.id);
          } else if (result.error) {
            // Error creating the token
            console.log(result.error.message);
          }
        });
    }
  }

  get fControl(){
    return this.stripeTest.controls;
  }
}

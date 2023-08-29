import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentGatewayComponent } from './features/components/payment-gateway/payment-gateway.component';
import { CreateCustomerComponent } from './features/components/create-customer/create-customer.component';
import { NgxStripeComponent } from './features/components/ngx-stripe/ngx-stripe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    PaymentGatewayComponent,
    CreateCustomerComponent,
    NgxStripeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.STRIPE_KEY),
  ],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }

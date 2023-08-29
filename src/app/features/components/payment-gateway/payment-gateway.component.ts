import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss'],
})
export class PaymentGatewayComponent implements OnInit {
  public paymentHandler: any = null;
  // public stripeAPIKey: string =
  //   'pk_test_51Nd5TbSGEdKONb2RUnzIEVJiE5bwkFW4a9qJ7hWpHz5H3w2MJ57LDY0u6EdwrVsKIb6se7gqCi0OX7JOwhALbOcd008DvmTIRp';
  public stripeAPIKey:string = environment.STRIPE_KEY;

    public datas:any[]=[
      {
        pro_name:'Shoes',
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEHojHg9o8vF7Zie54noYhr703CIQZdkwcyyPM8xdW&s",
        price:'10000.00',
        desc:'In general, frogs have protruding eyes, no tail, and strong, webbed hind feet that are adapted for leaping and swimming.'
      },
      {
        pro_name:'Camera',
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpFK7eRjY_8_9jSlvxuWNk0uk-jvFAlKm0UA&usqp=CAU",
        price:'20000.00',
        desc:'In general, frogs have protruding eyes, no tail, and strong, webbed hind feet that are adapted for leaping and swimming.'
      },
      {
        pro_name:'Watch',
        image:"https://www.fitbit.com/global/content/dam/fitbit/global/marketing-pages/quiz/desktop/fall2022-quiz-pathing-module-trackers.jpg",
        price:'3000.00',
        desc:'In general, frogs have protruding eyes, no tail, and strong, webbed hind feet that are adapted for leaping and swimming.'
      }
    ];

  constructor(private sweetAlertService:SweetAlertService){}

  ngOnInit(): void {
    this.invokeStripe();
  }

  private invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log("stripeToken :>>",stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

   public makePayment(amount: any) {
     const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      name:`Pay ${amount}`,
      token: (stripeToken: any) =>{
        console.log(stripeToken);
        this.sweetAlertService.success("Payment successfully");
      },
      custom:{
        link:'https://buy.stripe.com/test_eVa6pBbODepu6padQQ'
      }
    });
     paymentHandler.open({
      name: 'Vishal Pay',
      amount: amount * 100,
      panelLabel: `Pay Now ${amount}`,
    });
  }
}

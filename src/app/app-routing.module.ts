import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomerComponent } from './features/components/create-customer/create-customer.component';

const routes: Routes = [
  // {
  //   path:'',
  //   component:CreateCustomerComponent
  // },
  // {
  //   path:'**',
  //   redirectTo:''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

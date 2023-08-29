import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent {

  public frmCustomer!:FormGroup;
  public frmAddCard!:FormGroup;
  private customer_Id!:string;

  constructor(private fb:FormBuilder,private commonService:CommonService,private sweetAlertService:SweetAlertService){
    this.validation();
    this.validation_card();
  }

  private validation(){
    this.frmCustomer = this.fb.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required]]
    })    
  }

  get fControl(){
    return this.frmCustomer.controls;
  }

  get frmControl(){
    return this.frmAddCard.controls;
  }

  private validation_card(){
    this.frmAddCard = this.fb.group({
      card_Name:["Arvind",[Validators.required]],
      card_Number:["4242424242424242",[Validators.required]],
      card_ExpMonth:[null,[Validators.required]],
      card_CVC:[125,[Validators.required]]
    })
  }

  public onSubmit(){
    if(this.frmCustomer.invalid){
      return 
    }
    else{
      console.log('this.frmCustomer.value :>> ', this.frmCustomer.value);
      const data={
        ...this.frmCustomer.value
      }
      this.commonService.addCustomer(data).subscribe({
        next:(res:any)=>{
          console.log('res :>> ', res);
          this.customer_Id = res.data.id;
          localStorage.setItem('customer_ID',res.data.id);
          this.sweetAlertService.success(res.message);
          this.frmCustomer.reset();
        },
        error:(err:any)=>{
          console.log('err :>> ', err);
          this.sweetAlertService.error(err.message)
        }
      })
    }
  }

  public onAddCard(){
    if(this.frmAddCard.invalid){
      return 
    }
    else{
      const data={
        ...this.frmAddCard.value,
        card_ExpMonth:new Date(this.frmControl['card_ExpMonth'].value).getMonth() + 1,
        card_ExpYear: new Date(this.frmControl['card_ExpMonth'].value).getFullYear(),
        customer_Id:this.customer_Id
      }
      this.commonService.addCardDetails(data).subscribe({
        next:(res:any)=>{
          console.log('res :>> ', res);
          this.sweetAlertService.success(res.message);
        },
        error:(err:any)=>{
          console.log('err :>> ', err);
          this.sweetAlertService.error(err.message);
        }
      })
    }
  }
}

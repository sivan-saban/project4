import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderModel } from 'src/app/models/order.model';
import { clientStore } from 'src/app/redux/login-state';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderCompleteComponent } from '../order-complete/order-complete.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.css']
})
export class OrderProcessComponent implements OnInit{
  public cities: any[];
  public filteredCities: string[] = [];
  public myForm: FormGroup;
  public myCountry:string = "israel";
  public newOrder = new OrderModel();
  public isActive:boolean=false;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private loginService: LoginService,
              public dialog: MatDialog ) {
    this.myForm = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      arrival_date:['',Validators.required],
      last_fourCC:['',[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      sum:['',Validators.required],
    });
    }
  public async ngOnInit() {
    this.cities = await this.loginService.getCities(this.myCountry);
  }
  public openDialog(){
    this.isActive=true;
    const dialogRef = this.dialog.open(OrderCompleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  public filterCities(searchText: any): void {
    console.log(searchText);

    this.filteredCities = this.cities.filter(city => city.toLowerCase().includes(searchText.toLowerCase()));
    console.log(this.filteredCities);

  }

  public async send() {
    if (this.myForm.invalid) {
      // Mark all form controls as touched to trigger the display of validation errors
      Object.values(this.myForm.controls).forEach(control => {
        control.markAsTouched();
      });
      // Prevent the form from submitting
      return;
    }
  // If the form is valid, proceed with sending the data to the backend
  const formData = this.myForm.value;
  this.newOrder = new OrderModel();
  this.newOrder.clientId._id = clientStore.getState().client._id ;
  this.newOrder.cartId._id = clientStore.getState().cart._id ;
  this.newOrder.sum = formData.sum;
  this.newOrder.city = formData.city;
  this.newOrder.street = formData.street;
  this.newOrder.arrival_date = formData.arrival_date;
  this.newOrder.order_date = new Date().toISOString();;
  this.newOrder.last_fourCC = formData.last_fourCC;
  console.log(this.newOrder);
      try{
        await this.orderService.addOrder(this.newOrder);
        console.log("order made successfully");
      }catch(err){
        console.log(err);
      }

  }
}

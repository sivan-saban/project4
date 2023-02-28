import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom} from 'rxjs';
import { appConfig } from 'src/utils/app-config';
import { ClientModel } from 'src/app/models/client.model';
import { CartModel } from '../models/cart.model';
import { AuthActionType, clientStore } from '../redux/login-state';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient) { }

  //login client
  public async login(myClient: ClientModel): Promise<ClientModel> {
    
    // get the observable
  const observable = this.http.post<ClientModel>(appConfig.loginUrl, myClient); 

    //convert to promise
  const isClient = await firstValueFrom(observable);

  // Send token to global state:
  //clientStore.dispatch({ type: AuthActionType.Login, payload: isClient });

  return isClient;
  }

  //register
  public async register(newClient: ClientModel): Promise<ClientModel> {
    console.log(newClient);
    const observable = this.http.post<ClientModel>(appConfig.registerUrl, newClient);
    const addClient = await firstValueFrom(observable);
    await this.addCart(addClient._id);
    // Send token to global state:
    //clientStore.dispatch({ type: AuthActionType.Register, payload: addClient });

    return addClient;
  }

  //add new cart when add new client
  public async addCart(_id: string): Promise<void>{
    const newCart  = new CartModel(); 
    // newCart.append("clientId", id_num);
    // newCart.append("created", new Date().getDate());
    newCart.clientId = _id;
    // newCart.created = new Date(Date.now()).toLocaleString().split('-')[0];
    newCart.created = new Date().toISOString();
    //toLocaleDateString();
    console.log(newCart);
    const observable = this.http.post<CartModel>(appConfig.addCartUrl, newCart);
    await firstValueFrom(observable);
  }

  //list cities
  public async getCities(country: string): Promise<any> {
    const object = {"country":country};
    
    try{
    const url = 'https://countriesnow.space/api/v0.1/countries/cities';
    const observable = this.http.post<any>(url,object);
    const cities = await firstValueFrom(observable);
    return cities.data;
    }catch(err:any){
      console.log(err);
    }
  }

}


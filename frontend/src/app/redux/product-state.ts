import { ProductModel } from "src/app/models/product.model";
import {createStore} from 'redux';

//npm i redux
//1. state
export class ProductState {
    public products: ProductModel[] = [];
}

//2. Action Type
export enum ProductActionType {
    AllProducts = "AllProducts",
    AddProduct = "AddProduct",
    DeleteProduct = "DeleteProduct"
}

//3. Action
export interface ProductAction {
    type: ProductActionType;
    payload: any;
}

//4. redux
//מקבלת אוביקט וסוג פעולה ומחזירה סטייט חדש
export function productsReducer(currentState = new ProductState(), action:ProductAction): ProductState {
    const newState = {...currentState};
    
    switch(action.type) {

        case ProductActionType.AllProducts://the payload here is the list of product
        newState.products = action.payload;
        break;
    
        case ProductActionType.AddProduct: //the paylod here is a new product
        if(newState.products.length > 0 ){
            newState.products.push(action.payload);
        }
        break;

        case ProductActionType.DeleteProduct: //the payload here is the product id to delete
            const indexToDelete = newState.products.findIndex(p => p._id === action.payload)
            if(indexToDelete >=0) {
                newState.products.splice(indexToDelete, 1);
            }
            break;
   }
    return newState;
}

//5. store
export const productsStore = createStore(productsReducer);

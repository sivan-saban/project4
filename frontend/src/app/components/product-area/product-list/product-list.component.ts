import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  public products: ProductModel[];

  //DI= Dependency Injection, we get object kind of service 
  //angular inject object by constructor to this component
  constructor(private productService: ProductService) {}

  public async ngOnInit() {
    try {
      this.products = await this.productService.getAllProducts();
    } catch (err) {
      alert(err);
    }
  }
  public async deleteProduct(id: number) {
    console.log(id);
    try {
      if(!window.confirm("Are you sure?")) return;
      await this.productService.deleteProduct(id);
      alert("Product has been deleted");
    } catch (err) {
      alert(err);
    }
  }
  
}

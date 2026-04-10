import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SingleCardComponent } from "../../shared/single-card/single-card.component";
import { ProductDetailsComponent } from './../../features/product-details/product-details.component';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';

@Component({
  selector: 'app-products',
  imports: [SingleCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {

    private readonly productsService = inject(ProductsService)

  productList: WritableSignal<IProduct[]> = signal([])



  ngOnInit(): void {
    this.getAllProducts();
  }


  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data)
        console.log(this.productList());
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



}

import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { SingleCardComponent } from "../../shared/single-card/single-card.component";
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { CategoryCardComponent } from "../../shared/category-card/category-card.component";
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/models/Icategory/icategory.interface';

@Component({
  selector: 'app-home',
  imports: [SingleCardComponent, CategoryCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService)
  private readonly categoriesService = inject(CategoriesService)

  productList: WritableSignal<IProduct[]> = signal([])
  categoryList:WritableSignal<ICategory[]> = signal([])




  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories()
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



  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoryList.set(res.data)
        console.log(this.categoryList());

      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}

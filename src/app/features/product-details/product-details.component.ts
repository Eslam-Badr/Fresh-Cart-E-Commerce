import { Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { StarRatingComponent } from "../../shared/components/star-rating/star-rating.component";
import { ProductsService } from '../../core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  imports: [StarRatingComponent, FormsModule, CurrencyPipe,],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)



  addedItem: WritableSignal<boolean> = signal(false)
  btnDataQuantity: WritableSignal<number> = signal(1)


  productId: WritableSignal<string | null> = signal('')
  data: WritableSignal<IProduct> = signal({} as IProduct)

  ngOnInit(): void {
    this.getProductId()
  }


  getSpecificproduct() {
    this.productsService.getSpecificProduct(this.productId()).subscribe({
      next: (res) => {
        console.log(res);
        this.data.set(res.data)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  getProductId() {
    this.activatedRoute.paramMap.subscribe((url) => {
      if (url.get('id')) {
        this.productId.set(url.get('id'));
        this.getSpecificproduct();
      }
    }
    )



  }

  // plus btn
  plusBtn() {
    this.btnDataQuantity.update((val) => val + 1)
  }

  // minus btn
  minusBtn() {
    this.btnDataQuantity.update((val) => val - 1)
    if (this.btnDataQuantity() <= 0) {
      this.btnDataQuantity.set(0)
    }
  }






  addProductToCart(id: any) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(id)
        this.addedItem.set(true)
        console.log(res);
        this.succesAddedItem('Cart')
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  succesAddedItem(list: string) {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: "success",
      title: `Item Added to ${list}`
    });
  }


}

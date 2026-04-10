import { ProductDetailsComponent } from './../../features/product-details/product-details.component';
import { Component, inject, input, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { CurrencyPipe } from '@angular/common';
import { StarRatingComponent } from "../components/star-rating/star-rating.component";
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-card',
  imports: [CurrencyPipe, StarRatingComponent, RouterLink],
  templateUrl: './single-card.component.html',
  styleUrl: './single-card.component.css',
})
export class SingleCardComponent {

  data = input.required<IProduct>()
  private readonly cartService = inject(CartService)
  addedItem: WritableSignal<boolean> = signal(false)




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

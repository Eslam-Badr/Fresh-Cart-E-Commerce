import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../core/models/Icart/icart.interface';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {


  private readonly cartService = inject(CartService)

  cartDetails: WritableSignal<Icart> = signal({} as Icart)

  ngOnInit(): void {
    this.getLoggedInUser()
  }

  getLoggedInUser() {
    this.cartService.getLoggedInUser().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  removeProductFromCart(prodId: any) {
    this.cartService.removeProductFromCart(prodId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  deleteUserCart() {
    this.cartService.deleteUserCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message = 'success') {
          res = this.cartDetails.set({} as Icart)
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  updateCartProductQuantity(prodId:any, count:any){
    this.cartService.updateCartProductQuantity(prodId, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



}

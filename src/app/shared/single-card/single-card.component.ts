import { Component, computed, inject, input, Input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { CurrencyPipe } from '@angular/common';
import { StarRatingComponent } from "../components/star-rating/star-rating.component";
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart/cart.service';
import { MySwalMessageService } from '../../core/services/my-swal-message/my-swal-message.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-single-card',
  imports: [CurrencyPipe, StarRatingComponent, RouterLink],
  templateUrl: './single-card.component.html',
  styleUrl: './single-card.component.css',
})
export class SingleCardComponent {

  private readonly cartService = inject(CartService)
  private readonly mySwalMessageService = inject(MySwalMessageService)
  private readonly wishlistService = inject(WishlistService)


  cartAddedItem: WritableSignal<boolean> = signal(false)
  isInWishlist: Signal<boolean> = computed(() =>
    this.wishlistService.wishlistIds().includes(this.data()._id)
  );

  data = input.required<IProduct>()





  addProductToCart(id: any) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(id)
        this.cartAddedItem.set(true)
        console.log(res);
        this.mySwalMessageService.succesAddedItemToast('Cart')
        this.cartService.numOfCartItems.set(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addProductToWishlist(prodId: any) {
    this.wishlistService.addProductToWishlist(prodId).subscribe({
      next: (res) => {
        this.mySwalMessageService.succesAddedItemToast('Wishlist')
        console.log(prodId)
        console.log(res);
        this.wishlistService.wishlistIds.update(ids => {
          if (ids.includes(prodId)) return ids;
          return [...ids, prodId];
        });

        this.wishlistService.countOfWishlistItem.set(res.data.length)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}

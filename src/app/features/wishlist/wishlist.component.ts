import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../core/models/IWishlist/iwishlist.interface';
import { MySwalMessageService } from '../../core/services/my-swal-message/my-swal-message.service';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { StarRatingComponent } from "../../shared/components/star-rating/star-rating.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-wishlist',
  imports: [StarRatingComponent, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService)
  private readonly mySwalMessageService = inject(MySwalMessageService)


  wishlist: WritableSignal<Iwishlist[]> = signal([])

  ngOnInit(): void {
    this.getUserProductWishlist()
  }



  getUserProductWishlist() {
    this.wishlistService.getUserProductWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlist.set(res.data)
        const ids = res.data.map((item: any) => item._id);
        this.wishlistService.wishlistIds.set(ids);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteProductToWishlist(prodId: any) {
    this.wishlistService.deleteProductToWishlist(prodId).subscribe({
      next: (res) => {
        console.log(res);
        this.getUserProductWishlist()
        this.mySwalMessageService.succesDeletetItemToast('Wishlist')
        this.wishlistService.countOfWishlistItem.set(res.data.length)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



}

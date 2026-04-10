import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-checkout',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly ordersService = inject(OrdersService)
  private readonly router = inject(Router)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly authService = inject(AuthService)


  userId = this.authService.getUserId();


  cartId: WritableSignal<string | null> = signal('')

  ngOnInit(): void {
    this.formInit()
    this.getUrl()
  }

  checkoutForm !: FormGroup;

  formInit() {
    this.checkoutForm = this.fb.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, [Validators.required]],
    })


  }

  payWithVisa() {

    let payload = {
      shippingAddress: this.checkoutForm.value
    }
    console.log(payload);

    this.ordersService.checkoutSession(this.cartId(), payload).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          window.open(res.session.url, "_self")
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getUrl() {
    this.activatedRoute.paramMap.subscribe({
      next: (urlPath) => {
        let cardId = urlPath.get('cartId')
        console.log('card id: ' + cardId);

        this.cartId.set(cardId)
      }
    })
  }


  payCashOnDelivery() {
    this.ordersService.creatCashOrderFromCart(this.cartId(), this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate([`/allorders/${this.userId}`])
      },
      error: (err) => {
        console.log(err);
      }
    });
  }




}

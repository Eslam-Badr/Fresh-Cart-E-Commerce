import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { OrdersService } from '../../core/services/orders/orders.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { IOrders } from '../../core/models/IOrders/ioreders.interface';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {

  private readonly ordersService = inject(OrdersService)
  private readonly authService = inject(AuthService)

  openedOrderId = signal<string | null>(null);

  orderList: WritableSignal<IOrders[]> = signal([])

  ngOnInit(): void {
    this.getUserOrders()
  }

  toggleOrderDetails(id: string) {
    this.openedOrderId.update(current =>
      current === id ? null : id
    );
  }






  getUserOrders() {
    const userId = this.authService.userId();
    if (!userId) return


    this.ordersService.getUserOrders(userId).subscribe({
      next: (res) => {
        console.log("User's Orders", res);
        this.orderList.set(res)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}

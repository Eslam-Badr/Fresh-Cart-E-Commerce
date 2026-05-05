import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SingleCardComponent } from "../../shared/single-card/single-card.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MySwalMessageService } from '../../core/services/my-swal-message/my-swal-message.service';
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-products',
  imports: [SingleCardComponent, RouterLink, NgxPaginationModule, NotFoundComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {

  private readonly productsService = inject(ProductsService)
  private readonly route = inject(ActivatedRoute);
  private readonly mySwalMessageService = inject(MySwalMessageService);


  productList: WritableSignal<IProduct[]> = signal([])

  pageSize: WritableSignal<number> = signal(0)
  p: WritableSignal<number> = signal(0)
  total: WritableSignal<number> = signal(0)
  brandId: string | null = null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {

      this.brandId = params.get('brand');

      this.getAllProducts();
    });
  }


  getAllProducts(pageNum: any = 1, brandId?: any) {
    this.productsService.getAllProducts(pageNum, this.brandId).subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data)
        console.log(this.productList());

        this.pageSize.set(res.metadata.limit)
        this.p.set(res.metadata.currentPage)
        this.total.set(res.results)

        if (!res.data || res.data.length == 0) {
          this.mySwalMessageService.noResultsToast()
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



}

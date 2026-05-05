import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../core/models/IBrands/ibrands.interface';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MySwalMessageService } from '../../core/services/my-swal-message/my-swal-message.service';

@Component({
  selector: 'app-brands',
  imports: [RouterLink, NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  // injects
  private readonly brandsService = inject(BrandsService)
  private readonly router = inject(Router)
  private readonly mySwalMessageService = inject(MySwalMessageService)


  // variables
  pageSize: WritableSignal<number> = signal(0)
  p: WritableSignal<number> = signal(0)
  total: WritableSignal<number> = signal(0)

  // lists
  brandsList: WritableSignal<IBrands[]> = signal([])



  // Functions

  ngOnInit(): void {
    this.getAllBrands()
  }


  getAllBrands(pageNum: any = 1) {

    this.brandsService.getAllBrands(pageNum).subscribe({
      next: (res) => {
        console.log(res);
        this.brandsList.set(res.data)
        this.pageSize.set(res.metadata.limit)
        this.p.set(res.metadata.currentPage)
        this.total.set(res.results)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getSpecificBrand(brandId: any) {
    this.router.navigate(['/products'], {
      queryParams: { brand: brandId }
    });
  }


}

import { ICategory } from './../../core/models/Icategory/icategory.interface';
import { Component, inject, input, Input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {

  categoryData : InputSignal<ICategory> = input.required<ICategory>()


}

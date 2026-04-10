import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  rating = input.required<number>();
  max = input<number>(5);

  stars = computed(() => {
    const result: string[] = [];
    const r = this.rating();
    const m = this.max();

    for (let i = 1; i <= m; i++) {
      if (r >= i) result.push('full');
      else if (r >= i - 0.5) result.push('half');
      else result.push('empty');
    }
    return result;
  });
}
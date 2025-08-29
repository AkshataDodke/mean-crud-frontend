import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-form',
  // standalone: false,
  // imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent implements OnInit {
  private api = inject(ItemService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  item: Partial<Item> = { name: '', description: '' };
  id: string | null = null;
  loading = false;
  error = '';

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading = true;
      this.api.get(this.id).subscribe({
        next: (data) => { this.item = data; this.loading = false; },
        error: (err) => { this.error = err.message ?? 'Error'; this.loading = false; }
      });
    }
  }

  save() {
    this.loading = true;
    const action = this.id ? this.api.update(this.id, this.item) : this.api.create(this.item);
    action.subscribe({
      next: () => { this.loading = false; this.router.navigateByUrl('/'); },
      error: (err) => { this.error = err.message ?? 'Error'; this.loading = false; }
    });
  }
}

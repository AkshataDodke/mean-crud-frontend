import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-list',
  standalone: false,
  // imports: [CommonModule, RouterLink],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {
  private api = inject(ItemService);
  items: Item[] = [];
  loading = false;
  error = '';

  ngOnInit() { this.fetch(); }

  fetch() {
    this.loading = true;
    this.api.list().subscribe({
      next: (data) => { this.items = data; this.loading = false; },
      error: (err) => { this.error = err.message ?? 'Error'; this.loading = false; }
    });
  }

  delete(id?: string) {
    if (!id) return;
    if (!confirm('Delete this item?')) return;
    this.api.remove(id).subscribe(() => this.fetch());
  }
}

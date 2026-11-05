import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Item { _id: string; name: string; }
@Component({
  selector: 'app-root', standalone: true, imports: [CommonModule, FormsModule],
  template: `<main><h1>Angular + MongoDB</h1><p>Items stored in MongoDB</p>
  <form (ngSubmit)="add()"><input name="name" [(ngModel)]="name" placeholder="New item" maxlength="200" required><button>Add</button></form>
  <p class="error" *ngIf="error">{{ error }}</p>
  <ul><li *ngFor="let item of items">{{ item.name }} <button (click)="remove(item._id)">Delete</button></li></ul>
  <p *ngIf="!items.length">No items yet.</p></main>`
})
export class AppComponent implements OnInit {
  items: Item[] = []; name = ''; error = '';
  constructor(private http: HttpClient) {}
  ngOnInit() { this.load(); }
  load() { this.http.get<Item[]>('/api/items').subscribe({ next: data => this.items = data, error: () => this.error = 'Could not load items' }); }
  add() { const name = this.name.trim(); if (!name) return; this.http.post('/api/items', { name }).subscribe({ next: () => { this.name = ''; this.error = ''; this.load(); }, error: () => this.error = 'Could not add item' }); }
  remove(id: string) { this.http.delete(`/api/items/${id}`).subscribe({ next: () => this.load(), error: () => this.error = 'Could not delete item' }); }
}

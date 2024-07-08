import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  // Save data to local storage
  // Save data to local storage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get data from local storage
  getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

  // Update data in local storage (not necessary with current setItem implementation)
  updateItem(key: string, value: any): void {
    this.setItem(key, value);
  }

  // Delete data from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all data from local storage
  clear(): void {
    localStorage.clear();
  }
}

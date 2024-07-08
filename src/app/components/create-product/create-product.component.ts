import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProductsService } from '../../services/products.service';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,ButtonModule,InputTextModule,DropdownModule,SidebarModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  @Input() productToEdit: any; // Input to receive the product to edit
  productForm: FormGroup;
  submitted = false;
  categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Books', value: 'books' },
    { label: 'Food', value: 'food' },
    { label: 'Drink', value: 'drink' }
  ];

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      productCategory: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.config.data && this.config.data.mode === 'edit' && this.config.data.product) {
      // show prefilled data in the form fields
      const product = this.config.data.product;
      this.productForm.patchValue({
        productName: product.productName,
        productPrice: product.productPrice,
        productCategory: product.productCategory
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.productForm.valid) {
      const updatedProduct = this.productForm.value;
      if (this.config.data && this.config.data.mode === 'edit' && this.config.data.product) {
        // Edit existing product
        const updatedProducts = this.productService.getProducts().map((p: any) => {
          if (p === this.config.data.product) {
            return { ...updatedProduct }; // Replace with updated product
          }
          return p;
        });
        this.productService.setItem('products', updatedProducts);
      } else {
        // Add new product
        const products = this.productService.getProducts() || [];
        products.push(updatedProduct);
        this.productService.setItem('products', products);
      }
      this.productForm.reset();
      this.ref.close('success'); 
      this.submitted = false;
    }
  }
}
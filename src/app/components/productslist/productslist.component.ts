import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CreateProductComponent } from "../create-product/create-product.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductsService } from '../../services/products.service';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProductDashboardComponent } from "../product-dashboard/product-dashboard.component";

@Component({
    selector: 'app-productslist',
    standalone: true,
    templateUrl: './productslist.component.html',
    styleUrl: './productslist.component.css',
    providers: [DialogService, ConfirmationService, MessageService],
    imports: [ButtonModule, CommonModule, CreateProductComponent, NgxChartsModule, TableModule, ConfirmDialogModule, ToastModule, ProductDashboardComponent]
})
export class ProductslistComponent implements OnInit {
  products: any[] = [];
  productChartData: any[] = [];

  @ViewChild('productModalForm') productModalForm!: TemplateRef<any>;
  ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private productService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getProductsData();
  }

  openProductModalForm(mode: string = 'add', item?: any) {
    this.ref = this.dialogService.open(CreateProductComponent, {
      header: mode === 'edit' ? 'Edit Product' : 'Add Product',
      width: '50%',
      height: '70%',
      position: 'right',
      data: {
        mode: mode,
        product: item
      }
    });

    this.ref.onClose.subscribe((result) => {
      if (result === 'success') {
        this.getProductsData(); // Refresh product list if data is added or updated
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  getProductsData() {
    this.products = this.productService.getProducts();
  }

  
  deleteProduct(product: any) {
    alert('Do you want to delete this product ?')
    this.products = this.products.filter((p) => p !== product);
    this.productService.setItem('products', this.products);
  }

  editProduct(item: any) {
    this.openProductModalForm('edit', item); // Pass 'edit' mode and the item to edit
  }
}
import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-product-dashboard',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent {
  products: any[] = []; 
  // ngx-charts data
  productChartData: { name: string, value: number }[] = [];

  // ngx-charts options
  showXAxis = true;
  showYAxis = true;
  showLegend = false; 
  showXAxisLabel = true; 
  showYAxisLabel = true;
  xAxisLabel = 'Products'; 
  yAxisLabel = 'Price'; 
  barPadding = 20; 

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProductsData();
    this.prepareChartData();
  }

  getProductsData() {
    this.products = this.productService.getProducts();
  }

  prepareChartData() {
    // cnvert data into an array to show in the dashboard
    this.productChartData = this.products.map(product => ({
      name: product.productName,
      value: product.productPrice
    }));
  }
}
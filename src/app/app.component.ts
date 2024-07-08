import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductslistComponent } from "./components/productslist/productslist.component";
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ProductslistComponent]
})
export class AppComponent implements OnInit {
  title = 'prime-app';
  constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}

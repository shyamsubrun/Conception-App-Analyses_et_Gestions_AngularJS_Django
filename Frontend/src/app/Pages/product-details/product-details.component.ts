import { Component, OnChanges, OnInit, Type } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { Product } from '../../Core/Models/product';
import { StatsService } from '../../Core/Services/stats.service';
import {NgIf, NgFor} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { catchError } from 'rxjs';
import { NotificationService } from '../../Core/Services/NotificationService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-produits',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  standalone: true,
  imports: [MatTableModule, NgIf, NgFor,FormsModule, MatIconModule,CommonModule],
  providers: [DecimalPipe],
})
  
export class ProductDetailsComponent implements OnInit, OnChanges{
  quantityChange: number = 0;
  discountError = false;
  productsList: Product[] = [];
  productsCrustacesList: Product[] = [];
  selectedProduct: Product | undefined;
  selectedCategory: number | string = 'all';
  quantityInStock!: number ;
  originalProductsList: Product[] = [];
  product = { isEditing: false };
  categories = [
    { id: 'all', name: 'All' },
    { id: 0, name: 'Poissons' },
    { id: 1, name: 'Coquillages' },
    { id: 2, name: 'Crustacés' }
  ];
  constructor(private productsService: ProductsService, private productService: ProductsService, private notificationService: NotificationService, private StatsService: StatsService) {}

  ngOnInit() {
    this.getProducts()
  }
  getProducts() {
  this.productsService.getProductsFromJson().subscribe((data) => {
      this.productsList = data;
      this.originalProductsList = data;
    });
}
    
  ngOnChanges() {
  }

  getProduit(id: number): Product | undefined {
    return this.productsList.find(product => product.id === id);
  }
  getProductCrustacesList(id: number): Product | undefined {
    return this.productsCrustacesList.find(product => product.id === id);
  }
  
  toggleEditMode(product: any) {
    product.isEditing = !product.isEditing;
    product.stockChange = 0;
    this.quantityInStock =  product.quantityInStock;
  }

  saveProduct(product: Product) {
    this.logQuantities(product);
    this.updateProduct(product);
    this.updatePrice(product)

  if (product.stockChange!==0) {
    if (product.operationType==='add') {
      this.incrementStock(product, product.stockChange);
      this.newoperation(product.category,true,product.stockChange,product.operationPrice)
    }else if (product.operationType==='remove') {
      this.decrementStock(product, product.stockChange);
      this.newoperation(product.category,false,product.stockChange,product.operationPrice)
    }
  }
}

// 1. Fonction pour afficher les quantités
logQuantities(product: Product) {
  console.log(product.quantityInStock);
  console.log(this.quantityInStock);
}

// 2. Fonction pour mettre à jour le produit en promotion
updateProduct(product: Product) {
  this.productService.updateProductPutOnSale(product)
    .pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour du produit', error);
        throw error;
      })
    )
    .subscribe((updatedProduct) => {
      console.log('Produit mis à jour avec succès', updatedProduct);
      this.notificationService.showNotification(`${product.name} a été modifié avec succès !`);
    });
}
// 6. Décrémente le stock
decrementStock(product: Product, difference: number) {
  console.log('Décrémentation du stock de', difference);
  this.productService.updateProductDecrementStockById(product, difference)
    .pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour du produit', error);
        throw error;
      })
    )
    .subscribe((updatedProduct) => {
      console.log('Produit mis à jour avec succès', updatedProduct);
      product.quantityInStock -= difference;
    });
}

// 7. Incrémente le stock
incrementStock(product: Product, difference: number) {
  console.log('Incrémentation du stock de', difference);
  this.productService.updateProductIncrementStockById(product, difference)
    .pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour du produit', error);
        throw error;
      })
    )
    .subscribe((updatedProduct) => {
      console.log('Produit mis à jour avec succès', updatedProduct);
      product.quantityInStock += difference;
    });
}

  updatePrice(product: Product) {
  this.productService.updateProductPriceById(product)
    .pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour du produit', error);
        throw error;
      })
    )
    .subscribe((updatedProduct) => {
      console.log('Produit mis à jour avec succès', updatedProduct);
      this.notificationService.showNotification(`${product.name} a été modifié avec succès !`);
    });
  }
  newoperation(category : number,type: boolean, stock : number , priceOperation : number) {

    this.StatsService.updateProductPrice(category, type, stock , priceOperation)
    .pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour du produit', error);
        throw error;
      })
    )
    .subscribe((newoperation) => {
      console.log('Produit mis à jour avec succès', newoperation);
    });
  }
  enableEditModeForAll() {
    this.product.isEditing = true;
    for (const product of this.productsList) {
      product.isEditing = true;
    }
    for (const product of this.productsCrustacesList) {
      product.isEditing = true;
    }
  }

  saveAllProducts() {
    for (const product of this.productsList) {
      if (product.isEditing) {
        this.saveProduct(product);
        this.toggleEditMode(product);
      }
    }
  }

  cancelAllEdits() {
    this.product.isEditing = false;
    for (const product of this.productsList) {
      if (product.isEditing) {
        this.toggleEditMode(product);
      }
    }
    for (const product of this.productsCrustacesList) {
      if (product.isEditing) {
        this.toggleEditMode(product);
      }
    }
}

calculatePercentageDiscount(product: Product): number {

  const discountAmount = (product.price -(product.price * (product.discount / 100)) );

  const roundedDiscountAmount = discountAmount.toFixed(2);

  return parseFloat(roundedDiscountAmount);
}

filterProducts(): void {
  if (this.selectedCategory === 'all') {
    // Si 'all' est sélectionné, affichez la liste complète
    this.productsList = this.originalProductsList;
  } else {
    // Sinon, filtrez les produits en fonction de la catégorie
    this.productsList = this.originalProductsList.filter(product => product.category === this.selectedCategory);
  }
}
filterByCategory(category: number | string): void {
  this.selectedCategory = category;
  this.filterProducts();
}

  validateDiscountInput(event: KeyboardEvent, product: Product) {
    const inputValue = (event.target as HTMLInputElement).value;

    // Permet les touches utiles comme Backspace, Tab, Delete, etc.
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

    // Bloque la saisie si la valeur dépasse 100
    if (!allowedKeys.includes(event.key) && Number(inputValue + event.key) > 100) {
      event.preventDefault(); // Empêche la saisie au-delà de 100
    }
  }
  resetStockChange(product: Product) {
    product.stockChange = 0;
  }
}


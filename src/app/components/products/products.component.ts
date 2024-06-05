import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../product.model';
import { StoreService } from '../../services/store.service'
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total: number = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen !: Product;
  limit: number = 10;
  offset: number = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) { 
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.getSomeProducts(this.limit, this.offset)
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();

    console.log(this.myShoppingCart.length);
    console.log(this.total)
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'New product',
      description: 'New product in the store',
      images: [`https://placeimg.com/640/480/any?randoms=${Math.random()}`],
      price: 1200,
      categoryId: 2
    };
    this.productsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(
        item =>item.id ==this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(
        item =>item.id ==this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  nextPage() {
    this.getSomeProducts(this.limit, this.offset)
  }

  getSomeProducts(newlimit: number, newoffset: number) {
    this.productsService.getAllProducts(newlimit, newoffset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }
}

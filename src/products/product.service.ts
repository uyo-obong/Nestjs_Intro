import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  createProduct(title: string, description: string, price: number) {
    const id = Math.random().toString();
    const newProduct = new Product(id, title, description, price);
    this.products.push(newProduct);
    return id;
  }

  allProduct() {
    return [...this.products];
  }

  singleProduct(id: string) {
    const single = this.findProduct(id)[0];
    return { ...single };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
    return true;
  }

  deleteProduct(id: string) {
    const [, index] = this.findProduct(id);
    this.products.splice(index, 1)
    return true
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return [product, productIndex];
  }
}
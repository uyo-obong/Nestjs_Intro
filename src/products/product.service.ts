import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProductTransformer } from './product.transformer';

@Injectable()
export class ProductService {
  constructor(
    private readonly ProductTransformer: ProductTransformer,
    @InjectModel('Product') private readonly ProductModel: Model<Product>,
  ) {}

  async createProduct(title: string, description: string, price: number) {
    const newProduct = new this.ProductModel({ title, description, price });
    const response = await newProduct.save();
    return this.ProductTransformer.product(response);
  }

  async allProduct() {
    const products = await this.ProductModel.find().exec();
    return products.map( prod => this.ProductTransformer.product(prod) );
  }

  async singleProduct(id: string) {
    const single = await this.findProduct(id);
    return this.ProductTransformer.product(single);
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = await this.findProduct(productId);
    product.title = title ? title : product.title;
    product.description = description ? description : product.description;
    product.price = price ? price : product.price;
    product.save();

    return this.ProductTransformer.product(product);
  }

  async deleteProduct(id: string) {
    const product = await this.findProduct(id);
    product.delete();
    return true;
  }

  private async findProduct(id: string) {
    let product;
    try {
      product = await this.ProductModel.findById(id);
    } catch (e) {
      throw new NotFoundException('Product not found');
    }

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
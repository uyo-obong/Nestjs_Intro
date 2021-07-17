import { Controller, Get, Post, Patch, Body, Param, Delete } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Get('list')
  all() {
    return this.ProductService.allProduct();
  }

  @Get(':id')
  single(@Param('id') productId: string) {
    return this.ProductService.singleProduct(productId);
  }

  @Post('create')
  create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const prodId = this.ProductService.createProduct(title, description, price);
    return { 'data': {id: prodId} };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const prod = this.ProductService.updateProduct(id, title, description, price);
    if (prod) {
      return {'data': 'Product updated'};
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const deleteProd = this.ProductService.deleteProduct(id);
    if (deleteProd) {
      return {'message': 'Product has been deleted'}
    }
  }
}

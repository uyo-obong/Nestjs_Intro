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

  @Get('single/:id')
  single(@Param('id') productId: string) {
    return this.ProductService.singleProduct(productId);
  }

  @Post('create')
  async create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const prod = await this.ProductService.createProduct(title, description, price);
    return { data: prod };
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const prod = await this.ProductService.updateProduct(id, title, description, price);
    return { data: prod };
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    const deleteProd = this.ProductService.deleteProduct(id);
    if (deleteProd) {
      return { message: 'Product has been deleted' };
    }
  }
}

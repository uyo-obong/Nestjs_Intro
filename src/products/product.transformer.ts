export class ProductTransformer {
  product(product) {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }
}

'use strict'

const ProductService = use('App/Services/ProductService');
const Logger = use('Logger');

class ProductController {
  async get({request}) {
    let filters = request.get('filters');
    return await (new ProductService).getRandomProduct(filters);
  }

}

module.exports = ProductController

'use strict'

const ProductService = use('App/Services/ProductService');
const Logger = use('Logger');

class ProductController {
  async get({request}) {
    let filters = this._sanitizeFilters(request.get('filters'));

    return await (new ProductService([filters.countryCode])).getProduct(filters);
  }


  _sanitizeFilters(filters) {
    if (filters.maxPrice) {
      filters.maxPrice = parseInt(filters.maxPrice);
    }

    if (filters.minPrice) {
      filters.minPrice = parseInt(filters.minPrice);
    }

    return filters;
  }

}

module.exports = ProductController

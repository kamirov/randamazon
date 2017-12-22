'use strict'

const ProductService = use('App/Services/ProductService');
const WordService = use('App/Services/WordService');
const Logger = use('Logger');

class ProductController {
  async get({request}) {

    let filters = request.get('filters');

    let phrase = (new WordService).getRandomPhrase();
    let product = await (new ProductService).getRandomProduct(phrase, filters);

    return {
      phrase,
      product
    };
  }

}

module.exports = ProductController

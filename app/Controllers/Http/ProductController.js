'use strict'

const ProductService = use('App/Services/ProductService');
const WordService = use('App/Services/WordService');
const Logger = use('Logger');

class ProductController {
  async get() {
    let phrase = (new WordService).getRandomPhrase();
    let product = await (new ProductService).getRandomProduct(phrase);

    return {
      phrase,
      product
    };
  }
}

module.exports = ProductController

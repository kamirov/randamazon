'use strict';

const AmazonService = use('App/Services/AmazonService');
const WordService = use('App/Services/WordService');
const Logger = use('Logger');


class ProductService {

  static get MAX_ATTEMPTS() { return 10 }

  constructor() {
    this._attempts = 0;
    this._amazonService = (new AmazonService);
  }

  /**
   * Get a random product from Amazon
   * @async
   * @returns {Promise<object>}
   */
  async getRandomProduct(filters) {
    // Check for max attempts
    if (this._attempts === ProductService.MAX_ATTEMPTS) {
      return {
        // TODO: Would be better to have an error service that would nicely parse and format both local and Amazon errors
        Error: [
          'Exceeded max attempts'
        ]
      }
    }

    this._attempts++;

    let phrase = (new WordService).getRandomPhrase();
    Logger.info(`Phrase (Attempt ${this._attempts}): ${phrase}`);

    let results = await this._amazonService.getProducts(phrase, filters);

    if (results.products) {
      // Return a random product
      return {
        phrase,
        product: results.products[Math.floor(Math.random()*results.products.length)]
      };
    } else {
      return this.getRandomProduct(filters);
    }
  }
}

module.exports = ProductService;

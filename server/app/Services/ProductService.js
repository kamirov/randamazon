'use strict';

const AmazonService = use('App/Services/AmazonService');
const WordService = use('App/Services/WordService');
const Logger = use('Logger');


class ProductService {

  static get MAX_ATTEMPTS() { return 25 }


  constructor() {
    this._attempts = 0;
    this._amazonService = (new AmazonService);
  }


  /**
   * Get a random product from Amazon
   * @param {object} filters
   * @param {boolean} isRandom
   * @async
   * @returns {Promise<object>}
   */
  async getProduct(filters, isRandom = true) {
    this._attempts++;

    let phrase = (new WordService).getRandomPhrase();
    Logger.info(`Phrase (Attempt ${this._attempts}): ${phrase}`);

    let results = await this._amazonService.getProducts(phrase, filters);

    if (results.products) {
      let product = (isRandom
                    ? results.products[Math.floor(Math.random()*results.products.length)]
                    : results.products[0]);
      return { phrase, product };
    }

    // Looks like an error, should we make another attempt?

    if (this._attempts === ProductService.MAX_ATTEMPTS) {
      return {
        // TODO: Would be better to have an error service that would nicely parse and format both local and Amazon errors
        Error: [
          'Exceeded max attempts'
        ]
      }
    }

    return this.getRandomProduct(filters);
  }
}

module.exports = ProductService;

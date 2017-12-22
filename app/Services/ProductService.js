'use strict';

const amazon = require('amazon-product-api');
const Logger = use('Logger');
const Env = use('Env');

/**
 * Wrapper for Amazon Product API
 */
class ProductService {
  constructor() {
    this.amazonClient = this._connectToAmazon()
  }

  /**
   * Connects to Amazon API
   * @returns {object} Amazon API client accessed using appropriate credentials
   * @private
   */
  _connectToAmazon() {
    try {
      return amazon.createClient({
        awsId: Env.get('AWS_ID'),
        awsSecret: Env.get('AWS_SECRET'),
        awsTag: Env.get('AWS_TAG')
      });
    } catch (e) {
      Logger.error("Couldn't connect to Amazon Product Advertising API. Please check your credentials.")
    }
  }

  /**
   * Get a random product from Amazon
   * @async
   * @param {string} searchTerm
   * @returns {Promise<object>}
   */
  async getRandomProduct(searchTerm) {
    try {
      let products = await this.amazonClient.itemSearch({
        keywords: searchTerm,
        responseGroup: 'ItemAttributes,OfferSummary',
        domain: 'webservices.amazon.ca'
      });

      // Return a random product
      return products[Math.floor(Math.random()*products.length)];

    } catch (e) {
      Logger.error(e);
    }
  }
}

module.exports = ProductService;

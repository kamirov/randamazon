'use strict';

const amazon = require('amazon-product-api');
const Logger = use('Logger');
const Env = use('Env');

/**
 * Wrapper for Amazon Product API
 */
class ProductService {

  static get MIN_PRICE() { return 10 };
  static get DOMAINS() {
    return {
      CA: 'webservices.amazon.ca',
      US: 'webservices.amazon.com'    // default
    };
  }

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
  async getRandomProduct(searchTerm, filters) {
    try {
      let amazonParams = {
        keywords: searchTerm,
        // responseGroup: 'OfferSummary,ItemAttributes',
        responseGroup: 'OfferSummary,ItemAttributes,Images',
        availability: 'Available',
        minimumPrice: ProductService.MIN_PRICE
      };

      if (filters.maximumPrice) {
        amazonParams.maximumPrice = filters.maximumPrice;
      }

      if (filters.country) {
        if (ProductService.DOMAINS[filters.country]) {
          amazonParams.domain = ProductService.DOMAINS[filters.country];
        } else {
          throw `App is not configured to access Amazon API through the country '${filters.country}'. `
          + `Allowable options are '${Object.keys(ProductService.DOMAINS).join("', '")}'.`;
        }
      }

      // Return a random product
      let products = await this.amazonClient.itemSearch(amazonParams);
      return products[Math.floor(Math.random()*products.length)];

    } catch (e) {
      Logger.error(e);
    }
  }
}

module.exports = ProductService;

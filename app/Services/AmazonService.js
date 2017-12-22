'use strict';

// TODO: Should probably be a singleton

const amazon = require('amazon-product-api');
const Logger = use('Logger');
const Env = use('Env');

/**
 * Wrapper for Amazon Product API
 */
class AmazonService {

  static get MIN_PRICE() { return 10 };
  static get DOMAINS() {
    return {
      CA: 'webservices.amazon.ca',
      US: 'webservices.amazon.com'
    };
  }
  static get DEFAULT_DOMAIN() { return 'US' }
  static get DEFAULT_SEARCH_PARAMS() {
    return {
      // responseGroup: 'OfferSummary,ItemAttributes',
      responseGroup: 'OfferSummary,ItemAttributes,Images',
      availability: 'Available',
      minimumPrice: AmazonService.MIN_PRICE
    }
  }


  constructor() {
    this.client = this._connectToAmazon()
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
   * Get products from Amazon
   * @async
   * @param {string} searchTerm
   * @param {string} fukters
   * @returns {Promise<object>}
   */
  async getProducts(searchTerm, filters) {
    let params = this._getParams(searchTerm, filters);

    try {
      return {
        products: await this.client.itemSearch(params)
      };
    } catch (e) {
      Logger.error(e);
      return e;
    }
  }


  /**
   * Generates Amazon ItemSearch params
   * @param {string} searchTerm
   * @param {object} filters
   * @returns {object}
   * @private
   */
  _getParams(searchTerm, filters) {
    let params = Object.assign({}, AmazonService.DEFAULT_SEARCH_PARAMS, {
      keywords: searchTerm
    });

    if (filters.maximumPrice) {
      params.maximumPrice = filters.maximumPrice;
    }

    if (filters.minimumPrice) {
      if (filters.minimumPrice < AmazonService.MIN_PRICE) {
        Logger.warning(`Minimum price must be >= ${AmazonService.MIN_PRICE}. Ignoring value.`);
      } else {
        params.minimumPrice = filters.minimumPrice;
      }
    }

    if (filters.country) {
      if (AmazonService.DOMAINS[filters.country]) {
        params.domain = AmazonService.DOMAINS[filters.country];
      } else {
        Logger.warning(`Allowable countries are '${Object.keys(AmazonService.DOMAINS).join("', '")}'. Defaulting to ${AmazonService.DEFAULT_DOMAIN}.`);
      }
    }

    return params;
  }
}

module.exports = AmazonService;

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
  static get DEFAULT_COUNTRY() { return 'CA' }
  static get DEFAULT_SEARCH_PARAMS() {
    return {
      // responseGroup: 'OfferSummary,ItemAttributes',
      responseGroup: 'OfferSummary,ItemAttributes,Images',
      availability: 'Available',
      domain: AmazonService.DOMAINS[AmazonService.DEFAULT_COUNTRY],
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

    if (filters.maxPrice) {
      params.maximumPrice = filters.maxPrice;
    }

    if (filters.minPrice) {
      if (filters.minPrice < AmazonService.MIN_PRICE) {
        Logger.warning(`Minimum price must be >= ${AmazonService.MIN_PRICE}. Ignoring value.`);
      } else {
        params.minimumPrice = filters.minPrice;
      }
    }

    if (filters.countryCode) {
      if (AmazonService.DOMAINS[filters.countryCode]) {
        params.domain = AmazonService.DOMAINS[filters.countryCode];
      } else {
        Logger.warning(`Allowable countries are '${Object.keys(AmazonService.DOMAINS).join("', '")}'. Defaulting to ${AmazonService.DEFAULT_COUNTRY}.`);
      }
    }

    return params;
  }


  /**
   *
   * @param {string} rawProduct
   * @returns {object}
   */
  parseProduct(rawProduct) {
    try {
      return {
        title: rawProduct.ItemAttributes[0].Title[0],
        features: rawProduct.ItemAttributes[0].Feature,
        imageUrl: rawProduct.LargeImage[0].URL[0],
        url: rawProduct.DetailPageURL[0],
        price: rawProduct.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0]
      }
    } catch (e) {
      return {
        // TODO: This is so lazy.
        error: "Some fields missing"
      }
    }
  }
}

module.exports = AmazonService;

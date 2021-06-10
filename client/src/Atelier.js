import { auth } from '../../config.js';



/*********
 * To use:
 * import Atelier from '../Atelier.js';
 * then you can either use promises:
 * var styles = Atelier.getProducts().then(data => console.log(data))
 *
 * or async await style:
 * printStyles = async function () {
 *  var data = await Atelier.getProducts();
 *  console.log(data);
 * }
 */

class Atelier {
  constructor() {
    this.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/';
  }

  async getProducts() {
    return await this.fetchAPI('products');
  }

  async getInfo(productId) {
    return await this.fetchAPI('products/' + productId);
  }

  async getStyles(productId) {
    return await this.fetchAPI('products/' + productId + '/styles');
  }

  async getMeta(productId) {
    return await this.fetchAPI(`reviews/meta/?product_id=${productId}`);
  }

  async getReviews(productId, count, page, sort) {
    return await this.fetchAPI(`reviews/?product_id=${productId}&count=${count}&page=${page}&sort=newest`)
  }

  async fetchAPI(endpoint) {
    var res = await fetch(this.baseURL + endpoint, {
      method: 'GET',
      headers: new Headers({
        'Authorization': auth.TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    });
    return await res.json();
  }

  async postAPI(endpoint, data) {
    console.log(JSON.stringify(data));
    var res = await fetch(this.baseURL + endpoint, {
      method: 'POST',
      headers: new Headers({
        'Authorization': auth.TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify(data)
    });
    console.log(res);
    return res.json();
  }
}

export default new Atelier();
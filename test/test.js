import 'dotenv/config';
import assert from 'assert';
import http from 'http';
import _ from 'lodash';
import data from '../public/api_data.json';

describe('Test api routes', function () {
  const apiUrl = process.env.APP_URL + '/v1.0';
  let routesToTest = [];

  for (const key of Object.keys(data)) {
    const route = data[key];
    routesToTest.push(route.url);
  }

  let that = this;
  that.routesTested = [];

  it(process.env.APP_URL + '/ should return 302', function (done) {
    http.get(process.env.APP_URL + '/', function (res) {
      assert.equal(302, res.statusCode);
      done();
    });
  });

  it(apiUrl + '/ should return 200', function (done) {
    http.get(apiUrl + '/', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  // Test all the basic routes without parameters
  for (const key of Object.keys(data)) {
    const route = data[key];
    if (route.url.indexOf(':') === -1) {
      it(apiUrl + route.url + ' should return 200', function (done) {
        http.get(apiUrl + route.url, function (res) {
          assert.equal(200, res.statusCode);
          that.routesTested.push(route.url);
          done();
        });
      });
    }
  }

  // Node: amount
  it(apiUrl + '/node/3/amount should return 200', function (done) {
    http.get(apiUrl + '/node/3/amount', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/node/:nodeId/amount');
      done();
    });
  });

  // Node: orders
  it(apiUrl + '/node/3/orders should return 200', function (done) {
    http.get(apiUrl + '/node/3/orders', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/node/:nodeId/orders');
      done();
    });
  });

  // Node: members
  it(apiUrl + '/node/3/members should return 200', function (done) {
    http.get(apiUrl + '/node/3/members', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/node/:nodeId/members');
      done();
    });
  });

  // Node: Customers
  it(apiUrl + '/node/3/customers should return 200', function (done) {
    http.get(apiUrl + '/node/3/customers', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/node/:nodeId/customers');
      done();
    });
  });

  // Node: products
  it(apiUrl + '/node/3/products should return 200', function (done) {
    http.get(apiUrl + '/node/3/products', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/node/:nodeId/products');
      done();
    });
  });

  // Node: producers
  it(apiUrl + '/node/3/producers should return 200', function (done) {
    http.get(apiUrl + '/node/3/producers', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/node/:nodeId/producers');
      done();
    });
  });

  // Delivery: customers
  it(apiUrl + '/delivery/3/2018-06-28/customers should return 200', function (done) {
    http.get(apiUrl + '/delivery/3/2018-06-28/customers', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/delivery/:nodeId/:date/customers');
      done();
    });
  });

  // Delivery: producers
  it(apiUrl + '/delivery/3/2018-06-28/producers should return 200', function (done) {
    http.get(apiUrl + '/delivery/3/2018-06-28/producers', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/delivery/:nodeId/:date/producers');
      done();
    });
  });

  // Delivery: products
  it(apiUrl + '/delivery/3/2018-06-28/products should return 200', function (done) {
    http.get(apiUrl + '/delivery/3/2018-06-28/products', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/delivery/:nodeId/:date/products');
      done();
    });
  });

  // Delivery: orders
  it(apiUrl + '/delivery/3/2018-06-28/orders should return 200', function (done) {
    http.get(apiUrl + '/delivery/3/2018-06-28/orders', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/delivery/:nodeId/:date/orders');
      done();
    });
  });

  // Delivery: amount
  it(apiUrl + '/delivery/3/2018-06-28/amount should return 200', function (done) {
    http.get(apiUrl + '/delivery/3/2018-06-28/amount', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/delivery/:nodeId/:date/amount');
      done();
    });
  });

  // Currency: rate
  it(apiUrl + '/currency/rate/SEK should return 200', function (done) {
    http.get(apiUrl + '/currency/rate/SEK', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/currency/rate/:currencyCode');
      done();
    });
  });

  // Currency: rate
  it(apiUrl + '/currency/convert/100/SEK should return 200', function (done) {
    http.get(apiUrl + '/currency/convert/100/SEK', function (res) {
      assert.equal(200, res.statusCode);
      that.routesTested.push('/currency/convert/:amount/:currencyCode');
      done();
    });
  });

  it('All tests have run', function (done) {
    let routesMissingTests = _.difference(routesToTest, that.routesTested);

    if (routesMissingTests.length) {
      console.error(routesMissingTests);
    }

    assert.equal(0, routesMissingTests.length);
    done();
  });
});

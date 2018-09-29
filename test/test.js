import 'dotenv/config';
import assert from 'assert';
import http from 'http';
import data from '../public/api_data.json';

describe('Test api routes', function () {
  const apiUrl = process.env.APP_URL + '/v1.0';
  const numberOfTests = data.length + 2;

  let that = this;
  that.numberOfRunTests = 0;

  it(process.env.APP_URL + '/ should return 302', function (done) {
    http.get(process.env.APP_URL + '/', function (res) {
      assert.equal(302, res.statusCode);
      that.numberOfRunTests++;
      done();
    });
  });

  it(apiUrl + '/ should return 200', function (done) {
    http.get(apiUrl + '/', function (res) {
      assert.equal(200, res.statusCode);
      that.numberOfRunTests++;
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
          that.numberOfRunTests++;
          done();
        });
      });
    }
  }

  it(apiUrl + '/nodes/3/amount should return 200', function (done) {
    http.get(apiUrl + '/nodes/3/amount', function (res) {
      assert.equal(200, res.statusCode);
      that.numberOfRunTests++;
      done();
    });
  });

  it(apiUrl + '/nodes/3/orders should return 200', function (done) {
    http.get(apiUrl + '/nodes/3/orders', function (res) {
      assert.equal(200, res.statusCode);
      that.numberOfRunTests++;
      done();
    });
  });

  it(apiUrl + '/nodes/3/members should return 200', function (done) {
    http.get(apiUrl + '/nodes/3/members', function (res) {
      assert.equal(200, res.statusCode);
      that.numberOfRunTests++;
      done();
    });
  });

  it(apiUrl + '/nodes/3/customers should return 200', function (done) {
    http.get(apiUrl + '/nodes/3/customers', function (res) {
      assert.equal(200, res.statusCode);
      that.numberOfRunTests++;
      done();
    });
  });

  it(apiUrl + '/nodes/3/customers should return 200', function (done) {
    http.get(apiUrl + '/nodes/3/customers?date=2018-06-28', function (res) {
      assert.equal(200, res.statusCode);
      that.numberOfRunTests++;
      done();
    });
  });

  it(apiUrl + '/nodes/3/producers should return 200', function (done) {
    http.get(apiUrl + '/nodes/3/producers?date=2018-06-28', function (res) {
      assert.equal(200, res.statusCode);
      that.numberOfRunTests++;
      done();
    });
  });

  it(apiUrl + '/nodes/3/products should return 200', function (done) {
    http.get(apiUrl + '/nodes/3/products?date=2018-06-28', function (res) {
      assert.equal(200, res.statusCode);
      that.numberOfRunTests++;
      done();
    });
  });

  it('All tests have run', function (done) {
    assert.ok(numberOfTests <= that.numberOfRunTests);
    done();
  });
});

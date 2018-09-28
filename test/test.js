import assert from 'assert';
import http from 'http';
import data from '../public/api_data.json';

describe('Test api routes', function () {
  const apiUrl = 'http://localhost:3000/v1.0';
  const numberOfTests = data.length + 2;

  let that = this;
  that.countNumberOrRunTests = 0;

  it('http://localhost:3000 should return 302', function (done) {
    http.get('http://localhost:3000', function (res) {
      assert.equal(302, res.statusCode);
      that.countNumberOrRunTests++;
      done();
    });
  });

  it('http://localhost:3000/v.1.0/ should return 200', function (done) {
    http.get(apiUrl + '/', function (res) {
      assert.equal(200, res.statusCode);
      that.countNumberOrRunTests++;
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
          that.countNumberOrRunTests++;
          done();
        });
      });
    }
  }

  it('http://localhost:3000/v.1.0/nodes/3/amount should return 200', function (done) {
    http.get(apiUrl + '/', function (res) {
      assert.equal(200, res.statusCode);
      that.countNumberOrRunTests++;
      done();
    });
  });

  it('http://localhost:3000/v.1.0/nodes/3/count should return 200', function (done) {
    http.get(apiUrl + '/', function (res) {
      assert.equal(200, res.statusCode);
      that.countNumberOrRunTests++;
      done();
    });
  });

  it('All tests have run', function (done) {
    assert.equal(numberOfTests, that.countNumberOrRunTests);
    done();
  });
});

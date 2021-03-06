var OData = require('../lib'),
	assert = require('assert');

describe('netflix odata integration tests', function () { 
	it('should query for titles', function ( done ) {
		OData("http://odata.netflix.com/Catalog")
			.from('Titles')
			//.skip(2)
			.top(2)
			.select("Id,Name,Synopsis")
			.query(function (err, res) {
			    assert.equal(res.d.length, 2);
			    done();
			});
	});

	it('should query with filter for titles', function ( done ) {
		OData("http://odata.netflix.com/Catalog")
			.from('Titles')
			.top(2)
			.select("Id,Name,Synopsis")
			.filter("Id eq '13dNq'")
			.query(function (err, res) {
			    assert.equal(res.d.length, 1);
			    done();
			});
	});

	it('should be able to modify the request', function ( done ) { 
		OData("http://odata.netflix.com/Catalog")
			.beforeRequest(function ( req, cb ) { 
				//set the top on every request.
				req.url = req.url + "&$top=2";
				//call the callback.
				cb();
			})
			.from('Titles')
			.select("Name,Synopsis")
			.query(function (err, res) {
			    console.log(res);
			    assert.equal(res.d.length, 2);
			    done();
			});
	});

	it('should get a single item', function () { 
		var q = OData("http://odata.netflix.com/Catalog")
			.from('Titles')
			.withId(1234);

		assert.equal("http://odata.netflix.com/Catalog/Titles(1234)", q.uri);
	});
});
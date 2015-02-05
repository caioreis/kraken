Tinytest.add('Send correct config', function (test) {

 var config = {
  kraken: {
    key: '5df09c826b7fe3ceer22e9df8c96b964',
    secret: '722415979f671229c706542c0eaee86247f39384'
  },
  s3: {
    key: 'AKIAJYI3K6SQT77X45QA',
    secret: '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',
    region: 'us-west-1',
    bucket: 'causal-bucket'
  }
}
test.equal(Images.setup(config), true);
});

Tinytest.add('Send mixed config files', function (test) {
 var config = {
    kraken: {
      key: '5df09c826b7fe3ceer22e9df8c96b964',
      secret: '722415979f671229c706542c0eaee86247f39384'
    },
    s3: {
      key: 'AKIAJYI3K6SQT77X45QA',
      secret: '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',
      region: 'us-west-1',
      bucket: 'causal-bucket'
    }
  };

  for (key in config) {
    var tmpConfig = {};
    tmpConfig[key] = config[key];
    
    test.equal(Images.setup(tmpConfig), false, 'Sending config with only ' + key);
  }
});

Tinytest.add('Send no config at all', function (test) {
  test.equal(Images.setup(), false);
});

Tinytest.add('Sending an empty config object', function (test) {
  var config = {};
  test.equal(Images.setup(config), false);
});

Tinytest.add('Sending mixed kraken config (only secret) with correct s3 config', function (test) {
  var config = {
    kraken: {
      secret: '722415979f671229c706542c0eaee86247f39384'
   },
   s3: {
     key: 'AKIAJYI3K6SQT77X45QA',
     secret: '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',
     region: 'us-west-1',
     bucket: 'causal-bucket'
   }
 };

 test.equal(Images.setup(config), false);
});

Tinytest.add('Sending mixed kraken config (only key) with correct s3 config', function (test) {
  var config = {
    kraken: {
      key: '722415979f671229c706542c0eaee86247f39384'
   },
   s3: {
     key: 'AKIAJYI3K6SQT77X45QA',
     secret: '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',
     region: 'us-west-1',
     bucket: 'causal-bucket'
   }
 };

 test.equal(Images.setup(config), false);
});

Tinytest.add('Send correct kraken config and mixed s3 config', function (test) {

 var config = {
  kraken: {
    key: '5df09c826b7fe3ceer22e9df8c96b964',
    secret: '722415979f671229c706542c0eaee86247f39384'
  },
  s3: {
    key: 'AKIAJYI3K6SQT77X45QA',
    bucket: 'causal-bucket'
  }
}
  test.equal(Images.setup(config), false);
});

Tinytest.add('Send example sizes with correct formatting', function (test) {

  sizes = { 
    thumb: {
      name: "thumb",
      width: 250,
      height: 220, 
      strategy: 'exact'
    },
    medium: {
      name: "medium",
      width: 577,
      height: 307,
      strategy: 'exact'
    },
    normal: {
      name: "normal",
      width: 1200,
      height: 1200,
      strategy: 'auto'
    }
  };

  test.equal(Images.setSizes(sizes), true);
});

Tinytest.add('Send mixed formatting erros to sizes', function (test) {
  sizes = { 
    thumb: {
      name: "thumb",
      width: 'fff',
      height: 220, 
      strategy: 'exact'
    },
    medium: {
      name: "medium",
      width: 577,
      height: 307,
      strategy: 1234
    },
    normal: {
      name: 1234,
      width: 1200,
      height: 1200,
      strategy: 'auto'
    }
  };

  var tmpSizes = { thumb: sizes.thumb };
  test.equal(Images.setSizes(tmpSizes), false, 'Width and height must be a number');
  
  var tmpSizes = { medium: sizes.medium };
  test.equal(Images.setSizes(tmpSizes), false, 'Strategy must be a string');  

  var tmpSizes = { normal: sizes.normal };
  test.equal(Images.setSizes(tmpSizes), false, 'Name must be a string');

});

Tinytest.add('Send no sizes at all to config', function (test) {
  test.equal(Images.setSizes(), false);
});

Tinytest.add('Send an empty object to config', function (test) {
  test.equal(Images.setSizes({}), false);
});


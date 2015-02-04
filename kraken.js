var Kraken = Npm.require('kraken');

var kraken;
var s3credentials = {};
var sizes = {};

Images = {
  setup: function (credentials) {
    
    s3credentials = credentials.s3;

    kraken = new Kraken({
      api_key: credentials.kraken.key,
      api_secret: credentials.kraken.secret
    });
  },
  setSizes: function (imageSizes) {
    sizes = imageSizes;
  },
  resize: function (url, path, version, callback) {

    var opts = {
      url: url,
      convert: {
        format: "jpeg",
        background: "#000000"
      },
      wait: true,
      lossy: true,
      resize: {
        width: sizes[version].width,
        height: sizes[version].height,
        strategy: sizes[version].strategy,
        background: "#000000"  
      },
      s3_store: {
        key: s3credentials.key,
        path: path + '_' + sizes[version].name + '.jpg',
        secret: s3credentials.secret,
        bucket: s3credentials.bucket,
        region: s3credentials.region
      }
    };

    kraken.url(opts, function(data) {
      if (!data.success) {
        console.log(data);
      }
      callback(data);
    });
  }
}


var Kraken = Npm.require('kraken');

var kraken;
var s3credentials = {};
var sizes = {};

Images = {
  setup: function (credentials) {

    if (!credentials)
      return false;

    if (!credentials.s3 || !credentials.kraken) 
      return false;
    
    if (!credentials.s3.key || !credentials.s3.secret || !credentials.s3.bucket || !credentials.s3.region)
      return false;

    if (!credentials.kraken.key || !credentials.kraken.secret)
      return false;

    s3credentials = credentials.s3;

    kraken = new Kraken({
      api_key: credentials.kraken.key,
      api_secret: credentials.kraken.secret
    });

    return true;
  },
  setSizes: function (imageSizes) {

    if (!imageSizes || _.keys(imageSizes).length === 0)
      return false;

    for (key in imageSizes) {
      var approved = true;
      var currentSize = imageSizes[key];

      if (!currentSize.name || !_.isString(currentSize.name))
        return false;

      if (!currentSize.height || !_.isNumber(currentSize.height))
        return false;

      if (!currentSize.width || !_.isNumber(currentSize.width))
        return false;

      if (!currentSize.strategy || !_.isString(currentSize.strategy))
        return false;
    }

    sizes = imageSizes;

    return true;
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


var Kraken = Npm.require('kraken');

kraken = new Kraken({
  api_key: '31eb328419776902d4087e5afc55c45b',
  api_secret: '791ab19e749368b544833304573ab7d1e94984b3'
});

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

resizeKraken = function (url, path, version, callback) {
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
      key: 'AKIAJBPPGSKGZE5ARP6Q',
      path: path + '_' + sizes[version].name + '.jpg',
      secret: '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',
      bucket: 'ab-fotos',
      region: 'us-west-2'
    }
  };

  kraken.url(opts, function(data) {
    if (!data.success) {
      console.log(data);
    }
    callback(data);
  });
}
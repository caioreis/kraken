var Kraken = Npm.require('kraken');

var kraken = new Kraken({
  api_key: '31eb328419776902d4087e5afc55c45b',
  api_secret: '791ab19e749368b544833304573ab7d1e94984b3'
});

var sizes = {
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

resizeKraken = function (url, path, version) {
  var opts = {
    url: url,
    convert: {
      format: "jpeg",
      background: "#000000"
    },
    wait: true,
    lossy: true,
    resize: {
      width: version.width,
      height: version.height,
      strategy: version.strategy,
      background: "#000000"
    },
    s3_store: {
      key: 'AKIAJBPPGSKGZE5ARP6Q',
      path: path + '_' + version.name + '.jpg',
      secret: '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',
      bucket: 'ab-fotos',
      region: 'us-west-2'
    }
  };

  return krakenUrlSync(opts);
}

var krakenUrlAsync = function (opts, callback) {
  kraken.url(opts, function(data) {
    if (!data.success) {
      console.log(data);
    }
    callback(null, data.success);
  });
};

var krakenUrlSync = Meteor.wrapAsync(krakenUrlAsync);

// var krakenTargetImage = function (image) {
//   if (!image || !image.original) {
//     return;
//   }

//   var url = 'http://ab-fotos.s3-us-west-2.amazonaws.com' + image.original;
//   var path = image.original.slice(0, -4);

//   if (!image.thumb && resizeKraken(url, path, sizes.thumb)) {
//     image.thumb = path + '_' + 'thumb.jpg';
//   }
//   if (!image.medium && resizeKraken(url, path, sizes.medium)) {
//     image.medium = path + '_' + 'medium.jpg';
//   }
//   if (!image.normal && resizeKraken(url, path, sizes.normal)) {
//     image.normal = path + '_' + 'normal.jpg';
//   }
// }

// var krakenCreateSingleVersion = function (image, version) {
//   if (!image || !image.original) {
//     return;
//   }

//   var url = image.original;
//   var path = image.original.slice(42, -4);

//   if (resizeKraken(url, path, sizes[version])) {
//     image.thumb = 'http://ab-fotos.s3-us-west-2.amazonaws.com'+ path + '_' + 'thumb.jpg';
//   }
// }

// Meteor.methods({
//   krakenVersions: function (id, collection) {
//     this.unblock();
//     var data = allCollections[collection].findOne({_id: id}, {fields: {images: 1, image: 1}});
    
//     if (!data) return;

//     if (data.images) {
//       data.images.forEach(function (image) {
//         krakenTargetImage(image);
//       })
//     } else if (data.image) {
//       krakenTargetImage(data.image);
//     }
//     allCollections[collection].update({_id: id}, {$set: data});

//     if (collection == 'Anuncios') {
//       allCollections[collection].update({_id: id}, {$set: {active: 0}});
//     }
//   },
//   krakenProfilePic: function () {
//     console.log('kraken');
//     var data = Meteor.users.findOne({_id: this.userId}, {fields: {'profile.picture': 1, _id: 0}});
//     if (!data || !data.profile || !data.profile.picture) {
//       return;
//     }

//     krakenCreateSingleVersion(data.profile.picture, 'thumb');
//     console.log(data);
//     Meteor.users.update({_id: this.userId}, {$set: data});
//   }
// });
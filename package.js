Package.describe({
  name: 'moretti:kraken',
  summary: 'Meteor smart package to deal with Kraken.io',
  version: '0.3.1',
  git: 'https://github.com/caioreis/kraken'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.addFiles('kraken.js', ['server']);
  api.export('Images', ['server']);
});

Npm.depends({
	kraken: "0.2.1"
});

/* Use case

Images.resize('http://images.visitcanberra.com.au/images/canberra_hero_image.jpg', 'teste', 'thumb', function (argument) {
  console.log(argument);
});

*/

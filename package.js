Package.describe({
  name: 'kraken',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.addFiles('kraken.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('kraken');
  api.addFiles('kraken-tests.js');
});

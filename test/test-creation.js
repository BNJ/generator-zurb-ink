/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('zurb-ink generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('zurb-ink:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'gulpfile.js',
      'package.json',
      '.gitignore',
      'bower.json',
      '.editorconfig',
      'index.html',
      'styles/styles.css'
    ];

    helpers.mockPrompt(this.app, {
      'inkTemplate': 'basic'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

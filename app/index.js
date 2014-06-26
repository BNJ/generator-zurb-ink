'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var ZurbInkGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Zurb Ink generator!'));

    var prompts = [{
      type: 'list',
      name: 'inkTemplate',
      message: 'Which ink template would you like to start with?',
      choices: [
        'Boilerplate',
        'Basic',
        'Hero',
        'Sidebar',
        'Sidebar Hero',
      ],
    }];

    this.prompt(prompts, function (props) {
      this.inkTemplate = props.inkTemplate.toLowerCase().replace(' ', '-');

      done();
    }.bind(this));
  },

  gulpfile: function() {
    this.copy('gulpfile.js');
  },

  packageJSON: function() {
    this.template('_package.json', 'package.json');
  },

  git: function() {
    this.copy('gitignore', '.gitignore');
  },

  bower: function() {
    this.template('_bower.json', 'bower.json');
  },

  editorConfig: function() {
    this.copy('editorconfig', '.editorconfig');
  },

  app: function () {
    this.mkdir('styles');
    this.copy('ink/' + this.inkTemplate + '/index.html', 'index.html');
    this.copy('ink/' + this.inkTemplate + '/styles.css', 'styles/styles.css');
  },
});

module.exports = ZurbInkGenerator;

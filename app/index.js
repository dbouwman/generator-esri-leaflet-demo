'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BbLeafletGenerator = yeoman.generators.Base.extend({
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
    this.log(yosay('Lets Cook an App!'));

   var prompts = [
      {
        name: 'appName',
        message: 'What is the name of this app?'
      },
      {
        name: 'gitHubAccount',
        message: 'What is your github account? (for package.json)'
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.authorName = props.authorName;
      this.gitHubAccount = props.gitHubAccount;

      done();
    }.bind(this));
  },

  app: function () {
    
    this.mkdir('app');
    
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    
    this.copy('_gitignore', '.gitignore');
    this.copy('_bowerrc', '.bowerrc');
    this.copy('editorconfig', 'editorconfig');

    this.template('_README.md', 'README.md');
    this.template('_index.html', 'app/index.html');

    this.copy('gruntfile.js', 'gruntfile.js');

    this.bulkDirectory('scripts', 'app/scripts');
    this.bulkDirectory('lib', 'app/lib');
    this.bulkDirectory('test', 'test');

    this.directory('images', 'app/images');
    this.directory('styles', 'app/styles');

  },

  final: function () {
    
    
  }
});

module.exports = BbLeafletGenerator;

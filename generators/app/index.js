'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the posh ' + chalk.red('Luxe') + ' generator!'
        ));

        var prompts = [{
            name: 'author_name',
            message: 'What is your name (Author name) ?',
            store: true
        }, {
            name: 'app_name',
            message: 'What is your app\'s name ?'
        }, {
            name: 'package_name',
            message: 'What is your package name (used for class package) ?'
        }, {
            name: 'app_title',
            message: 'What is your app\'s title (Shown as window title) ?'
        }, {
            name: 'app_width',
            message: 'What is your app\'s width ?',
            default: 960
        }, {
            name: 'app_height',
            message: 'What is your app\'s height ?',
            default: 640
        }, {
            type: 'confirm',
            name: 'fullscreen',
            message: 'Fullscreen application ?',
            default: true
        }, {
            type: 'confirm',
            name: 'resizable',
            message: 'Resizable application ?',
            default: true
        }, {
            type: 'confirm',
            name: 'borderless',
            message: 'Borderless application ?',
            default: false
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            var context = {
                app_width: this.props.app_width,
                app_height: this.props.app_height,
                app_title: this.props.app_title,
                fullscreen: this.props.fullscreen,
                resizable: this.props.resizable,
                borderless: this.props.borderless,
                app_name: this.props.app_name,
                author_name: this.props.author_name,
                package: this.props.package 
            };
            this.template(
                this.templatePath('project.flow'), 
                this.destinationPath('project.flow'),
                context
            );

            mkdirp('assets');
            this.fs.copy(
                this.templatePath('assets/luxe_logo.png'), 
                this.destinationPath('assets/luxe_logo.png')
            );

            mkdirp('src');
            this.template(
                this.templatePath('src/Main.hx'), 
                this.destinationPath('src/Main.hx'),
                context
            );
        }
    }
});

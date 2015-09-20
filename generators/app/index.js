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
            message: 'What is your app\'s name ?',
            default: 'MyGame'
        }, {
            name: 'package',
            message: 'What is your package name ( i.e. com.myname.mygame ) ?',
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
        }, {
            type: 'confirm',
            name: 'show_mouse_cursor',
            message: 'Show mouse cursor ?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            var done = this.async();
            var context = {
                app_width: this.props.app_width,
                app_height: this.props.app_height,
                fullscreen: this.props.fullscreen,
                resizable: this.props.resizable,
                borderless: this.props.borderless,
                app_name: this.props.app_name,
                author_name: this.props.author_name,
                show_mouse_cursor: this.props.show_mouse_cursor,
                package: this.props.package 
            };

            var templates = ['project.flow', 'src/Main.hx'];
            for (var i in templates) {
                this.template(
                    this.templatePath(templates[i]), 
                    this.destinationPath(templates[i]),
                    context
                );
            }

            mkdirp('assets');
            mkdirp('src');
            var files = ['assets/luxe_logo.png', 'assets/huechange.glsl'];
            for (var i in files) {
                this.fs.copy(
                    this.templatePath(files[i]),
                    this.destinationPath(files[i])
                );
            }

            // yeah timeout is ugly
            setTimeout(function() {
                // these two templates depend on Main.hx
                this.composeWith('luxe:state', {args: ['splash'], options: {splash:true, cursor:this.props.show_mouse_cursor}});
                this.composeWith('luxe:state', {args: ['play']});
                done();
            }.bind(this), 100);
        }
    }
});

'use strict';
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('state_name', { type: String, required: true });
        // CamelCase it
        this.class_name = _.capitalize(_.camelCase(this.state_name));
    },
    writing: {
        component: function () {
            var context = {
                state_name: this.state_name,
                class_name: this.class_name,
                show_mouse_cursor: !!this.options.cursor,
                package: 'states'
            };
            mkdirp('src/states');
            var template_file = 'State.hx';
            if (this.options['splash']) {
                template_file = 'Splash.hx';
            }
            this.template(
                this.templatePath(template_file), 
                this.destinationPath('src/states/' + this.class_name + '.hx'),
                context
            );
        }
    }
});

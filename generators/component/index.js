'use strict';
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('component_name', { type: String, required: true });
        // CamelCase it
        this.class_name = _.upperFirst(_.camelCase(this.component_name));
    },
    writing: {
        component: function () {
            var context = {
                component_name: this.component_name,
                class_name: this.class_name,
                package: 'components'
            };
            mkdirp('src/components');
            this.template(
                this.templatePath('Component.hx'), 
                this.destinationPath('src/components/' + this.class_name + '.hx'),
                context
            );
        }
    }
});

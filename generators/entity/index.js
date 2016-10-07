'use strict';
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('entity_name', { type: String, required: true });
        // CamelCase it
        this.class_name = _.upperFirst(_.camelCase(this.entity_name));
    },
    writing: {
        component: function () {
            var context = {
                entity_name: this.entity_name,
                class_name: this.class_name,
                package: 'entities'
            };
            mkdirp('src/entities');
            this.template(
                this.templatePath('Entity.hx'), 
                this.destinationPath('src/entities/' + this.class_name + '.hx'),
                context
            );
        }
    }
});

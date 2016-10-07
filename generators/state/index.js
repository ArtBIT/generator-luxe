'use strict';
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var wiring = require("html-wiring");
var _ = require('lodash');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('state_name', { type: String, required: true });
        // CamelCase it
        this.class_name = _.upperFirst(_.camelCase(this.state_name));
    },
    writing: {
        states: function () {
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
            if (fs.existsSync(this.destinationPath('src/Main.hx'))) {
                // update Main.hx
                // add the `import states.StateName;` line
                var mainhx = wiring.readFileAsString(this.destinationPath('src/Main.hx'));
                var line = "\n" + 'import states.' + this.class_name + ';';
                var comment = '// yeoman: import states';
                var pos = mainhx.indexOf(line);
                // only add the import line if it's not already added
                if (pos == -1) {
                    pos = mainhx.indexOf(comment);
                    if (pos != -1) {
                        pos += comment.length;
                        mainhx = mainhx.substr(0, pos) + line + mainhx.substr(pos);
                    }
                }
                // add the `state.add(new StateName({name:statename}));` line
                comment = '// yeoman: add states';
                line = "\n" + '        state.add(new ' + this.class_name + '({name: \'' + this.state_name + '\'}));';
                pos = mainhx.indexOf(line);
                if (pos == -1) {
                    pos = mainhx.indexOf(comment);
                    if (pos != -1) {
                        pos += comment.length;
                        mainhx = mainhx.substr(0, pos) + line + mainhx.substr(pos);
                    }
                }
                // write the updated contents
                fs.writeFileSync(this.destinationPath('src/Main.hx'), mainhx);
            }

        }
    }
});

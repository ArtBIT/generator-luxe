package <%= package %>;

import luxe.Sprite;
import luxe.Input;
import luxe.States;
import luxe.Color;
import luxe.Vector;
import luxe.Camera;

class <%= class_name %> extends State {
    var logo: Sprite;

    //called every frame for you
    override function update(dt:Float) {

    }

    // called when entering current state
    override public function onenter<T> (_:T) {
        #if debug
            trace('Entered state <%= class_name %>');
        #end

        // create logo sprite
        var logo_image = Luxe.resources.texture('assets/luxe_logo.png');
        logo = new Sprite({
            name: 'luxe logo',
            pos: Luxe.screen.mid,
            color: new Color(1, 1, 1, 0),
            texture: logo_image,
            size: new Vector(128, 128)
        });

        // fade-in the logo after 1s
        Luxe.timer.schedule(1, fadein);
    }

    // called when leaving the current state
    override public function onleave<T> (_:T) {
        logo.destroy();
    }

    function fadein() {
        logo.color.tween(1, { a: 1 } );
        Luxe.timer.schedule(1 + 3, fadeout);
    }

    function fadeout() {
        logo.color.tween(1, { a: 0 } );
        Luxe.timer.schedule(1, switchstate);
    }

    function switchstate() {
        Main.state.set('play');
    }
}

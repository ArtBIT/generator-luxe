package <%= package %>;

import luxe.Sprite;
import luxe.Input;
import luxe.States;
import luxe.Color;
import luxe.Vector;
import luxe.Camera;

class <%= class_name %> extends State {

    //called every frame for you
    override function update(dt:Float) {

    }

    // called when entering current state
    override public function onenter<T> (_:T) {
        #if DEBUG
            trace('Entered state <%= class_name %>');
        #end

    }

    // called when leaving the current state
    override public function onleave<T> (_:T) {

    }

    override function onkeyup( e:KeyEvent ) {
        #if DEBUG
        if (e.keycode == Key.escape) {
            // Shutdown game from any state
            Luxe.shutdown();
        }
        #end
    }
}

package;

import luxe.Screen.WindowEvent;
import luxe.Input;
import luxe.Sprite;
import luxe.Color;
import luxe.Vector;
import luxe.States;

// yeoman: import states
import states.Play;
import states.Splash;

class Main extends luxe.Game {

    var showCursor: Bool = <%= show_mouse_cursor %>;

    public static var state: States;

    override function config(config:luxe.AppConfig) {

        config.preload.textures.push({ id:'assets/luxe_logo.png' });
        return config;

    }

    // Scale camera's viewport  when the game is scaled
    override function onwindowsized( e:WindowEvent ) {

        Luxe.camera.viewport = new luxe.Rectangle( 0, 0, e.event.x, e.event.y);

    }

    //called by luxe for you when the resources are loaded and the app
    //is ready
    override function ready() {

        // Show/hide cursor
        Luxe.screen.cursor.visible = showCursor;

        // Create a state machine
        state = new States( { name: "states" } );
        // yeoman: add states
        state.add(new Play({name: 'play'}));
        state.add(new Splash({name: 'splash'}));
        state.set('splash');
    }

    //called by luxe for you, when a key is released
    override function onkeyup( e:KeyEvent ) {

        if (e.keycode == Key.escape) {
            Luxe.shutdown();
        }

    }

    //called by luxe for you, each frame, and passes in the
    //delta time (the length in seconds of the last frame).
    override function update(dt:Float) {

    }

}


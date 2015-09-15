import luxe.Input;
import luxe.Sprite;
import luxe.Color;
import luxe.Vector;

class Main extends luxe.Game {
    var logo: Sprite;

    override function config(config:luxe.AppConfig) {
        config.preload.textures.push({ id:'assets/luxe_logo.png' });
        return config;

    }

    //called by luxe for you when you can start coding
    override function ready() {
        var logo_image = Luxe.resources.texture('assets/luxe_logo.png');
        logo = new Sprite({
            name: 'luxe logo',
            pos: Luxe.screen.mid,
            color: new Color().rgb(0xf94b04),
            texture: logo_image,
            size: new Vector(128, 128)
        });
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


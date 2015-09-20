package states;

import luxe.Sprite;
import luxe.Input;
import luxe.States;
import luxe.Color;
import luxe.Vector;
import luxe.Camera;
import phoenix.Shader;

class Splash extends State {
    var logo: Sprite;
    var hue_shader: Shader;

    //called every frame for you
    override function update(dt:Float) {

    }

    // called when entering current state
    override public function onenter<T> (_:T) {
        #if debug
            trace('Entered state Splash');
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

        hue_shader = Luxe.resources.shader('hue');
        logo.shader = hue_shader;

        // fade-in the logo after 1s
        Luxe.timer.schedule(1, fadein);
    }

    // called when leaving the current state
    override public function onleave<T> (_:T) {
        logo.destroy();
    }

    override function onmousemove( e:MouseEvent ) {
        var percent = e.pos.x / Luxe.screen.w;
        var hue = (Math.PI*2) * percent;
        //hue based on mouse x
        hue_shader.set_float('in_hue', hue);
    }

    function fadein() {
        logo.color.tween(1, { a: 1 } ).onUpdate(updatealpha);
        Luxe.timer.schedule(1 + 3, fadeout);
    }

    function fadeout() {
        logo.color.tween(1, { a: 0 } ).onUpdate(updatealpha);
        Luxe.timer.schedule(1, switchstate);
    }

    function updatealpha() {
        hue_shader.set_float('in_alpha', logo.color.a);
    }

    function switchstate() {
        Main.state.set('play');
    }
}

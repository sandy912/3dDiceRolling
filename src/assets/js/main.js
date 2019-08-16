"use strict";

function dice_initialize(container) {
  setTimeout(function() {


    $t.remove($t.id('loading_text'));

    var canvas = $t.id('canvas');
    canvas.style.width = '100%';
    //canvas.style.height = window.Height - 1 + 'px';
    canvas.style.height = '80%';

    var label = $t.id('label');
   // var set = $t.id('set');
    var selector_div = $t.id('selector_div');
    var info_div = $t.id('info_div');
   // on_set_change();

    $t.dice.use_true_random = false;
    
    var params = $t.get_url_params();

    if (params.chromakey) {
        $t.dice.desk_color = 0x00ff00;
      //  info_div.style.display = 'none';
        $t.id('control_panel').style.display = 'none';
    }
    if (params.shadows == 0) {
        $t.dice.use_shadows = false;
    }
    if (params.color == 'white') {
        $t.dice.dice_color = '#808080';
        $t.dice.label_color = '#202020';
    }

    var box = new $t.dice.dice_box(canvas, { w: 500, h: 300 });
    box.animate_selector = false;

    $t.bind(window, 'resize', function() {
        canvas.style.width = window.innerWidth - 1 + 'px';
        canvas.style.height = window.innerHeight - 1 + 'px';
        box.reinit(canvas, { w: 500, h: 300 });
    });

    function before_roll(vectors, notation, callback) {
       // info_div.style.display = 'none';
      //  selector_div.style.display = 'none';
        // do here rpc call or whatever to get your own result of throw.
        // then callback with array of your result, example:
        // callback([2, 2, 2, 2]); // for 4d6 where all dice values are 2.
        var dice1 = window.localStorage.getItem('dice1');
        var dice2 = window.localStorage.getItem('dice2');
        callback([dice1, dice2]);
    }

    function notation_getter() {
        return $t.dice.parse_notation('2d6');
    }

    function after_roll(notation, result) {
        if (params.chromakey || params.noresult) return;
        var res = result.join(' ');
        if (notation.constant) {
            if (notation.constant > 0) res += ' +' + notation.constant;
            else res += ' -' + Math.abs(notation.constant);
        }
        if (result.length > 1) res += ' = ' + 
                (result.reduce(function(s, a) { return s + a; }) + notation.constant);
       // label.innerHTML = res;

       // the above is used to display label 
      //  info_div.style.display = 'inline-block';
    }

    box.bind_throw($t.id('roll'), notation_getter, before_roll, after_roll);

    if (params.notation) {
        set.value = params.notation;
    }
    if (params.roll) {
        $t.raise_event($t.id('throw'), 'mouseup');
    }
    else {
     //   show_selector();
    }
  }, 1000);
}
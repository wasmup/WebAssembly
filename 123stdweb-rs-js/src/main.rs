use stdweb;
use stdweb::js;

fn main() {
    stdweb::initialize();
    let message = "Hello from stdweb.";
    let result = js! {
        alert( @{message} );
        return 2 + 2 * 2;
    };
    println!("2 + 2 * 2 = {:?}", result);
    stdweb::event_loop();
}

use game_of_life::*;

fn main() -> () {
    let mut universe = Universe::new();

    loop {
        universe.tick();
        print!("{esc}[2J{esc}[1;1H", esc = 27 as char);
        print!("{}", universe);
        std::thread::sleep(std::time::Duration::from_millis(250));
    }
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }


import { Universe, Cell } from "game-of-life";
import { memory } from "game-of-life/game_of_life_bg";

const CELL_SIZE = 20; // px
const UNIVERSE_WIDTH = 32;
const UNIVERSE_HEIGHT = 32;
const BG_GRID_COLOR = "#CCCCCC";
const DEAD_CELL_COLOR = "#FFFFFF";
const LIVING_CELL_COLOR = "#000000";

const universe = Universe.new();
universe.set_width(UNIVERSE_WIDTH);
universe.set_height(UNIVERSE_HEIGHT);
universe.set_default_position();
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById("game-of-life-canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;


const context = canvas.getContext('2d');

const get_cell_index = (row, column) => {
    return row * width + column;
};

const draw_grid = () => {
    context.beginPath();
    context.strokeStyle = BG_GRID_COLOR;
    context.lineWidth = 1;

    for (let i = 0; i <= width; i++) {
        context.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        context.lineTo(i * (CELL_SIZE + 1) + 1, height * (CELL_SIZE + 1) + 1);
    }

    for (let i = 0; i <= height; i++) {
        context.moveTo(0,                           i * (CELL_SIZE + 1) + 1);
        context.lineTo(width * (CELL_SIZE + 1) + 1, i * (CELL_SIZE + 1) + 1);
    }

    context.stroke();
};

const draw_cells = () => {
    const cells_ptr = universe.cells_ptr();
    const cells = new Uint8Array(memory.buffer, cells_ptr, width * height);

    context.beginPath();

    for(let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const index = get_cell_index(row, col);
            context.fillStyle = cells[index] === Cell.Dead 
                ? DEAD_CELL_COLOR
                : LIVING_CELL_COLOR;
            context.fillRect(
                col * (CELL_SIZE + 1) + 1,
                row * (CELL_SIZE + 1) + 1,
                CELL_SIZE,
                CELL_SIZE
            );
            
        }
    }
    context.stroke();
};

var should_tick = false;

document.addEventListener('keydown', (e) => {
    if (e.key == 'r') {
        universe.kill();
        should_tick = false;
    }
    if (e.key == ' ') {
        should_tick = !should_tick;
    }
    if (e.key == 'd') {
        universe.set_default_position();
        should_tick = false;
    }
    if(e.key == 's') {
        universe.tick();
    }
});

canvas.addEventListener('click', (e) => {
    var mouse_pos = getMousePos(canvas, e);
    var col = Math.floor(mouse_pos.x/(CELL_SIZE+1));
    var row = Math.floor(mouse_pos.y/(CELL_SIZE+1));
    universe.cell_click_update(row, col);
});

const renderLoop = () => {
    if(should_tick === true) {
        universe.tick(); 
    }
    draw_grid();
    draw_cells();

    sleep(200);
    requestAnimationFrame(renderLoop);
};

draw_grid();
draw_cells();
requestAnimationFrame(renderLoop);

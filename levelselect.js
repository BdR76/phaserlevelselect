// -------------------------------------
// START THE GAME
// -------------------------------------
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

// some fake player level progress data coded as integers, -1..3 <=> locked..3 stars
var PLAYER_DATA = [3, 3, 2, 3, 1, 0, 0, -1, -1, -1, -1, -1];

var game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

// -------------------------------------
// PHASER GAME FUNCTIONS
// -------------------------------------
function preload() {
	game.load.spritesheet('levelselecticons', 'levelselecticons.png', 96, 96);
	game.load.bitmapFont('font72', 'font72.png', 'font72.xml'); // created with http://kvazars.com/littera/
}

function create() {
	game.stage.backgroundColor = 0x80a0ff;
	game.add.bitmapText(256, 24, 'font72', 'Select a level!', 48);
	createLevelIcons();
}

function update() {
	// nothing to do but wait until player selects a level
}

function render() {
	// display some debug info..?
}

// -------------------------------------
// Add level icon buttons
// -------------------------------------
function createLevelIcons() {

	var levelnr = 0;

	for (var y=0; y < 3; y++) {
		for (var x=0; x < 4; x++) {
			// player progress info for this level
			levelnr = levelnr + 1;
			var playdata = PLAYER_DATA[levelnr-1];

			// decide which icon
			var frame = 0; // locked
			var stars = -1; // no stars
			if (playdata > -1) {
				frame = 1; // unlocked
				if (playdata < 4) {stars = playdata;}; // 0..3 stars
			};

			// calculate position on screen
			var xpos = 160 + (x*128);
			var ypos = 120 + (y*128);

			// add sprites
			var icon1 = game.add.sprite(xpos, ypos, 'levelselecticons', frame);
			if (stars >= 0) {
				game.add.bitmapText(xpos+24, ypos+16, 'font72', ''+levelnr, 48);
				var icon2 = game.add.sprite(xpos, ypos, 'levelselecticons', (2+stars));
			};

			// input handler
			icon1.health = levelnr;
			icon1.inputEnabled = true;
			icon1.events.onInputDown.add(onSpriteDown, this);
		};
	};
}

function createLevelIcon() {

	return button;
}

function onSpriteDown(sprite, pointer) {
	alert('level selected! -> ' +sprite.health);
}

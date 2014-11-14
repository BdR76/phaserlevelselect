// -------------------------------------
// START THE GAME
// -------------------------------------
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

// some fake player level progress data coded as integers, -1..3 <=> locked..3 stars
var PLAYER_DATA = [3, 3, 2, 3, 1, 0, 0, -1, -1, -1, -1, -1];

var game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var holdicons = []

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
	animateLevelIcons();
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
			var isLocked = true; // locked
			var stars = 0; // no stars
			if (playdata > -1) {
				isLocked = false; // unlocked
				if (playdata < 4) {stars = playdata;}; // 0..3 stars
			};

			// calculate position on screen
			var xpos = 160 + (x*128);
			var ypos = 120 + (y*128);
			
			// create icon
			holdicons[levelnr-1] = createLevelIcon(xpos, ypos, levelnr, isLocked, stars);

			// input handler
			var backicon = holdicons[levelnr-1].getAt(0);
			backicon.health = levelnr;
			backicon.inputEnabled = true;
			backicon.events.onInputDown.add(onSpriteDown, this);
		};
	};
}

function createLevelIcon(xpos, ypos, levelnr, isLocked, stars) {

	// create new group
	var IconGroup = game.add.group();
	IconGroup.x = xpos;
	IconGroup.y = ypos;

	// determine background frame
	var frame = 0;
	if (isLocked == false) {frame = 1};
	
	// add background
	var icon1 = game.add.sprite(0, 0, 'levelselecticons', frame);
	IconGroup.add(icon1);

	// add stars, if needed
	if (isLocked == false) {
		var txt = game.add.bitmapText(24, 16, 'font72', ''+levelnr, 48);
		var icon2 = game.add.sprite(0, 0, 'levelselecticons', (2+stars));
		
		IconGroup.add(txt);
		IconGroup.add(icon2);
	};
	
	return IconGroup;
}

function onSpriteDown(sprite, pointer) {

	// retrieve the iconlevel
	var levelnr = sprite.health;

	if (PLAYER_DATA[levelnr-1] < 0) {
		// indicate it's locked by shaking left/right
		var IconGroup = holdicons[levelnr-1];
		var xpos = IconGroup.x;

		var tween = game.add.tween(IconGroup).to({ x: xpos+4 }, 20, Phaser.Easing.Linear.None)
			.to({ x: xpos-4 }, 30, Phaser.Easing.Linear.None)
			.to({ x: xpos+4 }, 40, Phaser.Easing.Linear.None)
			.to({ x: xpos-4 }, 50, Phaser.Easing.Linear.None)
			.start();
	} else {
		alert('OK level selected! -> ' +sprite.health);
	};
}

function animateLevelIcons() {

	// slide all icons into screen
	for (var i=0; i < holdicons.length; i++) {
		// get variables
		var IconGroup = holdicons[i];
		IconGroup.y = IconGroup.y + 600;
		var y = IconGroup.y;

		// tween animation
		game.add.tween(IconGroup).to( {y: y-600}, 400, Phaser.Easing.Linear.None, true, (i*40));
	};
}





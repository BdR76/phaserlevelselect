MainGame = function(game){
	// define needed variables for LevelSelect
	this.game = game;
	this._levelNumber = 1;
};
MainGame.prototype = {
	create: function(){

		// add text
		this.game.add.bitmapText(160, 100, 'font72', 'game goes here..', 48);
		this.game.add.bitmapText(160, 300, 'font72', 'click anywhere to go back', 48);
		
		// testing
		this.playerWins();
	},

	update: function () {
		// click anywhere to go back to the LevelSelect state
		if (this.game.input.activePointer.isDown)
		{
			this.state.start('levsel');
		}
	},

	playerWins: function() {
		// just testing, award random nr of stars
		var randstars = this.game.rnd.integerInRange(1, 3);
		this._stars = this.game.add.bitmapText(160, 200, 'font72', 'You get '+randstars+' stars!', 48);
		
		// set nr of stars for this level
		PLAYER_DATA[this._levelNumber-1] = randstars;

		// unlock next level
		if (this._levelNumber < PLAYER_DATA.length) {
			if (PLAYER_DATA[this._levelNumber] < 0) { // currently locked (=-1)
				PLAYER_DATA[this._levelNumber] = 0; // set unlocked, 0 stars
			}
		};

		// and write to local storage
		window.localStorage.setItem('mygame_progress', JSON.stringify(PLAYER_DATA));
	}

};
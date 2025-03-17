/******************************************************************************\
|                                                                              |
|                               play-button-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the view for a particular type of toolbar button.        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016 - 2025, Megahed Labs LLC, www.sharedigm.com        |
\******************************************************************************/

import ToggleButtonView from '../../../../../../views/apps/common/toolbars/buttons/toggle-button-view.js';

export default ToggleButtonView.extend({

	//
	// attributes
	//
	
	template: '<i class="fa fa-play"></i>',

	//
	// toggle methods
	//

	select: function(options) {

		// call superclass method
		//
		ToggleButtonView.prototype.select.call(this);

		// change icon from play to pause
		//
		this.$el.find('i').removeClass('fa-play').addClass('fa-pause');

		// perform action
		//
		if (!options || !options.silent) {
			this.parent.app.play();
		}
	},

	deselect: function(options) {

		// call superclass method
		//
		ToggleButtonView.prototype.deselect.call(this);

		// change icon from pause to play
		//
		this.$el.find('i').removeClass('fa-pause').addClass('fa-play');

		// perform action
		//
		if (!options || !options.silent) {
			this.parent.app.pause();
		}
	},

	//
	// rendering methods
	//

	onRender: function() {

		// set initial state
		//
		this.setDisabled(!this.parent.imageNumber || !this.parent.numImages || this.parent.numImages == 1);
	}
});

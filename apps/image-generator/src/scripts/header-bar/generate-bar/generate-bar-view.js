/******************************************************************************\
|                                                                              |
|                             generate-bar-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the view for a generate toolbar.                         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ToolbarView from '../../../../../views/apps/common/toolbars/toolbar-view.js';
import GenerateButtonView from '../../../../../views/apps/image-generator/header-bar/generate-bar/buttons/generate-button-view.js';
import EnhanceButtonView from '../../../../../views/apps/image-generator/header-bar/generate-bar/buttons/enhance-button-view.js';
import PostButtonView from '../../../../../views/apps/image-generator/header-bar/generate-bar/buttons/post-button-view.js';
// import GalleryButtonView from '../../../../../views/apps/image-generator/header-bar/generate-bar/buttons/gallery-button-view.js';
import TokensButtonView from '../../../../../views/apps/image-generator/header-bar/generate-bar/buttons/tokens-button-view.js';

export default ToolbarView.extend({

	//
	// attributes
	//

	className: 'toolbar',

	template: template(`
		<div class="generate"></div>
		<div class="enhance hidden"></div>
		<div class="post"></div>
		<div class="show-gallery"></div>
		<div class="tokens"></div>
	`),

	regions: {
		generate: '.generate',
		enhance: '.enhance',
		post: '.post',
		gallery: '.show-gallery',
		tokens: '.tokens'
	},

	multiline: true,

	//
	// setting methods
	//

	setDisabled: function() {
		this.getChildView('generate').setEnabled(false);
		this.getChildView('enhance').setEnabled(false);
		this.getChildView('post').setEnabled(false);
		// this.getChildView('gallery').setEnabled(false);
		this.getChildView('tokens').setEnabled(false);
	},

	setEnabled: function() {
		this.getChildView('generate').setEnabled(true);
		this.getChildView('enhance').setEnabled(this.app.hasSelected());
		this.getChildView('post').setEnabled(this.app.hasSelected());
		// this.getChildView('gallery').setEnabled(true);
		this.getChildView('tokens').setEnabled(true);
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		ToolbarView.prototype.onRender.call(this);

		// show child views
		//
		this.showChildView('generate', new GenerateButtonView());
		this.showChildView('enhance', new EnhanceButtonView());
		this.showChildView('post', new PostButtonView());
		// this.showChildView('gallery', new GalleryButtonView());
		this.showChildView('tokens', new TokensButtonView());

		// set initial state
		//
		if (!this.getParentView('app').model) {
			this.setDisabled(true);
		}
	},

	//
	// event handling methods
	//

	onLoad: function() {
		if (application.isSignedIn()) {
			this.setEnabled();
		} else {
			this.setDisabled();
		}
	}
});
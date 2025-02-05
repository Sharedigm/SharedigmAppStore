/******************************************************************************\
|                                                                              |
|                               share-menu-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying share dropdown menus.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ShareMenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/share-menu-view.js';

export default ShareMenuView.extend({

	//
	// attributes
	//

	events: {

		// share with connections
		//
		'click .share-message': 'onClickShareMessage',
		'click .gesture': 'onClickShareGesture',
		'click .share-by-topic': 'onClickShareByTopic',
		'click .share-by-message': 'onClickShareByMessage',

		// share with anyone
		//
		'click .share-by-link': 'onClickShareByLink',
		'click .share-by-email': 'onClickShareByEmail',

		// share items
		//
		'click .share-attachments': 'onClickShareAttachments'
	},

	//
	// querying methods
	//
	
	disabled: function() {
		let isCurrent = !this.parent.app.model.isCurrent();

		// set initial state
		//
		return {
			'share-message': !isCurrent,
			'share-gesture': !isCurrent,
			'share-by-topic': !isCurrent,
			'share-by-message': !isCurrent,
			'share-by-link': !isCurrent,
			'share-by-email': !isCurrent,
			'share-attachments': !isCurrent
		};
	},

	//
	// getting methods
	//

	getItems: function() {
		let items = ShareMenuView.prototype.getItems.call(this);
		return items.concat(this.getFileItems());
	},

	//
	// mouse event handling methods
	//

	onClickShareMessage: function() {
		this.parent.app.shareMessage();
	},

	onClickShareGesture: function() {
		let kind = $(event.target).attr('class').replace(' gesture', '');
		this.parent.app.shareGesture(kind);
	},

	onClickShareByTopic: function() {
		this.parent.app.shareByTopic();
	},

	onClickShareByMessage: function() {
		this.parent.app.shareByMessage();
	},

	onClickShareByLink: function() {
		this.parent.app.shareByLink();
	},

	onClickShareByEmail: function() {
		this.parent.app.shareByEmail();
	},

	onClickShareAttachments: function(event) {
		let key = $(event.target).closest('a').text().trim();
		let files = config.defaults.sharing.files[key];
		let directory = application.getDirectory(files.directory);
		this.parent.app.shareWithSelected({
			model: directory
		});
	},
});
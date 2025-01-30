/******************************************************************************\
|                                                                              |
|                               file-menu-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying file dropdown menus.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FileMenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/file-menu-view.js';

export default FileMenuView.extend({

	//
	// attributes
	//

	items: [
		{
			"class": "new-image",
			"icon": "far fa-image",
			"name": "New Image",
			"shortcut": "command-N"
		},
		{
			"class": "new-folder",
			"icon": "fa fa-folder",
			"name": "New Folder",
			"shortcut": "command-enter"
		},
		{
			"class": "new-window",
			"icon": "far fa-window-maximize",
			"name": "New Window",
			"shortcut": "shift-command-enter"
		},
		"separator",
		{
			"class": "open-item",
			"icon": "fa fa-folder-open",
			"name": "Open",
			"shortcut": "command-O"
		},
		{
			"class": "open-image",
			"icon": "fa fa-image",
			"name": "Open Image",
			"menu": [
				{
					"class": "open-first",
					"icon": "fa fa-fast-backward",
					"name": "First",
					"shortcut": "up arrow"
				},
				{
					"class": "open-prev",
					"icon": "fa fa-backward",
					"name": "Prev",
					"shortcut": "left arrow"
				},
				{
					"class": "open-next",
					"icon": "fa fa-forward",
					"name": "Next",
					"shortcut": "right arrow"
				},
				{
					"class": "open-last",
					"icon": "fa fa-fast-forward",
					"name": "Last",
					"shortcut": "down arrow"
				}
			]
		},
		{
			"class": "enhance-image",
			"icon": "far fa-gem",
			"name": "Enhance Image",
			"shortcut": "command-E"
		},
		"separator",
		{
			"class": "favorites",
			"icon": "fa fa-star",
			"name": "Favorites",
			"menu": [
				{
					"class": "add-favorites",
					"icon": "fa fa-star",
					"name": "Add Favorites",
					"shortcut": "shift-command-F"
				},
				{
					"class": "remove-favorites",
					"icon": "fa fa-trash-alt",
					"name": "Remove Favorites",
					"shortcut": "delete"
				}
			]
		},
		"separator",
		{
			"class": "show-info",
			"icon": "fa fa-info-circle",
			"name": "Show Info",
			"shortcut": "command-I"
		},
		"separator",
		{
			"class": "download-items",
			"icon": "fa fa-download",
			"name": "Download",
			"shortcut": "shift-command-D"
		},
		"separator",
		{
			"class": "delete-items",
			"icon": "fa fa-trash-alt",
			"name": "Delete",
			"shortcut": "delete"
		},
		"separator",
		"separator",
		{
			"class": "close-window",
			"icon": "fa fa-circle-xmark",
			"name": "Close",
			"shortcut": "command-L"
		}
	],
	
	events: {
		'click .new-image': 'onClickNewImage',
		'click .new-folder': 'onClickNewFolder',
		'click .new-window': 'onClickNewWindow',
		'click .open-item': 'onClickOpenItem',
		'click .open-first': 'onClickOpenFirst',
		'click .open-prev': 'onClickOpenPrev',
		'click .open-next': 'onClickOpenNext',
		'click .open-last': 'onClickOpenLast',
		'click .enhance-image': 'onClickEnhanceImage',
		'click .add-favorites': 'onClickAddFavorites',
		'click .remove-favorites': 'onClickRemoveFavorites',
		'click .show-info': 'onClickShowInfo',
		'click .download-items': 'onClickDownloadItems',
		'click .delete-items': 'onClickDeleteItems',
		'click .close-window': 'onClickCloseWindow',
	},

	//
	// querying methods
	//

	enabled: function() {
		let isSignedIn = application.isSignedIn();
		let isOpen = this.parent.app.hasImage();
		let hasImages = this.parent.app.hasImages();
		let hasSelectedFavorites = this.parent.app.hasSelectedFavorites();

		return {
			'new-image': isSignedIn,
			'new-folder': isSignedIn,
			'new-window': true,
			'open-item': isSignedIn,
			'open-first': hasImages,
			'open-prev': hasImages,
			'open-next': hasImages,
			'open-last': hasImages,
			'enhance-image': isSignedIn,
			'favorites': true,
			'add-favorites': true,
			'remove-favorites': hasSelectedFavorites,
			'show-info': isOpen,
			'download-items': isOpen,
			'delete-items': isSignedIn && isOpen,
			'close-window': true
		};
	},
	
	//
	// mouse event handling methods
	//

	onClickNewImage: function() {
		this.parent.app.showNewImageDialog();
	},

	onClickNewFolder: function() {
		this.parent.app.newFolder();
	},

	onClickOpenItem: function() {
		this.parent.app.showOpenDialog();
	},

	onClickOpenFirst: function() {
		this.parent.app.select('first');
	},

	onClickOpenPrev: function() {
		this.parent.app.select('prev');
	},

	onClickOpenNext: function() {
		this.parent.app.select('next');
	},

	onClickOpenLast: function() {
		this.parent.app.select('last');
	},

	onClickEnhanceImage: function() {
		this.parent.app.showEnhanceImageDialog();
	},

	onClickAddFavorites: function() {
		this.parent.app.showAddFavoritesDialog();
	},

	onClickRemoveFavorites: function() {
		this.parent.app.removeFavorites(this.parent.app.getSelectedFavorites());
	},

	onClickShowInfo: function() {
		this.parent.app.showInfoDialog();
	},

	onClickDownloadItems: function() {
		this.parent.app.downloadItems();
	},

	onClickDeleteItems: function() {
		this.parent.app.deleteSelected();
	}
});
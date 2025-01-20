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
			"class": "new-window",
			"icon": "far fa-window-maximize",
			"name": "New Window",
			"shortcut": "command-enter"
		},
		{
			"class": "new-contact",
			"icon": "fa fa-file",
			"name": "New Contact",
			"shortcut": "shift-command-enter"
		},
		{
			"class": "open-item",
			"icon": "fa fa-folder-open",
			"name": "Open",
			"shortcut": "command-O"
		},
		{
			"clas": "import",
			"icon": "fa fa-cloud-upload-alt",
			"name": "Import",
			"menu": [
				{
					"class": "import-google",
					"icon": "fab fa-google",
					"name": "Google Contacts"
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
			"class": "save-contact",
			"icon": "fa fa-save",
			"name": "Save",
			"shortcut": "command-S"
		},
		{
			"class": "save-as",
			"icon": "fa fa-save",
			"name": "Save As",
			"shortcut": "shift-command-S"
		},
		"separator",
		{
			"class": "close-tab",
			"icon": "fa fa-xmark",
			"name": "Close Tab",
			"shortcut": "command-L"
		},
		"separator",
		{
			"class": "close-window",
			"icon": "fa fa-circle-xmark",
			"name": "Close",
			"shortcut": "command-L"
		}
	],

	events: {
		'click .new-window': 'onClickNewWindow',
		'click .new-contact': 'onClickNewContact',
		'click .open-item': 'onClickOpenItem',
		'click .import-google': 'onClickImportGoogle',
		'click .show-info': 'onClickShowInfo',
		'click .save-contact': 'onClickSaveContact',
		'click .save-as': 'onClickSaveAs',
		'click .close-tab': 'onClickCloseTab',
		'click .close-window': 'onClickCloseWindow'
	},

	//
	// querying methods
	//

	visible: function() {
		let isSignedIn = application.isSignedIn();

		return {
			'new-window': true,
			'new-contact': isSignedIn,
			'open-item': isSignedIn,
			'import-google': isSignedIn,
			'show-info': true,
			'save-contact': isSignedIn,
			'save-as': isSignedIn,
			'close-tab': true,
			'close-window': true
		};
	},

	enabled: function() {
		let hasTabs = this.parent.app.hasTabs();
		let file = this.parent.app.getActiveModel();
		let directory = file? file.parent : undefined;
		let isDirty = hasTabs && this.parent.app.isDirty();
		let isSaved = file && file.isSaved();
		let isWritable = directory? directory.isWritableBy(application.session.user) : undefined;
		let hasSelected = this.parent.app.hasSelected();

		return {
			'new-window': true,
			'new-contact': isWritable,
			'open-item': true,
			'import-google': true,
			'show-info': isSaved || hasSelected,
			'save-contact': isDirty && isWritable,
			'save-as': isWritable,
			'close-tab': hasTabs,
			'close-window': true
		};
	},

	//
	// event handling methods
	//

	onSave: function() {
		this.setItemsDisabled([
			'save-contact'
		]);
	},

	//
	// mouse event handling methods
	//

	onClickNewContact: function() {
		this.parent.app.showNewContactDialog();
	},

	onClickOpenItem: function() {
		this.parent.app.open();
	},

	onClickImportGoogle: function() {
		this.parent.app.importFromGoogle();
	},

	onClickShowInfo: function() {
		this.parent.app.showInfoDialog();
	},
	
	onClickSaveContact: function() {
		this.parent.app.save();
	},

	onClickSaveAs: function() {
		this.parent.app.saveAs();
	},

	onClickCloseTab: function() {
		this.parent.app.closeActiveTab();
	}
});
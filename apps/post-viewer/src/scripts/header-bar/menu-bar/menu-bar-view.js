/******************************************************************************\
|                                                                              |
|                               menu-bar-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing an app's menu bar.               |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import MenuBarView from '../../../../../views/apps/desktop/header-bar/menu-bar/menu-bar-view.js';
import FileMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/file-menu-view.js';
import EditMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/edit-menu-view.js';
import ViewMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/view-menu-view.js';
import ShareMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/share-menu-view.js';
import SearchMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/search-menu-view.js';
import HelpMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/help-menu-view.js';

export default MenuBarView.extend({

	//
	// attributes
	//

	items: [
		{
			"class": "file",
			"icon": "fa fa-file",
			"name": "File"
		},
		{
			"class": "edit",
			"icon": "fa fa-pencil-alt",
			"name": "Edit"
		},
		{
			"class": "view",
			"icon": "fa fa-eye",
			"name": "View"
		},
		{
			"class": "search",
			"icon": "fa fa-search",
			"name": "Search"
		},
		{
			"class": "share",
			"icon": "fa fa-share",
			"name": "Share"
		},
		{
			"class": "help",
			"icon": "fa fa-question-circle",
			"name": "Help"
		}
	],

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		MenuBarView.prototype.onRender.call(this);

		// show dropdown menus
		//
		this.showChildView('file', new FileMenuView());
		this.showChildView('edit', new EditMenuView());
		this.showChildView('view', new ViewMenuView());
		this.showChildView('share', new ShareMenuView());
		this.showChildView('search', new SearchMenuView());
		this.showChildView('help', new HelpMenuView());

		// hide dropdowns
		//
		/*
		if (!this.app.topic.isOwnedBy(application.session.user)) {
			this.setMenuHidden('edit');
		}
		if (this.app.topic.isRequired()) {
			this.setMenuHidden('share');
		}
		*/
		// this.setMenuHidden('search');

		// listen to model for changes
		//
		this.listenTo(this.parent.unsubscribed, 'add, remove', this.onChange);
	}
});
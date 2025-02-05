/******************************************************************************\
|                                                                              |
|                               view-menu-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying view dropdown menus.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ViewMenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/view-menu-view.js';

export default ViewMenuView.extend({

	//
	// attributes
	//
	
	events: {

		// view options
		//
		'click .view-kind > a': 'onClickViewKind',

		// toolbar options
		//
		'click .show-toolbars': 'onClickShowToolbars',
		'click .show-toolbar > a': 'onClickShowToolbar',

		// details options
		//
		'click .view-details': 'onClickViewDetails',
		'click .detail-kind > a': 'onClickDetailKind',
		'click .date-format > a': 'onClickDateFormat',

		// sidebar options
		//
		'click .show-sidebar': 'onClickShowSidebar',
		'click .show-sidebar-panel > a': 'onClickShowSideBarPanel',

		// window options
		//
		'click .shrink-window': 'onClickShrinkWindow',
		'click .grow-window': 'onClickGrowWindow',
		'click .expand-window': 'onClickExpandWindow',

		// desktop options
		//
		'click .prev-space': 'onClickPrevSpace',
		'click .next-space': 'onClickNextSpace',
		'click .minimize-all': 'onClickMinimizeAll',
		'click .unminimize-all': 'onClickUnminimizeAll',
		'click .view-full-screen': 'onClickViewFullScreen',

		// preferences options
		//
		'click .view-preferences': 'onClickViewPreferences'
	},

	//
	// querying methods
	//

	hidden: function() {
		return {
			'view-maps': !this.parent.app.collection.hasGeolocation()
		};
	},

	selected: function() {
		let preferences = this.parent.app.preferences;
		let viewKind = preferences.get('view_kind');
		let toolbars = preferences.get('toolbars') || [];
		let mapMode = preferences.get('map_mode') || 'hybrid';
		let detailKind = preferences.get('detail_kind');
		let dateFormat = preferences.get('date_format');
		let sidebarPanels = preferences.get('sidebar_panels') || [];

		return {

			// item options
			//
			'view-icons': !viewKind || viewKind == 'icons',
			'view-names': viewKind == 'names',
			'view-lists': viewKind == 'lists',
			'view-trees': viewKind == 'trees',
			'view-cards': viewKind == 'cards',
			'view-tiles': viewKind == 'tiles',
			'view-maps': viewKind == 'maps',

			// mapping options
			//
			'show-map': mapMode == 'map',
			'show-satellite': mapMode == 'satellite',
			'show-hybrid': mapMode == 'hybrid',

			// detail options
			//
			'view-details': typeof detailKind == 'string' && detailKind != '',
			'view-location': detailKind == 'location',
			'view-occupation': detailKind == 'occupation',
			'view-age': detailKind == 'age',
			'view-gender': detailKind == 'gender',
			'view-birth-date': detailKind == 'birth_date',
			'view-join-date': detailKind == 'join_date',
			'view-connect-date': detailKind == 'connect_date',

			// date options
			//
			'view-date-only': dateFormat == 'date_only',
			'view-day-date': dateFormat == 'day_date',
			'view-time-only': dateFormat == 'time_only',
			'view-date-time': dateFormat == 'date_time',
			'view-day-date-time': dateFormat == 'day_date_time' || !dateFormat,

			// toolbar options
			//
			'show-toolbars': toolbars.length > 0,
			'show-nav-bar': toolbars.includes('nav'),

			// sidebar options
			//
			'show-sidebar': preferences.get('show_sidebar'),
			'show-actions-panel': sidebarPanels.includes('actions')
		};	
	}
});
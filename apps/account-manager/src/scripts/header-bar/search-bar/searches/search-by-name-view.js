/******************************************************************************\
|                                                                              |
|                            search-by-name-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for searching by name.                       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import SearchByTextView from '../../../../../../views/apps/common/header-bar/search-bar/searches/search-by-text-view.js';

export default SearchByTextView.extend({

	//
	// attributes
	//

	icon: 'fa fa-font',
	placholder: "Search by Name",

	//
	// search attributes
	//

	key: 'name'
});
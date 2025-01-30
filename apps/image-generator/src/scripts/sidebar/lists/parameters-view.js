/******************************************************************************\
|                                                                              |
|                               parameters-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing an file's parameters.            |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import BaseView from '../../../../../views/base-view.js';

export default BaseView.extend({

	//
	// attributes
	//
	
	className: 'multiline item-list',

	template: template(`
		<% if (parameters && Object.keys(parameters).length > 0) { %>
		<% let keys = Object.keys(parameters).sort(); %>
		<% for (let i = 0; i < keys.length; i++) { %>
		<% let key = keys[i]; %>

		<% let icon = 'fa fa-info-circle'; %>
		<% let value = parameters[key]; %>
		<% if (value == 'NONE') { value = 'none'; } %>
		<div class="item">
			<div class="info">
				<div class="icon">
					<i class="<%= icon %>"></i>
				</div>
				<label><%= key.toTitleCase().replace(/_/g,' ') %></label>
				<span class="name"><%= value || 'none' %></span>
			</div>
		</div>
		<% } %>
		<% } else { %>
		<div class="item">
			<div class="info">
				<span class="name">No parameters.</span>
			</div>
		</div>
		<% } %>
	`),

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			parameters: this.options.parameters
		};
	}
});
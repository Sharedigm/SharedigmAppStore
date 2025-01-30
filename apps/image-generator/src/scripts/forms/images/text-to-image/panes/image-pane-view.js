/******************************************************************************\
|                                                                              |
|                              image-pane-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing image parameters.                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormView from '../../../../../../../views/forms/form-view.js';

export default FormView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="resolution form-group">
			<label class="control-label"><i class="fa fa-arrows"></i>Resolution</label>
			<div class="center aligned controls">
				<select style="display:none">
					<% for (let i = 0; i < resolutions.length; i++) { %>
					<% let width = resolutions[i][0]; %>
					<% let height = resolutions[i][1]; %>
					<% let aspect_ratio = resolutions[i][2]; %>
					<option><%= width %> x <%= height %> (<%= aspect_ratio %>)</option>
					<% } %>
				</select>

				<i style="display:none; margin-left:100%" class="active fa fa-question-circle" data-toggle="popover" title="Resolution" data-content="This is the size of the generated image in pixels."></i>

				<div class="resolution items">
					<div class="icon-grid">
						<div class="icons">
							<% for (let i = 0; i < resolutions.length; i++) { %>
							<% let width = resolutions[i][0]; %>
							<% let height = resolutions[i][1]; %>
							<% let aspect_ratio = resolutions[i][2]; %>
							<% let thumbnail_width = width / max_size * 50; %>
							<% let thumbnail_height = height / max_size * 50; %>
							<% let is_selected = (i == selected_index); %>

							<div class="item<% if (is_selected) { %> selected<% } %>" index="<%= i %>">
								<div class="row">
									<div class="icon">
										<div class="preview" style="width:<%= thumbnail_width %>px; height:<%= thumbnail_height %>px">
											<div class="aspect-ratio"><%= aspect_ratio %></div>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="name" spellcheck="false"><%= width %> x <%= height %></div>
								</div>
							</div>
							<% } %>
						</div>
					</div>
				</div>
			</div>
		</div>
	`),

	defaults: {
		width: 1024,
		height: 1024
	},

	resolutions: [
		[1024, 1024, '1:1']
	],

	events: {
		'click .item': 'onClickItem',
	},

	//
	// constructor
	//

	initialize: function() {

		// set options from metadata or defaults
		//
		if (this.options.metadata) {
			this.setOptions(this.options.metadata);
		}

		// set attributes
		//
		this.selected_index = this.getResolutionIndex([this.options.width, this.options.height]) || 0;
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'width':
				return this.getValue('resolution')[0];
			case 'height':
				return this.getValue('resolution')[1];
			case 'resolution':
				return this.resolutions[this.getValue('resolution_index')];
			case 'resolution_index':
				return parseInt(this.$el.find('.resolution .item.selected').attr('index'));
		}
	},

	getValues: function() {
		return {
			width: this.getValue('width'),
			height: this.getValue('height')
		};
	},

	getResolutionIndex: function(resolution) {
		for (let i = 0; i < this.resolutions.length; i++) {
			if (this.resolutions[i][0] == resolution[0] &&
				this.resolutions[i][1] == resolution[1]) {
				return i;
			}
		}
	},

	getDefaultResolutionIndex: function() {
		let resolution = [this.options.width, this.options.height];
		return this.getResolutionIndex(resolution);
	},

	//
	// setting methods
	//

	setOptions: function(options) {
		let keys = Object.keys(this.defaults);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			this.options[key] = options && options[key]? options[key] : this.defaults[key];
		}
	},

	setValue: function(key, value) {
		switch (key) {
			case 'width':
				this.$el.find('.width').val(value);
				break;
			case 'height':
				this.$el.find('.height').val(value);
				break;
			case 'resolution':
				this.$el.find('.resolution select')[0].selectedIndex = this.getResolutionIndex(value);
				break;
		}
	},

	setValues: function(values) {
		this.setValue('width', values['width']);
		this.setValue('height', values['height']);
	},

	reset: function() {
		this.setValues(this.defaults);
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			selected_index: this.selected_index,
			resolutions: this.resolutions,
			max_size: 1024
		};
	},

	onRender: function() {

		// call ssuperclass method
		//
		FormView.prototype.onRender.call(this);

		// set initial values
		//
		this.setValues(_.extend({}, this.defaults, this.options.metadata));
	},

	//
	// event handling methods
	//

	onClickItem: function(event) {
		this.$el.find('.items .item.selected').removeClass('selected');
		$(event.target).closest('.item').addClass('selected');
	}
});
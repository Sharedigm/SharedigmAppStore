/******************************************************************************\
|                                                                              |
|                         openai-advanced-pane-view.js                         |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing advanced parameters.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import AdvancedPaneView from '../../../../../../../views/apps/image-generator/forms/images/image-to-image/panes/advanced-pane-view.js';
import RangeInputView from '../../../../../../../views/forms/inputs/range-input-view.js';

export default AdvancedPaneView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="model form-group" style="display:none">
			<label class="control-label"><i class="fa fa-cube"></i>Model</label>
			<div class="controls">
				<select>
					<% for (let i = 0; i < models.length; i++) { %>
					<% let value = models[i]; %>
					<% let label = value.replace(/-/g, ' ').toTitleCase().replace(' E', '-E'); %>
					<option value="<%= value %>"<% if (value == model) { %> selected<% } %>><%= label %></option>
					<% } %>
				</select>
				<i class="active fa fa-question-circle" data-toggle="popover" title="Model" data-content="This is the generator model to use."></i>
			</div>
		</div>

		<div class="n form-group">
			<label class="control-label"><i class="fa fa-th-large"></i>n</label>
			<div class="controls">
				<div class="range-input"></div>
				<i class="active fa fa-question-circle" data-toggle="popover" title="n" data-content="This is the number of images to generate."></i>
			</div>
		</div>
	`),

	regions: {
		n: '.n .range-input'
	},

	events: {
		'change .model select': 'onChangeModel'
	},

	models: [
		'dall-e-2',
		'dall-e-3'
	],

	// defaults
	//
	defaults: {
		model: 'dall-e-3',
		n: 1
	},

	//
	// constructor
	//

	initialize: function() {

		// set optional parameter defaults
		//
		if (this.options.model == undefined) {
			this.options.model = this.defaults.model;
		}
		if (this.options.n == undefined) {
			this.options.n = this.defaults.n;
		}
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'model':
				return this.$el.find('.model select').val();
			case 'width':
				return this.getValue('resolution')[0];
			case 'height':
				return this.getValue('resolution')[1];
			case 'size':
				return this.getValue('width') + 'x' + this.getValue('height');
			case 'n':
				return this.getChildView('n').getValue();
		}
	},

	getValues: function() {
		let model = this.getValue('model');
		switch (model) {
			case 'dall-e-2':
				return {
					model: this.getValue('model'),
					n: this.getValue('n')
				};
			case 'dall-e-3':
				return {
					model: this.getValue('model'),
					n: this.getValue('n'),
					quality: this.getValue('quality'),
					style: this.getValue('style')
				};
		}
	},

	//
	// setting methods
	//

	setValue: function(key, value) {
		switch (key) {
			case 'model':
				this.$el.find('.model select').val(value);
				break;
			case 'n':
				this.getChildView('n').setValue(value);
				break;
		}
	},

	setModel: function(model) {
		this.setSizes(this.sizes[model]);
		switch (model) {
			case 'dall-e-2':
				this.$el.find('.quality').hide();
				this.$el.find('.style').hide();
				break;
			case 'dall-e-3':
				this.$el.find('.quality').show();
				this.$el.find('.style').show();
				break;
		}
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {

			// values
			//
			model: this.options.model,
			width: this.options.width,
			height: this.options.height,
			n: this.options.n,

			// choices
			//
			models: this.models
		}
	},

	showRegion: function(name) {
		switch (name) {
			case 'n':
				this.showN();
				break;
		}
	},

	showN: function() {
		this.showChildView('n', new RangeInputView({

			// options
			//
			value: this.options.n,
			min: 1,
			max: 10,
			step: 1
		}));
	},

	//
	// mouse event handling methods
	//

	onChangeModel: function() {
		this.setModel(this.getValue('model'));
	}
});
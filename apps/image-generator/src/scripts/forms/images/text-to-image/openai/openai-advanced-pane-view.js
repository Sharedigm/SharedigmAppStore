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

import AdvancedPaneView from '../../../../../../../views/apps/image-generator/forms/images/text-to-image/panes/advanced-pane-view.js';
import RangeInputView from '../../../../../../../views/forms/inputs/range-input-view.js';

export default AdvancedPaneView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="model form-group">
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

		<div class="quality form-group">
			<label class="control-label"><i class="fa fa-gem"></i>Quality</label>
			<div class="controls">
				<select>
					<option value="standard">Standard</option>
					<option value="hd">HD</option>
				</select>
				<i class="active fa fa-question-circle" data-toggle="popover" title="Quality" data-content="This is the quality of the generated image."></i>
			</div>
		</div>

		<div class="style form-group">
			<label class="control-label"><i class="fa fa-paintbrush"></i>Style</label>
			<div class="controls">
				<select>
					<option value="vivid">Vivid</option>
					<option value="natural">Natural</option>
				</select>
				<i class="active fa fa-question-circle" data-toggle="popover" title="Style" data-content="The style of the generated images. Vivid causes the model to lean towards generating hyper-real and dramatic images. Natural causes the model to produce more natural, less hyper-real looking images."></i>
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
		n: 1,
		quality: 'standard',
		style: 'vivid'
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'model':
				return this.$el.find('.model select').val();
			case 'n':
				return this.getChildView('n').getValue();
			case 'quality':
				return this.$el.find('.quality select').val();
			case 'style':
				return this.$el.find('.style select').val();
			case 'sizes':
				return this.sizes[this.getValue('model')];
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
			case 'quality':
				this.$el.find('.quality select').val(value);
				break;
			case 'style':
				this.$el.find('.style select').val(value);
				break;
		}
	},

	setModel: function(model) {
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
			n: this.options.n,
			quality: this.options.quality,
			style: this.options.style,

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
		let model = this.getValue('model');
		this.setModel(model);

		// perform callback
		//
		if (this.options.onchange) {
			this.options.onchange(model)
		}
	}
});
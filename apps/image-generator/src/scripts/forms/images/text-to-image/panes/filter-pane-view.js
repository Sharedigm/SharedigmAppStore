/******************************************************************************\
|                                                                              |
|                              filter-pane-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing filter parameters.                    |
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
		<div class="negative prompt form-group">
			<label class="control-label"><i class="fa fa-quote-left"></i>Negative Prompt</label>
			<div class="controls">
				<div class="input-group">
					<textarea class="caption form-control" rows="10" placeholder="What would you not like to see?">
						<%= negative_prompt %>
					</textarea>
					<div class="input-group-addon">
						<i class="active fa fa-question-circle" data-toggle="popover" title="Negative Prompt" data-content="This is a set of terms to use to filter results."></i>
					</div>
				</div>

				<div class="buttons">
					<button class="clear btn"<% if (!negative_prompt) { %> disabled<% } %>>
						<i class="fa fa-xmark"></i>Clear
					</button>
					<% if (negative_prompt) { %>
					<button class="reset btn">
						<i class="fa fa-repeat"></i>Reset
					</button>
					<% } %>
				</div>
			</div>
		</div>
	`),

	events: _.extend({}, {
		'input .prompt textarea': 'onInputPrompt',
		'click .clear': 'onClickClear',
		'click .reset': 'onClickReset'
	}),

	//
	// constructor
	//

	initialize: function() {

		// set options from metadata
		//
		if (this.options.metadata && this.options.metadata.negative_prompt) {
			this.options.negative_prompt = this.options.metadata.negative_prompt;
		}
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'negative_prompt':
				return this.$el.find('.negative.prompt textarea').val();
		}
	},

	getValues: function() {
		return {
			negative_prompt: this.getValue('negative_prompt'),
		};
	},

	//
	// setting methods
	//

	setValue: function(key, value) {
		switch (key) {
			case 'negative_prompt':
				this.$el.find('.negative.prompt textarea').val(value);
				break;
		}
	},

	setValues: function(values) {
		if (!values) {
			return;
		}
		let keys = Object.keys(values);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let value = values[key];
			this.setValue(key, value);
		}
	},

	//
	// setting methods
	//

	setClearDisabled: function(disabled) {
		this.$el.find('.clear').prop('disabled', disabled);
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			negative_prompt: this.options.negative_prompt
		}
	},

	clear: function() {
		this.$el.find('textarea').val('');
		this.$el.find('textarea').focus();
	},

	reset: function() {
		this.$el.find('textarea').val(this.options.prompt);
		this.$el.find('textarea').focus();
	},

	//
	// keyboard event handling methods
	//

	onInputPrompt: function() {
		this.setClearDisabled(this.getValue('negative_prompt') == '');
	},

	//
	// mouse event handling methods
	//

	onClickClear: function() {
		this.clear();
		this.onInputPrompt();
	},

	onClickReset: function() {
		this.reset();
		this.onInputPrompt();
	}
});
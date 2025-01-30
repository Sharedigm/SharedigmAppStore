/******************************************************************************\
|                                                                              |
|                             general-pane-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing general parameters.                   |
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
		<div class="prompt form-group">
			<label class="control-label"><i class="fa fa-quote-left"></i>Prompt</label>
			<div class="controls">
				<div class="input-group">
					<textarea class="caption form-control" rows="8" placeholder="What would you like to see?"><%= prompt %></textarea>
					<div class="input-group-addon">
						<i class="active fa fa-question-circle" data-toggle="popover" title="Prompt" data-content="This is the text prompt to send to the image generator."></i>
					</div>
				</div>

				<div class="buttons">
					<button class="clear btn"<% if (!prompt) { %> disabled<% } %>>
						<i class="fa fa-xmark"></i>Clear
					</button>
					<% if (prompt) { %>
					<button class="reset btn">
						<i class="fa fa-repeat"></i>Reset
					</button>
					<% } %>
				</div>
			</div>
		</div>

		<% if (repeatable) { %>
		<div class="randomize form-group">
			<label class="control-label"><i class="fa fa-dice"></i>Randomize</label>
			<div class="controls">
				<div class="radio-inline">
					<label><input type="radio" name="randomize" value="random" checked />Random</label>
				</div>
				<div class="radio-inline">
					<label><input type="radio" name="randomize" value="repeat" />Repeat</label>
				</div>
				<i class="active fa fa-question-circle" data-toggle="popover" title="Randomize" data-content="This is whether or not to use the previous random seed which determines the randomized aspects of the image."></i>
			</div>
		</div>
		<% } %>

		<div class="options form-group">
			<label class="control-label"><i class="fa fa-check"></i>Options</label>
			<div class="controls">

				<div class="save-prompt checkbox-inline">
					<label><input type="checkbox"<% if (save_prompt) { %> checked<% } %>>Save Prompt</label>
				</div>

				<i class="active fa fa-question-circle" data-toggle="popover" title="Save Prompt" data-content="This is whether or not to save the prompt with the image."></i>
			</div>
		</div>
	`),

	events: _.extend({}, {
		'input .prompt textarea': 'onInputPrompt',
		'click .clear': 'onClickClear',
		'click .reset': 'onClickReset',
		'change .randomize': 'onChangeRandomize'
	}),

	//
	// querying methods
	//

	isEmpty: function() {
		return this.$el.find('textarea').is(':empty') && this.collection.isEmpty();
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'prompt':
				return this.$el.find('.prompt textarea').val();
			case 'randomize':
				return this.$el.find('.randomize input:checked').val();
			case 'save_prompt':
				return this.$el.find('.save-prompt input').is(':checked');
		}
	},

	getValues: function() {
		return {
			prompt: this.getValue('prompt'),
			save_prompt: this.getValue('save_prompt')
		};
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
			model: this.model,
			collection: this.collection,

			// options
			//
			prompt: this.options.prompt,
			save_prompt: this.options.save_prompt,
			repeatable: this.options.metadata? (this.options.metadata.seed != undefined) : false
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
		this.setClearDisabled(this.getValue('prompt') == '');
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
	},

	onChangeRandomize: function() {
		this.parent.onChangeRandomize();
	}
});
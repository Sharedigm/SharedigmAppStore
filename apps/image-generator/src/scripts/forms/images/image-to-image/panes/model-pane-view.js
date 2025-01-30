/******************************************************************************\
|                                                                              |
|                              model-pane-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing model parameters.                     |
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
		<div class="generator form-group">
			<label class="control-label"><i class="fa fa-robot"></i>Generator</label>
			<div class="controls">
				<% let selectNext = false; %>
				<% if (collection) { %>
				<% for (let i = 0; i < collection.length; i++) { %>
				<% let generator = collection.at(i); %>
				<% let label = generator.get('name'); %>
				<% if (label != 'DeepAI' && label != 'Stable Diffusion API') { %>
				<% let value = label.toLowerCase().replace('.', '_').replace(/ /g, '_'); %>
				<% let disabled = !generator.hasTokens(); %>
				<% let selected = model.is(generator); %>
				<% if (selectNext) { selected = true; selectNext = false; } %>
				<% if (selected && disabled) { selectNext = true; selected = false; } %>
				<% if (label == 'OpenAI') { label += ' (Dall-E)'; } %>
				<div>
					<div class="radio-inline">
						<label><input type="radio" value="<%= value %>" name="generator"<% if (selected) { %> checked<% } %><% if (disabled) { %> disabled<% } %> /><%= label %></label>
					</div>
				</div>
				<% } %>
				<% } %>
				<% } %>
			</div>
		</div>
	`),

	events: _.extend({}, {
		'change .generator': 'onChangeGenerator'
	}),

	//
	// constructor
	//

	initialize: function() {

		// set optional parameter defaults
		//
		if (!this.model && this.collection) {
			this.model = this.collection.at(0);
		}
	},

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
			case 'generator':
				return this.$el.find('.generator input:checked').val();
		}
	},

	getValues: function() {
		return {
			generator: this.getValue('generator')
		};
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			model: this.model,
			collection: this.collection
		}
	},

	//
	// mouse event handling methods
	//

	onChangeGenerator: function() {
		this.parent.onChangeGenerator();
	}
});
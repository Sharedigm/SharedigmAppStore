/******************************************************************************\
|                                                                              |
|                       stability-ai-styles-pane-view.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing style parameters.                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import StylesPaneView from '../../../../../../../views/apps/image-generator/forms/images/image-to-image/panes/styles-pane-view.js';

export default StylesPaneView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="style-preset form-group">
			<label class="control-label"><i class="fa fa-paintbrush"></i>Style Preset</label>
			<div class="controls">
				<% for (let i = 0; i < style_presets.length; i++) { %>
				<% let value = style_presets[i]; %>
				<% let label = value.replace(/-/g, ' ').toTitleCase(); %>
				<div class="radio-inline" style="min-width:45%">
					<label><input type="radio" value="<%= value %>" name="style-preset"<% if (style_preset == value) { %> checked<% } %> /><%= label %></label>
				</div>
				<% } %>
				<div class="radio-inline" style="min-width:45%">
					<label><input type="radio" value="" name="style-preset"<% if (!style_preset) { %> checked<% } %> />None</label>
				</div>
			</div>
		</div>
	`),

	style_presets: [
		'3d-model',
		'analog-film',
		'anime',
		'cinematic',
		'comic-book',
		'digital-art',
		'enhance',
		'fantasy-art',
		'isometric',
		'line-art',
		'low-poly',
		'modeling-compound',
		'neon-punk',
		'origami',
		'photographic',
		'pixel-art',
		'tile-texture'
	],

	// defaults
	//
	defaults: {
		style_preset: undefined
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'style_preset':
				return this.$el.find('.style-preset input:checked').val();
		}
	},

	getValues: function() {
		return {
			style_preset: this.getValue('style_preset')
		};
	},

	//
	// setting methods
	//

	setValue: function(key, value) {
		switch (key) {
			case 'style_preset':
				this.$el.find('input[value="' + value + '"]').prop('checked', true);
				break;
		}
	},

	reset: function() {
		this.setValue('style_preset', '');
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			style_preset: this.options.style_preset,
			style_presets: this.style_presets
		}
	}
});
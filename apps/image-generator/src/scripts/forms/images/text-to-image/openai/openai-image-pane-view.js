/******************************************************************************\
|                                                                              |
|                           openai-image-pane-view.js                          |
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

import ImagePaneView from '../../../../../../../views/apps/image-generator/forms/images/text-to-image/panes/image-pane-view.js';

export default ImagePaneView.extend({

	//
	// attributes
	//

	models: [
		'dall-e-2',
		'dall-e-3'
	],

	sizes: {
		'dall-e-2': [
			[1024, 1024, '1:1'],
			[512, 512, '1:1'],
			[256, 256, '1:1']
		],
		'dall-e-3': [
			[1024, 1024, '1:1'],
			[1792, 1024, '7:4'],
			[1024, 1792, '4:7']
		]
	},

	// defaults
	//
	defaults: {
		width: 1024,
		height: 1024
	},

	initialize: function() {

		// set options from metadata or defaults
		//
		if (this.options.metadata) {
			this.setOptions(this.options.metadata);
		}

		// set attributes
		//
		this.model = this.models[this.models.length - 1];
		this.selected_index = this.getSizeIndex([this.options.width, this.options.height]) || 0;
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'size':
				return this.getValue('width') + 'x' + this.getValue('height');
			case 'width':
				return this.getValue('resolution')[0];
			case 'height':
				return this.getValue('resolution')[1];
			case 'resolution':
				return this.sizes[this.model][this.getValue('resolution_index')];
			case 'resolution_index':
				return parseInt(this.$el.find('.resolution .item.selected').attr('index'));
		}
	},

	getValues: function() {
		return {
			size: this.getValue('size'),
		};
	},

	getSizeIndex: function(size) {
		for (let i = 0; i < this.sizes[this.model].length; i++) {
			if (this.sizes[this.model][i][0] == size[0] &&
				this.sizes[this.model][i][1] == size[1]) {
				return i;
			}
		}
	},

	//
	// setting methods
	//

	setValue: function(key, value) {
		switch (key) {
			case 'size':
				this.$el.find('.size select')[0].selectedIndex = this.getSizeIndex(value);
				break;
			case 'sizes':
				this.setSizes(value);
				break;
		}
	},

	setSizes: function(sizes) {
		this.$el.find('.size select option').remove();
		for (let i = 0; i < sizes.length; i++) {
			let width = sizes[i][0];
			let height = sizes[i][1];
			let label = width + ' x ' + height;
			let option = $('<option>').html(label);
			this.$el.find('.size select').append(option);
		}
	},

	setModel: function(model) {
		this.model = model;
		this.selected_index = 0;
		this.render();
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			selected_index: this.selected_index,
			resolutions: this.sizes[this.model],
			max_size: this.model == 'dall-e-3'? 1792 : 1024
		}
	},

	//
	// mouse event handling methods
	//

	onChangeModel: function() {
		this.setModel(this.getValue('model'));
	}
});
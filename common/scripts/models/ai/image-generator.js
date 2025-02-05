/******************************************************************************\
|                                                                              |
|                              image-generator.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of an AI image generator.                        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import BaseModel from '../../models/base-model.js';

export default BaseModel.extend({

	//
	// ajax attributes
	//

	urlRoot: config.servers.api + '/images/generators',

	//
	// querying methods
	//

	isDisabled: function() {
		return !this.get('enabled');
	},

	isTokensDisabled: function() {
		return this.get('num_tokens_per_request') == 0;
	},

	hasTokens: function() {
		return this.get('num_remaining_tokens') > 0;
	},

	//
	// ajax methods
	//

	requestTokens: function(options) {
		$.ajax({
			url: this.url() + '/tokens/request',
			type: 'POST',

			// callbacks
			//
			success: options.success,
			error: options.error
		});
	},

	setApiKey: function(apiKey, options) {
		$.ajax({
			url: this.url() + '/api-key',
			type: 'POST',
			data: {
				api_key: apiKey
			},

			// callbacks
			//
			success: options.success,
			error: options.error
		});
	},

	//
	// ajax generating methods
	//

	generate: function(data, options) {
		$.ajax({
			url: this.url() + '/generate',
			type: 'POST',
			data: data,

			// callbacks
			//
			success: options.success,
			error: options.error
		});
	},

	enhance: function(image, data, options) {
		$.ajax({
			url: this.url() + '/enhance',
			type: 'POST',
			data: _.extend(data, {
				path: image.get('path')
			}),

			// callbacks
			//
			success: options.success,
			error: options.error
		});
	}
}, {

	//
	// static methods
	//

	getMetadata: function(exif) {
		let metadata = {};

		// check for exif info
		//
		if (!exif) {
			return metadata;
		}

		// get image metadata
		//
		metadata.generator = exif['Make'];
		metadata.prompt = exif['Description'];
		metadata.width = parseInt(exif['Image Width']);
		metadata.height = parseInt(exif['Image Height']);

		// parse model metadata
		//
		let model = exif['Model'] || exif['Camera Model Name'];
		if (model) {
			let terms = model.split(';');
			for (let i = 0; i < terms.length; i++) {
				let pair = terms[i].split(':');
				if (pair.length > 1) {
					let key = pair[0].trim();
					let value = pair[1].trim();
					let isNum = /^\d+$/.test(value);
					if (isNum) {
						value = parseInt(value);
					}
					metadata[key] = value;
				}
			}
		}

		return metadata;
	}
});
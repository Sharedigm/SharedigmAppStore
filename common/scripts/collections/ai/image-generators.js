/******************************************************************************\
|                                                                              |
|                              image-generator.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a collection of an AI image generators.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import BaseCollection from '../../collections/base-collection.js';
import ImageGenerator from '../../models/ai/image-generator.js';

export default BaseCollection.extend({

	//
	// attributes
	//

	model: ImageGenerator,

	//
	// ajax attributes
	//

	url: ImageGenerator.prototype.urlRoot,

	//
	// querying methods
	//

	hasTokens: function() {
		if (this.length > 0) {
			for (let i = 0; i < this.length; i++) {
				let generator = this.at(i);
				if (generator.hasTokens()) {
					return true;
				}
			}
		}
		return false;
	},

	//
	// getting methods
	//

	getByName: function(name) {
		for (let i = 0; i < this.length; i++) {
			let generator = this.at(i);
			let generatorName = generator.get('name');
			if (name == generatorName) {
				return generator;
			}
		}
	},

	getById: function(id) {
		for (let i = 0; i < this.length; i++) {
			let generator = this.at(i);
			let generatorId = generator.get('name').toLowerCase().replace('.', '_').replace(/ /g, '_');
			if (id == generatorId) {
				return generator;
			}
		}
	},
});
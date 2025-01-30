/******************************************************************************\
|                                                                              |
|                         enhance-image-dialog-view.js                         |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a dialog for enhancing an existing image.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormDialogView from '../../../../../views/forms/dialogs/form-dialog-view.js';
import ImageToImageFormView from '../../../../../views/apps/image-generator/forms/images/image-to-image/image-to-image-form-view.js';

export default FormDialogView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="modal-dialog">

			<div class="modal-header">
				<div class="heading">
					<div class="icon">
						<i class="fa fa-gem"></i>
					</div>
					<div class="title">
						Enhance Image
					</div>
				</div>
			</div>

			<div class="modal-content">
				<div class="modal-body"></div>

				<div class="modal-footer">
					<div class="buttons">
						<button class="enhance btn btn-primary">
							<i class="fa fa-play"></i>Enhance
						</button>
						<button class="cancel btn" data-dismiss="modal">
							<i class="fa fa-xmark"></i>Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	`),

	events: _.extend({}, FormDialogView.prototype.events, {
		'click .enhance': 'onClickEnhance'
	}),

	//
	// dialog attributes
	//

	size: config.defaults.dialogs.sizes.small,

	//
	// constructor
	//

	initialize: function() {
		this.options.width = this.size[0];
		this.options.height = this.size[1];
	},

	//
	// setting methods
	//

	setDisabled: function(disabled) {
		this.$el.find('.enhance').prop('disabled', disabled !== false);
	},

	//
	// rendering methods
	//

	form: function() {
		return new ImageToImageFormView({
			model: this.model,
			collection: this.collection,

			// options
			//
			prompt: this.options.prompt,
			metadata: this.options.metadata,
			save_prompt: this.options.save_prompt
		});
	},

	//
	// mouse event handling methods
	//

	onClickEnhance: function() {
		let values = this.getChildView('form').getValues();

		// close dialog
		//
		this.hide();

		// perform callback
		//
		if (this.options.onsubmit) {
			this.options.onsubmit(values);
		}
	}
});
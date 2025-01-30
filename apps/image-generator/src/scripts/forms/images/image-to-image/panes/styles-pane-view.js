/******************************************************************************\
|                                                                              |
|                             styles-pane-view.js                              |
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

import FormView from '../../../../../../../views/forms/form-view.js';

export default FormView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="style form-group">
			<label class="control-label"><i class="fa fa-paintbrush"></i>Style</label>
			<div class="controls">
				<p class="form-control-static">Please select one or more style presets: </p>
			</div>
		</div>
	`)
});
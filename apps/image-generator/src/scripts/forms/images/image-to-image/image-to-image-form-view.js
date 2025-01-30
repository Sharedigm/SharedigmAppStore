/******************************************************************************\
|                                                                              |
|                         image-to-image-form-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a form view for generating new images.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormView from '../../../../../../views/forms/form-view.js';
import GeneralPaneView from '../../../../../../views/apps/image-generator/forms/images/image-to-image/panes/general-pane-view.js';
import ModelPaneView from '../../../../../../views/apps/image-generator/forms/images/image-to-image/panes/model-pane-view.js';
import AdvancedPaneView from '../../../../../../views/apps/image-generator/forms/images/image-to-image/panes/advanced-pane-view.js';
import FilterPaneView from '../../../../../../views/apps/image-generator/forms/images/image-to-image/panes/filter-pane-view.js';

// styles panes
//
import StabilityAIStylesPaneView from '../../../../../../views/apps/image-generator/forms/images/image-to-image/stability-ai/stability-ai-styles-pane-view.js';

// advanced panes
//
import StabilityAIAdvancedPaneView from '../../../../../../views/apps/image-generator/forms/images/image-to-image/stability-ai/stability-ai-advanced-pane-view.js';
import OpenAIAdvancedPaneView from '../../../../../../views/apps/image-generator/forms/images/image-to-image/openai/openai-advanced-pane-view.js';
import DeepAIAdvancedPaneView from '../../../../../../views/apps/image-generator/forms/images/image-to-image/deepai/deepai-advanced-pane-view.js';
import StableDiffusionAPIAdvancedPaneView from '../../../../../../views/apps/image-generator/forms/images/image-to-image/stable-diffusion-api/stable-diffusion-api-advanced-pane-view.js';

export default FormView.extend({

	//
	// attributes
	//

	template: template(`
		<ul class="nav nav-tabs" role="tablist">

			<li role="presentation" class="general-tab active">
				<a role="tab" data-toggle="tab" href=".general">
					<i class="fa fa-check"></i>
					<label>General</label>
				</a>
			</li>

			<li role="presentation" class="model-tab">
				<a role="tab" data-toggle="tab" href=".model">
					<i class="fa fa-cube"></i>
					<label>Model</label>
				</a>
			</li>

			<li role="presentation" class="styles-tab">
				<a role="tab" data-toggle="tab" href=".styles">
					<i class="fa fa-paintbrush"></i>
					<label>Styles</label>
				</a>
			</li>

			<li role="presentation" class="advanced-tab">
				<a role="tab" data-toggle="tab" href=".advanced">
					<i class="fa fa-sliders"></i>
					<label>Advanced</label>
				</a>
			</li>

			<li role="presentation" class="filter-tab">
				<a role="tab" data-toggle="tab" href=".filter">
					<i class="fa fa-filter"></i>
					<label>Filter</label>
				</a>
			</li>
		</ul>

		<div class="tab-content">

			<div role="tabpanel" class="general tab-pane active">
			</div>

			<div role="tabpanel" class="model tab-pane">
			</div>

			<div role="tabpanel" class="styles tab-pane">
			</div>

			<div role="tabpanel" class="advanced tab-pane">
			</div>

			<div role="tabpanel" class="filter tab-pane">
			</div>
		</div>
	`),

	regions: {
		general: '.general',
		model: '.model',
		styles: '.styles',
		advanced: '.advanced',
		filter: '.filter'
	},

	defaults: {
		generator: 'stability.ai'
	},

	//
	// constructor
	//

	initialize: function() {

		// set defailts
		//
		if (!this.model) {
			this.model = this.getGenerator(this.defaults.generator);
		}
	},

	//
	// querying methods
	//

	isValid: function() {
		return this.getGenerator(this.getValue('generator')) != null;
	},

	//
	// getting methods
	//

	getGenerator: function(name) {
		let generator = this.collection.getByName(name);

		// for backward compatibility, get by id
		//
		if (!generator) {
			generator = this.collection.getById(name);
		}

		return generator;
	},

	getValue: function(key) {
		switch (key) {
			case 'generator':
				return this.getChildView('model').getValue('generator');
			case 'randomize':
				return this.getChildView('general').getValue('randomize');
		}
	},

	getValues: function() {
		let generator = this.getValue('generator');
		switch (generator) {
			case 'stability_ai':
				return _.extend({},
					this.getChildView('general').getValues(),
					this.getChildView('model').getValues(),
					this.getChildView('styles').getValues(),
					this.getChildView('advanced').getValues(),
					this.getChildView('filter').getValues());
			default:
				return _.extend({},
					this.getChildView('general').getValues(),
					this.getChildView('model').getValues(),
					this.getChildView('advanced').getValues());
		}
	},

	getStylesPaneView: function(generator) {
		switch (generator) {
			case 'stability_ai':
				return StabilityAIStylesPaneView;
		}
	},

	getAdvancedPaneView: function(generator) {
		switch (generator) {
			case 'stability_ai':
				return StabilityAIAdvancedPaneView;
			case 'openai':
				return OpenAIAdvancedPaneView;
			case 'deepai':
				return DeepAIAdvancedPaneView;
			case 'stable_diffusion_api':
				return StableDiffusionAPIAdvancedPaneView;
			default:
				return AdvancedPaneView;
		}
	},

	getFilterPaneView: function(generator) {
		switch (generator) {
			case 'stability_ai':
				return FilterPaneView;
		}
	},

	//
	// setting methods
	//

	setValues: function(values) {
		this.getChildView('advanced').setValues(values);
	},

	reset: function() {
		this.getChildView('advanced').reset();
	},

	setTabVisible: function(tab, visible) {
		if (visible) {
			this.$el.find('.' + tab + '-tab').show();
		} else {
			this.$el.find('.' + tab + '-tab').hide();
		}
	},

	//
	// rendering methods
	//

	onRender: function() {

		// render panes
		//
		this.showPane('general');
		let panes = Object.keys(this.regions);
		for (let i = 1; i < panes.length; i++) {
			let pane = panes[i];
			this.showPane(pane);
		}

		// update tabs
		//
		this.setTabVisible('styles', this.hasChildView('styles'));
		this.setTabVisible('advanced', this.hasChildView('advanced'));
		this.setTabVisible('filter', this.hasChildView('filter'));
	},

	showPane: function(pane) {
		switch (pane) {
			case 'general':
				this.showGeneralPane();
				break;
			case 'model':
				this.showModelPane();
				break;
			case 'styles':
				this.showStylesPane();
				break;
			case 'advanced':
				this.showAdvancedPane();
				break;
			case 'filter':
				this.showFilterPane();
				break;
		}
	},

	showGeneralPane: function() {
		this.showChildView('general', new GeneralPaneView({
			model: this.model,
			collection: this.collection,

			// options
			//
			prompt: this.options.prompt,
			metadata: this.options.metadata,
			save_prompt: this.options.save_prompt
		}));
	},

	showModelPane: function() {
		this.showChildView('model', new ModelPaneView({
			model: this.model,
			collection: this.collection,

			// options
			//
			prompt: this.options.prompt,
			metadata: this.options.metadata
		}));
	},

	showStylesPane: function() {
		let generator = this.getValue('generator');
		let StylesPaneView = this.getStylesPaneView(generator);

		// show styles panel
		//
		if (StylesPaneView) {
			let stylePreset = this.options.metadata? this.options.metadata.style_preset : undefined;
			this.showChildView('styles', new StylesPaneView({
				style_preset: stylePreset
			}));

		// hide styles panel
		//
		} else if (this.hasChildView('styles')) {
			this.getChildView('styles').destroy();
		}
	},

	showAdvancedPane: function() {
		let generator = this.getValue('generator');
		let AdvancedPaneView = this.getAdvancedPaneView(generator);

		// show advanced panel
		//
		if (AdvancedPaneView) {
			this.showChildView('advanced', new AdvancedPaneView({
				metadata: this.options.metadata,

				// callbacks
				//
				onchange: (model) => {
					if (this.getChildView('display').setModel) {
						this.getChildView('display').setModel(model);
					}
				}
			}));

		// hide advanced panel
		//
		} else if (this.hasChildView('advanced')) {
			this.getChildView('advanced').destroy();
		}
	},

	showFilterPane: function() {
		let generator = this.getValue('generator');
		let FilterPaneView = this.getFilterPaneView(generator);

		// show filter pane
		//
		if (FilterPaneView) {
			this.showChildView('filter', new FilterPaneView({
				metadata: this.options.metadata
			}));

		// hide filter pane
		//
		} else if (this.hasChildView('filter')) {
			this.getChildView('filter').destroy();
		}
	},

	//
	// mouse event handling methods
	//

	onChangeGenerator: function() {

		// update optional panels
		//
		this.showPane('styles');
		this.showPane('advanced');
		this.showPane('filter');

		// update tabs
		//
		this.setTabVisible('styles', this.hasChildView('styles'));
		this.setTabVisible('advanced', this.hasChildView('advanced'));
		this.setTabVisible('filter', this.hasChildView('filter'));
	},

	onChangeRandomize: function() {
		let randomize = this.getValue('randomize');
		switch (randomize) {
			case 'random':
				this.reset();
				break;
			case 'repeat':
				this.setValues(this.options.metadata);
				break;
		}
	}
});
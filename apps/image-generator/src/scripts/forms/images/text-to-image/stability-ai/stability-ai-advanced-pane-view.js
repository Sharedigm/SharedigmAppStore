/******************************************************************************\
|                                                                              |
|                      stability-ai-advanced-pane-view.js                      |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing advanced parameters.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import AdvancedPaneView from '../../../../../../../views/apps/image-generator/forms/images/text-to-image/panes/advanced-pane-view.js';
import RangeInputView from '../../../../../../../views/forms/inputs/range-input-view.js';

export default AdvancedPaneView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="cfg-scale form-group">
			<label class="control-label"><i class="fa fa-ruler"></i>CFG Scale</label>
			<div class="controls">
				<div class="range-input"></div>
				<i class="active fa fa-question-circle" data-toggle="popover" title="CFG (classifier-free guidance) Scale" data-content="Influences how strongly your generation is guided to match your prompt. Setting this value higher increases the strength in which it tries to match your prompt. Defaults to 7.0 if not specified. "></i>
			</div>
		</div>

		<div class="clip-guidance-preset form-group">
			<label class="control-label"><i class="fa fa-scissors"></i>Clip Guidance Preset</label>
			<div class="controls">
				<select>
					<% for (let i = 0; i < clip_guidance_presets.length; i++) { %>
					<% let value = clip_guidance_presets[i]; %>
					<% let label = value.replace(/_/g, ' ').toLowerCase().toTitleCase(); %>
					<option value="<%= value %>"><%= label %></option>
					<% } %>
					<option value="" selected>None</option>
				</select>
				<i class="active fa fa-question-circle" data-toggle="popover" title="Clip Guidance Preset" data-content="This is the clip guidance preset to use. "></i>
			</div>
		</div>

		<div class="sampler form-group">
			<label class="control-label"><i class="fa fa-eye-dropper"></i>Sampler</label>
			<div class="controls">
				<select>
					<% for (let i = 0; i < samplers.length; i++) { %>
					<% let value = samplers[i]; %>
					<% let label = value.replace(/_/g, ' ').toLowerCase().toTitleCase(); %>
					<option value="<%= value %>"><%= label %></option>
					<% } %>
					<option value="" selected>Auto</option>
				</select>
				<i class="active fa fa-question-circle" data-toggle="popover" title="Sampler" data-content="Which sampler to use for the diffusion process. "></i>
			</div>
		</div>

		<div class="samples form-group">
			<label class="control-label"><i class="fa fa-th-large"></i>Samples</label>
			<div class="controls">
				<div class="range-input"></div>
				<i class="active fa fa-question-circle" data-toggle="popover" title="Samples" data-content="This is the number of images to generate."></i>
			</div>
		</div>

		<div class="seed form-group">
			<label class="control-label"><i class="fa fa-seedling"></i>Seed</label>
			<div class="controls">
				<input type="number" value="<%= seed %>" />
				<i class="active fa fa-question-circle" data-toggle="popover" title="Seed" data-content="If a seed is provided, the resulting generated image will be deterministic. What this means is that as long as all generation parameters remain the same, you can always recall the same image simply by generating it again."></i>
			</div>
		</div>

		<div class="steps form-group">
			<label class="control-label"><i class="fa fa-gem"></i>Steps</label>
			<div class="controls">
				<div class="range-input"></div>
				<i class="active fa fa-question-circle" data-toggle="popover" title="Steps" data-content="Amount of inference steps performed on image generation. Defaults to 30. "></i>
			</div>
		</div>
	`),

	regions: {
		cfg_scale: '.cfg-scale .range-input',
		steps: '.steps .range-input',
		samples: '.samples .range-input'
	},

	clip_guidance_presets: [
		'FAST_BLUE',
		'FAST_GREEN',
		'SIMPLE',
		'SLOW',
		'SLOWER',
		'SLOWEST',
		'NONE'
	],

	samplers: [
		'DDIM',
		'DDPM',
		'K_DPMPP_2M',
		'K_DPMPP_2S_ANCESTRAL',
		'K_DPM_2',
		'K_DPM_2_ANCESTRAL',
		'K_EULER',
		'K_EULER_ANCESTRAL',
		'K_HEUN',
		'K_LMS'
	],

	// defaults
	//
	defaults: {
		cfg_scale: 7.0,
		clip_guidance_preset: 'NONE',
		sampler: undefined,
		samples: 1,
		seed: undefined,
		steps: 30
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'cfg_scale':
				return this.getChildView('cfg_scale').getValue();
			case 'clip_guidance_preset':
				return this.$el.find('.clip-guidance-preset select').val();
			case 'sampler':
				return this.$el.find('.sampler select').val();
			case 'samples':
				return this.getChildView('samples').getValue();
			case 'seed':
				return this.$el.find('.seed input').val();
			case 'steps':
				return this.getChildView('steps').getValue();
		}
	},

	getValues: function() {
		return {
			cfg_scale: this.getValue('cfg_scale'),
			clip_guidance_preset: this.getValue('clip_guidance_preset'),
			sampler: this.getValue('sampler'),
			samples: this.getValue('samples'),
			seed: this.getValue('seed'),
			steps: this.getValue('steps')
		};
	},

	//
	// setting methods
	//

	setValue: function(key, value) {
		switch (key) {
			case 'cfg_scale':
				this.getChildView('cfg_scale').setValue(value);
				break;
			case 'clip_guidance_preset':
				this.$el.find('.clip-guidance-preset select').val(value);
				break;
			case 'sampler':
				this.$el.find('.sampler select').val(value);
				break;
			case 'samples':
				this.getChildView('samples').setValue(value);
				break;
			case 'seed':
				this.$el.find('.seed input').val(value);
				break;
			case 'steps':
				this.getChildView('steps').setValue(value);
				break;
		}
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {

			// values
			//
			cfg_scale: this.options.cfg_scale,
			clip_guidance_preset: this.options.clip_guidance_preset,
			sampler: this.options.sampler,
			samples: this.options.samples,
			seed: this.options.seed,
			steps: this.options.steps,

			// choices
			//
			style_presets: this.style_presets,
			clip_guidance_presets: this.clip_guidance_presets,
			samplers: this.samplers
		}
	},

	showRegion: function(name) {
		switch (name) {
			case 'steps':
				this.showSteps();
				break;
			case 'samples':
				this.showSamples();
				break;
			case 'cfg_scale':
				this.showCfgScale();
				break;
		}
	},

	showSteps: function() {
		this.showChildView('steps', new RangeInputView({

			// options
			//
			value: this.options.steps,
			min: 10,
			max: 50,
			step: 1
		}));
	},

	showSamples: function() {
		this.showChildView('samples', new RangeInputView({

			// options
			//
			value: this.options.samples,
			min: 1,
			max: 10,
			step: 1
		}));
	},

	showCfgScale: function() {
		this.showChildView('cfg_scale', new RangeInputView({

			// options
			//
			value: this.options.cfg_scale,
			min: 0,
			max: 35,
			step: 1
		}));
	}
});
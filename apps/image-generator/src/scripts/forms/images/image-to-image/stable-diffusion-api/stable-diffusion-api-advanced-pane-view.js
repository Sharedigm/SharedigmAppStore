/******************************************************************************\
|                                                                              |
|                  stable-diffusion-api-advanced-pane-view.js                  |
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

import AdvancedPaneView from '../../../../../../../views/apps/image-generator/forms/images/image-to-image/panes/advanced-pane-view.js';

export default AdvancedPaneView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="seed form-group">
			<label class="control-label"><i class="fa fa-seedling"></i>Seed</label>
			<div class="controls">
				<input type="number" value="<%= seed %>" />
				<i class="active fa fa-question-circle" data-toggle="popover" title="Seed" data-content="This is the random seed to use which determines the randomized aspects of the image. If not specified, then a random seed will be used."></i>
			</div>
		</div>

		<div class="samples form-group">
			<label class="control-label"><i class="fa fa-th-large"></i>Samples</label>
			<div class="controls">
				<input type="number" value="<%= samples %>" max="4" style="width:2em" />
				<i class="active fa fa-question-circle" data-toggle="popover" title="Samples" data-content="This is the number of images to generate."></i>
			</div>
		</div>

		<div class="num-inference-steps form-group">
			<label class="control-label"><i class="fa fa-gem"></i>Inference Steps</label>
			<div class="controls">
				<div class="radio-inline">
					<label><input type="radio" name="quality" value="21>"<% if (num_inference_steps == 21) { %> checked<% } %>>21</label>
				</div>
				<div class="radio-inline">
					<label><input type="radio" name="quality" value="31"<% if (num_inference_steps == 31) { %> checked<% } %>>31</label>
				</div>
				<div class="radio-inline">
					<label><input type="radio" name="quality" value="41"<% if (num_inference_steps == 41) { %> checked<% } %>>41</label>
				</div>
				<div class="radio-inline">
					<label><input type="radio" name="quality" value="51"<% if (num_inference_steps == 51) { %> checked<% } %>>51</label>
				</div>
				<i class="active fa fa-question-circle" data-toggle="popover" title="Quality" data-content="This is the number of denoising steps. Available values: 21, 31, 41, or 51."></i>
			</div>
		</div>

		<div class="guidance-scale form-group">
			<label class="control-label"><i class="fa fa-ruler"></i>Guidance Scale</label>
			<div class="controls">
				<input type="number" min="1" max="20" value="<%= guidance_scale %>" />
				<i class="active fa fa-question-circle" data-toggle="popover" title="Guidance Scale" data-content="Scale for classifier-free guidance (minimum: 1; maximum: 20)."></i>
			</div>
		</div>

		<div class="options form-group">
			<label class="control-label"><i class="fa fa-check"></i>Options</label>
			<div class="controls">

				<div class="safety-checker checkbox-inline">
					<label><input type="checkbox"<% if (safety_checker) { %> checked<% } %> />Safety Checker</label>
					<i class="active fa fa-question-circle" data-toggle="popover" title="Safety Checker" data-content="A checker for NSFW images. If such an image is detected, it will be replaced by a blank image."></i>
				</div>

				<div class="enhance-prompt checkbox-inline">
					<label><input type="checkbox"<% if (safety_checker) { %> checked<% } %> />Enhance Prompt</label>
					<i class="active fa fa-question-circle" data-toggle="popover" title="Enhance Prompt" data-content="Enhance prompts for better results."></i>
				</div>

				<div class="multi-lingual checkbox-inline">
					<label><input type="checkbox"<% if (multi_lingual) { %> checked<% } %> />Multi Lingual</label>
					<i class="active fa fa-question-circle" data-toggle="popover" title="Multi Lingual" data-content="Allow multi lingual prompt to generate images."></i>
				</div>

				<div class="panorama checkbox-inline">
					<label><input type="checkbox"<% if (panorama) { %> checked<% } %> />Panorama</label>
					<i class="active fa fa-question-circle" data-toggle="popover" title="Panorama" data-content="Set this parameter to generate a panorama image."></i>
				</div>

				<div class="self-attention checkbox-inline">
					<label><input type="checkbox"<% if (self_attention) { %> checked<% } %> />Self Attention</label>
					<i class="active fa fa-question-circle" data-toggle="popover" title="Self Attention" data-content="If you want a high quality image, set this parameter. In this case the image generation will take more time."></i>
				</div>

				<div class="upscale checkbox-inline">
					<label><input type="checkbox"<% if (upscale) { %> checked<% } %> />Upscale</label>
					<i class="active fa fa-question-circle" data-toggle="popover" title="Upscale" data-content="Set this parameter if you want to upscale the given image resolution two times (2x). If the requested resolution is 512 x 512 px, the generated image will be 1024 x 1024 px."></i>
				</div>
			</div>
		</div>
	`),

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'samples':
				return parseInt(this.$el.find('.samples input').val());
			case 'num_inference_steps':
				return parseInt(this.$el.find('.num-inference-steps input:checked').val());
			case 'safety_checker':
				return this.$el.find('.safety-checker input').is(':checked');
			case 'enhance_prompt':
				return this.$el.find('.enhance-prompt input').is(':checked');
			case 'seed':
				return this.$el.find('.seed input').val();
			case 'guidance_scale':
				return parseInt(this.$el.find('.guidance-scale input').val());
			case 'multi_lingual':
				return this.$el.find('.multi-lingual input').is(':checked');
			case 'panorama':
				return this.$el.find('.panorama input').is(':checked');
			case 'self_attention':
				return this.$el.find('.self-attention input').is(':checked');
			case 'upscale':
				return this.$el.find('.upscale input').is(':checked');
		}
	},

	getValues: function() {
		return {
			samples: this.getValue('samples'),
			num_inference_steps: this.getValue('num_inference_steps'),
			safety_checker: this.getValue('safety_checker'),
			enhance_prompt: this.getValue('enhance_prompt'),
			seed: this.getValue('seed'),
			guidance_scale: this.getValue('guidance_scale'),
			multi_lingual: this.getValue('multi_lingual'),
			panorama: this.getValue('panorama'),
			self_attention: this.getValue('self_attention'),
			upscale: this.getValue('upscale')
		};
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			samples: 1,
			num_inference_steps: 51,
			safety_checker: false,
			enhance_prompt: false,
			seed: undefined,
			guidance_scale: 1,
			multi_lingual: false,
			panorama: false,
			self_attention: false,
			upscale: false
		}
	}
});
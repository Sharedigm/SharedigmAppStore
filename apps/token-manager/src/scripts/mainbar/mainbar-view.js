/******************************************************************************\
|                                                                              |
|                               mainbar-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing an app's mainbar.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ImageGenerator from '../../../../models/ai/image-generator.js';
import BaseCollection from '../../../../collections/base-collection.js';
import FormView from '../../../../views/forms/form-view.js';
import TokenIconsView from '../../../../views/apps/token-manager/mainbar/tokens/icons/token-icons-view.js';

export default FormView.extend({

	//
	// attributes
	//

	className: 'form-horizontal content',

	template: template(`
		<div class="icons"></div>

		<ul class="nav nav-tabs" role="tablist">

			<li role="presentation" class="general-tab<% if (tab == 'general' || !tab) { %> active<% } %>">
				<a role="tab" data-toggle="tab" href=".general-settings">
					<i class="fa fa-check"></i>
					<label>General</label>
				</a>
			</li>

			<li role="presentation" class="key-tab<% if (tab == 'key') { %> active<% } %>">
				<a role="tab" data-toggle="tab" href=".key-settings">
					<i class="fa fa-key"></i>
					<label>Key</label>
				</a>
			</li>
		</ul>

		<div class="tab-content">
			<div role="tabpanel" class="general-settings tab-pane<% if (tab == 'general' || !tab) { %> active<% } %>">

				<div class="remaining-tokens form-group">
					<label class="control-label"><i class="fa fa-hashtag"></i>Remaining</label>
					<div class="controls">
						<p class="form-control-static">
							<span class="success emphasis" style="line-height:1em"><%= num_remaining_tokens %></span>
							<i class="active fa fa-question-circle" data-toggle="popover" title="Remaining" data-content="This is the number of these tokens remaining. If you run out of tokens, you may supply your own API key."></i>
						</p>
					</div>
				</div>

				<div class="used-tokens form-group">
					<label class="control-label"><i class="fa fa-hashtag"></i>Used</label>
					<div class="controls">
						<p class="form-control-static">
							<span class="warning emphasis" style="line-height:1em"><%= num_used_tokens %></span>
							<i class="active fa fa-question-circle" data-toggle="popover" title="Used" data-content="This is the number of these tokens used."></i>
						</p>
					</div>
				</div>

				<div class="tokens-per-request form-group">
					<label class="control-label"><i class="fa fa-hashtag"></i>/ Request</label>
					<div class="controls">
						<p class="form-control-static">
							<span class="emphasis" style="line-height:1em"><%= num_tokens_per_request %></span>
							<i class="active fa fa-question-circle" data-toggle="popover" title="Per Request" data-content="This is the number of tokens received per request. "></i>
						</p>
					</div>
				</div>

				<% if (config.apps.token_manager.token_message) { %>
				<br />
				<p><%= config.apps.token_manager.token_message %></p>
				<% } %>

				<div class="center aligned buttons">
					<button class="request-tokens btn"><i class="fa fa-plus"></i>Request Tokens</button>
				</div>
			</div>

			<div role="tabpanel" class="key-settings tab-pane<% if (tab == 'key') { %> active<% } %>">
				<% if (config.apps.token_manager.api_key_message) { %>
				<p><%= config.apps.token_manager.api_key_message %></p>
				<br />
				<% } %>

				<div class="api-key form-group">
					<label class="control-label"><i class="fa fa-key"></i>API Key</label>
					<div class="controls">
						<textarea class="form-control" rows="5" spellcheck="false"><%= api_key %></textarea>
					</div>
				</div>
			</div>
		</div>
	`),

	regions: {
		item: {
			el: '.icons',
			replaceElement: true
		}
	},

	events: {
		'click .request-tokens': 'onClickRequestTokens',
		'blur textarea': 'onBlurTextArea'
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'api_key':
				return this.$el.find('.api-key textarea').val();
		}
	},

	//
	// setting methods
	//

	setDisabled: function(disabled) {
		this.$el.find('.request-tokens').prop('disabled', disabled);
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			tab: this.options.tab,
			num_remaining_tokens: this.model.get('num_remaining_tokens'),
			num_used_tokens: this.model.get('num_used_tokens'),
			num_tokens_per_request: this.model.get('num_tokens_per_request'),
			api_key: this.model.get('api_key')
		};
	},

	onRender: function() {
		this.showRegion('item');

		// update
		//
		this.setDisabled(this.model.isDisabled() || this.model.isTokensDisabled() || this.model.hasTokens());
	},

	showRegion: function(name) {
		switch (name) {
			case 'item':
				this.showTokenIcons();
				break;
		}
	},

	showTokenIcons: function() {
		this.showChildView('item', new TokenIconsView({
			collection: new BaseCollection([this.model]),
			selectable: false
		}))
	},

	//
	// mouse event handling methods
	//

	onClickRequestTokens: function() {
		this.model.requestTokens({

			// callbacks
			//
			success: (data) => {

				// update view
				//
				this.model = new ImageGenerator(data);
				this.render();

				// play
				//
				application.play('receive');
			},

			error: (response) => {

				// show notification message
				//
				application.notify({
					message: response.responseText
				})
			}
		});
	},

	onBlurTextArea: function() {
		this.model.setApiKey(this.getValue('api_key'), {

			// callbacks
			//
			success: () => {

				// perform callback
				//
				if (this.options.onsave) {
					this.options.onsave();
				}
			}
		});
	}
});
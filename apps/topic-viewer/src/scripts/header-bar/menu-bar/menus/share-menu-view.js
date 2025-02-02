/******************************************************************************\
|                                                                              |
|                               share-menu-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying share dropdown menus.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import Topic from '../../../../../../models/topics/topic.js';
import Post from '../../../../../../models/topics/post.js';
import Comment from '../../../../../../models/comments/comment.js';
import Reply from '../../../../../../models/comments/reply.js';
import ShareMenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/share-menu-view.js';

export default ShareMenuView.extend({

	//
	// attributes
	//

	items: [
		{
			"class": "share-topic",
			"group": "topic-option",
			"icon": "fa fa-hashtag",
			"name": "Topic"
		},
		{
			"class": "like post",
			"group": "like post-option",
			"icon": "fa fa-thumbs-up",
			"name": "Like Post",
			"shortcut": "command-="
		},
		{
			"class": "reply-to post",
			"group": "reply post-option",
			"icon": "fa fa-comment",
			"name": "Comment on Post",
			"shortcut": "enter"
		},
		{
			"class": "like comment",
			"group": "like comment-option",
			"icon": "fa fa-thumbs-up",
			"name": "Like Comment",
			"shortcut": "command-="
		},
		{
			"class": "reply-to comment",
			"group": "reply comment-option",
			"icon": "fa fa-reply",
			"name": "Reply to Comment",
			"shortcut": "enter"
		},
		{
			"class": "like reply",
			"group": "like reply-option",
			"icon": "fa fa-thumbs-up",
			"name": "Like Reply",
			"shortcut": "command-="
		},
		{
			"class": "reply-to reply",
			"group": "reply reply-option",
			"icon": "fa fa-reply",
			"name": "Reply to Reply",
			"shortcut": "enter"
		},
		{
			"class": "share-by-topic",
			"group": "post-option",
			"icon": "fa fa-newspaper",
			"name": "By Discussion Topic"
		},
		{
			"class": "share-by-message",
			"group": "post-option",
			"icon": "fa fa-comments",
			"name": "By Chat Messsage"
		},
		{
			"class": "share-by-link",
			"group": "post-option",
			"icon": "fa fa-link",
			"name": "By Link"
		},
		{
			"class": "share-location",
			"group": "topic-option",
			"icon": "fa fa-map-marker-alt",
			"name": "Location"
		}
	],

	events: {

		// share topic
		//
		'click .share-topic': 'onClickShareTopic',

		// share post
		//
		'click .share-by-topic': 'onClickShareByTopic',
		'click .share-by-message': 'onClickShareByMessage',
		'click .share-by-link': 'onClickShareByLink',

		// share comment
		//
		'click .like': 'onClickLike',
		'click .reply-to': 'onClickReplyTo',

		// share items
		//
		'click .share-attachments': 'onClickShareAttachments',
		'click .share-location': 'onClickShareLocation'
	},

	//
	// querying methods
	//
	
	enabled: function() {
		let isSignedIn = application.isSignedIn();
		let isRequired = this.parent.app.model instanceof Topic && this.parent.app.model.isRequired();

		return {
			'share-topic': isSignedIn && !isRequired
		};
	},

	getMenuMode: function(item) {
		if (item instanceof Topic) {
			return 'topic';
		} else if (item instanceof Post) {
			return 'post';
		} else if (item instanceof Comment) {
			return 'comment';
		} else if (item instanceof Reply) {
			return 'reply';
		}
	},

	//
	// getting methods
	//

	getItems: function() {
		return this.items.clone().concat(this.getFileItems());
	},

	//
	// setting methods
	//

	setTopic: function(topic) {
		this.setDisabled({
			'share-topic': topic.isRequired(),
		});
	},

	setMenuMode: function(mode) {
		switch (mode) {
			case 'topic':
				this.$el.find('.topic-option').show();
				this.$el.find('.post-option').hide();
				this.$el.find('.comment-option').hide();
				this.$el.find('.reply-option').hide();
				break;
			case 'post':
				this.$el.find('.topic-option').hide();
				this.$el.find('.post-option').show();
				this.$el.find('.comment-option').hide();
				this.$el.find('.reply-option').hide();
				break;
			case 'comment':
				this.$el.find('.topic-option').hide();
				this.$el.find('.post-option').hide();
				this.$el.find('.comment-option').show();
				this.$el.find('.reply-option').hide();
				break;
			case 'reply':
				this.$el.find('.topic-option').hide();
				this.$el.find('.post-option').hide();
				this.$el.find('.comment-option').hide();
				this.$el.find('.reply-option').show();
				break;
			default:
				this.$el.find('.topic-option').hide();
				this.$el.find('.post-option').hide();
				this.$el.find('.comment-option').hide();
				this.$el.find('.reply-option').hide();
		}
	},

	update: function() {

		// call superclass method
		//
		ShareMenuView.prototype.update.call(this);

		// set menu mode
		//
		let item = this.parent.app.selected? this.parent.app.selected.model : this.parent.app.model;
		this.setMenuMode(this.getMenuMode(item));

		// set enabled / disabled state
		//
		if (item && item.isLikeableByCurrentUser) {
			if (item.isLikeableByCurrentUser()) {
				this.$el.find('li.like').removeClass('disabled');
			} else {
				this.$el.find('li.like').addClass('disabled');
			}
		}	
	},

	//
	// event handling methods
	//

	onChange: function() {
		this.update();
	},

	//
	// selection event handling methods
	//

	onSelect: function() {			
		this.update();
	},

	onDeselect: function() {
		this.update();
	},
	
	//
	// mouse event handling methods
	//

	onClickShareTopic: function() {
		this.parent.app.showTopicInvitationsDialog(this.parent.app.model);
	},

	onClickLike: function() {
		this.parent.app.selected.like();
	},

	onClickReplyTo: function() {
		this.parent.app.selected.reply();
	},

	onClickShareByMessage: function() {
		this.parent.app.shareSelectedByMessage();
	},

	onClickShareByLink: function() {
		this.parent.app.shareSelectedByLink();
	},

	onClickShareByEmail: function() {
		this.parent.app.shareSelectedByEmail();
	},

	onClickShareByTopic: function() {
		this.parent.app.shareSelectedByTopic();
	},

	onClickShareAttachments: function(event) {
		let key = $(event.target).closest('a').text().trim();
		let files = config.defaults.sharing.files[key];
		let directory = application.getDirectory(files.directory);
		this.parent.app.shareItems(directory);
	},

	onClickShareLocation: function() {
		this.parent.app.shareLocation();
	}
});
<h1><i class="<%= config.apps['token_manager'].icon %>"></i><%= config.apps['token_manager'].name %></h1>

<ol class="breadcrumb">
	<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
	<li><a href="#apps"><i class="fa fa-rocket"></i>Apps</a></li>
	<li><i class="fa fa-cog"></i><%= config.apps['token_manager'].name %></li>
</ol>

<div class="content">
	<div class="attention icon colored <%= config.apps['token_manager'].color %>">
		<img src="images/icons/apps/<%= config.apps['token_manager'].image || config.apps['token_manager'].app + '.svg' %>" />
	</div>

	<div class="description section">
		<p>The <%= config.apps['token_manager'].name %> app lets you view and modify your AI image generator tokens. </p>
	</div>

	<div class="details section">
		<div class="row">
			<div class="col-sm-6">
				<h2><i class="fa fa-check"></i>Features</h2>
				<ul>
					<li>View AI image generator tokens.</li>
					<li>Request additional tokens.</li>
				</ul>
			</div>
			<div class="col-sm-6">
				<h2><i class="fa fa-star"></i>Benefits</h2>
				<ul>
					<li>Easily manage your image generator tokens. </li>
				</ul>
			</div>
		</div>
	</div>
	
	<h2><i class="fa fa-desktop"></i>Screen Shots</h2>
	<div class="figure desktop-only">
		<a href="images/info/apps/token-manager/token-manager.png" target="_blank" class="lightbox" title="<%= config.apps['token_manager'].name %>"><img class="dialog" src="images/info/apps/token-manager/token-manager.png" /></a>
		<div class="caption"><%= config.apps['token_manager'].name %></div>
	</div>
	<div class="figure mobile-only">
		<a href="images/info/apps/token-manager/mobile/mobile-token-manager.png" target="_blank" class="lightbox" title="<%= config.apps['token_manager'].name %>"><img class="dialog" src="images/info/apps/token-manager/mobile/mobile-token-manager.png" /></a>
		<div class="caption"><%= config.apps['token_manager'].name %></div>
	</div>
</div>
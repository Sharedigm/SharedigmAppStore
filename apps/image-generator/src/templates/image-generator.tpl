<h1><i class="<%= config.apps['image_generator'].icon %>"></i><%= config.apps['image_generator'].name %></h1>

<ol class="breadcrumb">
	<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
	<li><a href="#apps"><i class="fa fa-rocket"></i>Apps</a></li>
	<li><i class="fa fa-image"></i><%= config.apps['image_generator'].name %></li>
</ol>

<div class="content">
	<div class="attention icon colored <%= config.apps['image_generator'].color %>">
		<img src="images/icons/apps/<%= config.apps['image_generator'].image || config.apps['image_generator'].app + '.svg' %>" />
	</div>

	<div class="description section">
		<p>The <%= config.apps['image_generator'].name %> app lets you explore AI image generation using simple text prompts. </p>
	</div>

	<div class="details section">
		<div class="row">
			<div class="col-sm-6">
				<h2><i class="fa fa-check"></i>Features</h2>
				<ul>
					<li>Choose from a variety of different image generators:
						<ul>
							<li>Stability AI</li>
							<li>OpenAI</li>
							<li>DeepAI</li>
							<li>Stable Diffusion API</li>
						</ul>
					</li>
					<li>Specify advanced image generation parameters.</li>
					<li>Use the zoom controls to inspect image details.</li>
					<li>Use the sidebar thumbnail view to preview and navigate images.</li>
					<li>Use the full screen mode to expand images to encompass the screen.</li>
					<li>On mobile devices, pinch to zoom and swipe to pan images.</li>
				</ul>
			</div>
			<div class="col-sm-6">
				<h2><i class="fa fa-star"></i>Benefits</h2>
				<ul>
					<li>Explore and share your dreams. </li>
					<li>Prototype ideas visually. </li>
					<li>Create logos and branding. </p>
					<li>Enjoy sharing your images with others. </p>
				</ul>
			</div>
		</div>
	</div>

	<h2><i class="fa fa-desktop"></i>Screen Shots</h2>
	<div class="figure desktop-only">
		<a href="images/info/apps/image-generator/image-generator.png" target="_blank" class="lightbox" title="<%= config.apps['image_generator'].name %>"><img class="dialog" src="images/info/apps/image-generator/image-generator.png" /></a>
		<div class="caption"><%= config.apps['image_generator'].name %></div>
	</div>
	<div class="figure mobile-only">
		<a href="images/info/apps/image-generator/mobile/mobile-image-generator.png" target="_blank" class="lightbox" title="<%= config.apps['image_generator'].name %>"><img src="images/info/apps/image-generator/mobile/mobile-image-generator.png" /></a>
		<div class="caption"><%= config.apps['image_generator'].name %></div>
	</div>
</div>
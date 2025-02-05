<?php
/******************************************************************************\
|                                                                              |
|                             ImageGenerators.php                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a utility for generating images.                         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2024, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Utilities\AI;

use App\Utilities\AI\StabilityAI;
use App\Utilities\AI\StableDiffusionAPI;
use App\Utilities\AI\OpenAI;
use App\Utilities\AI\DeepAI;

abstract class ImageGenerators
{
	/**
	 * Generate an image
	 *
	 * @param $generator - The image generator to use.
	 * @param $options - The data to generate the image from.
	 * @return data - The image data.
	 */
	static function generate($generator, $options) {

		// generate image
		//
		switch ($generator) {
			case 'stability.ai':
				return StabilityAI::generate($options);
			case 'Stable Diffusion API':
				return StableDiffusionAPI::generate($options);
			case 'OpenAI':
				return OpenAI::generate($options);
			case "DeepAI":
				return DeepAI::generate($options);
		}
	}

	/**
	 * Enhance an image
	 *
	 * @param $generator - The image generator to use.
	 * @param $imageData - The image to enhance.
	 * @param $options - The data to generate the image from.
	 * @return data - The image data.
	 */
	static function enhance($generator, $imageData, $options) {

		// enhance image
		//
		switch ($generator) {
			case 'stability.ai':
				return StabilityAI::enhance($imageData, $options);
			case 'Sstable Diffusion API':
				return StableDiffusionAPI::enhance($imageData, $options);
			case 'OpenAI':
				return OpenAI::enhance($imageData, $options);
			case "DeepAI":
				return DeepAI::enhance($imageData, $options);
		}
	}
}
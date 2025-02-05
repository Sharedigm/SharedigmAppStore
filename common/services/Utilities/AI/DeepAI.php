<?php
/******************************************************************************\
|                                                                              |
|                                   DeepAI.php                                 |
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

use Illuminate\Support\Facades\Http;

abstract class DeepAI
{
	/**
	 * Generate an image
	 *
	 * @param string $prompt - The string to generate the image from.
	 * @param int $width - The desired width of the generated image.
	 * @param int $height - The desired height of the generated image.
	 * @return data - The image data.
	 */
	static function generate($options) {

		// parse options
		//
		$prompt = $options['prompt'] ?? '';
		$gridSize = intval($options['grid_size'] ?? 1);
		$width = intval($options['width'] ?? 1024);
		$height = intval($options['height'] ?? 1024);
		$imageGeneratorVersion = $options['image_generator_version'] ?? 'hd';
		$token = $options['token'] ?? null;

		// check for token
		//
		if (!$token) {
			return response('No token provided', 400);
		}

		// get request endpoint
		//
		$url = env('DEEPAI_API_ENDPOINT');

		// make request
		//
		$response = Http::asForm()->withHeaders([
			'Api-Key' => $token,
		])->post($url, [
			'text' => $prompt,
			'grid_size' => $gridSize,
			'width' => $width,
			'height' => $height,
			'image_generator_version' => $imageGeneratorVersion
		]);

		// check response code
		//
		if ($response->status() != 200) {
			return $response;
		}

		// get image data from response
		//
		return [[
			'image' => file_get_contents($response['output_url']),
			'metadata' => [
				'text' => $prompt,
				'grid_size' => $gridSize,
				'width' => $width,
				'height' => $height,
				'image_generator_version' => $imageGeneratorVersion
			]
		]];
	}
}
<?php
/******************************************************************************\
|                                                                              |
|                                  OpenAI.php                                  |
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
use App\Utilities\Storage\UserStorage;

abstract class OpenAI
{
	/**
	 * Generate an image.
	 *
	 * @param $options - The image generation options.
	 * @return array - The images that were generated.
	 */
	static function generate($options) {

		// parse options
		//
		$prompt = $options['prompt'] ?? '';
		$model = $options['model'] ?? 'dall-e-3';
		$n = intval($options['n'] ?? 1);
		$quality = $options['quality'] ?? 'standard';
		$size = $options['size'] ?? '1024x1024';
		$style = $options['style'] ?? 'vivid';
		$token = $options['token'] ?? null;

		// check for token
		//
		if (!$token) {
			return response('No token provided', 400);
		}

		// get request endpoint
		//
		$url = env('OPENAI_API_ENDPOINT') . '/generations';

		// make request
		//
		$response = Http::withToken($token)
			->timeout(60)
			->post($url, [
			'prompt' => $prompt,
			'model' => $model,
			'n' => $n,
			'quality' => $quality,
			'size' => $size,
			'style' => $style
		]);

		// check response code
		//
		if ($response->status() != 200) {
			return $response;
		}

		// get image data from response
		//
		$images = [];
		for ($i = 0; $i < count($response['data']); $i++) {
			$data = $response['data'][$i];
			$images[] = [
				'image' => file_get_contents($data['url']),
				'metadata' => [
					'model' => $model,
					'n' => $n,
					'quality' => $quality,
					'size' => $size,
					'style' => $style
				]
			];

			// add ChatGPT input
			//
			if (array_key_exists('revised_prompt', $data)) {
				$images[$i]['metadata']['revised_prompt'] = $data['revised_prompt'];
			}
		}

		return $images;
	}

	/**
	 * Enhance an image.
	 *
	 * @param $image - The image to enhance.
	 * @param $options - The image enhancement options.
	 * @return array - The enhanced images that were generated.
	 */
	static function enhance($image, $options) {

		// parse options
		//
		$prompt = $options['prompt'] ?? '';
		$model = $options['model'] ?? 'dall-e-3';
		$n = intval($options['n'] ?? 1);
		$quality = $options['quality'] ?? 'standard';
		$size = $options['size'] ?? '1024x1024';
		$style = $options['style'] ?? 'vivid';
		$mask = $options['mask'] ?? UserStorage::root() . '/Shared/Pictures/Masks/circular.png';

		// get request options
		//
		$url = env('OPENAI_API_ENDPOINT') . '/edits';
		$token = env('OPENAI_API_KEY');

		// get mask data
		//
		$mask = file_get_contents($mask);

		// make request
		//
		$response = Http::attach('image', $image, 'image.png')
			->attach('mask', $mask, 'mask.png')
			->withToken($token)
			->timeout(60)
			->post($url, [
				'prompt' => $prompt,
				// 'model' => $model,
				'n' => $n,
				'size' => $size
			]);

		// check response code
		//
		if ($response->status() != 200) {
			return $response;
		}

		// get image data from response
		//
		$images = [];
		for ($i = 0; $i < count($response['data']); $i++) {
			$data = $response['data'][$i];
			$images[] = [
				'image' => file_get_contents($data['url']),
				'metadata' => [
					'model' => $model,
					'n' => $n,
					'size' => $size
				]
			];
		}

		return $images;
	}
}
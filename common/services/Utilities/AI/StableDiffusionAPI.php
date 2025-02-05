<?php
/******************************************************************************\
|                                                                              |
|                             StableDiffusionAPI.php                           |
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

abstract class StableDiffusionAPI
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
		$negativePrompt = $options['negative_prompt'] ?? '';
		$width = intval($options['width'] ?? 1024);
		$height = intval($options['height'] ?? 1024);
		$samples = intval($options['samples'] ?? 1);
		$numInferenceSteps = intval($options['num_inference_steps'] ?? 51);
		$safetyChecker = $options['safety_checker'] ?? 'no';
		$enhancePrompt = $options['enhance_prompt'] ?? 'yes';
		$seed = $options['seed'] ?? null;
		$guidanceScale = floatVal($options['guidance_scale'] ?? 1);
		$multiLingual = $options['multi_lingual'] ?? 'no';
		$panorama = $options['panorama'] ?? 'no';
		$selfAttention = $options['self_attention'] ?? 'no';
		$upscale = $options['upscale'] ?? 'no';
		$token = $options['token'] ?? null;

		// check for token
		//
		if (!$token) {
			return response('No token provided', 400);
		}

		// get request endpoint
		//
		$url = env('STABLE_DIFFUSION_API_ENDPOINT');

		// make request
		//
		$response = Http::timeout(60)->post($url, [
			'key' => $token,
			'prompt' => $prompt,
			'width' => $width,
			'height' => $height,
			'negative_prompt' => $negativePrompt,
			'samples' => $samples,
			'num_inference_steps' => $numInferenceSteps,
			'safety_checker' => $safetyChecker,
			'enhance_prompt' => $enhancePrompt,
			'seed' => $seed,
			'guidance_scale' => $guidanceScale,
			'multi_lingual' => $multiLingual,
			'panorama' => $panorama,
			'self_attention' => $selfAttention,
			'upscale' => $upscale
		]);

		// check response code
		//
		if ($response->status() != 200) {
			return $response;
		}

		// get image data from response
		//
		$images = [];
		for ($i = 0; $i < count($response['output']); $i++) {
			$output = $response['output'][$i];
			$images[] = [
				'image' => $output,
				'metadata' => [
					'prompt' => $prompt,
					'width' => $width,
					'height' => $height,
					'negative_prompt' => $negativePrompt,
					'samples' => $samples,
					'num_inference_steps' => $numInferenceSteps,
					'safety_checker' => $safetyChecker,
					'enhance_prompt' => $enhancePrompt,
					'seed' => $seed,
					'guidance_scale' => $guidanceScale,
					'multi_lingual' => $multiLingual,
					'panorama' => $panorama,
					'self_attention' => $selfAttention,
					'upscale' => $upscale
				]
			];
		}

		return $images;
	}
}
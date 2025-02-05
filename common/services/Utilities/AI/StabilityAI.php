<?php
/******************************************************************************\
|                                                                              |
|                                StabilityAI.php                               |
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
use Illuminate\Support\Facades\Log;

abstract class StabilityAI
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
		$negativePrompt = $options['negative_prompt'] ?? null;
		$width = intval($options['width'] ?? 1024);
		$height = intval($options['height'] ?? 1024);
		$cfgScale = floatval($options['cfg_scale'] ?? 7);
		$clipGuidancePreset = $options['clip_guidance_preset'] ?? 'NONE';
		$sampler = $options['sampler'] ?? null;
		$samples = intval($options['samples'] ?? 1);
		$seed = intval($options['seed'] ?? 0);
		$steps = intval($options['steps'] ?? 50);
		$stylePreset = $options['style_preset'] ?? null;
		$token = $options['token'] ?? null;

		// check for token
		//
		if (!$token) {
			return response('No token provided', 400);
		}

		// get request endpoint
		//
		$url = env('STABILITY_AI_API_ENDPOINT') . '/text-to-image';

		// prepare prompts
		//
		$textPrompts = [[
			'text' => $prompt && $prompt != ''? $prompt : 'None',
			'weight' => 1
		]];
		if ($negativePrompt) {
			array_push($textPrompts, [
				'text' => $negativePrompt,
				'weight' => -1		
			]);
		}

		Log::info("Generating image with: " . print_r([
			'text_prompts' => $textPrompts,
			'width' => $width,
			'height' => $height
		], 1));

		// make request
		//
		$response = Http::withToken($token)
			->timeout(60)
			->post($url, [
			'text_prompts' => $textPrompts,
			'width' => $width,
			'height' => $height,
			'cfg_scale' => $cfgScale,
			'clip_guidance_preset' => $clipGuidancePreset,
			'sampler' => $sampler,
			'samples' => $samples,
			'seed' => $seed,
			'steps' => $steps,
			'style_preset' => $stylePreset
		]);

		// check response code
		//
		if ($response->status() != 200) {
			return $response;
		}

		// get image data from response
		//
		$images = [];
		for ($i = 0; $i < count($response['artifacts']); $i++) {
			$artifact = $response['artifacts'][$i];
			$images[] = [
				'image' => base64_decode($artifact['base64']),
				'metadata' => [
					'prompt' => $prompt,
					'negative_prompt' => $negativePrompt,
					'cfg_scale' => $cfgScale,
					'clip_guidance_preset' => $clipGuidancePreset,
					'sampler' => $sampler,
					'samples' => $samples,
					'seed' => $artifact['seed'],
					'steps' => $steps,
					'style_preset' => $stylePreset
				]
			];
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
		$negativePrompt = $options['negative_prompt'] ?? null;
		$initImageMode = $options['init_image_mode'] ?? 'IMAGE_STRENGTH';
		$imageStrength = $options['image_strength'] ?? 0.35;
		$cfgScale = floatval($options['cfg_scale'] ?? 7);
		$clipGuidancePreset = $options['clip_guidance_preset'] ?? 'NONE';
		$sampler = $options['sampler'] ?? null;
		$samples = intval($options['samples'] ?? 1);
		$seed = intval($options['seed'] ?? 0);
		$steps = intval($options['steps'] ?? 50);
		$stylePreset = $options['style_preset'] ?? null;

		// prepare prompts
		//
		$textPrompts = [[
			'text' => $prompt && $prompt != ''? $prompt : "None",
			'weight' => 1
		]];
		if ($negativePrompt) {
			array_push($textPrompts, [
				'text' => $negativePrompt,
				'weight' => -1		
			]);
		}

		// get request options
		//
		$url = env('STABILITY_AI_API_ENDPOINT') . '/image-to-image';
		$token = env('STABILITY_AI_API_TOKEN');

		// make request
		//
		$response = Http::attach('init_image', $image)
			->withToken($token)
			->timeout(60)
			->post($url, self::getMultipartFormData([
			'text_prompts' => $textPrompts,
			'init_image_mode' => $initImageMode,
			'image_strength' => $imageStrength,
			'cfg_scale' => $cfgScale,
			'clip_guidance_preset' => $clipGuidancePreset,
			'sampler' => $sampler,
			'samples' => $samples,
			'seed' => $seed,
			'steps' => $steps,
			'style_preset' => $stylePreset
		]));

		// check response code
		//
		if ($response->status() != 200) {
			return [
				'status' => $response->status(),
				'text' => $response->getReasonPhrase()
			];
		}

		// get image data from response
		//
		$images = [];
		for ($i = 0; $i < count($response['artifacts']); $i++) {
			$artifact = $response['artifacts'][$i];
			$images[] = [
				'image' => base64_decode($artifact['base64']),
				'metadata' => [
					'prompt' => $prompt,
					'negative_prompt' => $negativePrompt,
					'init_image_mode' => $initImageMode,
					'image_strength' => $imageStrength,
					'cfg_scale' => $cfgScale,
					'clip_guidance_preset' => $clipGuidancePreset,
					'sampler' => $sampler,
					'samples' => $samples,
					'seed' => $artifact['seed'],
					'steps' => $steps,
					'style_preset' => $stylePreset
				]
			];
		}

		return $images;
	}

	/**
	 * Prepare multipart form data
	 *
	 * @param string $postData - The string to generate the image from.
	 * @return data - The image data.
	 */
	static function getMultipartFormData($postData) {
		$multipart = [];
		$vars = explode('&', http_build_query($postData));
		foreach ($vars as $var) {
			list($nameRaw, $contentsRaw) = explode('=', $var);
			$name = urldecode($nameRaw);
			$contents = urldecode($contentsRaw);
			$multipart[] = ['name' => $name, 'contents' => $contents];
		}
		return $multipart;
	}
}
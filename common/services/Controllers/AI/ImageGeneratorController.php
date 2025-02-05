<?php
/******************************************************************************\
|                                                                              |
|                         ImageGeneratorController.php                         |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for AI image generation.                         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2024, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Http\Controllers\AI;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\AI\ImageGenerator;
use App\Models\AI\ImageGeneratorTokens;
use App\Models\AI\ImageGeneratorKey;
use App\Http\Controllers\Controller;
use App\Utilities\Uuids\Guid;

class ImageGeneratorController extends Controller
{
	//
	// posting methods
	//

	/**
	 * Request image generator tokens.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @param string $id - the image generator id
	 * @return App\Models\Utilities\ImageGenerator
	 */
	public function postRequestTokens(Request $request, string $id) {

		// find image generator
		//
		$generator = ImageGenerator::find($id);
		if (!$generator) {
			return response("Could not find this image generator.", 404);
		}

		$tokens = $generator->getTokens();
		if ($tokens) {

			// check if tokens have been recently requested
			//
			if ($tokens->requested_at) {
				$elapsedTime = time() - strtotime($tokens->requested_at);
				$hours = $elapsedTime / 3600;

				if ($hours < 24) {
					return response('Only ' . (floor($hours * 10) / 10) . ' hours have elapsed since your previous token request.', 400);
				}
			}

			// increment tokens
			//
			$tokens->change([
				'num_remaining' => $generator->num_tokens_per_request,
				'requested_at' => new DateTime()
			]);
		} else {

			// create new tokens
			//
			$tokens = new ImageGeneratorTokens([
				'id' => Guid::create(),
				'user_id' => Session::get('user_id'),
				'image_generator' => $generator->name,
				'num_used' => 0,
				'num_remaining' => $generator->num_tokens_per_request,
				'requested_at' => new DateTime()
			]);
			$tokens->save();
		}

		return $generator;
	}

	/**
	 * Post api key.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @param string $id - the image generator id
	 * @return App\Models\Utilities\ImageGeneratorKey
	 */
	public function postApiKey(Request $request, string $id) {
		$generator = ImageGenerator::find($id);
		$apiKey = $request->get('api_key');
		$userId = Session::get('user_id');

		// clear previous keys
		//
		ImageGeneratorKey::where('user_id', '=', $userId)
			->where('image_generator', '=', $generator->name)->delete();

		// create new key
		//
		$key = new ImageGeneratorKey([
			'id' => Guid::create(),
			'user_id' => $userId,
			'image_generator' => $generator->name,
			'api_key' => $apiKey
		]);

		// save new key
		//
		$key->save();

		return $generator;
	}

	//
	// getting methods
	//

	/**
	 * Get all image generators.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @return App\Models\Utilities\ImageGenerator[]
	 */
	public function getAll(Request $request) {

		// get all image generators
		//
		$generators = ImageGenerator::where('enabled', '=', 1)->orderBy('order', 'ASC')->get();

		// check if current user has tokens
		//
		$userId = Session::get('user_id');
		if (!ImageGeneratorTokens::where('user_id', '=', $userId)->exists()) {
			for ($i = 0; $i < count($generators); $i++) {
				$generators[$i]->addTokensFor($userId);
			}
		}

		return $generators;
	}

	//
	// generating methods
	//

	/**
	 * Generate new image(s).
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @param string $id - the image generator id
	 * @return App\Models\Storage\Media\ImageFile[]
	 */
	public function postGenerate(Request $request, string $id) {

		// find image generator
		//
		$generator = ImageGenerator::find($id);
		if (!$generator) {
			return response("Could not find this image generator.", 404);
		}

		// generate image
		//
		return $generator->generate($request->all());
	}

	/**
	 * Enhance an image.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @param string $id - the image generator id
	 * @return App\Models\Storage\Media\ImageFile[]
	 */
	public function postEnhance(Request $request, string $id) {

		// find image generator
		//
		$generator = ImageGenerator::find($id);
		if (!$generator) {
			return response("Could not find this image generator.", 404);
		}

		// enhance image
		//
		return $generator->enhance($request->all());
	}
}
<?php
/******************************************************************************\
|                                                                              |
|                              ImageGenerator.php                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of an AI image generator.                        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2024, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Models\AI;

use Illuminate\Support\Facades\Session;
use Illuminate\Http\Response;
use App\Models\BaseModel;
use App\Models\AI\ImageGeneratorKey;
use App\Models\AI\ImageGeneratorTokens;
use App\Models\Storage\Media\ImageFile;
use App\Models\Users\User;
use App\Utilities\AI\ImageGenerators;
use App\Utilities\Storage\ExifWriter;
use App\Utilities\Uuids\Guid;

class ImageGenerator extends BaseModel
{
	//
	// attributes
	//

	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'image_generators';

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;

	/**
	 * The "type" of the primary key ID.
	 *
	 * @var string
	 */
	protected $keyType = 'string';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'id',
		'name',
		'enabled',
		'num_initial_tokens',
		'num_tokens_per_request',

		// appended attributes
		//
		'num_used_tokens',
		'num_remaining_tokens',
		'api_key'
	];

	/**
	 * The attributes that should be visible in serialization.
	 *
	 * @var array
	 */
	protected $visible = [
		'id',
		'name',
		'enabled',
		'num_initial_tokens',
		'num_tokens_per_request',

		// appended attributes
		//
		'num_used_tokens',
		'num_remaining_tokens',
		'api_key'
	];

	/**
	 * The accessors to append to the model's array form.
	 *
	 * @var array
	 */
	protected $appends = [
		'num_used_tokens',
		'num_remaining_tokens',
		'api_key'
	];

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'enabled' => 'boolean',
		'num_initial_tokens' => 'integer',
		'num_tokens_per_request' => 'integer',

		// appended attributes
		//
		'num_used_tokens' => 'integer',
		'num_remaining_tokens' => 'integer'
	];

	//
	// accessor methods
	//

	/**
	 * Get this image generator's used token count for the current user
	 *
	 * @return int
	 */
	public function getNumUsedTokensAttribute(): int {
		$tokens = $this->getTokens();
		if ($tokens) {
			return $tokens->num_used;
		} else {
			return 0;
		}
	}

	/**
	 * Get this image generator's remaining token count for the current user
	 *
	 * @return int
	 */
	public function getNumRemainingTokensAttribute(): int {
		$tokens = $this->getTokens();
		if ($tokens) {
			return $tokens->num_remaining;
		} else {
			return 0;
		}
	}

	/**
	 * Get this image generator's api key for the current user
	 *
	 * @return string
	 */
	public function getApiKeyAttribute(): ?string {
		$apiKey = $this->getApiKey();
		if ($apiKey) {
			return $apiKey->api_key;
		} else {
			return null;
		}
	}

	//
	// querying methods
	//

	/**
	 * Check if this generator has unused tokens for the current user
	 *
	 * @return boolean
	 */
	public function hasUnusedTokens() {
		$tokens = $this->getTokens();
		return $tokens && $tokens->hasUnused();
	}

	/**
	 * Check if this image generator has an API key for the current user
	 *
	 * @return boolean
	 */
	public function hasApiKey(): bool {
		return ImageGeneratorKey::where('image_generator', '=', $this->name)
			->where('user_id', '=', Session::get('user_id'))
			->exists();
	}

	//
	// getting methods
	//

	/**
	 * Get this image generator's tokens for the current user
	 *
	 * @return ImageGeneratorTokens
	 */
	public function getTokens() {
		return ImageGeneratorTokens::where('image_generator', '=', $this->name)
			->where('user_id', '=', Session::get('user_id'))
			->first();
	}

	/**
	 * Get this image generator's api key for the current user
	 *
	 * @return ImageGeneratorKey
	 */
	public function getApiKey() {
		return ImageGeneratorKey::where('image_generator', '=', $this->name)
			->where('user_id', '=', Session::get('user_id'))
			->first();
	}

	/**
	 * Get system provided API generator token.
	 *
	 * @return string
	 */
	public function getSystemToken() {
		switch ($this->name) {
			case 'stability.ai':
				return env('STABILITY_AI_API_TOKEN');
			case 'OpenAI':
				return env('OPENAI_API_KEY');
			case 'DeepAI':
				return env('DEEPAI_API_KEY');
			case 'Stable Diffusion API':
				return env('STABLE_DIFFUSION_API_KEY');
		}
	}

	/**
	 * Get user provided API generator token.
	 *
	 * @return string
	 */
	public function getUserToken() {
		$key = $this->getApiKey();
		if ($key) {
			return $key->api_key;
		}
	}

	//
	// token handling methods
	//

	/**
	 * Add initial tokens for a particular user.
	 *
	 * @param $user - The user to add tokens for.
	 * @return ImageGeneratorTokens
	 */
	public function addTokensFor($userId) {
		$tokens = new ImageGeneratorTokens([
			'id' => Guid::create(),
			'user_id' => $userId,
			'image_generator' => $this->name,
			'num_used' => 0,
			'num_remaining' => $this->num_initial_tokens
		]);
		$tokens->save();
		return $tokens;
	}

	//
	// generation methods
	//

	/**
	 * Generate an image
	 *
	 * @param $options - The data to generate the image from.
	 * @return data - The image data.
	 */
	function generate($options) {

		// parse params
		//
		$prompt = $options['prompt'] ?? '';
		$directory = $options['directory'] ?? '';
		$name = $options['name'] ?? '';
		$savePrompt = filter_var($options['save_prompt'], FILTER_VALIDATE_BOOLEAN);

		// check if we have tokens remaining
		//
		$hasUnusedTokens = $this->hasUnusedTokens();
		if ($hasUnusedTokens) {
			$options['token'] = $this->getSystemToken();
		} else if ($this->hasApiKey()) {
			$options['token'] = $this->getUserToken();
		} else {
			return response("You have no more " . $this->name . " tokens.", 400);
		}

		// generate image
		//
		$data = ImageGenerators::generate($this->name, $options);

		// check if image generation was successful
		//
		if (!$data) {
			return response('Could not complete request.', 400);
		} else if ($data && $data instanceof Response) {
			return $data;
		}

		// decrement tokens remaining count
		//
		if ($hasUnusedTokens) {
			$tokens = $this->getTokens();
			if ($tokens) {
				$tokens->useTokens(1);
			}
		}

		// write data to files
		//
		$files = [];
		for ($i = 0; $i < count($data); $i++) {
			$imagedata = $data[$i]['image'];
			$metadata = $data[$i]['metadata'];

			// create suffix
			//
			if (count($data) > 1) {
				$suffix = '-' . ($i < 10? '0' . ($i + 1): ($i + 1));
			} else {
				$suffix = '';
			}

			// create file
			//
			$extension = $this->name == 'DeepAI'? 'jpg' : 'png';
			$file = new ImageFile([
				'path' => $directory . $name . $suffix . '.' . $extension
			]);

			// write file
			//
			$filename = $file->rootPath();
			file_put_contents($filename, $imagedata);

			// write metadata
			//
			$artist = User::current()->getFullName();
			ExifWriter::write($filename, [
				'Description' => ($savePrompt? $prompt : 'None'),
				'Artist' => $artist,
				'Make' => $this->name,
				'Model' => $metadata
			]);

			// add file to list
			//
			$files[] = $file;
		}

		return $files;
	}

	/**
	 * Enhance an image
	 *
	 * @param $options - The data to generate the image from.
	 * @return data - The image data.
	 */
	function enhance($options) {

		// parse params
		//
		$path = $options['path'] ?? '';
		$prompt = $options['prompt'] ?? '';
		$directory = $options['directory'] ?? '';
		$name = $options['name'] ?? '';
		$savePrompt = filter_var($options['save_prompt'], FILTER_VALIDATE_BOOLEAN);

		// create file path
		//
		$extension = $this->name == 'deepai'? 'jpg' : 'png';
		$filename = $name . '.' . $extension;

		// get source data
		//
		$imageFile = new ImageFile([
			'path' => $path
		]);
		$imageData = file_get_contents($imageFile->rootPath());

		// convert file, if necessary
		//
		$extension = pathinfo($path, PATHINFO_EXTENSION);
		if (strtolower($extension) != 'png') {
			$image = \Image::make($imageData)->orientate();
			$imageData = $image->encode('png');
		}

		// resize file, if necessary
		//
		$image = \Image::make($imageData)->orientate();
		$width = $image->width();
		$height = $image->height();
		if ($width != 1024 || $height != 1024) {

			// resize preserving aspect ratio
			//
			$imageData = $image->resizeCanvas(1024, 1024, 'center', false, '#000000')->encode('png');
			$resized = true;
		} else {
			$resized = false;
		}

		// enhance image
		//
		$data = ImageGenerators::enhance($this->name, $imageData, $options);

		// check if image generation was successful
		//
		if (!$data) {
			return response('Could not complete request.', 400); 
		} else if ($data && $data instanceof Response) {
			return $data;
		}

		// write data to files
		//
		$files = [];
		for ($i = 0; $i < count($data); $i++) {
			$item = $data[$i];
			$imagedata = $item['image'];
			$metadata = $item['metadata'];

			// crop resulting image to original size
			//
			if ($resized) {
				$image = \Image::make($imagedata)->orientate();
				$imagedata = $image->fit($width, $height)->encode('png');
			}

			// create suffix
			//
			if (count($data) > 1) {
				$suffix = '-' . ($i < 10? '0' . ($i + 1): ($i + 1));
			} else {
				$suffix = '';
			}

			// create file
			//
			$extension = $this->name == 'deepai'? 'jpg' : 'png';
			$file = new ImageFile([
				'path' => $directory . $name . $suffix . '.' . $extension
			]);

			// write file
			//
			$filename = $file->rootPath();
			file_put_contents($filename, $imagedata);

			// write metadata
			//
			$artist = User::current()->getFullName();
			ExifWriter::write($filename, [
				'Description' => ($savePrompt? $prompt : 'None'),
				'Artist' => $artist,
				'Make' => $this->name,
				'Model' => $metadata
			]);

			// add file to list
			//
			$files[] = $file;
		}

		// return image
		//
		return $files;
	}
}
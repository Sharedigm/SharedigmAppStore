<?php
/******************************************************************************\
|                                                                              |
|                            ImageGeneratorKey.php                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of an AI image generator API key.                |
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

use App\Models\BaseModel;

class ImageGeneratorKey extends BaseModel
{
	//
	// attributes
	//

	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'image_generator_keys';

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
		'user_id',
		'image_generator',
		'api_key'
	];

	/**
	 * The attributes that should be visible in serialization.
	 *
	 * @var array
	 */
	protected $visible = [
		'id',
		'user_id',
		'image_generator',
		'api_key'
	];
}
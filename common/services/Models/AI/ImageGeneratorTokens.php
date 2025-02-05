<?php
/******************************************************************************\
|                                                                              |
|                          ImageGeneratorTokens.php                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of an AI image generator token set.              |
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

class ImageGeneratorTokens extends BaseModel
{
	//
	// attributes
	//

	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'image_generator_tokens';

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
		'num_used',
		'num_remaining',
		'requested_at'
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
		'num_used',
		'num_remaining',
		'requested_at'
	];

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'num_used' => 'integer',
		'num_remaining' => 'integer'
	];

	//
	// querying methods
	//

	/**
	 * Check if image generator has unused tokens
	 *
	 * @return boolean
	 */
	function hasUnused() {
		return $this->num_remaining > 0;
	}

	//
	// setting methods
	//

	/**
	 * Update the token counts.
	 *
	 * @return void
	 */
	function useTokens($count = 1) {
		$this->change([
			'num_used' => $this->num_used + $count,
			'num_remaining' => $this->num_remaining - $count
		]);
	}
}
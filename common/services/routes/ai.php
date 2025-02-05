<?php
/******************************************************************************\
|                                                                              |
|                                  storage.php                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the REST API routes used by the application.             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2024, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

use App\Http\Controllers\AI\ImageGeneratorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//
// protected routes
//

Route::group(['middleware' => 'verify.storage_access'], function() {

	// setting routes
	//
	Route::post('images/generators/{id}/tokens/request', [ImageGeneratorController::class, 'postRequestTokens']);
	Route::post('images/generators/{id}/api-key', [ImageGeneratorController::class, 'postApiKey']);

	// image generation routes
	//
	Route::post('images/generators/{id}/generate', [ImageGeneratorController::class, 'postGenerate']);
	Route::post('images/generators/{id}/enhance', [ImageGeneratorController::class, 'postEnhance']);
});

//
// public routes
//

Route::get('images/generators', [ImageGeneratorController::class, 'getAll']);
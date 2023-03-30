<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;

class GetOneClientController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Client $client)
  {
    //
    return $client;
  }
}

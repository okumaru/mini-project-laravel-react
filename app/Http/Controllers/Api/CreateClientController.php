<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;

class CreateClientController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request)
  {
    $val = $request->validate([
      'client_name' => 'required|string|unique:App\Models\Client,client_name',
      'client_address' => 'nullable|string',
    ]);

    Client::create($val);
    return ['message' => 'Client created successfully'];
  }
}

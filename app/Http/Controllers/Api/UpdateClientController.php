<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;

class UpdateClientController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Client $client, Request $request)
  {
    //
    $val = $request->validate([
      'client_name' => 'required|string|unique:App\Models\Client,client_name,' . $client->client_id,
      'client_address' => 'nullable|string',
    ]);

    $client->update($val);
    return ['message' => 'Client updated successfully'];
  }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;

class GetClientController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request)
  {
    //
    $client = new Client();

    if ($request->input('client_name')) 
      $client = $client->where('client_name', 'LIKE', "%{$request->input('client_name')}%");
      
    if ($request->input('client_address')) 
      $client = $client->where('client_address', 'LIKE', "%{$request->input('client_address')}%");

    return $client->orderBy('client_id', 'DESC')->paginate(5);
  }
}

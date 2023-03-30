<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class CreateProjectController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request)
  {
    //
    $val = $request->validate([
      'project_name' => 'required|string|unique:App\Models\Project,project_name',
      'client_id' => 'required|int|exists:App\Models\Client,client_id',
      'project_status' => 'required|string',
    ]);

    Project::create($val);
    return ['message' => 'Project created successfully'];
  }
}

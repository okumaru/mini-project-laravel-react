<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class UpdateProjectController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Project $project, Request $request)
  {
    //
    $val = $request->validate([
      'project_name' => 'required|string|unique:App\Models\Project,project_name,' . $project->project_id,
      'client_id' => 'required|int|exists:App\Models\Client,client_id',
      'project_start' => 'nullable',
      'project_end' => 'nullable',
      'project_status' => 'required|string',
    ]);

    $project->update($val);
    return ['message' => 'Project updated successfully'];
  }
}

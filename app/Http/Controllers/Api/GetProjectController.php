<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class GetProjectController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request)
  {
    $project = Project::join('tb_m_client', 'tb_m_project.client_id', '=', 'tb_m_client.client_id');

    if ($request->input('project_name')) 
      $project = $project->where('tb_m_project.project_name', 'LIKE', "%{$request->input('project_name')}%");

    if ($request->input('client_id'))
      $project = $project->where('tb_m_project.client_id', $request->input('client_id'));

    if ($request->input('project_status'))
      $project = $project->where('tb_m_project.project_status', $request->input('project_status'));

    return $project->orderBy('project_id', 'DESC')->paginate(5);
  }
}

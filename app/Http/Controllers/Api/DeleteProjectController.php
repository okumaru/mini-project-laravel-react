<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class DeleteProjectController extends Controller
{

  private $rule = [
    'ids' => 'required|array',
  ];

  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request)
  {
    //
    $request->validate($this->rule);
    
    Project::whereIn('project_id', $request->input('ids'))->delete();
    return ['message' => 'Project deleted successfully'];
  }
}

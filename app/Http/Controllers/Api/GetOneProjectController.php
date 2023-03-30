<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;

class GetOneProjectController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Project $project)
  {
    //
    return $project;
  }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth');
  }

  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request)
  {
    //
    return view('project');
  }
}

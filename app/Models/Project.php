<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Project extends Model
{
  use HasApiTokens, HasFactory;

  protected $table = 'tb_m_project';

  protected $primaryKey = 'project_id';

  public $timestamps = false;

  public function client()
  {
    return $this->hasOne(Client::class);
  }

  protected $fillable = ['project_name','client_id','project_start','project_end','project_status'];
}

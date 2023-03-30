<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Client extends Model
{
  use HasApiTokens, HasFactory;

  protected $table = 'tb_m_client';

  protected $primaryKey = 'client_id';

  public $timestamps = false;

  protected $fillable = ['client_name','client_address'];
}

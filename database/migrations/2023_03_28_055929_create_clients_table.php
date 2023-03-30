<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('tb_m_client', function (Blueprint $table) {
      // client_id
      $table->increments('client_id');
      // client_name
      $table->string('client_name');
      // client_address
      $table->string('client_address');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('tb_m_client');
  }
};

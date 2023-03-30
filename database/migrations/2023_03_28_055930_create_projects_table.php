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
    Schema::create('tb_m_project', function (Blueprint $table) {
      // project_id
      $table->increments('project_id');
      // project_name
      $table->string('project_name', 100);
      // client_id
      $table->integer('client_id', false, true);
      // project_start
      $table->date('project_start')->nullable();
      // project_end
      $table->date('project_end')->nullable();
      // Project_status
      $table->char('project_status', 15);
      // foreign key client id
      $table->foreign('client_id')->references('client_id')->on('tb_m_client');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('projects');
  }
};

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Client;
// use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $clients = [
      [
        'client_id' => 1,
        'client_name' => 'NEC',
        'client_address' => 'Jakarta',
      ],[
        'client_id' => 2,
        'client_name' => 'TAM',
        'client_address' => 'Jakarta',
      ],[
        'client_id' => 3,
        'client_name' => 'TUA',
        'client_address' => 'Bandung',
      ]
    ];

    //
    foreach ($clients as $value) {
      $client = new Client($value);
      $client->save();
    }
  }
}

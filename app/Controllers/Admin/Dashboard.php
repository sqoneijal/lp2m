<?php

namespace App\Controllers\Admin;

use App\Models\Common;
use App\Controllers\Admin;
use App\Models\Admin\Dashboard as Model;

class Dashboard extends Admin
{

   public function index()
   {
      $common = new Common();

      $this->data = [
         'title' => 'Dashboard',
         'content' => [
            'periode' => $common->getActivePeriode(),
         ]
      ];

      $this->template($this->data);
   }

   public function getStatistik()
   {
      $model = new Model();
      $content = [
         'jumlahPesertaKPM' => $model->hitungJumlahPesertaBerdasarkanJenis($this->getVar)
      ];
      return $this->response->setJSON($content);
   }
}

<?php

namespace App\Controllers\Admin;

use App\Controllers\Admin;
use App\Models\Admin\Nilai as Model;

class Nilai extends Admin
{
   public function index()
   {
      $this->data = [
         'title' => 'Nilai'
      ];

      $this->template($this->data);
   }

   public function initPage(): object
   {
      $model = new Model();

      $content = [
         'daftarPeriode' => $model->getDaftarPeriode()
      ];
      return $this->response->setJSON($content);
   }

   public function downloadExcel()
   {
      $model = new Model();
      $content = $model->downloadExcel($this->post);
      return $this->response->setJSON($content);
   }

   public function submit(): object
   {
      $model = new Model();
      $content = $model->submit($this->post);
      return $this->response->setJSON($content);
   }
}

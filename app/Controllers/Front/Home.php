<?php

namespace App\Controllers\Front;

use App\Controllers\Front;
use App\Models\Front\Home as Model;

class Home extends Front
{

   public function index()
   {
      $this->data = [
         'title' => 'KPM',
      ];

      $this->template($this->data);
   }

   public function getInformasiTerbaru()
   {
      $model = new Model();
      $content = $model->getInformasiTerbaru();
      return $this->response->setJSON($content);
   }
}

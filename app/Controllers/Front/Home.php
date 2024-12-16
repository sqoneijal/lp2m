<?php

namespace App\Controllers\Front;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Front;
use App\Models\Front\Home as Model;

class Home extends Front
{

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
   {
      parent::initController($request, $response, $logger);
   }

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

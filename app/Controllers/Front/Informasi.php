<?php

namespace App\Controllers\Front;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Front as Controller;
use App\Models\Front\Informasi as Model;

class Informasi extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Detail Informasi'
      ];

      $this->template($this->data);
   }

   public function detail($id) {
      $model = new Model();
      $content = $model->getDetailInformasi($id);
      return $this->response->setJSON($content);
   }

}
<?php

namespace App\Controllers\Admin;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Admin as Controller;
use App\Models\Admin\SyaratKPM as Model;

class SyaratKPM extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Informasi Syarat KPM'
      ];

      $this->template($this->data);
   }

   public function submit() {
      $model = new Model();
      $model->submit($this->post);
      return $this->response->setJSON(['status' => true, 'msg_response' => 'Data berhasil disimpan.']);
   }

   public function getcontent() {
      $model = new Model();
      $content = $model->getContent();
      return $this->response->setJSON($content);
   }

}
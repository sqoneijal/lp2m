<?php

namespace App\Controllers\Front;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Front as Controller;
use App\Validation\Front\CekStatusPendaftaran as Validate;
use App\Models\Front\CekStatusPendaftaran as Model;

class CekStatusPendaftaran extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Cek Status Pendaftaran KPM',
      ];

      $this->template($this->data);
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'Terjadi sesuatu kesalahan.'];
      
      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $model = new Model();
         $content = $model->submit($this->post);
      
         $response['status'] = true;
         $response['content'] = $content;
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

}
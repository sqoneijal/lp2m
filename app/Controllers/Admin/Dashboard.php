<?php

namespace App\Controllers\Admin;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\Common;
use App\Controllers\Admin as Controller;
use App\Models\Admin\Dashboard as Model;

class Dashboard extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $common = new Common();

      $this->data = [
         'title' => 'Dashboard',
         'content' => [
            'periode' => $common->getActivePeriode(),
         ]
      ];

      $this->template($this->data);
   }

   public function getStatistik() {
      $model = new Model();
      $content = [
         'jumlahPesertaKPM' => $model->hitungJumlahPesertaBerdasarkanJenis($this->getVar)
      ];
      return $this->response->setJSON($content);
   }

}
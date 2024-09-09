<?php

namespace App\Controllers\Front;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\Common;
use App\Controllers\Front as Controller;
use App\Models\Front\CetakBiodata as Model;

class CetakBiodata extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Cetak Biodata'
      ];

      $this->template($this->data);
   }

   public function getDropdownList() {
      $common = new Common();
      $content = [
         'periodeAktif' => $common->getActivePeriode(),
      ];
      return $this->response->setJSON($content);
   }

   public function cariPesertaKPM() {
      $model = new Model();
      $content = $model->cariPesertaKPM($this->post);
      return $this->response->setJSON($content);
   }

   public function cetak($nim) {
      $model = new Model();
      $common = new Common();

      $getActivePeriode = $common->getActivePeriode();
      $content = $model->cariPesertaKPM([
         'nim' => $nim,
         'tahun_ajaran' => $getActivePeriode['tahun_ajaran'],
         'id_semester' => $getActivePeriode['id_semester'],
      ]);

      return view('CetakBiodata', $content);
   }

}
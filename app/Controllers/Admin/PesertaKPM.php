<?php

namespace App\Controllers\Admin;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\Common;
use App\Controllers\Admin as Controller;
use App\Models\Admin\PesertaKPM as Model;
use App\Validation\Admin\PesertaKPM as Validate;

class PesertaKPM extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $common = new Common();

      $this->data = [
         'title' => 'Peserta KPM',
         'internalCss' => datatable['css'],
         'internalJs' => datatable['js'],
         'content' => [
            'periode' => $common->getActivePeriode(),
         ]
      ];

      $this->template($this->data);
   }

   public function getDropdownList() {
      $common = new Common();
      $content = [
         'daftarJenisKPM' => $common->getDaftarJenisKPM(),
         'daftarFakultas' => $common->getDaftarFakultas(),
         'daftarProdi' => $common->getDaftarProdi(),
      ];
      return $this->response->setJSON($content);
   }

   public function downloadExcel() {
      $model = new Model();
      $content = $model->downloadExcel($this->post);
      return $this->response->setJSON($content);
   }

   public function getDetailBiodata() {
      $model = new Model();
      $content = $model->cariPesertaKPM($this->post);
      return $this->response->setJSON($content);
   }

   public function hapus() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'Terjadi sesuatu kesalahan.'];
      
      $validation = new Validate();
      if ($this->validate($validation->hapus())) {
         $model = new Model();
         $model->hapus($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil dihapus.';
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function getData() {
      $model = new Model();
      $query = $model->getData($this->getVar);
   
      $i = $this->post['start'];
   
      $output = array(
         'draw'            => intval(@$this->post['draw']),
         'recordsTotal'    => intval($model->countData($this->getVar)),
         'recordsFiltered' => intval($model->filteredData($this->getVar)),
         'data'            => $query
      );
      return $this->response->setJSON($output);
   }

}
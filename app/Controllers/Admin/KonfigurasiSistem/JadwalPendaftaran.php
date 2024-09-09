<?php

namespace App\Controllers\Admin\KonfigurasiSistem;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\Common;
use App\Controllers\Admin as Controller;
use App\Models\Admin\KonfigurasiSistem\JadwalPendaftaran as Model;
use App\Validation\Admin\KonfigurasiSistem\JadwalPendaftaran as Validate;

class JadwalPendaftaran extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Jadwal Pendaftaran',
         'internalCss' => datatable['css'],
         'internalJs' => datatable['js'],
      ];

      $this->template($this->data);
   }

   public function getDropdownList() {
      $common = new Common();
      $content = [
         'periodeAktif' => $common->getActivePeriode(),
         'daftarJenisKPM' => $common->getDaftarJenisKPM(),
      ];
      return $this->response->setJSON($content);
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'Terjadi sesuatu kesalahan.'];
      
      $validation = new Validate();
      if ($this->validate($validation->submit($this->post))) {
         $model = new Model();
         $model->submit($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
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
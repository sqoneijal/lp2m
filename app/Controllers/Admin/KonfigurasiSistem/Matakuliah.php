<?php

namespace App\Controllers\Admin\KonfigurasiSistem;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Admin as Controller;
use App\Models\Admin\KonfigurasiSistem\Matakuliah as Model;

class Matakuliah extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Matakuliah',
         'datatableCss' => datatable['css'],
         'internalJs' => [
            datatable['js'],
            typed['js']
         ]
      ];

      $this->template($this->data);
   }

   public function hapus() {
      $model = new Model();
      $model->hapus($this->post);
      return $this->response->setJSON(['status' => true, 'msg_response' => 'Data berhasil dihapus']);
   }

   public function cariMatakuliah() {
      $model = new Model();
      $content = $model->cariMatakuliah($this->post['query']);
      return $this->response->setJSON($content);
   }

   public function submit() {
      $model = new Model();
      $model->submit(json_decode($this->post['selected_kode_mk'], true));
      return $this->response->setJSON(['status' => true, 'msg_response' => 'Data berhasil disimpan.']);
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
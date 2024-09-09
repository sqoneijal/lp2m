<?php

namespace App\Controllers\Front;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Front as Controller;
use App\Models\Front\DaftarMatkulKPM as Model;

class DaftarMatkulKPM extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Daftar Matakuliah KPM',
         'internalCss' => datatable['css'],
         'internalJs' => datatable['js'],
      ];

      $this->template($this->data);
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
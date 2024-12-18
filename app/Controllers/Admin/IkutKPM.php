<?php

namespace App\Controllers\Admin;

use App\Controllers\Admin;
use App\Models\Common;
use App\Models\Admin\IkutKPM as Model;

class IkutKPM extends Admin
{
   public function index()
   {
      $common = new Common();

      $this->data = [
         'title' => 'Ikut KPM',
         'internalCss' => datatable['css'],
         'internalJs' => datatable['js'],
         'content' => [
            'periode' => $common->getActivePeriode(),
         ]
      ];

      $this->template($this->data);
   }

   public function downloadExcel()
   {
      $model = new Model();
      $content = $model->downloadExcel($this->post);
      return $this->response->setJSON($content);
   }

   public function getDetailBiodata()
   {
      $model = new Model();
      $content = $model->cariPesertaKPM($this->post);
      return $this->response->setJSON($content);
   }

   public function getDropdownList()
   {
      $common = new Common();
      $content = [
         'daftarJenisKPM' => $common->getDaftarJenisKPM(),
         'daftarFakultas' => $common->getDaftarFakultas(),
         'daftarProdi' => $common->getDaftarProdi(),
         'daftarPeriode' => $common->getDaftarPeriode()
      ];
      return $this->response->setJSON($content);
   }

   public function getData()
   {
      $model = new Model();
      $query = $model->getData($this->getVar);

      $output = array(
         'draw'            => intval(@$this->post['draw']),
         'recordsTotal'    => intval($model->countData($this->getVar)),
         'recordsFiltered' => intval($model->filteredData($this->getVar)),
         'data'            => $query
      );
      return $this->response->setJSON($output);
   }
}

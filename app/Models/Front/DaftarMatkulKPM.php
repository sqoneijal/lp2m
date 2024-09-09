<?php

namespace App\Models\Front;

use CodeIgniter\Model;

class DaftarMatkulKPM extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getData($post = []) {
      try {
         $table = $this->_queryData($post);
         if ($post['length'] !== -1)
            $table->limit($post['length'], $post['start']);
   
         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
   
         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               $response[$key][$field] = trim($val[$field]);
            }
         }
         return $response;
      } catch(\Exception $e) {
         die($e->getMessage());
      }
   }
   
   public function countData($post = []) {
      $table = $this->db->table('tb_matkul_kpm tmk');
      $table->selectCount('*', 'jumlah');
      $table->join('tbl_mst_matakuliah tmm', 'tmm.kode_mk = tmk.kode_mk');
   
      $get = $table->get();
      $data = $get->getRowArray();
   
      if (isset($data)) return $data['jumlah'];
      return 0;
   }
   
   public function filteredData($post = []) {
      $table = $this->_queryData($post);
      $get = $table->get();
      return count($get->getResultArray());
   }
   
   private function _queryData($post = []) {
      $table = $this->db->table('tb_matkul_kpm tmk');
      $table->select('tmk.id, tmk.kode_mk, tmm.nama_matakuliah, tmm.sks_matakuliah');
      $table->join('tbl_mst_matakuliah tmm', 'tmm.kode_mk = tmk.kode_mk');
   
      $i = 0;
      $column_search = ['tmk.kode_mk', 'tmm.nama_matakuliah'];
      foreach ($column_search as $item) {
         if (@$_POST['search']['value']) {
            if ($i === 0) {
               $table->groupStart();
               $table->like($item, trim(strtolower($_POST['search']['value'])));
            } else {
               $table->orLike($item, trim(strtolower($_POST['search']['value'])));
            }
   
            if (count($column_search) - 1 === $i)
               $table->groupEnd();
         }
         $i++;
      }
   
      $column_order = ['kode_mk', 'nama_matakuliah', 'sks_matakuliah'];
      $column = @$_POST['order'][0]['column'];
      $dir = @$_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);
   
      return $table;
   }

}
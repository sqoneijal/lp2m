<?php

namespace App\Models\Admin;

use CodeIgniter\Model;

class Dashboard extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function hitungJumlahPesertaBerdasarkanJenis($post = []) {
      try {
         $table = $this->db->table('tb_mst_jenis_kpm tmjk');
         $table->select('tmjk.nama, coalesce(tpk.jumlah, 0) as jumlah');
         $table->join('(select id_jenis_kpm, count(*) as jumlah from tb_peserta_kpm where concat(tahun_ajaran, id_semester) = "'.$post['periode'].'" group by id_jenis_kpm) tpk', 'tpk.id_jenis_kpm = tmjk.id', 'left');

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
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}
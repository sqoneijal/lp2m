<?php

namespace App\Models\Front;

use CodeIgniter\Model;

class CekStatusPendaftaran extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function submit($post = []) {
      try {
         $table = $this->db->table('tb_peserta_kpm tpk');
         $table->select('tmjk.nama as nama_jenis_kpm, tpk.tahun_ajaran, tpk.id_semester, tpk.uploaded');
         $table->join('tb_mst_jenis_kpm tmjk', 'tmjk.id = tpk.id_jenis_kpm');
         $table->where('tpk.nim', $post['nim']);

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
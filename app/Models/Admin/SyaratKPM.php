<?php

namespace App\Models\Admin;

use CodeIgniter\Model;

class SyaratKPM extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getContent() {
      try {
         $table = $this->db->table('tb_informasi_syarat_kpm');

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               $response[$field] = trim($data[$field]);
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function submit($post = []) {
      try {
         $checkData = $this->checkData();

         $table = $this->db->table('tb_informasi_syarat_kpm');
         if ((int) $checkData['jumlah'] > 0) {
            $table->update([
               'content' => htmlentities($post['content']),
            ]);
         } else {
            $table->insert([
               'content' => htmlentities($post['content']),
            ]);
         }
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function checkData() {
      try {
         $table = $this->db->table('tb_informasi_syarat_kpm');
         $table->selectCount('*', 'jumlah');

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               $response[$field] = trim($data[$field]);
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}
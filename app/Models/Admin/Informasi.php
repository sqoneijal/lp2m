<?php

namespace App\Models\Admin;

use CodeIgniter\Model;

class Informasi extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function hapus($post = []) {
      try {
         $table = $this->db->table('tb_informasi_kpm');
         $table->where('id', $post['id']);
         $table->delete();
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function submit($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            if ($val) $data[$key] = trim($val);
            else $data[$key] = is_numeric($val) ? $val : null;
         }
         unset($data['pageType'], $data['id']);

         $data['modified'] = date('Y-m-d H:i:s');
         $data['content'] = htmlentities($data['content']);

         $table = $this->db->table('tb_informasi_kpm');
         if ($post['pageType'] === 'insert') {
            $data['uploaded'] = date('Y-m-d H:i:s');

            $table->insert($data);
         } else if ($post['pageType'] === 'update') {
            $table->where('id', $post['id']);
            $table->update($data);
         }
      } catch (\Exception $e) {
         die($e->getMessage());
      }
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
      $table = $this->db->table('tb_informasi_kpm');
      $table->selectCount('*', 'jumlah');
   
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
      $table = $this->db->table('tb_informasi_kpm');
   
      $i = 0;
      $column_search = ['judul'];
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
   
      $column_order = ['judul'];
      $column = @$_POST['order'][0]['column'];
      $dir = @$_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);
   
      return $table;
   }

}
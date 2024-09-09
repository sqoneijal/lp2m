<?php

namespace App\Models\Admin\KonfigurasiSistem;

use CodeIgniter\Model;
use App\Models\Common;

class Periode extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function handleTutupPeriodeAktif() {
      try {
         $common = new Common();

         $getActivePeriode = $common->getActivePeriode();
         if ((int) $getActivePeriode['jumlah'] > 0) {
            $table = $this->db->table('tb_periode_kpm');
            $table->where('tahun_ajaran', $getActivePeriode['tahun_ajaran']);
            $table->where('id_semester', $getActivePeriode['id_semester']);
            $table->update([
               'is_active' => '0'
            ]);
            return [
               'status' => true,
               'msg_response' => 'Periode aktif berhasil ditutup.'
            ];
         } else {
            return [
               'status' => false,
               'msg_response' => 'Tidak ada periode aktif yang bisa ditutup.'
            ];
         }
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function hapus($post = []) {
      try {
         $table = $this->db->table('tb_periode_kpm');
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

         $table = $this->db->table('tb_periode_kpm');
         if ($post['pageType'] === 'insert') {
            $common = new Common();
            $getActivePeriode = $common->getActivePeriode();

            if ((int) $getActivePeriode['jumlah'] < 1) {
               $data['is_active'] = '1';
               $data['uploaded'] = date('Y-m-d H:i:s');

               $table->insert($data);
               return true;
            }
            return false;
         } else if ($post['pageType'] === 'update') {
            $table->where('tahun_ajaran', $data['tahun_ajaran']);
            $table->where('id_semester', $data['id_semester']);
            $table->update($data);
            return true;
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
      $table = $this->db->table('tb_periode_kpm');
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
      $table = $this->db->table('tb_periode_kpm tpk');
      $table->select('tpk.id, tpk.tahun_ajaran, tpk.id_semester, tpk.is_active, concat(tpk.tahun_ajaran, tpk.id_semester) as periode');
   
      $column_order = ['periode', 'is_active'];
      $column = @$_POST['order'][0]['column'];
      $dir = @$_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);
   
      return $table;
   }

}
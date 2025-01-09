<?php

namespace App\Models\Admin\KonfigurasiSistem;

use CodeIgniter\Model;

class JadwalPendaftaran extends Model
{

   protected $db;

   public function __construct()
   {
      $this->db = \Config\Database::connect();
   }

   public function hapus($post = [])
   {
      try {
         $table = $this->db->table('tb_jadwal_pendaftaran_kpm');
         $table->where('id', $post['id']);
         $table->delete();
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function submit($post = [])
   {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            if ($val) $data[$key] = trim($val);
            else $data[$key] = is_numeric($val) ? $val : null;
         }
         unset($data['pageType'], $data['id']);

         $data['modified'] = date('Y-m-d H:i:s');

         $table = $this->db->table('tb_jadwal_pendaftaran_kpm');
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

   public function getData($post = [])
   {
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
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function countData($post = [])
   {
      $table = $this->db->table('tb_jadwal_pendaftaran_kpm tjpk');
      $table->selectCount('*', 'jumlah');
      $table->join('tb_mst_jenis_kpm tmjk', 'tmjk.id = tjpk.id_jenis_kpm');

      $get = $table->get();
      $data = $get->getRowArray();

      if (isset($data)) return $data['jumlah'];
      return 0;
   }

   public function filteredData($post = [])
   {
      $table = $this->_queryData($post);
      $get = $table->get();
      return count($get->getResultArray());
   }

   private function _queryData($post = [])
   {
      $table = $this->db->table('tb_jadwal_pendaftaran_kpm tjpk');
      $table->select('tjpk.id, tjpk.tanggal_mulai, tjpk.tanggal_selesai, tjpk.tahun_ajaran, tjpk.id_semester,
      concat(tjpk.tahun_ajaran, tjpk.id_semester) as periode, tjpk.id_jenis_kpm, tmjk.nama as nama_jenis_kpm, tjpk.keterangan');
      $table->join('tb_mst_jenis_kpm tmjk', 'tmjk.id = tjpk.id_jenis_kpm');

      $column_order = ['periode', 'tanggal_mulai'];
      $column = @$_POST['order'][0]['column'];
      $dir = @$_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);

      return $table;
   }
}

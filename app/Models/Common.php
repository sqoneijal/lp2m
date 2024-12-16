<?php

namespace App\Models;

use CodeIgniter\Model;

class Common extends Model
{

   protected $db;

   public function __construct()
   {
      $this->db = \Config\Database::connect('default');
   }

   public function getDaftarProdi()
   {
      try {
         $table = $this->db->table('tbl_mst_prodi tmp');
         $table->select('tmp.id_prodi, tmp.id_fakultas, concat(tsj.nama_jenjangprodi, \' \', tmp.nama_prodi) as nama_prodi');
         $table->join('tbl_sys_jenjangprodi tsj', 'tsj.id_jenjangprodi = tmp.kode_jenjang');
         $table->orderBy('nama_prodi');

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

   public function getDaftarFakultas()
   {
      try {
         $table = $this->db->table('tbl_mst_fakultas');
         $table->select('id_fakultas, nama_fakultas');
         $table->orderBy('nama_fakultas');

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

   public function getJadwalPendaftaran()
   {
      try {
         $table = $this->db->table('tb_jadwal_pendaftaran_kpm tjpk');
         $table->select('tjpk.id, tjpk.tanggal_mulai, tjpk.tanggal_selesai, tjpk.tahun_ajaran, tjpk.id_semester, tjpk.id_jenis_kpm,
         tmjk.nama as nama_jenis_kpm, tmjk.sks_lulus');
         $table->join('tb_mst_jenis_kpm tmjk', 'tmjk.id = tjpk.id_jenis_kpm');
         $table->where('concat(tjpk.tahun_ajaran, tjpk.id_semester)', function ($table) {
            return $table->select('concat(tahun_ajaran, id_semester)')
               ->from('tb_periode_kpm')
               ->where('is_active', '1');
         });

         $get = $table->get();
         $result = $get->getResultArray();

         $tgl_sekarang = strtotime(date('Y-m-d'));

         $response = [];
         foreach ($result as $data) {
            $tanggal_mulai = strtotime($data['tanggal_mulai']);
            $tanggal_selesai = strtotime($data['tanggal_selesai']);

            array_push($response, array_merge(
               $data,
               ['is_open' => (($tgl_sekarang >= $tanggal_mulai) && ($tgl_sekarang <= $tanggal_selesai) ? true : false)]
            ));
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getDaftarJenisKPM()
   {
      try {
         $table = $this->db->table('tb_mst_jenis_kpm');
         $table->orderBy('nama');

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

   public function getInformasiSyaratKPM()
   {
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

   public function getActivePeriode()
   {
      try {
         $table = $this->db->table('tb_periode_kpm');
         $table->select('*');
         $table->selectCount('*', 'jumlah');
         $table->where('is_active', '1');

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

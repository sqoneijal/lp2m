<?php

namespace App\Models\Admin;

use App\Models\Common;

class IkutKPM extends Common
{

   public function downloadExcel($post = [])
   {
      try {
         $table = $this->db->table('tb_peserta_kpm tpk');
         $table->select('tpk.nomor_peserta, tpk.nim, tm.nama, tm.tpt_lahir, tm.tgl_lahir, tm.jk, tpk.ipk,
         case
            when tm.sts_mahasiswa != 1 then concat(tfp.nama_program_studi, \' - \', tfp.nama_perguruan_tinggi)
            else tm.sekolah_nama
         end as pendidikan_sebelumnya, tpk.status_perkawinan, tpk.keterampilan_khusus, tpk.organisasi, tpk.alamat as alamat_di_banda_aceh,
         tpk.telp, tpk.email, tpk.ukuran_baju, tpk.penyakit, tm.alamat, tmf.nama_fakultas,
         concat(tsj.nama_jenjangprodi, \' \', tmp.nama_prodi) as nama_prodi, tm.ayah_nama, tmp2.ket_pekerjaan as ayah_pekerjaan,
         tm.ayah_alamat');
         $table->join('tbl_mahasiswa tm', 'tm.nim = tpk.nim');
         $table->join('tbl_mst_prodi tmp', 'tmp.id_prodi = tm.id_prodi');
         $table->join('tbl_sys_jenjangprodi tsj', 'tsj.id_jenjangprodi = tmp.kode_jenjang');
         $table->join('tbl_mst_fakultas tmf', 'tmf.id_fakultas = tmp.id_fakultas');
         $table->join('tbl_feeder_prodi tfp', 'tfp.kode_program_studi = tm.kode_prodi_asal and tfp.kode_perguruan_tinggi = tm.kode_pt_asal', 'left');
         $table->join('tbl_mst_pekerjaan tmp2', 'tmp2.id_pekerjaan = tm.ayah_idpekerjaan', 'left');
         $table->where('tpk.boleh_ikut_kpm', 't');
         $table->where('concat(tpk.tahun_ajaran, tpk.id_semester)', $post['periode']);
         if (@$post['id_fakultas']) {
            $table->where('tmp.id_fakultas', $post['id_fakultas']);
         }
         if (@$post['id_prodi']) {
            $table->where('tmp.id_prodi', $post['id_prodi']);
         }
         if (@$post['id_jenis_kpm']) {
            $table->where('tpk.id_jenis_kpm', $post['id_jenis_kpm']);
         }

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

   public function cariPesertaKPM($post = [])
   {
      try {
         $table = $this->db->table('tb_peserta_kpm tpk');
         $table->select('tm.nama, tm.tpt_lahir, tm.tgl_lahir, tm.jk, tm.alamat, tmf.nama_fakultas,
         concat(tsj.nama_jenjangprodi, \' \', tmp.nama_prodi) as nama_prodi, tpk.nim, tm.ayah_nama, tmp2.ket_pekerjaan as pekerjaan_ayah,
         tm.ayah_alamat, tpk.ipk, tpk.keterampilan_khusus, tpk.organisasi, tpk.nomor_peserta,
         tpk.alamat as alamat_di_banda_aceh, tpk.telp, tpk.email, tpk.ukuran_baju, tpk.penyakit, tpk.status_perkawinan,
         case
            when tm.sts_mahasiswa != 1 then concat(tfp.nama_program_studi, \' - \', tfp.nama_perguruan_tinggi)
            else tm.sekolah_nama
         end as pendidikan_sebelumnya, tpk.tahun_ajaran, tpk.id_semester, tpk.foto, tpk.uploaded,
         tmjk.nama as nama_jenis_kpm, tpk.krs_aktif');
         $table->join('tb_mst_jenis_kpm tmjk', 'tmjk.id = tpk.id_jenis_kpm');
         $table->join('tbl_mahasiswa tm', 'tm.nim = tpk.nim');
         $table->join('tbl_mst_prodi tmp', 'tmp.id_prodi = tm.id_prodi');
         $table->join('tbl_sys_jenjangprodi tsj', 'tsj.id_jenjangprodi = tmp.kode_jenjang');
         $table->join('tbl_mst_fakultas tmf', 'tmf.id_fakultas = tmp.id_fakultas');
         $table->join('tbl_mst_pekerjaan tmp2', 'tmp2.id_pekerjaan = tm.ayah_idpekerjaan', 'left');
         $table->join('tbl_feeder_prodi tfp', 'tfp.kode_program_studi = tm.kode_prodi_asal and tfp.kode_perguruan_tinggi = tm.kode_pt_asal', 'left');
         $table->where('tpk.nim', $post['nim']);
         $table->where('tpk.tahun_ajaran', $post['tahun_ajaran']);
         $table->where('tpk.id_semester', $post['id_semester']);

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

   public function getData($post = [])
   {
      try {
         $table = $this->_queryData($post);
         if ($post['length'] !== -1) {
            $table->limit($post['length'], $post['start']);
         }

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
      $table = $this->db->table('tb_peserta_kpm tpk');
      $table->selectCount('*', 'jumlah');
      $table->join('tbl_mahasiswa tm', 'tm.nim = tpk.nim');
      $table->join('tbl_mst_prodi tmp', 'tmp.id_prodi = tm.id_prodi');
      $table->join('tbl_sys_jenjangprodi tsj', 'tsj.id_jenjangprodi = tmp.kode_jenjang');
      $table->join('tbl_mst_fakultas tmf', 'tmf.id_fakultas = tmp.id_fakultas');
      $table->where('tpk.boleh_ikut_kpm', 't');
      $table->where('concat(tpk.tahun_ajaran, tpk.id_semester)', $post['periode']);

      return $table->countAllResults();
   }

   public function filteredData($post = [])
   {
      $table = $this->_queryData($post);
      $get = $table->get();
      return count($get->getResultArray());
   }

   private function _queryData($post = [])
   {
      $table = $this->db->table('tb_peserta_kpm tpk');
      $table->select('tpk.id, tpk.nim, tm.nama, tpk.ipk, tm.ta_masuk as angkatan, concat(tsj.nama_jenjangprodi, \' \', tmp.nama_prodi) as nama_prodi, tmf.nama_fakultas, tpk.tahun_ajaran, tpk.id_semester, tmjk.nama as nama_jenis_kpm, tpk.total_sks, tpk.krs_aktif');
      $table->join('tbl_mahasiswa tm', 'tm.nim = tpk.nim');
      $table->join('tbl_mst_prodi tmp', 'tmp.id_prodi = tm.id_prodi');
      $table->join('tbl_sys_jenjangprodi tsj', 'tsj.id_jenjangprodi = tmp.kode_jenjang');
      $table->join('tbl_mst_fakultas tmf', 'tmf.id_fakultas = tmp.id_fakultas');
      $table->join('tb_mst_jenis_kpm tmjk', 'tmjk.id = tpk.id_jenis_kpm');
      $table->where('tpk.boleh_ikut_kpm', 't');
      $table->where('concat(tpk.tahun_ajaran, tpk.id_semester)', $post['periode']);
      if (@$post['id_fakultas']) {
         $table->where('tmp.id_fakultas', $post['id_fakultas']);
      }
      if (@$post['id_prodi']) {
         $table->where('tmp.id_prodi', $post['id_prodi']);
      }
      if (@$post['id_jenis_kpm']) {
         $table->where('tpk.id_jenis_kpm', $post['id_jenis_kpm']);
      }

      $i = 0;
      $column_search = ['tpk.nim', 'tm.nama', 'tmp.nama_prodi', 'tmf.nama_fakultas', 'tmjk.nama'];
      foreach ($column_search as $item) {
         if (@$_POST['search']['value']) {
            if ($i === 0) {
               $table->groupStart();
               $table->like($item, trim(strtolower($_POST['search']['value'])));
            } else {
               $table->orLike($item, trim(strtolower($_POST['search']['value'])));
            }

            if (count($column_search) - 1 === $i) {
               $table->groupEnd();
            }
         }
         $i++;
      }

      $column_order = ['nim', 'nama', 'nama_jenis_kpm', 'total_sks', 'ipk', 'angkatan', 'nama_prodi', 'nama_fakultas', null];
      $column = @$_POST['order'][0]['column'];
      $dir = @$_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);

      return $table;
   }
}

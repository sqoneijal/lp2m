<?php

namespace App\Models\Admin;

use App\Models\Common;

class Nilai extends Common
{

   public function submit(array $post): array
   {
      try {
         $daftar = json_decode($post['daftar'], true);

         if (!empty($daftar)) {
            $data = [];
            foreach ($daftar as $row) {
               array_push($data, [
                  'nim' => $row['nim'],
                  'nilai' => $row['nilai']
               ]);
            }

            if (!empty($data)) {
               $table = $this->db->table('tb_peserta_kpm');
               $table->updateBatch($data, 'nim');
            }
         }
         return ['status' => true, 'msg_response' => 'Data berhasil diimport.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function downloadExcel(array $post): array
   {
      $table = $this->db->table('tb_peserta_kpm tpk');
      $table->select('tpk.nomor_peserta, tpk.nim, tm.nama, tm.tpt_lahir, tm.tgl_lahir, tm.jk, tpk.ipk,
         case
            when tm.sts_mahasiswa != 1 then concat(tfp.nama_program_studi, \' - \', tfp.nama_perguruan_tinggi)
            else tm.sekolah_nama
         end as pendidikan_sebelumnya, tpk.status_perkawinan, tpk.keterampilan_khusus, tpk.organisasi, tpk.alamat as alamat_di_banda_aceh,
         tpk.telp, tpk.email, tpk.ukuran_baju, tpk.penyakit, tm.alamat, tmf.nama_fakultas,
         concat(tsj.nama_jenjangprodi, \' \', tmp.nama_prodi) as nama_prodi, tm.ayah_nama, tmp2.ket_pekerjaan as ayah_pekerjaan, tm.ayah_alamat, tpk.nilai, tmjk.nama as jenis_kpm');
      $table->join('tbl_mahasiswa tm', 'tm.nim = tpk.nim');
      $table->join('tbl_mst_prodi tmp', 'tmp.id_prodi = tm.id_prodi');
      $table->join('tbl_sys_jenjangprodi tsj', 'tsj.id_jenjangprodi = tmp.kode_jenjang');
      $table->join('tbl_mst_fakultas tmf', 'tmf.id_fakultas = tmp.id_fakultas');
      $table->join('tbl_feeder_prodi tfp', 'tfp.kode_program_studi = tm.kode_prodi_asal and tfp.kode_perguruan_tinggi = tm.kode_pt_asal', 'left');
      $table->join('tbl_mst_pekerjaan tmp2', 'tmp2.id_pekerjaan = tm.ayah_idpekerjaan', 'left');
      $table->join('tb_mst_jenis_kpm tmjk', 'tmjk.id = tpk.id_jenis_kpm', 'left');
      $table->where('tpk.boleh_ikut_kpm', 't');
      $table->where('concat(tpk.tahun_ajaran, tpk.id_semester)', $post['periode']);

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
   }
}

<?php

namespace App\Validation;

class Callback {

   public function checkJumlahSKSLulus($str, string $fields, array $data, &$error = null) : bool {
      try {
         $db = \Config\Database::connect();

         $total_sks = (int) $data[$fields];

         $table = $db->table('tb_mst_jenis_kpm');
         $table->where('id', $str);

         $get = $table->get();
         $data = $get->getRowArray();

         if ($total_sks >= (int) $data['sks_lulus']) {
            return true;
         } else {
            $error = 'SKS anda tidak mencukupi untuk mendaftar jenis KPM ini. Minimal SKS yang dibutuhkan ' . $data['sks_lulus'];
            return false;
         }
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function apakahAdaAmbilMatkulKPM($str, string $fields, array $data, &$error = null) : bool {
      try {
         $db = \Config\Database::connect();

         $field = explode(',', $fields);
         $tahun_ajaran = $data[$field[0]];
         $id_semester = $data[$field[1]];

         $table = $db->table('tbl_krs tk');
         $table->selectCount('*', 'jumlah');
         $table->join('tbl_krs_detail tkd', 'tkd.id_krs = tk.id_krs');
         $table->where('tk.nim', $str);
         $table->where('tk.thn_ajaran', $tahun_ajaran);
         $table->where('tk.id_semester', $id_semester);
         $table->whereIn('tkd.kode_mk', function($table) {
            return $table->select('kode_mk')
               ->from('tb_matkul_kpm');
         });

         $get = $table->get();
         $data = $get->getRowArray();
         $get->freeResult();
         
         if ((int) $data['jumlah'] > 0) {
            // check apakah ada matakuliah selain tugas akhir            
            $table2 = $db->table('tbl_krs tk');
            $table2->selectCount('*', 'jumlah');
            $table2->join('tbl_krs_detail tkd', 'tkd.id_krs = tk.id_krs');
            $table2->join('tbl_mahasiswa tm', 'tm.nim = tk.nim');
            $table2->join('tbl_kurikulum_detail tkd2', 'tkd2.kode_mk = tkd.kode_mk and tkd2.id_kurikulum = tm.id_kurikulum');
            $table2->where('tk.nim', $str);
            $table2->where('tkd2.sts_mk != 9');
            $table2->where('tk.thn_ajaran', $tahun_ajaran);
            $table2->where('tk.id_semester', $id_semester);

            $get2 = $table2->get();
            $data2 = $get2->getRowArray();
            $get2->freeResult();

            if ((int) $data2['jumlah'] > 0) {
               $error = 'Anda tidak dapat mendaftar KPM. Karena memiliki matakuliah reguler!!!';
               return false;
            } else {
               return true;
            }
         } else {
            $error = 'Anda belum mengambil matakuliah KPM pada semester aktif sekarang. Silahkan cek pada menu Daftar Matakuliah KPM apakah kode matakuliah anda terdaftar?';
            return false;
         }
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function checkDuplicateJadwalPendaftaran($str, string $fields, array $data, &$error = null) : bool {
      try {
         $db = \Config\Database::connect();

         $field = explode(',', $fields);
         $tahun_ajaran = $data[$field[0]];
         $id_semester = $data[$field[1]];

         $table = $db->table('tb_jadwal_pendaftaran_kpm');
         $table->selectCount('*', 'jumlah');
         $table->where('tahun_ajaran', $tahun_ajaran);
         $table->where('id_semester', $id_semester);
         $table->where('id_jenis_kpm', $str);
         
         $get = $table->get();
         $data = $get->getRowArray();
         
         if ((int) $data['jumlah'] > 0) {
            $error = 'Jadwal pendaftaran untuk jenis KPM ini sudah ada. Jadi tidak perlu menambahkan baru!';
            return false;
         }

         return true;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function checkDuplicatePeriode($str, string $fields, array $data, &$error = null) : bool {
      try {
         $db = \Config\Database::connect();

         $tahun_ajaran = $data[$fields];

         $table = $db->table('tb_periode_kpm');
         $table->selectCount('*', 'jumlah');
         $table->where('tahun_ajaran', $tahun_ajaran);
         $table->where('id_semester', $str);
         
         $get = $table->get();
         $data = $get->getRowArray();
         
         if ((int) $data['jumlah'] > 0) {
            $error = 'Tahun ajaran dan semester yang tentukan sudah terdaftar sebelumnya.';
            return false;
         }

         return true;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}
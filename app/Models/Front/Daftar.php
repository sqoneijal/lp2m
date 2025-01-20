<?php

namespace App\Models\Front;

use CodeIgniter\Model;

class Daftar extends Model
{

   protected $db;

   public function __construct()
   {
      $this->db = \Config\Database::connect();
   }

   public function submit($post = [])
   {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            if ($val) {
               $data[$key] = trim($val);
            } else {
               $data[$key] = is_numeric($val) ? $val : null;
            }
         }

         $keterampilan_khusus = [];
         $foto = $data['foto'];
         $ipk = (float) $post['ipk'];

         if ($data['keterampilan_khusus']) {
            $keterampilan_khusus = json_decode($data['keterampilan_khusus'], true);
         }
         unset($data['pageType'], $data['id'], $data['keterampilan_khusus'], $data['old_foto'], $data['foto']);

         if (count($keterampilan_khusus) > 0) {
            $keterampilan = [];
            foreach ($keterampilan_khusus as $row) {
               $keterampilan[] = $row['value'];
            }
            $data['keterampilan_khusus'] = implode(',', $keterampilan);
         }

         $checkRegister = $this->checkRegister($post);

         if ($foto) {
            $data['foto'] = $foto;
         }
         $data['modified'] = date('Y-m-d H:i:s');

         $table = $this->db->table('tb_peserta_kpm');
         if ((int) $checkRegister['jumlah'] < 1) {
            $data['uploaded'] = date('Y-m-d H:i:s');

            $table->insert($data);
         } else {
            $table->where('nim', $data['nim']);
            $table->where('tahun_ajaran', $data['tahun_ajaran']);
            $table->where('id_semester', $data['id_semester']);
            $table->update($data);

            return $ipk;
         }
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function checkRegister($post = [])
   {
      try {
         $table = $this->db->table('tb_peserta_kpm');
         $table->selectCount('*', 'jumlah');
         $table->where('nim', $post['nim']);
         $table->where('tahun_ajaran', $post['tahun_ajaran']);
         $table->where('id_semester', $post['id_semester']);

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

   public function cariMahasiswa($post = [])
   {
      $curl = service('curlrequest', [
         'baseURI' => env('SEVIMA_PATH_URL'),
         'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'X-App-Key' => env('SEVIMA_APP_KEY'),
            'X-Secret-Key' => env('SEVIMA_APP_SECRET')
         ]
      ]);



      return [];
      try {
         $table = $this->db->table('tbl_mahasiswa tm');
         $table->select('tm.nim, tm.nama, tm.tpt_lahir, tm.tgl_lahir, tm.jk,
         round((tk2.total_bobot + coalesce(tkk.total_bobot_konversi, 0)) / (tk2.total_sks + coalesce(tkk.total_sks_konversi, 0)), 2) as ipk,
         (tk2.total_sks + coalesce(tkk.total_sks_konversi, 0)) as total_sks, tpk.foto, tpk.nomor_peserta, tpk.id_jenis_kpm,
         tpk.status_perkawinan, tpk.telp, tpk.email, tpk.ukuran_baju, tpk.penyakit, tpk.alamat, tpk.organisasi, tpk.keterampilan_khusus');
         $table->join('tbl_krs tk', 'tk.nim = tm.nim');
         $table->join('(select
            tk3.nim,
            sum(tmm.sks_matakuliah * tmrn.bobot) as total_bobot,
            sum(tmm.sks_matakuliah) as total_sks
         from tbl_krs tk3
         join tbl_krs_detail tkd on tkd.id_krs = tk3.id_krs
         join tbl_mst_matakuliah tmm on tmm.kode_mk = tkd.kode_mk
         left join tb_mst_rentang_nilai tmrn on tmrn.huruf = tkd.nilai_huruf
         where tkd.sts_dipakai = 1 and tkd.nilai_huruf not in (\'-\', \'T\') and tk3.nim = \'' . trim($post['nim']) . '\'
         group by tk3.nim) tk2', 'tk2.nim = tm.nim', 'left');
         $table->join('tb_peserta_kpm tpk', 'tpk.nim = tm.nim and tpk.tahun_ajaran = tk.thn_ajaran and tpk.id_semester = tk.id_semester', 'left');
         $table->join('(select
            tkk2.nim,
            sum(tkd2.jml_sks) as total_sks_konversi,
            sum(tkd2.jml_sks * tmrn2.bobot) as total_bobot_konversi
         from tbl_krs_konversi tkk2
         join tbl_kurikulum_detail tkd2 on tkd2.kode_mk = tkk2.kode_mk
         join tb_mst_rentang_nilai tmrn2 on tmrn2.huruf = tkk2.nilai_huruf
         where tkk2.nim = \'' . trim($post['nim']) . '\'
         group by tkk2.nim) tkk', 'tkk.nim = tm.nim', 'left');
         // $table->where('tm.status_perkuliahan', '1');
         // $table->where('tk.thn_ajaran', $post['tahun_ajaran']);
         // $table->where('tk.id_semester', $post['id_semester']);
         $table->where('tm.nim', trim($post['nim']));

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

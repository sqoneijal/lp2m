<?php

namespace App\Validation\Admin\KonfigurasiSistem;

class JadwalPendaftaran {

   public function hapus() {
      return [
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_jadwal_pendaftaran_kpm.id,id]',
            'label' => 'ID jadwal pendaftaran'
         ],
      ];
   }

   public function submit($post = []) {
      return [
         'id' => [
            'rules' => ($post['pageType'] === 'insert' ? 'permit_empty' : 'required|numeric|is_not_unique[tb_jadwal_pendaftaran_kpm.id,id]'),
            'label' => 'ID jadwal pendaftaran'
         ],
         'tahun_ajaran' => [
            'rules' => 'required|numeric|exact_length[4]',
            'label' => 'Tahun ajaran'
         ],
         'id_semester' => [
            'rules' => ($post['pageType'] === 'insert' ? 'required|numeric|in_list[1,2,3]' : 'required|numeric'),
            'label' => 'ID semester'
         ],
         'tanggal_mulai' => [
            'rules' => 'required|valid_date[Y-m-d]',
            'label' => 'Tanggal mulai pendaftaran'
         ],
         'tanggal_selesai' => [
            'rules' => 'required|valid_date[Y-m-d]',
            'label' => 'Tanggal akhir pendaftaran'
         ],
         'id_jenis_kpm' => [
            'rules' => ($post['pageType'] === 'insert' ? 'required|numeric|checkDuplicateJadwalPendaftaran[tahun_ajaran,id_semester]' : 'required|numeric'),
            'label' => 'Jenis KPM'
         ],
      ];
   }
   
}
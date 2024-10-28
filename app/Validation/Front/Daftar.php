<?php

namespace App\Validation\Front;

class Daftar
{

   public function submit()
   {
      return [
         'id_jenis_kpm' => [
            'rules' => 'required|numeric',
            'label' => 'Jenis KPM'
         ],
         // 'id_jenis_kpm' => [
         //    'rules' => 'required|numeric|checkJumlahSKSLulus[total_sks]',
         //    'label' => 'Jenis KPM'
         // ],
         // 'nim' => [
         //    'rules' => 'required|numeric|is_not_unique[tbl_mahasiswa.nim,nim]|apakahAdaAmbilMatkulKPM[tahun_ajaran,id_semester]',
         //    'label' => 'NIM',
         //    'errors' => [
         //       'is_not_unique' => 'NIM yang anda masukkan tidak ditemukan di SIAKAD'
         //    ],
         // ],
         'nim' => [
            'rules' => 'required|numeric',
            'label' => 'NIM',
            'errors' => [
               'is_not_unique' => 'NIM yang anda masukkan tidak ditemukan di SIAKAD'
            ],
         ],
         'status_perkawinan' => [
            'rules' => 'required|numeric',
            'label' => 'Status perkawinan'
         ],
         'telp' => [
            'rules' => 'required',
            'label' => 'Telepon / HP'
         ],
         'email' => [
            'rules' => 'required|valid_email',
            'label' => 'Email aktif'
         ],
         'total_sks' => [
            'rules' => 'required|numeric',
            'label' => 'Total SKS'
         ],
      ];
   }
}

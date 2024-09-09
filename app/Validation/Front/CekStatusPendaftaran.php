<?php

namespace App\Validation\Front;

class CekStatusPendaftaran {

   public function submit() {
      return [
         'nim' => [
            'rules' => 'required|numeric|is_not_unique[tb_peserta_kpm.nim,nim]',
            'label' => 'NIM',
            'errors' => [
               'is_not_unique' => 'Anda sama sekali belum melakukan pendaftaran KPM. Silahkan klik menu Daftar KPM untuk melakukan pendaftaran.'
            ],
         ],
      ];
   }
   
}
<?php

namespace App\Validation\Admin;

class PesertaKPM {

   public function hapus() {
      return [
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_peserta_kpm.id,id]',
            'label' => 'ID peserta KPM'
         ],
      ];
   }
   
}
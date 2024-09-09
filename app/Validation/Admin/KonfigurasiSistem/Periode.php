<?php

namespace App\Validation\Admin\KonfigurasiSistem;

class Periode {

   public function hapus() {
      return [
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_periode_kpm.id,id]',
            'label' => 'ID periode'
         ],
      ];
   }

   public function submit() {
      return [
         'tahun_ajaran' => [
            'rules' => 'required|numeric|exact_length[4]',
            'label' => 'Tahun ajaran'
         ],
         'id_semester' => [
            'rules' => 'required|numeric|in_list[1,2,3]|checkDuplicatePeriode[tahun_ajaran]',
            'label' => 'Semester'
         ],
      ];
   }
   
}
<?php

namespace App\Validation\Admin;

class Informasi {

   public function hapus() {
      return [
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_informasi_kpm.id,id]',
            'label' => 'ID informasi'
         ],
      ];
   }

   public function submit($post = []) {
      return [
         'id' => [
            'rules' => ($post['pageType'] === 'insert' ? 'permit_empty' : 'required|numeric|is_not_unique[tb_informasi_kpm.id,id]'),
            'label' => 'ID informasi'
         ],
         'judul' => [
            'rules' => 'required',
            'label' => 'Judul informasi'
         ],
      ];
   }
   
}
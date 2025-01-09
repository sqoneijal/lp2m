<?php

namespace App\Validation\Admin\KonfigurasiSistem;

class JenisKPM
{

   public function hapus()
   {
      return [
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_mst_jenis_kpm.id,id]',
            'label' => 'ID jenis KPM'
         ],
      ];
   }

   public function submit($post = [])
   {
      return [
         'id' => [
            'rules' => ($post['pageType'] === 'insert' ? 'permit_empty' : 'required|numeric|is_not_unique[tb_mst_jenis_kpm.id,id]'),
            'label' => 'ID jenis KPM'
         ],
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama jenis KPM'
         ],
         'sks_lulus' => [
            'rules' => 'required|numeric|greater_than[0]',
            'label' => 'Minimal SKS lulus'
         ],
         'kode' => [
            'rules' => 'required',
            'label' => 'Kode'
         ],
      ];
   }
}

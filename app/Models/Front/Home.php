<?php

namespace App\Models\Front;

use App\Models\Common;

class Home extends Common
{

   public function getInformasiTerbaru()
   {
      try {
         $table = $this->db->table('tb_informasi_kpm');
         $table->select('id, judul, content');
         $table->orderBy('modified', 'desc');
         $table->limit(6);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();

         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               if ($field === 'content') {
                  $response[$key][$field] = word_limiter(strip_tags(html_entity_decode(trim($val[$field]))), 15);
               } else {
                  $response[$key][$field] = trim($val[$field]);
               }
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }
}

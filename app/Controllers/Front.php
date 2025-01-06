<?php

namespace App\Controllers;

class Front extends BaseController
{

   protected $env = 'production';
   public $data;

   public function template($content = [])
   {
      $internalCss[] = $this->internalCss($content);
      $internalJs[] = $this->internalJs($content);

      $data['title'] = $content['title'];
      $data['internalCss'] = css_tag($internalCss);
      $data['internalJs'] = script_tag($internalJs);
      $data['webpack_js'] = $this->generateWebpackJS();
      $data['segment'] = $this->setSegment();

      echo view('FrontTemplate', $data);
   }

   protected function generateWebpackJS()
   {
      if ($this->env === 'development') {
         $script_tag[] = 'http://localhost:8081/runtime.js';
         $script_tag[] = 'http://localhost:8081/content.js';
      } else {
         $path = ROOTPATH . 'public/bundle/front/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);
         fclose($manifest);

         $script_tag[] = base_url('bundle/front/' . str_replace('auto', '', $content['runtime.js']));
         $script_tag[] = base_url('bundle/front/' . str_replace('auto', '', $content['content.js']));
      }
      return script_tag($script_tag);
   }
}

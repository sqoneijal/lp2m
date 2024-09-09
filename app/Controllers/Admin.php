<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class Admin extends BaseController
{

   protected $env = 'development';

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
   {
      parent::initController($request, $response, $logger);

      $session = \Config\Services::session();
      $is_login = $session->get('is_login');
      $username = $session->get('username');
      $nama = $session->get('nama');

      if (!$is_login && !$username && !$nama) {
         die('Anda harus <a href="/login">login</a> terlebih dahulu.');
      }
   }

   public function template($content = [])
   {
      $internalCss[] = $this->internalCss($content);
      $internalJs[] = $this->internalJs($content);

      $data['title'] = $content['title'];
      $data['internalCss'] = css_tag($internalCss);
      $data['internalJs'] = script_tag($internalJs);
      $data['webpack_js'] = $this->generateWebpackJS();
      $data['segment'] = $this->setSegment();
      $data['user'] = json_encode($this->setUserLogin());
      $data['content'] = json_encode(@$content['content'] ?? []);

      echo view('AdminTemplate', $data);
   }

   protected function generateWebpackJS()
   {
      if ($this->env === 'development') {
         $script_tag[] = 'http://localhost:8081/runtime.js';
         $script_tag[] = 'http://localhost:8081/content.js';
      } else {
         $path = ROOTPATH . 'public/bundle/admin/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);
         fclose($manifest);

         $script_tag[] = base_url('bundle/admin/' . str_replace('auto', '', $content['runtime.js']));
         $script_tag[] = base_url('bundle/admin/' . str_replace('auto', '', $content['content.js']));
      }
      return script_tag($script_tag);
   }

   public function setUserLogin()
   {
      $session = \Config\Services::session();
      $body = $session->get();

      return $body;
   }
}

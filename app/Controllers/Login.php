<?php

namespace App\Controllers;

use App\Validation\Login as Validate;

class Login extends BaseController
{

   protected $env = 'production';

   public function index()
   {
      $data['title'] = 'Login';
      $data['webpack_js'] = $this->generateWebpackJS();

      return view('Login', $data);
   }

   protected function generateWebpackJS()
   {
      if ($this->env === 'development') {
         $script_tag[] = 'http://localhost:8081/runtime.js';
         $script_tag[] = 'http://localhost:8081/content.js';
      } else {
         $path = ROOTPATH . 'public/bundle/login/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);
         fclose($manifest);

         $script_tag[] = base_url('bundle/login/' . str_replace('auto', '', $content['runtime.js']));
         $script_tag[] = base_url('bundle/login/' . str_replace('auto', '', $content['content.js']));
      }
      return script_tag($script_tag);
   }

   public function submit()
   {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'Terjadi sesuatu kesalahan.'];

      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $session = \Config\Services::session();
         $session->set('is_login', true);
         $session->set('username', 'admin');
         $session->set('nama', 'Administrator');

         $response['status'] = true;
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function logout()
   {
      $session = \Config\Services::session();

      $session->destroy();
      return redirect()->to('/');
   }
}

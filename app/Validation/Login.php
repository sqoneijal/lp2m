<?php

namespace App\Validation;

class Login {

   public function submit() {
      return [
         'username' => [
            'rules' => 'required|in_list[admin]',
            'label' => 'Username',
            'errors' => [
               'in_list' => 'Username anda masukkan salah'
            ],
         ],
         'password' => [
            'rules' => 'required|in_list[admin12345lp2m]',
            'label' => 'Password',
            'errors' => [
               'in_list' => 'Password anda masukkan salah'
            ],
         ],
      ];
   }

}
<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

abstract class BaseController extends Controller
{

   protected $request;
   protected $helpers = ['style', 'autoload'];
   protected $post;
   protected $getVar;

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
   {
      parent::initController($request, $response, $logger);

      $this->post = $request->getPost();
      $this->getVar = $request->getVar();
   }

   public function internalCss($content = [])
   {
      $internalCss = [];
      if (@$content['internalCss']) {
         foreach ($content['internalCss'] as $path) {
            $internalCss[] = $path;
         }
      }
      return $internalCss;
   }

   public function internalJs($content = [])
   {
      $internalJs = [];
      if (@$content['internalJs']) {
         foreach ($content['internalJs'] as $path) {
            $internalJs[] = $path;
         }
      }
      return $internalJs;
   }

   public function setSegment()
   {
      $string = uri_string();

      $response = [];
      foreach (explode('/', $string) as $key => $val) {
         $response[$key + 1] = $val;
      }
      return json_encode($response);
   }
}

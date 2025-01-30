<?php

namespace App\Libraries;

class Sevima
{

   protected $curl;

   public function __construct()
   {
      $this->curl = service('curlrequest', [
         'baseURI' => 'https://api.sevimaplatform.com/siakadcloud/v1/',
         'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'X-App-Key' => '7D7F1A80CE5A5D1F9F0C4AE9A92B93B4',
            'X-Secret-Key' => '0A6FEE93C8CDD40B9C2684D970BD98212BAAF62257FAD2CDDCAA20A817DB9718'
         ]
      ]);
   }

   public function getTranskripMahasiswa(string $nim): array
   {
      $req = $this->curl->request('GET', 'mahasiswa/' . $nim . '/transkrip');
      $body = json_decode($req->getBody(), true);

      $data = [];
      foreach ($body['data'] as $row) {
         $data[] = $row['attributes'];
      }

      return $data;
   }

   public function getKRSMahasiswa(string $nim, string $filter = null): array
   {
      $req = $this->curl->request('GET', 'mahasiswa/' . $nim . '/krs?' . $filter);
      $body = json_decode($req->getBody(), true);

      $data = [];
      foreach ($body['data'] as $row) {
         $data[] = $row['attributes'];
      }

      return $data;
   }

   public function getBiodataMahasiswa(string $nim): array
   {
      $req = $this->curl->request('GET', 'mahasiswa/' . $nim);
      $body = json_decode($req->getBody(), true);

      return $body['attributes'];
   }
}

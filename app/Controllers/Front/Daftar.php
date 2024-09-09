<?php

namespace App\Controllers\Front;

use App\Models\Common;
use App\Controllers\Front as Controller;
use App\Validation\Front\Daftar as Validate;
use App\Models\Front\Daftar as Model;
use Google\Client as Google_Client;
use Google\Service\Drive as Google_Service_Drive;
use Google\Service\Drive\DriveFile as Google_Service_Drive_DriveFile;

class Daftar extends Controller
{

   public function index()
   {
      $this->data = [
         'title' => 'Daftar'
      ];

      $this->template($this->data);
   }

   public function cariMahasiswa()
   {
      $model = new Model();
      $content = $model->cariMahasiswa($this->post);
      return $this->response->setJSON($content);
   }

   public function getDropdownList()
   {
      $common = new Common();
      $content = [
         'periodeAktif' => $common->getActivePeriode(),
         'informasiSyaratKPM' => $common->getInformasiSyaratKPM(),
         'jenisKPM' => $common->getDaftarJenisKPM(),
         'jadwalPendaftaran' => $common->getJadwalPendaftaran(),
      ];
      return $this->response->setJSON($content);
   }

   public function submit()
   {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'Terjadi sesuatu kesalahan.'];

      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $foto = $this->request->getFile('foto');
         $krs_aktif = $this->request->getFile('krs_aktif');

         $foto_upload_status = false;
         $krs_aktif_upload_status = false;

         if ($foto) {
            $upload_foto = $this->uploadToGoogleDrive($foto, $this->post['nim']);
            if ($upload_foto['status']) {
               $this->post['foto'] = $upload_foto['content']['id'];

               $foto_upload_status = true;
            } else {
               $response['errors']['foto'] = $upload_foto['msg_response'];
            }
         }

         if ($krs_aktif) {
            $upload_krs_aktif = $this->uploadToGoogleDrive($krs_aktif, $this->post['nim']);
            if ($upload_krs_aktif['status']) {
               $this->post['krs_aktif'] = $upload_krs_aktif['content']['id'];

               $krs_aktif_upload_status = true;
            } else {
               $response['errors']['krs_aktif'] = $upload_krs_aktif['msg_response'];
            }
         }

         if ($foto_upload_status && $krs_aktif_upload_status) {
            $model = new Model();
            $content = $model->submit($this->post);

            $response['status'] = true;
            $response['msg_response'] = 'Pendaftaran KPM berhasil. Untuk informasi selanjutnya dapat melihat di website ini atau langsung ke gedung LP2M, Terima kasih';
            $response['content'] = $content;
         }
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   private function uploadToGoogleDrive($file, string $nim): array
   {
      try {
         $parentId = '1NFBBkDsvOALlTqBGAWdlZRUglAS39dNu';

         $client = new Google_Client();
         $client->setAuthConfig(WRITEPATH . 'pascasarjana-426104-2a4f42077b13.json');
         $client->addScope(Google_Service_Drive::DRIVE);

         $driveService = new Google_Service_Drive($client);

         $driveFile = new Google_Service_Drive_DriveFile();
         $folderId = $this->cariFolderGoogleDrive($driveService, $nim, $parentId);

         if ($folderId === null) {
            $folderId = $this->buatFolderGoogleDrive($driveService, $nim, $parentId);
         }

         $driveFile->setName($file->getClientName());
         $driveFile->setParents([$folderId]);

         $googleFile = $driveService->files->create($driveFile, array(
            'data' => file_get_contents($file->getTempName()),
            'mimeType' => $file->getClientMimeType(),
            'uploadType' => 'multipart'
         ));

         if ($googleFile['id']) {
            $response['status'] = true;
            $response['content'] = $googleFile;
         } else {
            $response['status'] = false;
            $response['msg_response'] = 'Gagal upload file, silahkan coba kembali.';
         }

         return $response;
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   private function buatFolderGoogleDrive($service, $folderName, $parentId = null)
   {
      $fileMetadata = new Google_Service_Drive_DriveFile(array(
         'name' => $folderName,
         'mimeType' => 'application/vnd.google-apps.folder'
      ));

      if ($parentId) {
         $fileMetadata->setParents(array($parentId));
      }

      $folder = $service->files->create($fileMetadata, array(
         'fields' => 'id'
      ));

      return $folder->id;
   }

   private function cariFolderGoogleDrive($service, $folderName, $parentId = null)
   {
      $query = "name = '$folderName' and mimeType = 'application/vnd.google-apps.folder' and trashed = false";

      if ($parentId) {
         $query .= " and '$parentId' in parents";
      }

      $response = $service->files->listFiles(array(
         'q' => $query,
         'spaces' => 'drive',
         'fields' => 'files(id, name)'
      ));

      if (count($response->files) > 0) {
         return $response->files[0]->id; // Mengambil ID dari folder pertama yang ditemukan
      } else {
         return null;
      }
   }
}

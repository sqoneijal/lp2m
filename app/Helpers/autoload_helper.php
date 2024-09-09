<?php

function periode($tahun_ajaran, $id_semester) {
	$semester = [
		'1' => 'Ganjil',
		'2' => 'Genap',
		'3' => 'Pendek/Antara'
	];
	return $tahun_ajaran . '/' . ((int) $tahun_ajaran + 1) . ' ' . $semester[$id_semester];
}

function upload_file($file, $upload_path, $allowed = []) {
   if (!file_exists($upload_path)) {
      $oldmask = umask(0);
      mkdir($upload_path, 0777);
      umask($oldmask);
   }

   $getRandomName = $file->getRandomName();

   $response = ['status' => false, 'content' => ''];

   $mime = new \Config\Mimes();
   $allowed_mimes = [];
   foreach ($allowed as $data) {
      foreach ($mime::$mimes[$data] as $key) {
         $allowed_mimes[] = $key;
      }
   }
   
   if (in_array($file->getClientMimeType(), $allowed_mimes)) {
      if (1 >= (double) $file->getSizeByUnit('mb')) {
         $file->move($upload_path, $getRandomName);
         $response = ['status' => true, 'content' => $getRandomName];
      } else {
         $response['status'] = false;
         $response['content'] = 'Ukuran file yang coba anda upload terlalu besar dari yang diizinkan, maksimal 1 MB';
      }
   } else {
      $response['status'] = false;
      $response['content'] = 'File yang coba anda upload tidak diizinkan, atau sudah rusak.';
   }

   return $response;
}

function tgl_indo($tanggal) {
	$bulan = array (
		1 => 'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember'
	);
	$pecahkan = explode('-', $tanggal);
	
	if ($tanggal)
		return $pecahkan[2] . ' ' . $bulan[(int) $pecahkan[1]] . ' ' . $pecahkan[0];
	else
		return '-';
}

function jekel($key) {
	$config = [
		'L' => 'Laki - Laki',
		'P' => 'Perempuan',
	];

	if (@$config[$key]) return $config[$key];
	else return '-';
}

function statusPerkawinan($key) {
   $config = [
      '1' => 'Sudah Menikah',
      '2' => 'Janda',
      '3' => 'Duda',
      '4' => 'Belum Menikah'
   ];
   if (@$config[$key]) return $config[$key];
	else return '-';
}
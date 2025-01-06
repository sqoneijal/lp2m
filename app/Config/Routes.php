<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (is_file(SYSTEMPATH . 'Config/Routes.php')) {
   require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers\Front');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
//$routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');
$routes->get('getinformasiterbaru', 'Home::getInformasiTerbaru');

$routes->get('informasi/(:num)', 'Informasi::index/$1');
$routes->get('informasi/(:num)/detail', 'Informasi::detail/$1');

$routes->group('cekstatuspendaftaran', function ($routes) {
   $routes->get('/', 'CekStatusPendaftaran::index');

   $routes->post('submit', 'CekStatusPendaftaran::submit');
});

$routes->group('cetakbiodata', function ($routes) {
   $routes->get('/', 'CetakBiodata::index');
   $routes->get('(:num)', 'CetakBiodata::cetak/$1');
   $routes->get('getdropdownlist', 'CetakBiodata::getDropdownList');

   $routes->post('caripesertakpm', 'CetakBiodata::cariPesertaKPM');
});

$routes->group('daftar', function ($routes) {
   $routes->get('/', 'Daftar::index');
   $routes->get('getdropdownlist', 'Daftar::getDropdownList');

   $routes->post('submit', 'Daftar::submit');
   $routes->post('carimahasiswa', 'Daftar::cariMahasiswa');
});

$routes->group('daftarmatkulkpm', function ($routes) {
   $routes->get('/', 'DaftarMatkulKPM::index');

   $routes->post('getdata', 'DaftarMatkulKPM::getData');
});

$routes->group('login', function ($routes) {
   $routes->get('/', '\App\Controllers\Login::index');
   $routes->get('logout', '\App\Controllers\Login::logout');

   $routes->post('submit', '\App\Controllers\Login::submit');
});

function adminIkutKPM($routes): void
{
   $routes->group('ikutkpm', function ($routes) {
      $routes->get('/', 'IkutKPM::index');
      $routes->get('getdropdownlist', 'IkutKPM::getDropdownList');

      $routes->post('getdata', 'IkutKPM::getData');
      $routes->post('getdetailbiodata', 'IkutKPM::getDetailBiodata');
      $routes->post('downloadexcel', 'IkutKPM::downloadExcel');
      $routes->post('hapus', 'IkutKPM::hapus');
   });
}

function adminNilai($routes): void
{
   $routes->group('nilai', function ($routes) {
      $routes->get('/', 'Nilai::index');
      $routes->get('initpage', 'Nilai::initPage');

      $routes->post('downloadexcel', 'Nilai::downloadExcel');
      $routes->post('submit', 'Nilai::submit');
   });
}

$routes->group('admin', ['namespace' => 'App\Controllers\Admin'], function ($routes) {
   adminIkutKPM($routes);
   adminNilai($routes);

   $routes->group('dashboard', function ($routes) {
      $routes->get('/', 'Dashboard::index');
      $routes->get('getstatistik', 'Dashboard::getStatistik');
   });

   $routes->group('syaratkpm', function ($routes) {
      $routes->get('/', 'SyaratKPM::index');
      $routes->get('getcontent', 'SyaratKPM::getContent');

      $routes->post('submit', 'SyaratKPM::submit');
   });

   $routes->group('informasi', function ($routes) {
      $routes->get('/', 'Informasi::index');

      $routes->post('submit', 'Informasi::submit');
      $routes->post('getdata', 'Informasi::getData');
      $routes->post('hapus', 'Informasi::hapus');
   });

   $routes->group('pesertakpm', function ($routes) {
      $routes->get('/', 'PesertaKPM::index');
      $routes->get('getdropdownlist', 'PesertaKPM::getDropdownList');

      $routes->post('getdata', 'PesertaKPM::getData');
      $routes->post('hapus', 'PesertaKPM::hapus');
      $routes->post('getdetailbiodata', 'PesertaKPM::getDetailBiodata');
      $routes->post('downloadexcel', 'PesertaKPM::downloadExcel');
      $routes->post('bolehikutkpm', 'PesertaKPM::bolehIkutKPM');
   });

   $routes->group('konfigurasisistem', ['namespace' => 'App\Controllers\Admin\KonfigurasiSistem'], function ($routes) {
      $routes->group('periode', function ($routes) {
         $routes->get('/', 'Periode::index');
         $routes->get('handletutupperiodeaktif', 'Periode::handleTutupPeriodeAktif');

         $routes->post('submit', 'Periode::submit');
         $routes->post('getdata', 'Periode::getData');
         $routes->post('hapus', 'Periode::hapus');
      });

      $routes->group('jadwalpendaftaran', function ($routes) {
         $routes->get('/', 'JadwalPendaftaran::index');
         $routes->get('getdropdownlist', 'JadwalPendaftaran::getDropdownList');

         $routes->post('submit', 'JadwalPendaftaran::submit');
         $routes->post('getdata', 'JadwalPendaftaran::getData');
         $routes->post('hapus', 'JadwalPendaftaran::hapus');
      });

      $routes->group('jeniskpm', function ($routes) {
         $routes->get('/', 'JenisKPM::index');

         $routes->post('submit', 'JenisKPM::submit');
         $routes->post('getdata', 'JenisKPM::getData');
         $routes->post('hapus', 'JenisKPM::hapus');
      });

      $routes->group('matakuliah', function ($routes) {
         $routes->get('/', 'Matakuliah::index');

         $routes->post('submit', 'Matakuliah::submit');
         $routes->post('carimatakuliah', 'Matakuliah::cariMatakuliah');
         $routes->post('getdata', 'Matakuliah::getData');
         $routes->post('hapus', 'Matakuliah::hapus');
      });
   });
});

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
   require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}

<!DOCTYPE html>
<html>
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title><?php echo $title;?></title>
   <?php
   echo css_tag('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700');
   echo @$internalCss;
   echo css_tag([
      'assets/plugins/global/plugins.bundle.css',
      'assets/css/style.bundle.css'
   ]);
   ?>
</head>
<body id="kt_body" class="header-fixed header-tablet-and-mobile-fixed aside-enabled">
   <noscript>
      <h1>Perangkat browser anda tidak support (mendukung) untuk menjalankan program ini. Silahkan melakukan upgrade/memperbaharui perangkat browser anda.</h1>
      <br/>
      <a href="https://support.google.com/admanager/answer/12654?hl=id">https://support.google.com/admanager/answer/12654?hl=id</a>
   </noscript>
   <div id="root" class="d-flex flex-column flex-root"></div>
   <?php
   echo '<script>var segment = '.$segment.', user = '.$user.', content = '.$content.';</script>';
   echo script_tag('assets/plugins/global/plugins.bundle.js');
   echo @$internalJs;
   echo $webpack_js;
   ?>
</body>
</html>
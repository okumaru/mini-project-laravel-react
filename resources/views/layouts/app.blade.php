<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

  <style>
    body, body > #app, body > #app > #wrapper {
      height: 100vh !important;
    }

  </style>

  <script>
    const csrf_token = '<?php echo csrf_token(); ?>';
  </script>

  <!-- Scripts -->
  @viteReactRefresh
  @vite(['resources/sass/app.scss', 'resources/js/app.js'])
  @vite(['resources/css/sb-admin-2.min.css'])
  @vite(['resources/css/all.min.css'])
</head>

<body id="page-top">
  <div id="app">

    <div id="wrapper">

      @if (Auth::user())
        <!-- Sidebar -->
        <div id="sidebar"></div>
        <!-- End of Sidebar -->
      @endif

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">

        <!-- Main Content -->
        <div id="content">

          @if (Auth::user())
            <!-- Topbar -->
            <div id="profile"></div>
            <!-- End of Topbar -->
          @endif

          <!-- Begin Page Content -->
          <div class="container-fluid {{ !Auth::user() ? 'vh-100 d-md-flex align-items-center' : '' }}">

            @yield('content')

          </div>
          <!-- /.container-fluid -->

        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2020</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->

      </div>
      <!-- End of Content Wrapper -->

    </div>
  </div>
</body>

</html>
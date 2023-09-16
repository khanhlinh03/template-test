var myApp = angular.module("myModule", ["ngRoute"]);
//chuyển trang
myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix(""); //đường dẫn đẹp
  $routeProvider
    .when("/trang-chu", {
      templateUrl: "./pages/trangchu.html",
      controller: homeController,
    })
    .when("/san-pham", {
      templateUrl: "pages/sanpham.html",
      controller: homeController,
    })
    .when("/gioi-thieu", {
      templateUrl: "pages/gioithieu.html",
    })
    .when("/tin-tuc", {
      templateUrl: "pages/tintuc.html",
      controller: homeController,
    })
    .when("/lien-he", {
      templateUrl: "pages/lienhe.html",
    })
    .when("/dang-nhap", {
      templateUrl: "pages/dangnhap.html",
      controller: quanLyController,
    })
    .when("/dang-ky", {
      templateUrl: "pages/dangky.html",
      controller: quanLyController,
    })
    .when("/doi-mk", {
      templateUrl: "pages/doimk.html",
      controller: quanLyController,
    })
    .when("/details/:id", {
      templateUrl: "pages/detailsp.html",
      controller: homeController,
    })
    .when("/gio-hang", {
      templateUrl: "pages/giohang.html",
      controller: homeController,
    })
    .when("/gio-hang/delete/:id", {
      templateUrl: "pages/giohang.html",
      controller: deleteGioHang,
    })
    .when("/sp-damua", {
      templateUrl: "pages/spdamua.html",
      controller: homeController,
    })
    .when("/qlsp", {
      templateUrl: "admin/qlSanPham.html",
      controller: homeController,
    })
    .when("/qllsp", {
      templateUrl: "admin/loaiSanPham.html",
      controller: homeController,
    })
    .otherwise({
      redirectTo: "/trang-chu",
    });
});

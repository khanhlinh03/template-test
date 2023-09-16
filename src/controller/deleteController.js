window.deleteGioHang = function ($scope, $http, $routeParams, $location) {
  let abc = $routeParams.id;
  $http.delete(`${gioHangAPI}/${abc}`).then(function (response) {
    $scope.danhSachGioHang = response.data;
    $location.path("gio-hang");
    alert("Xóa thành công");
  });
};

window.homeController = function ($scope, $http, $rootScope, $routeParams) {
  // $scope.danhSachSPTrangChu = [];

  // $http.get(trangChuAPI).then(
  //   function (response) {
  //     if (response.status === 200) {
  //       $scope.danhSachSPTrangChu = response.data;
  //     }
  //   },
  //   function (e) {
  //     console.log(e);
  //   }
  // );
  $scope.danhSachSPHot = [];

  $http.get(sanPhamHotAPI).then(
    function (response) {
      if (response.status === 200) {
        $scope.danhSachSPHot = response.data;
      }
    },
    function (e) {
      console.log(e);
    }
  );
  $scope.danhSachSP = [];
  $scope.selectedCategory = null;
  $scope.filteredProduct = [];

  $http.get(danhSachSPAPI).then(
    function (response) {
      if (response.status === 200) {
        $scope.danhSachSP = response.data;
        $scope.filteredProduct = $scope.danhSachSP;
      }
    },
    function (e) {
      console.log(e);
    }
  );
  // $scope.danhSachSPTrangChu3 = [];

  // $http.get(trangChuAPI3).then(
  //   function (response) {
  //     if (response.status === 200) {
  //       $scope.danhSachSPTrangChu3 = response.data;
  //     }
  //   },
  //   function (e) {
  //     console.log(e);
  //   }
  // );
  $scope.tinTuc = [];

  $http.get(tinTucAPI).then(
    function (response) {
      if (response.status === 200) {
        $scope.tinTuc = response.data;
      }
    },
    function (e) {
      console.log(e);
    }
  );
  $scope.gioiThieu = [];

  $http.get(gioiThieuAPI).then(
    function (response) {
      if (response.status === 200) {
        $scope.gioiThieu = response.data;
      }
    },
    function (e) {
      console.log(e);
    }
  );

  //details trang sp
  // $rootScope.detailsSP = [];

  $http.get(danhSachSPAPI).then(
    function (response) {
      if (response.status === 200) {
        $rootScope.danhSachSP = response.data;
        $scope.danhSachSP.forEach((sp) => {
          if (sp.id == $routeParams.id) {
            $scope.sp = angular.copy(sp);
          }
        });
      }
    },
    function (e) {
      console.log(e);
    }
  );

  //category
  $scope.formCategorySanPham = {
    ten: "",
  };
  $scope.danhSachCategory = [];

  $http.get(categoryAPI).then(
    function (response) {
      if (response.status === 200) {
        $scope.danhSachCategory = response.data;
      }
    },
    function (e) {
      console.log(e);
    }
  );
  //add category
  $scope.addCategorySP = function (event) {
    event.preventDefault();
    if (!$scope.formCategorySanPham.ten) {
      alert("Không để trống tên");
    } else if (!/^[a-zA-Z0-9\s()]+/.test($scope.formCategorySanPham.name)) {
      alert("Tên không được chứa ký tự đặc biệt");
    } else {
      $http.post(categoryAPI, $scope.formCategorySanPham).then(function (r) {
        $scope.danhSachCategory.push(r.data);
        alert("Thêm thành công");
      });
    }
  };
  //details
  $scope.viTriUpdate = -1;
  $scope.detailsCategorySP = function (event, index) {
    event.preventDefault();
    let sp = $scope.danhSachCategory[index];
    $scope.formCategorySanPham.ten = sp.ten;
    $scope.viTriUpdate = index;
  };

  //update
  $scope.updateCategorySP = function (event) {
    event.preventDefault();
    if ($scope.viTriUpdate == -1) {
      alert("Mời chọn sản phẩm để sửa");
    }
    let sp = $scope.danhSachCategory[$scope.viTriUpdate];
    let api = categoryAPI + "/" + sp.id;
    if (!$scope.formCategorySanPham.ten) {
      alert("Không để trống tên");
    } else if (!/^[a-zA-Z0-9\s()]+/.test($scope.formCategorySanPham.name)) {
      alert("Tên không được chứa ký tự đặc biệt");
    } else {
      $http.put(api, $scope.formCategorySanPham).then(function (r) {
        $scope.danhSachCategory[$scope.viTriUpdate] = r.data;
        alert("Update thành công");
      });
    }
  };

  //xoa
  $scope.removeCategorySP = function (event, index) {
    event.preventDefault();
    let sp = $scope.danhSachCategory[index];
    let api = categoryAPI + "/" + sp.id;
    $http.delete(api).then(function () {
      $scope.danhSachCategory.splice(index, 1);
      alert("Xóa thành công");
    });
  };

  //quản lý sanpham
  $scope.formSanPham = {
    ten: "",
    img: "",
    category: "",
    gia_goc: "",
    gia_giam: "",
  };

  $scope.viTriUpdate = -1;
  $scope.detailsProduct = function (event, index) {
    event.preventDefault();
    let sp = $scope.danhSachSP[index];
    $scope.formSanPham.ten = sp.ten;
    $scope.formSanPham.img = sp.img;
    $scope.formSanPham.category = sp.category;
    $scope.formSanPham.gia_giam = sp.gia_giam;
    $scope.formSanPham.gia_goc = sp.gia_goc;
    $scope.viTriUpdate = index;
  };

  //update
  $scope.updateSP = function (event) {
    event.preventDefault();
    if ($scope.viTriUpdate == -1) {
      alert("Mời chọn sản phẩm để sửa");
    }
    let sp = $scope.danhSachSP[$scope.viTriUpdate];
    let api = danhSachSPAPI + "/" + sp.id;

    if (!$scope.formSanPham.ten) {
      alert("Tên không được để trống ");
    } else if (!/^[a-zA-Z0-9\s()]+/.test($scope.formSanPham.name)) {
      alert("Tên không được chứa ký tự đặc biệt");
    } else if (!$scope.formSanPham.gia_giam || !$scope.formSanPham.gia_goc) {
      alert("Giá không được để trống");
    } else if (
      $scope.formSanPham.gia_giam <= 0 ||
      $scope.formSanPham.gia_goc <= 0
    ) {
      alert("Giá pải lớn hơn 0");
    } else if (
      isNaN($scope.formSanPham.gia_giam) ||
      isNaN($scope.formSanPham.gia_goc)
    ) {
      alert("Giá phải nhập là số");
    } else if (!$scope.formSanPham.category) {
      alert("Bạn chưa chọn category");
    } else {
      $scope.formSanPham.gia_giam = parseInt($scope.formSanPham.gia_giam, 10);
      $scope.formSanPham.gia_goc = parseInt($scope.formSanPham.gia_goc, 10);
      $http.put(api, $scope.formSanPham).then(function (r) {
        $scope.danhSachSP[$scope.viTriUpdate] = r.data;
        alert("Update thành công");
      });
    }
  };
  //add sản phẩm
  $scope.addSP = function (event) {
    event.preventDefault();
    if (!$scope.formSanPham.ten) {
      alert("Tên không được để trống ");
    } else if (!/^[a-zA-Z0-9\s()]+/.test($scope.formSanPham.name)) {
      alert("Tên không được chứa ký tự đặc biệt");
    } else if (!$scope.formSanPham.gia_giam || !$scope.formSanPham.gia_goc) {
      alert("Giá không được để trống");
    } else if (
      $scope.formSanPham.gia_giam <= 0 ||
      $scope.formSanPham.gia_goc <= 0
    ) {
      alert("Giá pải lớn hơn 0");
    } else if (
      isNaN($scope.formSanPham.gia_giam) ||
      isNaN($scope.formSanPham.gia_goc)
    ) {
      alert("Giá phải nhập là số");
    } else if (!$scope.formSanPham.category) {
      alert("Bạn chưa chọn category");
    } else {
      $scope.formSanPham.gia_giam = parseInt($scope.formSanPham.gia_giam, 10);
      $scope.formSanPham.gia_goc = parseInt($scope.formSanPham.gia_goc, 10);
      $http.post(danhSachSPAPI, $scope.formSanPham).then(function (r) {
        $scope.danhSachSP.push(r.data);
        alert("Thêm thành công");
      });
    }
  };

  //xóa
  $scope.deleteSP = function (event, index) {
    event.preventDefault();
    let sp = $scope.danhSachSP[index];
    let api = danhSachSPAPI + "/" + sp.id;
    $http.delete(api).then(function () {
      $scope.danhSachSP.splice(index, 1);
      alert("Xóa thành công");
    });
  };

  //lọc sp
  $scope.orderType = "ten";
  $scope.sapXepGia = function (type) {
    $scope.orderType = type;
  };

  //search sp

  $scope.searchTerm = "";
  $scope.search = function () {
    // Gửi yêu cầu GET tới tệp JSON
    $http.get(danhSachSPAPI).then(function (response) {
      // Khi yêu cầu thành công
      var dssp = response.data;
      // Lọc kết quả dựa trên search term
      $scope.filteredProduct = dssp.filter(function (item) {
        return (
          item.ten.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) !== -1
        );
      });
    });
  };

  //lọc category

  $scope.filterSanPhamByCategory = function (category) {
    if (category === null) {
      $scope.filteredProduct = $scope.danhSachSP;
    } else {
      $scope.filteredProduct = $scope.danhSachSP.filter(function (sp) {
        return sp.category === category.ten;
      });
    }
  };

  //giỏ hang

  $scope.danhSachGioHang = [];

  $http.get(gioHangAPI).then(
    function (response) {
      if (response.status === 200) {
        $scope.danhSachGioHang = response.data;
      }
    },
    function (e) {
      console.log(e);
    }
  );

  //add
  $scope.addToCart = function (sp) {
    // Hàm để tìm kiếm sản phẩm trong giỏ hàng
    var existingProduct = $scope.danhSachGioHang.find(function (gh) {
      return gh.id === sp.id;
    });

    if (existingProduct) {
      //giỏ hàng có sản phẩm r thì +1
      existingProduct.soLuong += 1;
      $http
        .put(gioHangAPI + "/" + existingProduct.id, existingProduct)
        .then(function () {
          alert("Thêm vào giỏ hàng thành công");
        });
    } else {
      // giỏ hàng chưa có thì add
      sp.soLuong = 1;
      $http.post(gioHangAPI, sp).then(function (response) {
        $scope.danhSachGioHang.push(response.data);
        alert("Thêm vào giỏ hàng thành công");
      });
    }
  };

  $scope.sum = function () {
    var total = 0;
    for (var i = 0; i < $scope.danhSachGioHang.length; i++) {
      total +=
        $scope.danhSachGioHang[i].gia_giam * $scope.danhSachGioHang[i].soLuong;
    }
    return total;
  };

  $scope.updateSL = function (gh) {
    $scope.total = $scope.sum();
  };

  $scope.formThanhToan = false;
  $scope.pay = {};

  $scope.checkout = function () {
    $scope.formThanhToan = true;
  };

  $scope.pays = [];
  $http.get(hoaDonAPI).then(
    function (response) {
      if (response.status === 200) {
        $scope.pays = response.data;
      }
    },
    function (e) {
      console.log(e);
    }
  );
  $scope.thanhtoan = function () {
    $http
      .post(hoaDonAPI, {
        pay: $scope.pay,
        danhSachGioHang: $scope.danhSachGioHang,
      })
      .then(function (response) {
        $scope.pays.push(response.data);
        alert("Thanh toán thành công");
        $scope.formThanhToan = false;
        $scope.pay = {};
        $scope.danhSachGioHang = [];
      });
  };

  $scope.countItemsInCart = function () {
    return $scope.danhSachGioHang.length;
  };
};

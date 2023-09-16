window.quanLyController = function ($scope, $http) {
  //account
  $scope.formAccount = {
    username: "",
    password: "",
    confirmPassword: "",
    username: "",
  };
  $scope.danhSachAccount = [];

  $http.get(accountAPI).then(
    function (response) {
      if (response.status === 200) {
        $scope.danhSachAccount = response.data;
      }
    },
    function (e) {
      console.log(e);
    }
  );

  //đăng ký
  $scope.addAccount = function (event) {
    event.preventDefault();
    if (!$scope.formAccount.username) {
      alert("Không để trống Username");
    }
    // $scope.danhSachAccount.forEach(function (danhSachAccount) {
    //   if (danhSachAccount.username == $scope.formAccount.username) {
    //     alert("Username đã tồn tại");
    //
    //   }
    // });
    else if (!$scope.formAccount.email) {
      alert("Không để trống Email");
    }
    // $scope.danhSachAccount.forEach(function (danhSachAccount) {
    //   if (danhSachAccount.email == $scope.formAccount.email) {
    //     alert("Email đã tồn tại");
    //
    //   }
    // });
    else if (!$scope.formAccount.password) {
      alert("Không để trống Password");
    } else if (!$scope.formAccount.confirmPassword) {
      alert("Không để trống confirm password");
    } else if (
      $scope.formAccount.password != $scope.formAccount.confirmPassword
    ) {
      alert("Password và confirmPassword không trùng nhau");
    } else {
      $http.post(accountAPI, $scope.formAccount).then(function (r) {
        $scope.danhSachAccount.push(r.data);
        alert("Đăng ký thành công");
        window.location.href = "#dang-nhap";
      });
    }
  };

  //Đăng nhập
  $scope.isLogin = false;
  if (sessionStorage.getItem("login")) {
    $scope.isLogin = true;
    $scope.info = angular.fromJson(sessionStorage.getItem("login"));
  }

  console.log($scope.danhSachAccount);
  $scope.login = function () {
    var user = check_login($scope.username, $scope.password);
    if (user) {
      sessionStorage.setItem("login", angular.toJson(user));
      alert("Đăng nhập thành công");
      window.location.href = "/src/index.html";
      $scope.isLogin = true;
    } else {
      $scope.isLogin = false;
      alert("Thông tin tài khoản không hợp lệ");
    }
    console.log(user);
  };

  function check_login(username, password) {
    for (var i = 0; i < $scope.danhSachAccount.length; i++) {
      if (
        ($scope.danhSachAccount[i].username =
          username && $scope.danhSachAccount[i].password == password)
      ) {
        return $scope.danhSachAccount[i];
      }
    }
    return false;
  }

  $scope.logout = function () {
    sessionStorage.removeItem("login");
    window.location.href = "/src/pages/dangnhap.html";
    $scope.isLogin = false;
  };

  // đổi mk
  $scope.formDMK = {
    matKhauHT: "",
    matKhauMoi: "",
    xacNhanMK: "",
  };

  $scope.viTriUpdate = -1;
  $scope.updateMK = function (event) {
    event.preventDefault();

    let sp = $scope.danhSachAccount[$scope.viTriUpdate];
    let api = accountAPI + "/" + sp.id;

    if (!$scope.formDMK.matKhauHT) {
      alert("Mật khẩu hiện tại không được để trống ");
    } else if (!$scope.formDMK.matKhauMoi) {
      alert("Mật khẩu mới không được để trống ");
    } else if (!$scope.formDMK.xacNhanMK) {
      alert("Xác nhận mk không được để trống ");
    } else {
      $http.put(api, $scope.formAccount).then(function (r) {
        $scope.danhSachAccount[$scope.viTriUpdate] = r.data;
        alert("Update thành công");
      });
    }
  };
};

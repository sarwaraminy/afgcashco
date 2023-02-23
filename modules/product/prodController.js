
'use strict';
angular.module('Product')
.controller('prdCtrl', ['$scope', '$http', 'ProdService', '$location',
    function ($scope, $http, ProdService, $location){ 
     //create an adding new brand function to save new brand
     $scope.addnewbrand = function () {
	        var x=angular.element(document.getElementById("bname"));
	        $scope.bname = x.val();
            ProdService.Addnewbrand($scope.bname,function(response) {
	            if(response.success){
		            $scope.msgType="1";
                    $scope.message = response.message;
	            }
	            else {
		            $scope.msgType="0";
                    $scope.message = response.message;
	            }
            });
        };
        
     // get the list of brands
     $http.get("./modules/product/views/component/getbrands.php")
          .then( function(response) {
          $scope.brands = response.data;
      });
     // get the list of categories
     $http.get("./modules/product/views/component/getcategories.php")
          .then( function(response) {
          $scope.categories = response.data;
      });
        
     //create an adding new Category function to save new categories
     $scope.addnewcategory = function () {
	        var x=angular.element(document.getElementById("ctgname"));
	        $scope.ctgname = x.val();
            ProdService.Addnewcategory($scope.ctgname,function(response) {
	            if(response.success){
		            $scope.msgType="1";
                    $scope.message = response.message;
	            }
	            else {
		            $scope.msgType="0";
                    $scope.message = response.message;
	            }
            });
        };
        
     //create an adding new product function to save new products
     $scope.addnewproduct = function () {
	      //init the variables
	       var pName, ctgID, bID, mYear, lprice;
	        pName=angular.element(document.getElementById("productname"));
	        ctgID=angular.element(document.getElementById("productname"));
	        bID=angular.element(document.getElementById("productname"));
	        mYear=angular.element(document.getElementById("productname"));
	        lprice=angular.element(document.getElementById("productname"));
	        $scope.productname = pName.val();
	        $scope.productname = ctgID.val();
	        $scope.productname = bID.val();
	        $scope.productname = mYear.val();
	        $scope.productname = lprice.val();
            ProdService.Addnewproduct($scope.productname,function(response) {
	            if(response.success){
		            $scope.msgType="1";
                    $scope.message = response.message;
	            }
	            else {
		            $scope.msgType="0";
                    $scope.message = response.message;
	            }
            });
        };

    }
])

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

    }
])
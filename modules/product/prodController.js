
'use strict';
angular.module('Product')
.controller('prdCtrl', ['$scope', '$http', 'ProdService', '$location',
    function ($scope, $http, ProdService, $location){ 
     //create an adding new brand function to save new brand
     $scope.addnewbrand = function () {
	        var x=angular.element(document.getElementById("bname"));
	        $scope.bname = x.val();
            ProdService.Addnewbrand($scope.bname,function(response) {
                if(response.success) {
	                $scope.error = false;
	                $scope.message = response.message;
                    //load the new brand to the following
                    
                } else {
	                $scope.error = true;
                    $scope.message = response.message;
                }
            });
        };

    }
])
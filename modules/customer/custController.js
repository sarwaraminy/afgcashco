'use strict';
angular.module('Customer', [])
.controller('CustomerCtrl', ['$scope', '$http', 'CustService',
    function ($scope, $http, CustService) {
        //create an adding new customer function to save new customers
        $scope.addnewcustomer = function () {
	         //init the variables
	          var fname,lname,pNo,eml,addr,cty,sta,zcode;
	           fname=angular.element(document.getElementById("firstname"));
	           $scope.firstname = fname.val();
	           lname=angular.element(document.getElementById("lastname"));
	           $scope.lastname = lname.val();
	           pNo=angular.element(document.getElementById("pnumber"));
	           $scope.phone = pNo.val();
	           eml=angular.element(document.getElementById("email"));
	           $scope.email = eml.val();
	           addr=angular.element(document.getElementById("street"));
	           $scope.address = addr.val();
	           cty=angular.element(document.getElementById("city"));
	           $scope.city = cty.val();
	           sta=angular.element(document.getElementById("state"));
	           $scope.state = sta.val();
	           zcode=angular.element(document.getElementById("zipcode"));
	           $scope.zipcode = zcode.val();
               CustService.Addnewcustomer($scope.firstname,$scope.lastname,$scope.phone,$scope.email,$scope.address,$scope.city,$scope.state,$scope.zipcode,function(response) {
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
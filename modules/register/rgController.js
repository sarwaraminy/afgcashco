
'use strict';
angular.module('Register')
.controller('RegisterController', ['$scope', '$http', 'RegisterService', '$location',
    function ($scope, $http, RegisterService, $location){
     
        $scope.bopts =['Choose a retail category','Adult','Beauty & Cosmetics','Bike','Café & Food Truck','CBD & Vape','Electronics','Fashion & Clothing'
                       ,'Florist','Footwear','Furniture','Gift Store','Groceries & Food Retail','Hair & Beauty Salon','Health','Homeware','Jewellery'
                       ,'Liquor Stores & Bottle Shop','Pet','Restaurant','Second Hand Shop & Op Shop','Services','Sporting & Outdoor','Sports Team'
                       ,'Stadium & Events','Tools & Hardware','Tourism','Toys, Hobbies & Crafts','Other Retail','Other Non-retail'
                      ];
        $scope.btype = $scope.bopts[0];
        $scope.locs = ['Choose how many locations you have','1 location','2-9 locations','10+ locations'];
        $scope.location = $scope.locs[0];
        $scope.estimat = ['Choose an annual turnover range','Not opened yet','1k - 120k','120k - 360k','360k - 600k','600k - 1.2M'];
        $scope.est = $scope.estimat[0];

        $http.get("./modules/register/countries.php").then(function (response) {
            $scope.cntry = response.data.records;
            $scope.country = $scope.cntry[0].code;
          });
        
        $http.get("./modules/register/currencies.json").then(function (response) {
            $scope.crncy = response.data.records;
            $scope.curency = $scope.crncy[0].code;
          });
     
     
     //create a registration function to hundle our registration
     $scope.register = function () {
            $scope.dataLoading = true;
            RegisterService.Register($scope.email,$scope.password,$scope.fname,$scope.lname,$scope.btype,$scope.nlocation,$scope.estimate_income,$scope.country,$scope.curency,function(response) {
                if(response.success) {
	                $scope.error = response.message;
                    $location.path('/login');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

    }
])
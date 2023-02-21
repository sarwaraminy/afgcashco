'use strict';
 
angular.module('Product')
.factory('ProdService',
    ['$http', '$rootScope',
    function ($http, $rootScope) {
        var service = {};

        service.Addnewbrand = function (bname, callback) {
            /* Use this for real Adding brands
             ----------------------------------------------*/
             var validate = $http.post('addnewbrand.php', { brandname: bname});
             validate.then(function(response) {
	             var error=response.data.error;
	             var dbMsg = response.data.message;
	             if(error==true){
		             response.success=false;
		             response.message = 'Adding new brand is failed! '+ dbMsg;
	             }
	             else{
		             response.success=true;
		             response.message = 'a new brand is added successfully!';
	             }
		             callback(response);
             });
            

        };
 
        return service;
    }])
'use strict';
 
angular.module('Customer')
.factory('CustService',
    ['$http', '$rootScope',
    function ($http, $rootScope) {
        var service = {};
        
        // this function is used for adding new customer
        service.Addnewcustomer = function (firstname, lastname, phone, email, address, city, state, zipcode, callback) {
             var nprod = $http.post('./modules/customer/views/component/addnewcustomer.php', {first_name:firstname, last_name:lastname, phone:phone,  email:email, street:address, city:city, state:state, zip_code:zipcode });
             nprod.then(function(response) {
	             var error=response.data.error;
	             var dbMsg = response.data.message;
	             if(error==true){
		             response.success=false;
		             response.message = 'Adding new Product is failed! '+ dbMsg;
	             }
	             else{
		             response.success=true;
		             response.message = 'A new Product is added successfully! ' + email;
	             }
		             callback(response);
             });
        };
 
        return service;
    }])
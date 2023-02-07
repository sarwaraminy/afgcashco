'use strict';
 
angular.module('Register')
.factory('RegisterService',
    ['$http', '$rootScope',
    function ($http, $rootScope) {
        var service = {};

        service.Register = function (email, password, fname, lname, btype, nlocation, estimate_income, country, curency, callback) {
            /* Use this for real authentication
             ----------------------------------------------*/
             var validate = $http.post('register.php', { user_id: email, user_pass: password, first_name: fname, last_name: lname, btype: btype, num_location: nlocation, estimated_a_turnover: estimate_income, country: country, trading_currency: curency  });
             validate.then(function(response) {
	             var error=response.data.error;
	             var dbMsg = response.data.message;
	             if(error==true){
		             response.success=false;
		             response.message = 'Registration is failed! '+ dbMsg;
	             }
	             else{
		             response.success=true;
		             response.message = 'Registration is successfull will redirect to login page';
	             }
		             callback(response);
             });
            

        };
 
        return service;
    }])
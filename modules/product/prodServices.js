'use strict';
 
angular.module('Product')
.factory('ProdService',
    ['$http', '$rootScope',
    function ($http, $rootScope) {
        var service = {};
        // this function is used for adding new brand
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
		             response.message = 'A new brand is added successfully!';
	             }
		             callback(response);
             });
        };
        
        // this function is used for adding new Category
        service.Addnewcategory = function (ctgname, callback) {
             var nctg = $http.post('addnewcategory.php', { category_name: ctgname});
             nctg.then(function(response) {
	             var error=response.data.error;
	             var dbMsg = response.data.message;
	             if(error==true){
		             response.success=false;
		             response.message = 'Adding new Category is failed! '+ dbMsg;
	             }
	             else{
		             response.success=true;
		             response.message = 'A new Category is added successfully!';
	             }
		             callback(response);
             });
        };
        
        // this function is used for adding new product
        service.Addnewproduct = function (pname,ctgid,bid,mYear,lprice, callback) {
             var nprod = $http.post('./modules/product/views/component/addnewproduct.php', { product_name: pname, brand_id: bid, category_id: ctgid, model_year: mYear, list_price: lprice});
             nprod.then(function(response) {
	             var error=response.data.error;
	             var dbMsg = response.data.message;
	             if(error==true){
		             response.success=false;
		             response.message = 'Adding new Product is failed! '+ dbMsg;
	             }
	             else{
		             response.success=true;
		             response.message = 'A new Product is added successfully! ' + pname;
	             }
		             callback(response);
             });
        };
        
        // this function is used for adding new Stock
        service.Addnewstock = function (storeid,prodid,qty, callback) {
             var nprod = $http.post('./modules/product/views/component/addnewstock.php', { store_id: storeid, product_id: prodid, quantity: qty});
             nprod.then(function(response) {
	             var error=response.data.error;
	             var dbMsg = response.data.message;
	             if(error==true){
		             response.success=false;
		             response.message = 'Adding new Stock is failed! '+ dbMsg;
	             }
	             else{
		             response.success=true;
		             response.message = 'A new Stock is added successfully! ' + storeid;
	             }
		             callback(response);
             });
        };
 
        return service;
    }])
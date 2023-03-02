'use strict';
angular.module('Sell', ['ngAnimate', 'ui.bootstrap'])	
.controller('sellCtrl', ['$scope', '$sce', '$http','$cookies', '$uibModal', '$log', '$route', '$location',
    function ($scope, $sce, $http, $cookies, $uibModal, $log, $route, $location){
        $scope.rTrue = false; //don't show the Sale parked untill clcik on Retrieve Sale
        $scope.currency = '$';
        $scope.dcount = 0;
        $scope.showList = true; //show the product list in sell page which is right column
        $scope.showPayPg = false; // don't show the pay page
        $scope.showProductList = true; // show the product list in left column
        $scope.showPayList = false; // hide the paylist detail in left column
        $scope.showColect = false; //hide the collect right column detail
        $scope.date = new Date();// current date
        //==========================================================================
        $scope.competPay = function(){
          //add a function to Save the final pay
          $route.reload();// reload the sale page
        };
        //=========================================================================
        
        // get the list of Stores
        $http.get("./modules/product/views/component/getstores.php")
             .then( function(response) {
             $scope.stores = response.data;
        });
        
        // get the list of Staffs
        $http.get("./modules/sell/views/component/getstaffs.php")
             .then( function(response) {
             $scope.staffs = response.data;
        });
        
        // get the list of Customers
        $http.get("./modules/sell/views/component/getcustomers.php")
             .then( function(response) {
             $scope.customers = response.data;
        });
        
        // get the list of orders
        $http.get("./modules/sell/views/component/getorders.php")
             .then( function(response) {
             $scope.orders = response.data;
        });
        
        // get the list of products
        $http.get("./modules/product/views/component/getproducts.php")
             .then( function(response) {
             $scope.products = response.data;
        });
        
        //+++++++++++++ on order items page the select product change the list price and quantity
        $scope.bindLPQ = function(selItem){
	        // get the product and stock based on selected product
	        $http.post("./modules/product/views/component/getproducts.php", {tags:'get1P', product_id:selItem})
             .then( function(response) {
             $scope.olistprice = response.data;
            });
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        //=========================================================================
        //create an adding new store function to save new stores
        $scope.addnewstore = function () {
	         //init the variables
	          var sname,pNo,eml,addr,cty,sta,zcode;
	           sname=angular.element(document.getElementById("storename"));
	           $scope.storename = sname.val();
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
	           //insert records to table.
	           var nprod = $http.post('./modules/sell/views/component/addnewstore.php', {store_name:$scope.storename, phone:$scope.phone,  email:$scope.email, street:$scope.address, city:$scope.city, state:$scope.state, zip_code:$scope.zipcode });
                   nprod.then(function(response) {
	                   var error=response.data.error;
	                   var dbMsg = response.data.message;
	                   if(error==true){
		                   response.success=false;
		                   response.message = 'Adding new store is failed! '+ dbMsg;
	                   }
	                   else{
		                   response.success=true;
		                   response.message = 'A new store is added successfully! ' + $scope.email;
	                   }
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
        //=========================================================================
        
        //=========================================================================
        //create an adding new staff function to save new staff
        $scope.addnewstaff = function () {
	         //init the variables
	          var fname,lname,eml,pNo,act,stor,mgr;
	           fname=angular.element(document.getElementById("firstname"));
	           $scope.firstname = fname.val();
	           lname=angular.element(document.getElementById("lastname"));
	           $scope.lastname = lname.val();
	           eml=angular.element(document.getElementById("email"));
	           $scope.email = eml.val();	           
	           pNo=angular.element(document.getElementById("pnumber"));
	           $scope.phone = pNo.val();
	           act=angular.element(document.getElementById("active"));
	           $scope.active = act.val();
	           stor=angular.element(document.getElementById("storeid"));
	           $scope.storeid = stor.val();
	           mgr=angular.element(document.getElementById("managerid"));
	           $scope.managerid = mgr.val();
	           //insert records to table.
	           var nprod = $http.post('./modules/sell/views/component/addnewstaff.php', {first_name:$scope.firstname,last_name:$scope.lastname,  email:$scope.email, phone:$scope.phone, active:$scope.active, store_id:$scope.storeid, manager_id:$scope.managerid });
                   nprod.then(function(response) {
	                   var error=response.data.error;
	                   var dbMsg = response.data.message;
	                   if(error==true){
		                   response.success=false;
		                   response.message = 'Adding new staff is failed! '+ dbMsg;
	                   }
	                   else{
		                   response.success=true;
		                   response.message = 'A new staff is added successfully! ' + $scope.email;
	                   }
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
        //=========================================================================
        
        //=========================================================================
        //create an adding new order function to save new order
        $scope.addneworder = function () {
	         //init the variables
	          var cstid, ostat, odate, rdate, sdate, stor,mgr;
	           cstid=angular.element(document.getElementById("customerid"));
	           $scope.customerid = cstid.val();
	           ostat=angular.element(document.getElementById("orderstatus"));
	           $scope.ostatus = ostat.val();
	           odate=angular.element(document.getElementById("odate"));
	           $scope.odate = odate.val();	           
	           rdate=angular.element(document.getElementById("rdate"));
	           $scope.rdate = rdate.val();
	           sdate=angular.element(document.getElementById("sdate"));
	           $scope.sdate = sdate.val();
	           stor=angular.element(document.getElementById("storeid"));
	           $scope.storeid = stor.val();
	           mgr=angular.element(document.getElementById("staffid"));
	           $scope.staffid = mgr.val();
	           //insert records to table.
	           var nprod = $http.post('./modules/sell/views/component/addneworder.php', {customer_id:$scope.customerid,order_status:$scope.ostatus,  order_date:$scope.odate, required_date:$scope.rdate, shipped_date:$scope.sdate, store_id:$scope.storeid, staff_id:$scope.staffid });
                   nprod.then(function(response) {
	                   var error=response.data.error;
	                   var dbMsg = response.data.message;
	                   if(error==true){
		                   response.success=false;
		                   response.message = 'Adding new order is failed! '+ dbMsg;
	                   }
	                   else{
		                   response.success=true;
		                   response.message = 'A new order is added successfully! ' + $scope.email;
	                   }
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
        //=========================================================================
        

        //-------------------------------------------------------------------------
        // this function used for setting Quote
        $scope.setNote = function (note){
          $scope.q_note = note; //get the note that is entered by customer
          $scope.showNote = true; // show the row in bill page
          $scope.showList = false; // hide add to card list
          $scope.showProductList = false; // hide the product list in left column
          $scope.showPayList = true; // show the paylist detail in left column
          $scope.showColect = true; // show collect right column detail
          $scope.isCash = false; //show the cash changes
          $scope.isSQuot = true; // hide the Quoted Sale 
          $scope.modalInstance.dismiss(); //close the ui modal
        }
        //-------------------------------------------------------------------------

        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //this function is used to print the final bill
        $scope.printDiv = function(divName) {
          var printContents = document.getElementById(divName).innerHTML;
          var popupWin = window.open('', '_blank', 'width=500,height=300');
          popupWin.document.open();
          popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="./css/volt.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
          popupWin.document.close();
        } ;
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        //**********************pay button click********************************* */
        $scope.showPay = function (amount){
          $scope.showList = false; // hide add to card list
          $scope.showPayPg = true; //show the pay list with cash button
          $scope.payVal = amount;
          $scope.showProductList = false; // hide the product list in left column
          $scope.showPayList = true; // show the paylist detail in left column
        };
        //******************************************************* */
        //.....................from pay page...............................
        $scope.showPlist = function () {
          $scope.showList = true; // show the add to card page in right column
          $scope.showPayPg = false;// hide pay list page in right column
          $scope.showProductList = true; // show the product list in left column
          $scope.showPayList = false; // hide the paylist detail in left column
        };
        //.................................................................
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        $scope.collect = function(collected, payTo) {
          $scope.showPayPg = false;// hide pay list page in right column
          $scope.showColect = true; // show collect right column detail
          $scope.collect = collected;
          $scope.payVl = payTo; 
          $scope.showCash = true; //show the Cash row in left column
          $scope.isCash = true; //show the cash changes
          $scope.isSQuot = false; // hide the Quoted Sale 
          $scope.modalInstance.dismiss(); //close the ui modal
        };

        //++++++++++++++++++ retrive parked items Start ++++++++++++++++++++++++++++++++++++++++++++++++++
        $scope.popRSale = function () {
            $scope.rTrue = true;
            $http.get("./modules/sell/views/component/sell_parked.py")
            .then( function(response) {
            $scope.items = response.data;

            //removed parked item Start ----------------------------------------------------
            $scope.removeItemPrk = function(item) {
              var index = $scope.items.indexOf(item);
              $scope.items.splice(index, 1);
            };//removed parked item End ----------------------------------------------------

            //get total of price for parked Item Start ------------------------------------
            $scope.getTotalPrk = function(){
                var total = 0;
                for(var i = 0; i < $scope.items.length; i++){
                    var item = $scope.items[i];
                    total += (item.price * item.qty) - ((item.dcount/100) * (item.price * item.qty));
                }
                return total;
            };//get total of price for parked Item Start ------------------------------------

            //get currency
            $scope.getCurency = function () {
                var item = $scope.items[0];
                return item.currency;
            };
            //get the discount
            $scope.getDiscnt = function () {
                var item = $scope.items[0];
                return item.dcount;
            };
            //get the tax
            $scope.getTax = function () {
                var item = $scope.items[0];
                return item.tax;
            };
            //get total of price
            $scope.getTotItem = function(){
                var totQty = 0;
                for(var i = 0; i < $scope.items.length; i++){
                    var item = $scope.items[i];
                    totQty += (item.qty * 1);
                }
                return totQty;
            };
         });
       };//++++++++++++++++++ End of retrive parked items Start ++++++++++++++++++++++++++++++++++++++++++++++++++
      
       //add note show
       $scope.ShowHide = function () {
         $scope.isVisiable = $scope.isVisiable = true;
       }
       // hide add note
       $scope.hideItem = function () {
         $scope.isVisiable = $scope.isVisiable = false;
       }
       
        // for adding product to buy list
        //product lists
       $http.get("./modules/sell/views/component/prodlist.py")
         .then( function(response) {
         $scope.inventory = response.data;
       });//end of product list
          
          $scope.cart = [];
          
          var findItemById = function(items, id) {
            return _.find(items, function(item) {
              return item.id === id;
            });
          };
          
          $scope.getCost = function(item) {
            return (item.qty * item.price) - ((item.dcount/100) * (item.qty * item.price));
          };
        
          $scope.addItem = function(itemToAdd) {
            var found = findItemById($scope.cart, itemToAdd.id);
            if (found) {
              found.qty += itemToAdd.qty;
            }
            else {
              $scope.cart.push(angular.copy(itemToAdd));}
            // get total of qty
            //get total of quantity
            $scope.getTotAddItem = function(item){
              return  item.qty * 1;
            };
          };// end of addItem
          
          $scope.getTotal = function() {
            var total =  _.reduce($scope.cart, function(sum, item) {
              // return the total of price
              return sum + $scope.getCost(item);
            }, 0);
            console.log('total: ' + total);
            return total;
          };
          // sum number of qty
          $scope.getTotalQty = function() {
            var totalQty =  _.reduce($scope.cart, function(sum, item) {
              // return the total of qty
              return sum + $scope.getTotAddItem(item);
            }, 0);
            console.log('totalQty: ' + totalQty);
            return totalQty;
          };
          
          $scope.clearCart = function() {
            $scope.cart.length = 0;
          };
          
          $scope.removeItem = function(item) {
            var index = $scope.cart.indexOf(item);
            $scope.cart.splice(index, 1);
          };
       //end of adding product buy

       //sort Products +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
       $scope.sort = {
         column: '',
         descending: false
       };
       $scope.changeSort = function ( column ) {
         var sort = $scope.sort;
         if (sort.column == column ) {
           sort.descending = !sort.descending;
         }
         else {
           sort.column = column;
           sort.descending = false;
         }
       };// end of Product sorting function  +++++++++++++++++++++++++++++++++++++++

       //popover js -----------------------Start
       $scope.searchCustom = { //used when you searching a customer ---start
        isOpen: false,
        templateUrl: './modules/sell/views/component/sell_customerSearch.html',
        open: function open() {
          $scope.searchCustom.isOpen = true;
          $scope.searchCustom.data = 'Hello!';
        },
        size: 'sm-12'
       }; // end of the customer search popover
      
       //default value of discoumn sign
       $scope.dcntSign = '%';
       $scope.dcntPopover = {
        isOpen: false,
        templateUrl: './modules/sell/views/component/addDiscount.html',
        open: function open() {
          $scope.dcntPopover.isOpen = true;
          $scope.dcntPopover.data = 'Hello!';
        },
        //close on cancel
        close: function close() {
          $scope.dcntPopover.isOpen = false;
        },
        //Save the content of dicount on Add
        Save: function Save(sign, numb) {
          // Save the content:
          $scope.dcntSign = sign;
          $scope.dcount = numb;
          $scope.dcntPopover.isOpen = false;
        }
      };
      $scope.placement = {
        options: ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom'],
        selected: 'left'
      };//-------------End of popover------------------------

      //remove the total discount-------------start------------------------
      $scope.rDcnt = function () {
        $scope.dcount=0;
      }
      //remove the total discount--------------------------end-------------

      //=================================================================================
      // Add Customer ui modal
      $scope.openCustomerM = function (cust){
        $scope.searchCustom.isOpen = false;
        $scope.cust_name = cust;
        $scope.modalInstance = $uibModal.open ({
          templateUrl: './modules/sell/views/component/sell_addCustomerModal.html',
          scope: $scope,
          size: 'lg',
          cust_name: function () { return cust;}
        });
      };
      //=================================================================================
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      $scope.showQS = function (PSorQS) {
        if(PSorQS == 'PS'){
          $scope.isParkS = true;
          $scope.isSQuot = false;
        } else{
          $scope.isSQuot = true;
          $scope.isParkS = false; 
        }
        $scope.modalInstance = $uibModal.open ({
          templateUrl: './modules/sell/views/component/sell_QuotSaleModal.html',
          scope: $scope,
          size: 'sm-6'
        });
      };
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      
      //++++++++++++++++++++++show the order item list modol+++++++++++++++++++++++++++++
      $scope.showOrdItem = function () {
        $scope.modalInstance = $uibModal.open ({
          templateUrl: './modules/sell/views/order_items.html',
          scope: $scope,
          size: 'lg'
        });
      };
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      //-------------this function used for Pay Cash modal start-------------------------------
      $scope.showPayModl = function (payVal) {
        $scope.pay_totVal = payVal;
        $scope.modalInstance = $uibModal.open({
          templateUrl: './modules/sell/views/component/sell_payCash.html',
          scope: $scope,
          size: 'sm-6',
          pay_totVal: function () { return payVal;}
        });
      }; 
      //-----------End of the pay cash modal--------------------------------------------------

      //this function is used for inventory uibmodal-----------------------------------------
      $scope.showInvt = function(name, catg, desc, qty, price, sup_price, dcnt){
        $scope.inv_name = name;
        $scope.inv_catg = catg;
        $scope.inv_desc = desc;
        $scope.inv_qty = qty;
        $scope.inv_price = price;
        $scope.inv_sup_price = sup_price;
        $scope.inv_dcount = dcnt;
        $scope.modalInstance = $uibModal.open({
            templateUrl: './modules/sell/views/component/sell_invModal.html',
            scope:$scope,
            size: 'lg',
            inv_name: function(){return name;},
            inv_catg: function(){return catg;},
            inv_desc: function(){return desc;},
            inv_qty: function(){return qty;},
            inv_price: function(){return price;},
            inv_sup_price: function(){return sup_price;},
            inv_dcount: function(){return dcnt;},


        });
      };
      $scope.cancel = function(){
        $scope.modalInstance.dismiss();
      };
      $scope.ok = function (){
        $scope.modalInstance.dismiss();
      };
      //end of inventory functions--------------------------------------------------------------

    }
])

.directive('toggle', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      if (attrs.toggle=="popover"){
        $(element).popover();
      }
    }
  };
});

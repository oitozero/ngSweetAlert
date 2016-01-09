/**
@fileOverview

@toc

*/

'use strict';


angular.module('oitozero.ngSweetAlert', [])

// Provider to set default values to SweetAlert
.provider('SweetAlertConfig', [function(){
  
  var defaultSwal = {};
  
  return {
    setDefaults: function(defaults){
      defaultSwal = defaults;
    },
    $get: function(){
      return{
        defaultSwal: defaultSwal
      };
    }
  };
  
}])

.factory('SweetAlert', [ '$rootScope', 'SweetAlertConfig', function ( $rootScope, SweetAlertConfig ) {

	var swal = window.swal;
	
	// Set default values from provider on swal
	swal.setDefaults(SweetAlertConfig.defaultSwal);

	//public methods
	var self = {

		swal: function ( arg1, arg2, arg3 ) {
			$rootScope.$evalAsync(function(){
				if( typeof(arg2) === 'function' ) {
					swal( arg1, function(isConfirm){
						$rootScope.$evalAsync( function(){
							arg2(isConfirm);
						});
					}, arg3 );
				} else {
					swal( arg1, arg2, arg3 );
				}
			});
		},
		success: function(title, message) {
			$rootScope.$evalAsync(function(){
				swal( title, message, 'success' );
			});
		},
		error: function(title, message) {
			$rootScope.$evalAsync(function(){
				swal( title, message, 'error' );
			});
		},
		warning: function(title, message) {
			$rootScope.$evalAsync(function(){
				swal( title, message, 'warning' );
			});
		},
		info: function(title, message) {	
			$rootScope.$evalAsync(function(){
				swal( title, message, 'info' );
			});
		}
	};
	
	return self;
}]);

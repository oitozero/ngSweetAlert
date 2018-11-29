/**
 @fileOverview

 @toc

 */

(function (root, factory) {
    "use strict";

    /*global define*/
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'sweetalert'], factory);  // AMD
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('angular'), require('sweetalert')); // Node
    } else {
        factory(root.angular, root.swal);					// Browser
    }

}(this, function (angular, swal) {
    "use strict";

    angular.module('oitozero.ngSweetAlert', [])
        .factory('SweetAlert', ['$rootScope', 'SweetAlertConfig', function ($rootScope, SweetAlertConfig) {
            //public methods
            var self = {

                swal: function (arg1, arg2, arg3) {

                    //merge with default config
                    var arg1 = angular.extend(SweetAlertConfig, arg1);

                    $rootScope.$evalAsync(function () {
                        if (typeof(arg2) === 'function') {
                            swal(arg1, function (isConfirm) {
                                $rootScope.$evalAsync(function () {
                                    arg2(isConfirm);
                                });
                            }, arg3);
                        } else {
                            swal(arg1, arg2, arg3);
                        }
                    });
                },
                success: function (title, message) {
                    $rootScope.$evalAsync(function () {
                        swal(title, message, 'success');
                    });
                },
                error: function (title, message) {
                    $rootScope.$evalAsync(function () {
                        swal(title, message, 'error');
                    });
                },
                warning: function (title, message) {
                    $rootScope.$evalAsync(function () {
                        swal(title, message, 'warning');
                    });
                },
                info: function (title, message) {
                    $rootScope.$evalAsync(function () {
                        swal(title, message, 'info');
                    });
                },
                showInputError: function (message) {
                    $rootScope.$evalAsync(function () {
                        swal.showInputError(message);
                    });
                },
                close: function () {
                    $rootScope.$evalAsync(function () {
                        swal.close();
                    });
                }
            };

            return self;
        }]).constant('SweetAlertConfig', {
        title: '',
        text: '',
        type: null,
        allowOutsideClick: false,
        showConfirmButton: true,
        showCancelButton: false,
        closeOnConfirm: true,
        closeOnCancel: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#8CD4F5',
        cancelButtonText: 'Cancel',
        imageUrl: null,
        imageSize: null,
        timer: null,
        customClass: '',
        html: false,
        animation: true,
        allowEscapeKey: true,
        inputType: 'text',
        inputPlaceholder: '',
        inputValue: '',
        showLoaderOnConfirm: false
    });
}));

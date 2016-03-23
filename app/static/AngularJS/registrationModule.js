// -- =============================================
// -- Author:      Vladimir Juárez
// -- Create date: 18/03/2016
// -- Description: Is the container of the application
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var registrationModule = angular.module("registrationModule", ["ngRoute"])
.config(function ($routeProvider, $locationProvider) {

    /*cheange the routes*/
    $routeProvider.when('/', {
        templateUrl: 'AngularJS/Templates/example.html',//example 1
        controller: 'exampleController'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});

registrationModule.directive('resize', function ($window) {
	return function (scope, element) {
		var w = angular.element($window);
        var changeHeight = function() {element.css('height', (w.height() -20) + 'px' );};  
			w.bind('resize', function () {        
		      changeHeight();   // when window size gets changed          	 
		});  
        changeHeight(); // when page loads          
	}
});

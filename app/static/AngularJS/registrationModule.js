// -- =============================================
// -- Author:      Vladimir Juárez
// -- Create date: 18/03/2016
// -- Description: Is the container of the application
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var registrationModule = angular.module("registrationModule", ["ngRoute", "ui.bootstrap","angularUtils.directives.dirPagination"])
.config(function ($routeProvider, $locationProvider) {

    /*change the routes*/
    $routeProvider.when('/cita', {
        templateUrl: 'AngularJS/Templates/cita.html',
        controller: 'citaController'
    });

    $routeProvider.when('/', {
         templateUrl: 'AngularJS/Templates/example.html',
         controller: 'exampleController'
    });

    $routeProvider.when('/tallerCita', {
        templateUrl: 'AngularJS/Templates/tallerCita.html',
        controller: 'citaController'
    });

     $routeProvider.when('/cotizacionNueva', {
        templateUrl: 'AngularJS/Templates/cotizacionNueva.html',
        controller: 'cotizacionController'
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

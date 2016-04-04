// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 28/03/2016
// -- Description: Cotizacion Controller
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller('cotizacionController', function($scope, alertFactory, cotizacionRepository){
	$scope.init = function(){
	}
    
    $scope.Chat = function(){
	}
    
    $scope.Aprobacion = function(){
	}
    
    $scope.Detalle = function(){
         $('#cotizacionDetalle').modal('show');
	}
    
    $scope.Maestro = function(){
        cotizacionRepository.get().then(function(result){
            $scope.cotizaciones = result.data;
        }, function (error){
        });
	}

    $scope.BusquedaPieza = function(){
        cotizacionRepository.busquedaPieza.then(function(result){
            $scope.pieza = result.data;
        }, function(error){

        });
    }
});
// -- =============================================
// -- Author:      Mario Mejía
// -- Create date: 23/03/2016
// -- Description: trabajo controller
// -- Modificó: Vladimir Juárez Juárez
// -- Fecha: 10/04/2016
// -- =============================================
registrationModule.controller('trabajoController', function($scope, localStorageService, alertFactory, trabajoRepository){
	//this is the first method executed in the view
    
    var idUnidad = localStorageService.get('unidad');
    
	$scope.init = function(){	
		getTrabajo(idUnidad);
	}

	var getTrabajo = function(idUnidad){
		trabajoRepository.getTrabajo(idUnidad).then(function(trabajo){
			$scope.trabajos = trabajo.data;
			if(trabajo.data.length > 0){
				alertFactory.success("Trabajos cargados");
			}
			else{
				alertFactory.info("No se encontraron trabajo");
			}
		}, function(error){
			alertFactory.error("Error al cargar trabajos");
		});
	}
});
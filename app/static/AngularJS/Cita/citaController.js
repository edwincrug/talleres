// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 23/03/2016
// -- Description: Citas controller
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller('citaController', function($scope, $rootScope, alertFactory,citaRepository){
	$scope.message = 'Buscando...';
	$scope.init = function(){
	}

	$scope.Busqueda = function(fecha){
		if(fecha == null || fecha == ''){
			alertFactory.info('Seleccione una fecha');
		} else {
			var dia = fecha.getDate();
			if(dia < 9){
				dia = ''+'0'+dia 
			}
			var mes = fecha.getMonth()+1;
			if(mes < 9){
				mes = ''+'0'+mes 
			}
			var anio = fecha.getFullYear();
			var date = anio +''+ mes +''+ dia;
			$scope.promise = citaRepository.getCitaTaller(date).then(function(cita){			
				if(cita.data.length > 0){
					$scope.listaCitas = cita.data;				
		    		alertFactory.success('Datos de citas cargados.');
				} else{		
					$scope.listaCitas = '';
		    		alertFactory.info('No hay citas en la fecha seleccionada.');
				}			
			},function(error){
		        alert("error");
		    });	
		}				
	}
});
// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 23/03/2016
// -- Description: Citas controller
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller('citaController', function($scope, $rootScope, alertFactory,citaRepository){
	$scope.init = function(){
		/*citaRepository.getCitaTaller('20160328').then(function(cita){			
			if(cita.data.length > 0){
				$scope.listaCitas = cita.data;				
	    		alertFactory.success('Datos de citas cargados.');
			} else{		
	    		alertFactory.info('No hay citas en la fecha seleccionada.');
			}			
		},function(error){
	        alert("error");
	    });*/
	}

	$scope.Busqueda = function(fecha){
		if(fecha == null || fecha == ''){
			alertFactory.info('Seleccione una fecha');
		} else {
			var dia = fecha.getDate();
			var mes = fecha.getMonth()+1;
			if(mes < 9){
				mes = ''+'0'+mes 
			}
			var anio = fecha.getFullYear();
			var date = anio +''+ mes +''+ dia;
			citaRepository.getCitaTaller(date).then(function(cita){			
				if(cita.data.length > 0){
					$scope.listaCitas = cita.data;				
		    		alertFactory.success('Datos de citas cargados.');
				} else{		
		    		alertFactory.info('No hay citas en la fecha seleccionada.');
				}			
			},function(error){
		        alert("error");
		    });	
		}
				
	}
});
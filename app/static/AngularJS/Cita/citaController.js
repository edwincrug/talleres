// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 23/03/2016
// -- Description: Citas controller
// -- Modificó: V. Vladimir Juárez Juárez
// -- Fecha: 30/03/2016
// -- =============================================
registrationModule.controller('citaController', function($scope, $rootScope, alertFactory,citaRepository){

	var idCotizacion = '';
	var cDetalles = [];
	var cPaquetes = [];
	var sCotizaciones ='';
	$scope.message = 'Buscando...';

	$scope.init = function(){
		$scope.showFicha = false;
		$scope.hasRows = false;
	}

	//Obtiene información de la unidad
	$scope.lookUpUnidad = function(datoUnidad){
		if(datoUnidad !== '' && datoUnidad !== undefined){
			citaRepository.getUnidadInformation(datoUnidad).then(function(unidadInfo){
				$scope.unidades = unidadInfo.data;
				if(unidadInfo.data.length > 0){
					$scope.unidadInfo = null;
					alertFactory.success('Datos encontrados');
				}
				else{
					alertFactory.info('No se encontraron datos');
				}
			}, function(error){
				alertFactory.error('Error al obtener los datos');
			});
		}
		else{
			alertFactory.info('Llene el campo de búsqueda');
		}		
	} 

	//Obtiene la lista de cotizaciones/detalle/paquete por unidad
	var getCotizacionDetallePaquete = function(cotizacion, cotizacionDetalle, paquetes){
		$scope.cotizaciones = [];
		//crea una propiedad cotizacion y agrega los objetos en el array
		cotizacion.forEach(function(cot){
			$scope.cotizaciones.push({cotizacion: cot});
		});

		$scope.cotizaciones.forEach(function(cot, i){
			//consulta de cotizaciones detalle
			cDetalles = Enumerable.From(cotizacionDetalle)
			.Where(function(x){return x.idCotizacion == cot.cotizacion.idCotizacion})
			.Select(function(x){return x})
			.ToArray();

			if(cDetalles.length > 0){
				//asignación de cotizaciones detale
				$scope.cotizaciones[i].cotizacion.cotizacionDetalle = cDetalles;
				$scope.cotizaciones[i].cotizacion.cotizacionDetalle.forEach(function(cotDet, j){
					//consulta de paquetes
					cPaquetes = Enumerable.From(paquetes)
					.Where(function(x){return x.idCotizacion == cot.cotizacion.idCotizacion})
					.Select(function(x){return x})
					.ToArray();
					//Asignación de paquetes
					if(cPaquetes.length > 0 && cotDet.idTipoElemento == 1){
						$scope.cotizaciones[i].cotizacion.cotizacionDetalle[j].paquete = cPaquetes;
					}				
				});
			}
		});
	}

	//obtiene las citas y servicios de la unidad
	$scope.loopUpCitaServicio = function(unidad){
		sCotizaciones= '';
		idCotizacion = '';
		//obtiene todas las citas de la unidad
		citaRepository.getCita(unidad.idUnidad).then(function(cita){
			$scope.citas = cita.data;

			$scope.unidadInfo = unidad;
			if(cita.data.length > 0){
				$scope.showFicha = true;
				alertFactory.success('Datos encontrados');
			}
			else{
				alertFactory.info('No se encontraron datos');
			}
		}, function(error){
			alertFactory.error('Error al obtener datos');
		});

		//obtiene las cotizaciones(servicios) de la unidad
		citaRepository.getCotizacion(unidad.idUnidad).then(function(cotizacion){
			if(cotizacion.data.length > 0){

				cotizacion.data.forEach(function(cot){
					idCotizacion = idCotizacion +','+cot.idCotizacion
				});

				sCotizaciones = idCotizacion.substring(1, idCotizacion.length);
				citaRepository.getCotizacionDetalle(sCotizaciones).then(function(cotizacionDetalle){
					citaRepository.getPaquete(sCotizaciones).then(function(cotPaquete){
						getCotizacionDetallePaquete(cotizacion.data, cotizacionDetalle.data, cotPaquete.data);
						$scope.hasRows = true;
					});
				});
			}
			else{
				alertFactory.info('No se encontraron datos');
				$scope.cotizaciones = [];
				$scope.hasRows = false;
			}
		}, function(error){
			alertFactory('Error al obtener datos');
		});
	}

	//expande y contrae las filas de las tablas
	$(function(){
		$('body').on('click', '.CX button', function(){
			if($(this).text() == '+'){
				$(this).text('-');
			}
			else{
				$(this).text('+');
			}
			$(this).closest('tr')
			.next('tr')
			.toggle();
		});
	});

	// Daterange filter
	$scope.dateRangeFilter = function (property, startDate, endDate) {
	    return function (item) {
	        if (item[property] === null) return false;
	 
	        var itemDate = moment(item[property]);
	        var s = moment(startDate, "DD-MM-YYYY");
	        var e = moment(endDate, "DD-MM-YYYY");
	 
	        if (itemDate >= s && itemDate <= e) return true;
	        return false;
	    }
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
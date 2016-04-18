// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 23/03/2016
// -- Description: Citas controller
// -- Modificó: V. Vladimir Juárez Juárez
// -- Fecha: 30/03/2016
// -- =============================================
registrationModule.controller('citaController', function($scope, $rootScope, localStorageService, alertFactory,citaRepository){
	var cDetalles = [];
	var cPaquetes = [];
	$scope.message = 'Buscando...';

	$scope.init = function(){
		//$scope.showTables = {};
		//$scope.showFicha = false;
		//$scope.hasRows = false;
		$scope.idTaller = 0;
		$scope.existsTrabajo = false;	

		// if(localStorageService.get('datoUnidadFounded') != undefined){
		// 	getUnidad(localStorageService.get('datoUnidadFounded'));
		// }
	}

	//init de la pantalla citaTrabajo
	$scope.initCita = function(){
		$scope.unidadInfo = localStorageService.get('unidad');
		getCita($scope.unidadInfo.idUnidad);
	}

	//init de la pantalla tallerCita
	$scope.initTallerCita = function(){
		$scope.fecha = new Date();
		$scope.busquedaCita($scope.fecha);
	}

	//obtiene la unidad mediante el dato buscado
	var getUnidad = function(datoUnidad){
		$('#btnBuscar').button('loading');
		$scope.promise = citaRepository.getUnidadInformation(datoUnidad).then(function(unidadInfo){
			$scope.unidades = unidadInfo.data;
			if(unidadInfo.data.length > 0){
				// localStorageService.set('datoUnidadFounded', datoUnidad);
				alertFactory.success('Datos encontrados');
				$('#btnBuscar').button('reset');
			}
			else{
				alertFactory.info('No se encontraron datos');
			}
		}, function(error){
			alertFactory.error('Error al obtener los datos');
		});
	}

	//obtiene las citas de la unidad
	var getCita = function(idUnidad){
		//obtiene todas las citas de la unidad
		$scope.promise = citaRepository.getCita(idUnidad).then(function(cita){
			$scope.citas = cita.data;
			if(cita.data.length > 0){
				alertFactory.success('Datos encontrados');
			}
			else{
				alertFactory.info('No se encontraron datos');
			}
		}, function(error){
			alertFactory.error('Error al obtener datos');
		});
	}

	//obtiene los tabajos de la cita
	$scope.lookUpTrabajo = function(cita){
		$scope.promise = citaRepository.getTrabajo(cita.idCita).then(function(trabajo){
			if(trabajo.data.length > 0){
				$scope.existsTrabajo = true;
				$scope.cita = cita;
				alertFactory.success('Trabajo cargado');
				//obtiene las cotizaciones(servicios) de la unidad
				$scope.promise = citaRepository.getCotizacion(trabajo.data[0].idTrabajo).then(function(cotizacion){
					if(cotizacion.data.length > 0){
						citaRepository.getCotizacionDetalle(trabajo.data[0].idTrabajo).then(function(cotizacionDetalle){
							citaRepository.getPaquete(trabajo.data[0].idTrabajo).then(function(cotPaquete){
								getCotizacionDetallePaquete(trabajo.data, cotizacion.data, cotizacionDetalle.data, cotPaquete.data);
							});
						});
					}
					else{
						alertFactory.info('No se encontraron cotizaciones');
					}
				}, function(error){
					alertFactory('Error al obtener las cotizaciones');
				});
			}
			else{
				alertFactory.info('No se encontraron datos del trabajo');
				$scope.trabajo = [];
				$scope.cita = [];
				$scope.existsTrabajo = false;
			}

		}, function(error){
			alertFactory.error("Error al obtener datos del trabajo");
		})
	}

	//regresa a la pantalla de cita
	$scope.backToCita = function(){
		location.href = '/cita';
	}

	//Obtiene información de la unidad
	$scope.lookUpUnidad = function(datoUnidad){
		if(datoUnidad !== '' && datoUnidad !== undefined){
			getUnidad(datoUnidad);
		}
		else{
			alertFactory.info('Llene el campo de búsqueda');
		}		
	} 

	//Obtiene la lista de trabajo/cotizaciones/detalle/paquete por unidad
	var getCotizacionDetallePaquete = function(trabajo, cotizacion, cotizacionDetalle, paquetes){
		$scope.trabajo = [];

		//crea una propiedad trabajo y agrega los objetos en el array
		trabajo.forEach(function(t){
			$scope.trabajo.push({trabajo: t});
			$scope.trabajo[0].trabajo.cotizacion = cotizacion;
			$scope.trabajo[0].trabajo.cotizacion.forEach(function(c, i){

				//consulta de cotizaciones detalle
				cDetalles = Enumerable.From(cotizacionDetalle)
				.Where(function(x){return x.idCotizacion == c.idCotizacion})
				.Select(function(x){return x})
				.ToArray();
				//añade detalles por cotización
				$scope.trabajo[0].trabajo.cotizacion[i].cotizacionDetalle = cDetalles;

				$scope.trabajo[0].trabajo.cotizacion[i].cotizacionDetalle.forEach(function(cd, j){
					//consulta de paquetes de cotización detalle
					cPaquetes = Enumerable.From(paquetes)
					.Where(function(x){return x.idCotizacion == c.idCotizacion && cd.idTipoElemento == 1})
					.Select(function(x){return x})
					.ToArray();
					if(cPaquetes.length > 0){
						$scope.trabajo[0].trabajo.cotizacion[i].cotizacionDetalle[j].paquete = cPaquetes;
					}
				});
			});
		});
	}

	//obtiene las citas y servicios de la unidad
	$scope.lookUpCita = function(unidad){
		location.href = '/citatrabajo';
		localStorageService.set('unidad', unidad);
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

	$scope.busquedaCita = function(fecha){
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
		$scope.promise = citaRepository.getCitaTaller(fecha).then(function(cita){			
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

	//muestra el modal para agendar nueva cita
    $scope.agendarCita = function(){
        $('#addCita').modal('show');
        $scope.talleres = [];
    }

    //obitiene los talleres con su especialidad
    $scope.lookUpTaller = function(datoTaller){
    	if(datoTaller !== '' && datoTaller !== undefined){
			$scope.promise = citaRepository.getTaller(datoTaller).then(function(taller){
	    		$scope.talleres = taller.data;
	    		if(taller.data.length > 0){
	    			alertFactory.success('Datos encontrados');
	    		}
	    		else{
	    			alertFactory.info('No se encontraron datos');
	    		}
	    	},function(error){
	    		alertFactory.error('Error al obtener los datos');
	    	});
    	}
    	else{
    		alertFactory.info('Llene el campo de búsqueda');
    	}
    }

    //inserta una nueva cita
    $scope.addCita = function(fechaCita, horaCita, trabajo){
    	if(fechaCita !== undefined && horaCita !== undefined && trabajo !== undefined && $scope.idTaller > 0){
    		var taller = {};
			taller.idUnidad = localStorageService.get('unidad').idUnidad;
			taller.idTaller = $scope.idTaller;
			taller.fecha = combineDateAndTime(fechaCita, horaCita);
			taller.observacion = trabajo;
			taller.idUsuario = 2;
			
			citaRepository.addCita(taller).then(function(cita){
				alertFactory.success("Se agendó correctamente");
				$scope.clearInputs();
				//$('#addCita').modal('hide');
				location.href = '/tallerCita';
			},function(error){
				alertFactory.error("Error al insertar la cita");
			});
    	}
    	else{
    		alertFactory.info("Llene todos los campos");
    	}
    }

    var combineDateAndTime = function(date, time){
	    timeString = time.getHours() + ':' + time.getMinutes() + ':00';

	    var year = date.getFullYear();
	    var month = date.getMonth() + 1; // Jan is 0, dec is 11
	    var day = date.getDate();
	    var dateString = '' + year + '-' + month + '-' + day;
	    var combined = dateString+' '+timeString;
	    //var combined = new Date(dateString + ' ' + timeString);

	    return combined;
	};

	//limpia los inputs del modal Cita
	$scope.clearInputs = function(){
		$scope.talleres = [];
		$scope.datoTaller = undefined;
		$scope.idTaller = 0;
		$scope.fechaCita = undefined;
		$scope.horaCita = undefined;
		$scope.trabajoCita = undefined;
	}

	//obtiene el taller seleccionado
	$scope.getTaller = function(idTaller){
		 $scope.idTaller = idTaller;
	}

	//Redirige a pagina para nueva cotización
	$scope.nuevaCotizacion = function(cita){
		localStorageService.set('cita', cita);
        location.href = '/cotizacionNueva';
	}
});
registrationModule.controller('cotizacionAutorizacionController', function ($scope, localStorageService, alertFactory, cotizacionAutorizacionRepository, citaRepository) {

    var cDetalles = [];
    var cPaquetes = [];
    var idCita = localStorageService.get('cita');

    $scope.init = function () {
        $scope.cargaFicha();
        $scope.cargaChat();
        $scope.getCotizacionByTrabajo();
        $scope.lookUpTrabajo(idCita);
    }

    $scope.cargaChat = function () {

        cotizacionAutorizacionRepository.getChat(idCita).then(function (result) {
            $scope.chat = result.data;
        }, function (error) {});
    }

    $scope.cargaFicha = function () {
        cotizacionAutorizacionRepository.getFichaTecnica(idCita).then(function (result) {
            $scope.ficha = result.data;
        }, function (error) {});
    }

    $scope.EnviarComentario = function (message) {
        cotizacionAutorizacionRepository.putMessage(3, message, 7).then(function (result) {
                $scope.algo = result.data;
            },
            function (error) {});
    }

    $scope.getCotizacionByTrabajo = function () {
        cotizacionAutorizacionRepository.getCotizacionByTrabajo(idCita).then(function (result) {
                $scope.cotizacionesByTrabajo = result.data;
            },
            function (error) {});
    }

    $scope.Autorizar = function () {
        cotizacionAutorizacionRepository.putCotizacionAprobacion(4, 1).then(function (result) {
            if (result.data.length > 0) {
                alertFactory.success('Cotización Autorizada correctamente');
            }
        }, function (error) {

        });
    }

    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    //obtiene los tabajos de la cita
    $scope.lookUpTrabajo = function(idCita){
        citaRepository.getTrabajo(idCita).then(function(trabajo){
            if(trabajo.data.length > 0){
                $scope.existsTrabajo = true;
                //$scope.cita = cita;
                alertFactory.success('Trabajo cargado');
                //obtiene las cotizaciones(servicios) de la unidad
                citaRepository.getCotizacion(trabajo.data[0].idTrabajo).then(function(cotizacion){
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
                //$scope.cita = [];
                //$scope.existsTrabajo = false;
            }

        }, function(error){
            alertFactory.error("Error al obtener datos del trabajo");
        })
    };

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
    };

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
});
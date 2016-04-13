// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 28/03/2016
// -- Description: Cotizacion Controller
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller('cotizacionConsultaController', function ($scope, localStorageService, alertFactory, cotizacionConsultaRepository) {

    $scope.message = "Buscando...";

    $scope.init = function () {
        $scope.Maestro();
    }

    $scope.hola = function () {
        alert("hola");
    }
    $scope.Chat = function () {}

    $scope.Aprobacion = function () {}

    $scope.Detalle = function (idCotizacion) {

        cotizacionConsultaRepository.getDetail(idCotizacion).then(function (result) {
            if (result.data.length > 0) {
                $scope.total = 0;
                $scope.nombrePaquete = result.data[0].NOMBRE;
                $scope.articulos = result.data;
                for (var i = 0; i < result.data.length; i++) {
                    $scope.total += result.data[i].PRECIO;
                }

                $('#cotizacionDetalle').modal('show');
                alertFactory.success('Datos cargados.');
            } else {
                alertFactory.info('No se pudo obtener el detalle de esta cotización.');
            }


        }, function (error) {
            alertFactory.info('No se pudo obtener el detalle de esta cotización.');
        });

    }

    $scope.Maestro = function () {
        $scope.promise =
            cotizacionConsultaRepository.get().then(function (result) {
                $scope.cotizaciones = result.data;
            }, function (error) {});
    }

    $scope.BusquedaPieza = function () {
        cotizacionConsultaRepository.busquedaPieza.then(function (result) {
            $scope.pieza = result.data;
        }, function (error) {

        });
    }

    $scope.Autorizacion = function (idCita1) {
        localStorageService.set('cita', idCita1);
        location.href = '/cotizacionAutorizacion';

    }

});
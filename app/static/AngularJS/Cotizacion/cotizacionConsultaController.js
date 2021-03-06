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

    $scope.Detalle = function (idCotizacion, idTaller) {
        cotizacionConsultaRepository.getDetail(idCotizacion, idTaller).then(function (result) {
            if (result.data.length > 0) {
                $scope.total = 0;
                $scope.articulos = result.data;
                for (var i = 0; i < result.data.length; i++) {
                    $scope.total += (result.data[i].precio * result.data[i].cantidad)
                }

                $('#cotizacionDetalle').appendTo('body').modal('show');
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
                if (result.data.length > 0) {
                    $scope.cotizaciones = result.data;
                } else {
                    alertFactory.info('No se encontraron cotizaciones.');
                }
            }, function (error) {
                alertFactory.error('No se encontraron cotizaciones, inténtelo más tarde.');
            });
    }

    $scope.Autorizacion = function (idCita1, idCotizacion1, idUnidad1, numeroCotizacion, idTrabajo1, taller1) {
        localStorageService.set('cita', idCita1);
        localStorageService.set('cotizacion', idCotizacion1);
        localStorageService.set('unidad', idUnidad1);
        localStorageService.set('estado', 1);
        localStorageService.set('desc', numeroCotizacion)
        localStorageService.set('work', idTrabajo1);
        localStorageService.set('taller', taller1);
        location.href = '/cotizacionAutorizacion';
    }

    $scope.Nueva = function () {
        location.href = "/cotizacionNueva";
    }

});
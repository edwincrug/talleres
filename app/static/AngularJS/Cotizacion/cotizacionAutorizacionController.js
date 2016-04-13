registrationModule.controller('cotizacionAutorizacionController', function ($scope, localStorageService, alertFactory, cotizacionAutorizacionRepository) {



    var idCita = localStorageService.get('cita');

    $scope.init = function () {
        $scope.cargaFicha();
        $scope.cargaChat();
        $scope.getCotizacionByTrabajo();
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
    })

    

});
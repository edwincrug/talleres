var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('cotizacionAutorizacionRepository', function ($http) {
    return {
        getChat: function (idCita) {
            return $http({
                url: searchUrl + 'chat/' + idCita,
                method: "GET"
            });
        },
        putMessage: function (usuario, msg, cita) {
            var msgObj = {
                idUsuario: usuario,
                mensaje: msg,
                idCita: cita
            };
            
            return $http({
                url: searchUrl + 'message',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getFichaTecnica: function (idCita) {
            return $http({
                url: searchUrl + 'ficha/' + idCita,
                method: "GET"
            });
        },
       getCotizacionByTrabajo: function (idCita) {
            return $http({
                url: searchUrl + 'cotizacionByTrabajo/' + idCita,
                method: "GET"
            });
        },
        putCotizacionAprobacion: function (cotizacion, usuario) {
            var aprobacionObj = {
                cotizacion : cotizacion,
                usuario: usuario
            };
            
            return $http({
                url: searchUrl + 'cotizacionAprobacion',
                method: "POST",
                data: aprobacionObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
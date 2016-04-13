var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('cotizacionConsultaRepository', function ($http) {
    return {
        get: function () {
            // return $http.post(loginUrl + '1|' + rol + '|' + nombre + '|' + email + '|' + password);
            return $http({
                url: searchUrl + 'see',
                method: "GET"
            });
        },
        busquedaPieza: function(){
        	return $http({
        		url: searchUrl + 'buscar',
        		method: "GET"
        	});
        },
        getDetail: function (idCotizacion) {
            // return $http.post(loginUrl + '1|' + rol + '|' + nombre + '|' + email + '|' + password);
            return $http({
                url: searchUrl + 'detail/' + idCotizacion,
                method: "GET"
            });
        }
    };
});
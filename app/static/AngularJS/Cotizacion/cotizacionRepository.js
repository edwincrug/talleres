var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('cotizacionRepository', function ($http) {
    return {
        get: function () {
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
        }
    };
});
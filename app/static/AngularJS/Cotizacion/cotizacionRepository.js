var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('cotizacionRepository', function ($http) {
    return {
        get: function () {
            // return $http.post(loginUrl + '1|' + rol + '|' + nombre + '|' + email + '|' + password);
            return $http({
                url: searchUrl + 'see',
                method: "GET"
            });
        }
    };
});
var searchUrl = global_settings.urlCORS + '/api/flotillaApi/';

registrationModule.factory('cotizacionDetalleRepository', function ($http) {
    return {
        getFlotilla: function (factura, vin) {
            return $http.get(searchUrl + '1|' + factura + '|' + vin);
        }
    };
});
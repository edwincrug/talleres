var citaUrl = global_settings.urlCORS + '/api/cita/';

registrationModule.factory('citaRepository', function ($http) {
    return {
        getCitaTaller: function (fecha) {
        	return $http({
                url: citaUrl + 'see/' + fecha,
                method: "GET"
            });
        },
        getUnidadInformation: function (datoUnidad) {
            return $http.get(citaUrl +'unidad/'+ datoUnidad);
        },
        getCita: function(idUnidad){
        	return $http.get(citaUrl+'cita/'+idUnidad);
        },
        getCotizacion: function(idUnidad){
        	return $http.get(citaUrl+'cotizacion/'+idUnidad);
        },
        getCotizacionDetalle: function(idCotizacion){
        	return $http.get(citaUrl+'cotizaciondetalle/'+idCotizacion)
        },
        getPaquete: function(idCotizacion){
        	return $http.get(citaUrl+'paquete/'+idCotizacion)
        }
    };
});
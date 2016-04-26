var citaUrl = global_settings.urlCORS + '/api/cita/';

registrationModule.factory('citaRepository', function ($http) {
    return {
        getCitaTaller: function (fecha) {
        	return $http({
                url: citaUrl + 'buscaCita/' + fecha,
                method: "GET"
            });
        },
        getUnidadInformation: function (datoUnidad) {
            return $http.get(citaUrl +'unidad/'+ datoUnidad);
        },
        getCita: function(idUnidad){
        	return $http.get(citaUrl+'cita/'+idUnidad);
        },
        getTrabajo: function(idCita){
        	return $http.get(citaUrl+'trabajo/'+idCita);
        },
        getCotizacion: function(idTrabajo){
        	return $http.get(citaUrl+'cotizacion/'+idTrabajo);
        },
        getCotizacionDetalle: function(idTrabajo){
        	return $http.get(citaUrl+'cotizaciondetalle/'+idTrabajo);
        },
        getPaquete: function(idTrabajo){
        	return $http.get(citaUrl+'paquete/'+idTrabajo);
        },
        getTaller: function(datoTaller){
        	return $http.get(citaUrl+'taller/'+datoTaller);
        },
        addCita: function(taller){
            return $http({
                url: citaUrl + 'addcita/',
                method: "POST",
                data: taller,
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        addCitaServicioDetalle: function(item){
            return $http({
                url: citaUrl + 'addCitaServicioDetalle/',
                method: "POST",
                data: item,
                headers: {
                'Content-Type': 'application/json'
                }
            });
        }
    };
});
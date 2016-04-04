var citaUrl = global_settings.urlCORS + '/api/cita/';

registrationModule.factory('citaRepository', function ($http) {
    return {
        getCitaTaller: function (fecha) {
        	return $http({
                url: citaUrl + 'see/' + fecha,
                method: "GET"
            });
        }
    };
});
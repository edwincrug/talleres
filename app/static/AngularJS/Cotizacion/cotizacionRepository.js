var searchUrl = global_settings.urlCORS + '/api/cotizacion/';
var ruta = global_settings.uploadPath;
//var ruta = 'C:/Users/Mario/Documents/FileUpload';

registrationModule.factory('cotizacionRepository', function ($http) {
    return {
        buscarPieza: function(nombrePieza){
        	return $http({
        		url: searchUrl + 'buscarPieza/' + nombrePieza,
        		method: "GET"
        	});
        },
        buscarItems: function(){
            return $http({
                url: searchUrl + 'buscarItems',
                method: "GET"
            });
        },       
        insertCotizacionMaestro: function(idCita,idUsuario,observaciones){
            var msgObj = {
                idCita: idCita,  
                idUsuario: idUsuario,
                observaciones: observaciones
            }
            return $http({
                url: searchUrl + 'cotizacionMaestro',
                method: "POST",
                data: msgObj,
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        insertCotizacionDetalle: function(idCotizacion,idTipoElemento,idElemento,precio,cantidad){
            var msgObj = {
                idCotizacion: idCotizacion,  
                idTipoElemento: idTipoElemento,
                idElemento: idElemento,
                precio: precio,
                cantidad: cantidad
            }
            return $http({
                url: searchUrl + 'cotizacionDetalle',
                method: "POST",
                data: msgObj,
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        insertEvidencia: function(idCita,idUsuario,idCotizacion,nombreArchivo,idTipoEvidencia, tipoArchivo){
            var msgObj = {
                idCita: idCita,  
                idUsuario: idUsuario,
                idCotizacion: idCotizacion,
                nombreArchivo: nombreArchivo,
                idTipoEvidencia: idTipoEvidencia,
                tipoArchivo: tipoArchivo
            }
            return $http({
                url: searchUrl + 'evidencia',
                method: "POST",
                data: msgObj,
                headers: {
                'Content-Type': 'application/json'
                }
            });
        }  
    };
});
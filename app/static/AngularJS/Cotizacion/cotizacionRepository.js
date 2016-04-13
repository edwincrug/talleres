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
        }/*,
        saveFile: function(file) {
            var fd = new FormData();
            fd.append('image', file);
            $http.post(ruta, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined},
                    enctype: 'multipart/form-data'
            });  
        },*/,
        saveFile: function(file) {
          return $http({
              url: searchUrl + 'uploadFile',
              method: "POST",
             // Any data needed to be submitted along with the files
              file: file
          }); 
        }  
    };
});
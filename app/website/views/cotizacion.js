var Cotizacion = function(conf){
    conf = conf || {};
}

function logError(err, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Error: " + err);
    res.end("");
}

Cotizacion.prototype.see = function(res, object){
    //Estándar de implementación de errores
    if (object.error) { logError(object.error, res); return; }

    if (object.result) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(object.result));
        res.end("");
    }
} 

}

Cotizacion.prototype.add = function(res, object){

}

Cotizacion.prototype.edit = function(res, object){

}

Cotizacion.prototype.del = function(res, object){

}

module.exports = Cotizacion;

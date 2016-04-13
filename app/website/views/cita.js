var Cita = function(conf){
	conf = conf || {};
}

function logError(err, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Error: " + err);
    res.end("");
}

Cita.prototype.add = function(res, object){
	
}

Cita.prototype.edit = function(res, object){
	
}

Cita.prototype.del = function(res, object){
	
}

module.exports = Cita; 

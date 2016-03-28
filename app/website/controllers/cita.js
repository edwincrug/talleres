var CitaView = require('../views/cita'),
	CitaModel = require('../models/cita');

var Cita = function(conf){
	this.conf = conf || {};

	this.view = new CitaView();
	this.model = new CitaModel({ parameters : this.conf.parameters});

	this.response = function(){
		this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
	}
}

Cita.prototype.post_save = function(req,res,next){

}

Cita.prototype.get_see_data = function(req,res,next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	params = req.params.data;

	this.model.get(params,function(error,result){
		//Callback
		object.error = error;
		object.result = result;
		
		self.view.see(res, object);
	});
}

Cita.prototype.get_add = function(req,res,next){

}

Cita.prototype.get_edit_data = function(req,res,next){

}

Cita.prototype.get_del = function(req,res,next){

}

module.exports = Cita;
var CotizacionView = require('../views/cotizacion'),
	CotizacionModel = require('../models/cotizacion');

var Cotizacion = function(conf){
	this.conf = conf || {};

	this.view = new CotizacionView();
	this.model = new CotizacionModel({ parameters : this.conf.parameters});

	this.response = function(){
		this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
	}
}

Cotizacion.prototype.post_save = function(req,res,next){

}

Cotizacion.prototype.get_see = function(req,res,next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	//params = req.params.data;

	this.model.get(function(error,result){
		//Callback
		object.error = error;
		object.result = result;
		
		self.view.see(res, object);
	});
}

Cotizacion.prototype.get_add = function(req,res,next){

}

Cotizacion.prototype.get_edit_data = function(req,res,next){

}

Cotizacion.prototype.get_del = function(req,res,next){

}
module.exports = Cotizacion;
var CitaView = require('../views/cita'),
	CitaModel = require('../models/dataAccess');

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

//obtiene datos de la unidad
Cita.prototype.get_unidad_data = function(req, res, next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	params.name = 'datoUnidad';
	params.value = req.params.data;
	params.type = 3;
	
	this.model.get( 'SEL_UNIDAD_SP',params,function(error,result){
		//Callback
		object.error = error;
		object.result = result;
		
		self.view.see(res, object);
	});
}

//obtiene las cotizaciones por unidad
Cita.prototype.get_cotizacion_data = function(req, res, next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	params.name = 'idUnidad';
	params.value = req.params.data;
	params.type = 1;
	
	this.model.get( 'SEL_UNIDAD_COTIZACION_SP',params,function(error,result){
		//Callback
		object.error = error;
		object.result = result;
		
		self.view.see(res, object);
	});
}

//devuelve los detalles de las cotizaciones
Cita.prototype.get_cotizaciondetalle_data = function(req, res, next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	params.name = 'idCotizacion';
	params.value = req.params.data;
	params.type = 3;
	
	this.model.get( 'SEL_UNIDAD_COTDETALLE_SP',params,function(error,result){
		//Callback
		object.error = error;
		object.result = result;
		
		self.view.see(res, object);
	});
}

//devuelve los paquetes de las cotizaciones
Cita.prototype.get_paquete_data = function(req, res, next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	params.name = 'idCotizacion';
	params.value = req.params.data;
	params.type = 3;
	
	this.model.get( 'SEL_PAQUETE_SP',params,function(error,result){
		//Callback
		object.error = error;
		object.result = result;
		
		self.view.see(res, object);
	});
}

//obtiene las citas de la unidad
Cita.prototype.get_cita_data = function(req, res, next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	params.name = 'idUnidad';
	params.value = req.params.data;
	params.type = 1;
	
	this.model.get( 'SEL_UNIDAD_CITA_SP',params,function(error,result){
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
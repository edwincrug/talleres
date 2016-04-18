var CitaView = require('../views/cita'),
	CitaModel = require('../models/dataAccess'),
	moment = require('moment');

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

//obtiene el trabajo de la cita
Cita.prototype.get_trabajo_data = function(req, res, next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	params.name = 'idCita';
	params.value = req.params.data;
	params.type = 1;
	
	this.model.get( 'SEL_UNIDAD_TRABAJO',params,function(error,result){
		//Callback
		object.error = error;
		object.result = result;
		
		self.view.see(res, object);
	});
}

Cita.prototype.get_buscaCita_data = function(req,res,next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	var responseDate = moment(req.params.data).format('YYYY-MM-DD HH:mm Z');
    var fecha = new Date(responseDate); 
    fecha.setHours(12);

    params.name = 'fecha';
    params.value = fecha;    
	params.type = 4;

	this.model.get( 'SEL_CITA_TALLER_SP',params,function(error,result){
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
	params.name = 'idTrabajo';
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
	params.name = 'idTrabajo';
	params.value = req.params.data;
	params.type = 1;
	
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
	params.name = 'idTrabajo';
	params.value = req.params.data;
	params.type = 1;
	
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

//obtiene los talleres
Cita.prototype.get_taller_data = function(req, res, next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	params.name = 'datoTaller';
	params.value = req.params.data;
	params.type = 3;
	
	this.model.get( 'SEL_TALLER_SP',params,function(error,result){
		//Callback
		object.error = error;
		object.result = result;
		
		self.view.see(res, object);
	});
}

//insertar nueva cita para una unidad
Cita.prototype.post_addcita_data = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    //var fecha = new Date(req.body.fecha);

    //var fecha = moment(req.body.fecha).format();

    //var fecha = new Date(req.body.fecha);

    //Asigno a params el valor de mis variables
    var msgObj = {
        idUnidad: req.body.idUnidad,
        idTaller: req.body.idTaller,
        fecha: req.body.fecha,
        observacion: req.body.observacion,
        idUsuario: req.body.idUsuario
    }

    this.model.post(msgObj, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.post(res, object);
    });
}

Cita.prototype.get_add = function(req,res,next){

}

Cita.prototype.get_edit_data = function(req,res,next){

}

Cita.prototype.get_del = function(req,res,next){

}

//obtiene el trabajo de la Trabajo
Cita.prototype.get_unidadtrabajo_data = function(req, res, next){
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
	
	this.model.get( 'SEL_TRABAJO_SP',params,function(error,result){
		//Callback
		object.error = error;
		object.result = result;
		
		self.view.see(res, object);
	});
}

module.exports = Cita;
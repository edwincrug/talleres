var CotizacionView = require('../views/cotizacion'),
<<<<<<< HEAD
    CotizacionModel = require('../models/cotizacion');

var Cotizacion = function(conf){
    this.conf = conf || {};

    this.view = new CotizacionView();
    this.model = new CotizacionModel({ parameters : this.conf.parameters});

    this.response = function(){
        this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
    }
=======
	CotizacionModel = require('../models/cotizacion');

var Cotizacion = function(conf){
	this.conf = conf || {};

	this.view = new CotizacionView();
	this.model = new CotizacionModel({ parameters : this.conf.parameters});

	this.response = function(){
		this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
	}
>>>>>>> 662b2e6f245f1e76b5b60e632d442de901bf8681
}

Cotizacion.prototype.post_save = function(req,res,next){

}

<<<<<<< HEAD
Cotizacion.prototype.get_see_data = function(req,res,next){
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
=======
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
>>>>>>> 662b2e6f245f1e76b5b60e632d442de901bf8681
}

Cotizacion.prototype.get_add = function(req,res,next){

}

Cotizacion.prototype.get_edit_data = function(req,res,next){

}

Cotizacion.prototype.get_del = function(req,res,next){

}

<<<<<<< HEAD
module.exports = Cotizacion;
=======
module.exports = Cotizacion;
>>>>>>> 662b2e6f245f1e76b5b60e632d442de901bf8681

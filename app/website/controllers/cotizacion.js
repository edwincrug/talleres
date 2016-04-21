var CotizacionView = require('../views/cotizacion'),
    CotizacionModel = require('../models/cotizacion');

var Cotizacion = function (conf) {
    this.conf = conf || {};

    this.view = new CotizacionView();
    this.model = new CotizacionModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Cotizacion.prototype.get_see = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    //params = req.params.data;

    this.model.get(function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.see(res, object);
    });
}

//Método para la búsqueda de piezas nueva cotización
Cotizacion.prototype.post_buscarPieza = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    var msgObj = {
        idTaller: req.body.idTaller,
        nombrePieza: req.body.nombrePieza
    }

    this.model.buscarPieza(msgObj, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.buscarPieza(res, object);
    });
}

//Método para insertar nueva cotización Maestro
Cotizacion.prototype.post_cotizacionMaestro_data = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    var msgObj = {
        idCita: req.body.idCita,
        idUsuario: req.body.idUsuario,
        observaciones: req.body.observaciones,
        idUnidad: req.body.idUnidad
    }

    this.model.cotizacionMaestro(msgObj, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.cotizacionMaestro(res, object);
    });
}

//Método para insertar nueva cotización Detalle
Cotizacion.prototype.post_cotizacionDetalle = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    var msgObj = {
        idCotizacion: req.body.idCotizacion,
        idTipoElemento: req.body.idTipoElemento,
        idElemento: req.body.idElemento,
        precio: req.body.precio,
        cantidad: req.body.cantidad
    }

    this.model.cotizacionDetalle(msgObj, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.cotizacionDetalle(res, object);
    });
}

Cotizacion.prototype.get_buscar = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    //params = req.params.data;

    this.model.get(function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.see(res, object);
    });
}

Cotizacion.prototype.post_detail = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
   /* params = req.params.data;

    this.model.detail(params, function (error, result) {
        object.error = error;
        object.result = result;

        self.view.detail(res, object);
    });*/

    var objCotizacion = {
        idCotizacion: req.body.idCotizacion,
        idTaller: req.body.idTaller
    };

    this.model.detail(objCotizacion, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.detail(res, object);
    });
}

Cotizacion.prototype.get_chat_data = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    params = req.params.data;

    this.model.chat(params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.chat(res, object);
    });
}

Cotizacion.prototype.post_message = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var msgObj = {
        idUsuario: req.body.idUsuario,
        mensaje: req.body.mensaje,
        idCita: req.body.idCita
    };

    //Asigno a params el valor de mis variables

    this.model.message(msgObj, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.message(res, object);
    });
}

Cotizacion.prototype.get_ficha_data = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    params = req.params.data;

    this.model.ficha(params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.ficha(res, object);
    });
}

Cotizacion.prototype.get_cotizacionByTrabajo_data = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    params = req.params.data;

    this.model.cotizacionByTrabajo(params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.cotizacionByTrabajo(res, object);
    });
}

Cotizacion.prototype.post_cotizacionAprobacion = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var aprobacionObj = {
        idCotizacion: req.body.cotizacion,
        idUsuario: req.body.usuario
    };

    //Asigno a params el valor de mis variables

    this.model.aprobacionCotizacion(aprobacionObj, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.aprobacionCotizacion(res, object);
    });
}

Cotizacion.prototype.get_evidenciasByCotizacion_data = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    params = req.params.data;

    this.model.evidenciasByCotizacion(params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.evidenciasByCotizacion(res, object);
    });
}

//Método para insertar evidencia
Cotizacion.prototype.post_evidencia = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    var msgObj = {
        idCita: req.body.idCita,  
        idUsuario: req.body.idUsuario,
        idCotizacion: req.body.idCotizacion,
        nombreArchivo: req.body.nombreArchivo,
        idTipoEvidencia: req.body.idTipoEvidencia,
        tipoArchivo: req.body.tipoArchivo
    }

    this.model.evidencia(msgObj, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.evidencia(res, object);
    });
}

Cotizacion.prototype.post_cotizacionRechazo = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var rechazoObj = {
        idCotizacion: req.body.cotizacion,
        idUsuario: req.body.usuario
    };

    //Asigno a params el valor de mis variables

    this.model.rechazoCotizacion(rechazoObj, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.rechazoCotizacion(res, object);
    });
}

module.exports = Cotizacion;
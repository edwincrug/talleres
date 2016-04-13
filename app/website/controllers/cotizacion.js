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
Cotizacion.prototype.get_buscarPieza_data = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    params = req.params.data;

    this.model.buscarPieza(params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.buscarPieza(res, object);
    });
}

//Método para la búsqueda de las descripciones de los items en nueva cotización
Cotizacion.prototype.get_buscarItems = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    this.model.buscarItems(function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.buscarItems(res, object);
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
        observaciones: req.body.observaciones
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

//Método para subir archivos
Cotizacion.prototype.post_uploadFile = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var file = {
        file: req.body.file
    }

    this.model.uploadFile(file, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.uploadFile(res, object);
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

Cotizacion.prototype.get_detail_data = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    //Asigno a params el valor de mis variables
    params = req.params.data;

    this.model.detail(params, function (error, result) {
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


module.exports = Cotizacion;
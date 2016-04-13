var sql = require('mssql'),
    config = {};

var Cotizacion = function (config) {
    //Inicializamos el objeto config
    this.config = config || {};
    //Inicializamos la conexión
    connectionString = {
        user: this.config.parameters.SQL_user,
        password: this.config.parameters.SQL_password,
        server: this.config.parameters.SQL_server, // You can use 'localhost\\instance' to connect to named instance 
        database: this.config.parameters.SQL_database,
        connectionTimeout: this.config.parameters.SQL_connectionTimeout
    };

    this.connection = new sql.Connection(connectionString);
};


//Funciones
Cotizacion.prototype.get = function (callback) {

    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        //request.input('idTaller', sql.Int, params);
        // request.output('output_parameter', sql.VarChar(50));
        request.execute('SEL_COTIZACIONES_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al obtener las cotizaciones: ' + params + ' mensaje: ' + err);
            }
        });
    });
};

Cotizacion.prototype.buscarPieza = function (params, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.input('nombrePieza', sql.VarChar(50), params);
        request.execute('SEL_BUSQUEDA_PIEZA_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al obtener las piezas: ' + params + ' mensaje: ' + err);
            }
        });

    });
};

Cotizacion.prototype.buscarItems = function (callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.execute('SEL_BUSCAR_ITEM_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al obtener los items: ' + params + ' mensaje: ' + err);
            }
        });

    });
};

Cotizacion.prototype.cotizacionMaestro = function (msgObj, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.input('idCita', sql.Decimal(18, 0), msgObj.idCita);
        request.input('idUsuario', sql.Decimal(18, 0), msgObj.idUsuario);
        request.input('observaciones', sql.VarChar(300), msgObj.observaciones);
        request.execute('INS_COTIZACION_MAESTRO_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al insertar cotización: ' + msgObj + ' mensaje: ' + err);
            }
        });

    });
};

Cotizacion.prototype.cotizacionDetalle = function (msgObj, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.input('idCotizacion', sql.Numeric(18, 0), msgObj.idCotizacion);
        request.input('idTipoElemento', sql.Numeric(18, 0), msgObj.idTipoElemento);
        request.input('idElemento', sql.Numeric(18, 0), msgObj.idElemento);
        request.input('precio', sql.Decimal(18, 0), msgObj.precio);
        request.input('cantidad', sql.Numeric(18, 0), msgObj.cantidad);
        request.execute('INS_COTIZACION_DETALLE_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al insertar cotización: ' + msgObj + ' mensaje: ' + err);
            }
        });

    });
};

Cotizacion.prototype.uploadFile = function (req, res) {
    // We are able to access req.files.file thanks to 
    // the multiparty middleware
    var file = req.file.file;
}

Cotizacion.prototype.buscar = function (callback) {

    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        //request.input('idTaller', sql.Int, params);
        // request.output('output_parameter', sql.VarChar(50));
        request.execute('SEL_BUSQUEDA_COTIZACION_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al obtener las piezas  : ' + params + ' mensaje: ' + err);
            }
        });
    });
};

Cotizacion.prototype.detail = function (params, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.input('COTIZACION', sql.Numeric(18, 0), params);
        request.execute('SEL_COTIZACION_DETALLE_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al obtener el detalle de la cotización: ' + params + ' mensaje: ' + err);
            }
        });

    });
};

Cotizacion.prototype.chat = function (params, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.input('idCita', sql.Numeric(18, 0), params);
        request.execute('SEL_CHAT_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al obtener el chat de la cotización: ' + params + ' mensaje: ' + err);
            }
        });

    });
};

Cotizacion.prototype.message = function (msgObj, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.input('idUsuario', sql.Numeric(18, 0), msgObj.idUsuario);
        request.input('mensaje', sql.VarChar(300), msgObj.mensaje);
        request.input('idCita', sql.Numeric(18, 0), msgObj.idCita);
        request.execute('INS_MENSAJE_CHAT_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al enviar mensaje: ' + params + ' mensaje: ' + err);
            }
        });

    });
};

Cotizacion.prototype.ficha = function (params, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.input('idCita', sql.Numeric(18, 0), params);
        request.execute('SEL_FICHA_TECNICA_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al obtener la ficha técnica de la cotización: ' + params + ' mensaje: ' + err);
            }
        });

    });
};

Cotizacion.prototype.cotizacionByTrabajo = function (params, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.input('idCita', sql.Numeric(18, 0), params);
        request.execute('SEL_COTIZACIONES_BY_TRABAJO_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al obtener las cotizaciones de este trabajo: ' + params + ' mensaje: ' + err);
            }
        });

    });
};

Cotizacion.prototype.aprobacionCotizacion = function (aprobacionObj, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.input('idCotizacion', sql.Numeric(18, 0), aprobacionObj.idCotizacion);
        request.input('idUsuario', sql.Numeric(18, 0), aprobacionObj.idUsuario);
        request.execute('INS_AUTORIZACION_COTIZACION_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al autorizar la cotización: ' + params + ' mensaje: ' + err);
            }
        });

    });
};

module.exports = Cotizacion;
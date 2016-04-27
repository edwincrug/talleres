var sql = require('mssql'),
    config = {};

var DataAccess = function(config){
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


//HTTPSServer methods
DataAccess.prototype.get = function(stored,params,callback){
    
    var self = this.connection;
    this.connection.connect(function(err) {
      // Stored Procedure   
      var request = new sql.Request(self);
      var dataType = null;
      if(params.type === 1){
        dataType = sql.Int;
      }else if(params.type === 2){
        dataType = sql.Decimal(18, 2);
      }else if(params.type === 3){
        dataType = sql.VarChar(8000);
      }else if(params.type === 4){
        dataType = sql.DateTime;
      }
      request.input(params.name, dataType, params.value);
      // request.output('output_parameter', sql.VarChar(50));
      request.execute(stored, function(err, recordsets, returnValue) {
        if(recordsets != null){
          callback(err, recordsets[0]);
        }
        else{
          console.log('Error al obtener datos para el usuario: ' + params + ' mensaje: ' + err);
        }
      });

    });
};

//HTTPSServer methods
DataAccess.prototype.get2 = function(stored,callback){
    
    var self = this.connection;
    this.connection.connect(function(err) {
      // request.output('output_parameter', sql.VarChar(50));
      request.execute(stored, function(err, recordsets, returnValue) {
        if(recordsets != null){
          callback(err, recordsets[0]);
        }
        else{
          console.log('Error al obtener datos para el usuario: ' + ' mensaje: ' + err);
        }
      });

    });
};

//método post
DataAccess.prototype.post = function (objParams, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.input('idUnidad', sql.Numeric(18, 0), objParams.idUnidad);
        request.input('idTaller', sql.Numeric(18, 0), objParams.idTaller);
        request.input('fecha', sql.VarChar(20), objParams.fecha);
        request.input('observacion', sql.VarChar(250), objParams.observacion);
        request.input('idUsuario', sql.Numeric(18, 0), objParams.idUsuario);

        request.execute('INS_CITA_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al realizacion la insercción: ' + params + ' mensaje: ' + err);
            }
        });

    });
};

//método post
DataAccess.prototype.postCitaServicioDetalle = function (objParams, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        request.input('idCita', sql.Numeric(18, 0), objParams.idCita);
        request.input('idTipoElemento', sql.Numeric(18, 0), objParams.idTipoElemento);
        request.input('idElemento', sql.Numeric(18, 0), objParams.idElemento);
        request.input('cantidad', sql.Numeric(18, 0), objParams.cantidad);

        request.execute('INS_CITA_SERVICIO_DETALLE_SP', function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al realizacion la insercción: ' + params + ' mensaje: ' + err);
            }
        });

    });
};

module.exports = DataAccess; 
// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 28/03/2016
// -- Description: Cotizacion Controller
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller('cotizacionController', function($scope, $rootScope, alertFactory, cotizacionRepository){
	var arrayDescripcion = []; 
    $scope.arrayItem = [];
    var valor = '';
    var id = 0;
    var idItem = 0;
    var exist = null;
    var idCotizacion = 0;
    $scope.total = 0;
    $scope.importe = 0; 
    $scope.idUsuario = 1;
    $scope.idCita = 14;
    $scope.message = 'Buscando...';
    $scope.init = function(){
        GetItems();
        exist = false;        
    }
    
    $scope.Chat = function(){
	}
    
    $scope.Aprobacion = function(){
	}
    
    $scope.Detalle = function(){
         $('#cotizacionDetalle').modal('show');
	}
    
    $scope.Maestro = function(){
        cotizacionRepository.get().then(function(result){
            $scope.cotizaciones = result.data;            
        }, function (error){
        });
	}

    $scope.buscarPieza = function(){
        if(valor == '' || valor == null){
            alertFactory.info("Seleccione una pieza");
        } else{
               $scope.promise = cotizacionRepository.buscarPieza(valor).then(function(result){
                $scope.listaPiezas = result.data;             
            }, function (error){
            }); 
        }
        valor = '';    
    }

    var GetItems = function(){
        cotizacionRepository.buscarItems().then(function(result){
            $scope.listaItems = result.data;
            for (var i=0; i < result.data.length; i++) {
                arrayDescripcion.push(result.data[i].descripcion);
            }
            $("#piezaTxt").autocomplete({
                source: arrayDescripcion,
                select: function(event,ui) {
                    valor = ui.item.label;
                }
            });
        }, function (error){
        });
    }

    $scope.cotizacion = function(pieza){
        if($scope.arrayItem.length != 0){
            if(existsItem(pieza) == true){
                $scope.arrayItem.forEach(function(item, i){
                    if(item.idItem == pieza.idItem && item.idTipoElemento == pieza.idTipoElemento){
                        $scope.arrayItem[i].cantidad = item.cantidad+1;
                        $scope.arrayItem[i].importe = ($scope.arrayItem[i].cantidad) * ($scope.arrayItem[i].precio)                        
                        $scope.importe = $scope.arrayItem[i].importe;                    
                        $scope.total = calculaTotal();
                    }
                });
                exist = false;
            }
            else{
                 $scope.arrayItem.push({idItem: pieza.idItem,
                                       numeroParte:pieza.numeroParte,descripcion:pieza.descripcion,
                                       precio:pieza.precio, cantidad:1, importe:pieza.precio*1, idTipoElemento:pieza.idTipoElemento});                
                 $scope.total = parseInt($scope.importe) + parseInt(pieza.precio*1)
                 $scope.importe = $scope.total;
                 $scope.total = formatoMoneda($scope.total);
                 exist = false;
            }
        }
        else{
            $scope.arrayItem.push({idItem: pieza.idItem,
                                   numeroParte:pieza.numeroParte,descripcion:pieza.descripcion,
                                   precio:pieza.precio, cantidad:1, importe:pieza.precio*1,idTipoElemento:pieza.idTipoElemento});
            $scope.total = parseInt($scope.importe) + parseInt(pieza.precio*1)
            $scope.importe = $scope.total;
            $scope.total = formatoMoneda($scope.total);
            exist = false;
        }            
    }

    var existsItem = function(pieza){
        $scope.arrayItem.forEach(function(item){
            if(item.idItem == pieza.idItem && item.idTipoElemento == pieza.idTipoElemento)
                exist = true;
        });
        return exist;
    }

    var calculaTotal = function(){
        var total = 0;
        $scope.arrayItem.forEach(function(item){
            total = total + item.importe;
        })
        return formatoMoneda(total);
    }
    
    var formatoMoneda = function(monto){
        return "$" + monto.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    $scope.quitarPieza = function(pieza){
        $scope.arrayItem.forEach(function(item,i){
            if(item.idItem == pieza.idItem && item.idTipoElemento == pieza.idTipoElemento){
                if($scope.arrayItem[i].cantidad > 1){
                    $scope.arrayItem[i].cantidad = item.cantidad - 1;
                    $scope.arrayItem[i].importe = ($scope.arrayItem[i].cantidad) * ($scope.arrayItem[i].precio)
                    $scope.total = calculaTotal();
                } else{
                    $scope.arrayItem.splice(i,1);
                    $scope.total = calculaTotal();
                    $scope.importe = 0;               
                }
            }
        })
    }

    $scope.enviarAutorizacion = function(observaciones){
        cotizacionRepository.insertCotizacionMaestro($scope.idCita, //cambiar a rootScope
                                                    $scope.idUsuario,
                                                    observaciones)
        .then(function(result){
           idCotizacion = result.data[0].idCotizacion; //42;
           $scope.arrayItem.forEach(function(item,i){
               cotizacionRepository.insertCotizacionDetalle(idCotizacion,
                                                            $scope.arrayItem[i].idTipoElemento,
                                                            $scope.arrayItem[i].idItem,
                                                            $scope.arrayItem[i].precio,
                                                            $scope.arrayItem[i].cantidad)
                for (var i=0; i < $scope.arrayItem.length; i++) {
                     cotizacionRepository.insertCotizacionDetalle(idCotizacion,
                        $scope.arrayItem[i].idTipoElemento,
                        $scope.arrayItem[i].idItem,
                        $scope.arrayItem[i].precio,
                        $scope.arrayItem[i].cantidad)
                        .then(function(result){
                            limpiaPantalla();
                            alertFactory.success('Cotización realizada correctamente');
                    },function(error){
                        limpiaPantalla();
                        alertFactory.success('Cotización realizada correctamente');
                    });
                }                
            });           
        }, function (error){
        });      
    }

    var limpiaPantalla = function(){
        $scope.total = 0;
        $scope.arrayItem = [];
        $scope.pieza = '';
        $scope.listaPiezas = '';
    }

    $scope.uploadFile = function(file) {
      cotizacionRepository.saveFile('C:/Users/Mario/Documents/atrás.jpg');
        /*.then(function (uploadResponse) {
          // Handle response from server
        alertFactory.success('Evidencia cargada correctamente');
      },function (error) {
        // Handle error from server
        alertFactory.error('Error al subir la Evidencia');
      });*/
    };
});
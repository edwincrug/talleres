// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 28/03/2016
// -- Description: Cotizacion Controller
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller('cotizacionController', function($scope, $rootScope, alertFactory, localStorageService,cotizacionRepository){
    var arrayDescripcion = []; 
    $scope.arrayItem = [];
    var valor = '';
    var id = 0;
    var idItem = 0;
    var existItem = null;
    var idCotizacion = 0;
    var obs = '';
    $scope.total = 0;
    $scope.importe = 0; 
    $scope.idUsuario = 1;
    $scope.message = 'Buscando...';    
    $scope.citaDatos = localStorageService.get('cita');
    $scope.eco = $scope.citaDatos.Eco;
    $scope.marca = $scope.citaDatos.Marca;
    
    $scope.init = function(){
        
        GetItems();
        exist = false;        
    }

    //Busqueda de item (servicio/pieza/refacción)
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

    //Obtiene los items para la busqueda
    var GetItems = function(){
        cotizacionRepository.buscarItems().then(function(result){
            $scope.listaItems = result.data;
            for (var i=0; i < result.data.length; i++) {
                arrayDescripcion.push(result.data[i].descripcion);
            }
            $("#piezaInput").autocomplete({
                source: arrayDescripcion,
                select: function(event,ui) {
                    valor = ui.item.label;
                }
            });
        }, function (error){
        });
    };

    //Calculo de la cotización
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
    };

    var existsItem = function(pieza){
        $scope.arrayItem.forEach(function(item){
            if(item.idItem == pieza.idItem && item.idTipoElemento == pieza.idTipoElemento)
                exist = true;
        });
        return exist;
    };

    var calculaTotal = function(){
        var total = 0;
        $scope.arrayItem.forEach(function(item){
            total = total + item.importe;
        })
        return formatoMoneda(total);
    };
    
    var formatoMoneda = function(monto){
        return "$" + monto.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    //Eliminar la pieza de la cotizacion
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
    };

    //Envia la cotización para autorización
    $scope.enviarAutorizacion = function(observaciones){
        //$('#buttonEnviar').button('loading');
        if(observaciones == null){
            obs = '';
        } else {
            obs = observaciones;
        }
        cotizacionRepository.insertCotizacionMaestro($scope.citaDatos.idCita,
                                                    $scope.idUsuario,
                                                    obs)
        .then(function(resultado){
           $scope.idCotizacion = resultado.data[0].idCotizacion;
           $scope.idTrabajo = resultado.data[0].idTrabajo;
           $scope.arrayItem.forEach(function(item,i){
                cotizacionRepository.insertCotizacionDetalle($scope.idCotizacion,
                                                            item.idTipoElemento,
                                                            item.idItem,
                                                            item.precio,
                                                            item.cantidad)
                .then(function(result){
                    var x = document.getElementById("uploader");
                    var y = (x.contentWindow || x.contentDocument);
                    if (y.document)
                        var z = y.document.getElementById("submit2");
                        var idTrabajo = y.document.getElementById("idTrabajo");
                        var idCotizacion = y.document.getElementById("idCotizacion");
                        var idCita = y.document.getElementById("idCita");
                        var idUsuario = y.document.getElementById("idUsuario");
                        var idTipoEvidencia = y.document.getElementById("idTipoEvidencia");
                        idTrabajo.value = $scope.idTrabajo;
                        idCotizacion.value = $scope.idCotizacion;
                        idCita = $scope.citaDatos.idCita;
                        idUsuario = $scope.idUsuario;
                        idTipoEvidencia = 1;
                        z.click();                   
                        alertFactory.success('Guardando Archivos');
                },function(error){
                    alertFactory.error('Error');
                });             
            });                   
        }, function (error){
            alertFactory.error('Error');
        });

    };

    //Limpiar pantalla
    var limpiaPantalla = function(){
        $scope.total = 0;
        $scope.arrayItem = [];
        $scope.pieza = '';
        $scope.listaPiezas = '';
    };

    $scope.FinishSave = function(){
        //$('#buttonEnviar').button('reset');
        alertFactory.success('Cotizacion guardada correctamente');
    }
});
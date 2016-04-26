// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 28/03/2016
// -- Description: Cotizacion Controller
// -- Modificó: Mario Mejía
// -- Fecha: 
// -- =============================================
registrationModule.controller('cotizacionController', function($scope, $rootScope, alertFactory, localStorageService,cotizacionRepository){
    $scope.arrayItem = [];
    $scope.arrayCambios = [];
    var valor = '';
    var id = 0;
    var idItem = 0;
    var existItem = null;
    var idCotizacion = 0;
    var obs = '';
    var ext = '';
    var type = '';
    var idTrabajo = 0;
    var idCotizacion = 0;
    var idTaller = 0;
    var idUnidad = 0;
    var tipoEvidencia = 2;//Cotización
    $scope.editar = 0;
    $scope.total = 0;
    $scope.importe = 0; 
    $scope.idUsuario = 1;
    $scope.message = 'Buscando...';  
    $scope.numEconomico = '';
    $scope.modeloMarca = '';
    $scope.trabajo = '';     

    $scope.init = function(){
        datosCita();
        exist = false;
        $scope.objCita = localStorageService.get('objCita');//Objeto de la pagina de cita
        
        //Se valida si la cotización es para editar
        if(localStorageService.get('objEditCotizacion') != null){
            $scope.editCotizacion = localStorageService.get('objEditCotizacion');//objeto de la pagina autorizacion
            datosFicha();
            $scope.editar = 1;
            $scope.estado = 2;
            $scope.editarCotizacion($scope.editCotizacion.idCotizacion,
                             $scope.editCotizacion.idTaller);
        } else{   
            $scope.estado = 1;
        }
    }

    //Busqueda de item (servicio/pieza/refacción)
    $scope.buscarPieza = function(pieza){
        if(pieza == '' || pieza == null){
            alertFactory.info("Ingrese un dato para búsqueda");
        } else{
                if($scope.objCita == null){
                    idTaller = $scope.citaDatos.idTaller;
                } else{
                    idTaller = $scope.objCita.idTaller;
                }
                $scope.promise = cotizacionRepository.buscarPieza(idTaller,pieza).then(function(result){
                $scope.listaPiezas = result.data;             
            }, function (error){
                alertFactory.error('Error');
            }); 
        }
        pieza = '';    
    }

    //Se agregan los items para el calculo de la cotización
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
                 //Se agrega el item seleccionado al array
                 $scope.arrayItem.push({numeroPartida: pieza.numeroPartida,idItem: pieza.idItem,
                                       numeroParte:pieza.numeroParte,item:pieza.item,
                                       precio:pieza.precio, cantidad:1, importe:pieza.precio*1, idTipoElemento:pieza.idTipoElemento, idEstatus: 9});
                 if($scope.editar == 1){
                    $scope.arrayCambios.push({numeroPartida: pieza.numeroPartida,idItem: pieza.idItem,
                                       numeroParte:pieza.numeroParte,item:pieza.item,
                                       precio:pieza.precio, cantidad:1, importe:pieza.precio*1, idTipoElemento:pieza.idTipoElemento, idEstatus: 9});
                 }                 
                 calcularImporte();
                 $scope.total = calculaTotal();
                 exist = false;
            }
        }
        else{
            //Se agrega el item seleccionado al array
            $scope.arrayItem.push({numeroPartida: pieza.numeroPartida,idItem: pieza.idItem,
                                   numeroParte:pieza.numeroParte,item:pieza.item,
                                   precio:pieza.precio, cantidad:1, importe:pieza.precio*1,idTipoElemento:pieza.idTipoElemento, idEstatus: 9});
            if($scope.editar == 1){
                $scope.arrayCambios.push({numeroPartida: pieza.numeroPartida,idItem: pieza.idItem,
                                           numeroParte:pieza.numeroParte,item:pieza.item,
                                           precio:pieza.precio, cantidad:1, importe:pieza.precio*1, idTipoElemento:pieza.idTipoElemento, idEstatus: 9});
            }
            calcularImporte();
            $scope.total = calculaTotal(); 
            exist = false;
        }            
    };

    //Valida si el item ya existe en la cotización
    var existsItem = function(pieza){
        $scope.arrayItem.forEach(function(item){
            if(item.idItem == pieza.idItem && item.idTipoElemento == pieza.idTipoElemento)
                exist = true;
        });
        return exist;
    };

    //Calcula el total de la cotización
    var calculaTotal = function(){
        var total = 0;
        $scope.arrayItem.forEach(function(item){
            total = total + item.importe;
        })
        return formatoMoneda(total);
    };

    //Calcula el total de la cotización en modo editar
    var calculaTotalEditar = function(){
        var total = 0;
        $scope.arrayItem.forEach(function(item){
            total = total + item.precio;
        })
        return formatoMoneda(total);
    };

    //Calcula el importe de la cotización
    var calcularImporte = function(){
        var importe = 0;
        $scope.arrayItem.forEach(function(item){
            item.importe = parseFloat(item.precio) * parseFloat(item.cantidad);
        })
    }
    
    //Da el formato de moneda
    var formatoMoneda = function(monto){
        return "$" + monto.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    //Eliminar la pieza de la cotización
    $scope.quitarPieza = function(pieza){
        $scope.arrayItem.forEach(function(item,i){
            if(item.idItem == pieza.idItem && item.idTipoElemento == pieza.idTipoElemento){
                if($scope.arrayItem[i].cantidad > 1){
                    $scope.arrayItem[i].cantidad = item.cantidad - 1;
                    $scope.arrayItem[i].importe = ($scope.arrayItem[i].cantidad) * ($scope.arrayItem[i].precio)
                    $scope.total = calculaTotal();
                    if($scope.editar == 1){
                        $scope.arrayCambios[i].cantidad = $scope.arrayItem[i].cantidad; 
                    }                    
                } else{
                    $scope.arrayItem.splice(i,1);                                       
                    $scope.total = calculaTotal();
                    $scope.importe = 0;
                    if($scope.editar == 1){
                        $scope.arrayCambios[i].idEstatus = 10;//Estatus Eliminado
                    }                     
                }
            }
        })
    };

    //Envia la cotización para autorización
    $scope.enviarAutorizacion = function(observaciones){
        //$('#buttonEnviar').button('loading');
        if($scope.arrayItem.length == 0){
            alertFactory.info('Debe seleccionar items para la cotización');
        } else{
            if($scope.objCita == null){
            idUnidad = $scope.citaDatos.idUnidad;
        }else{
            idUnidad = $scope.objCita.idUnidad;
        }
        cotizacionRepository.insertCotizacionMaestro($scope.citaDatos.idCita,
                                                    $scope.idUsuario,
                                                    observaciones,
                                                    idUnidad)
        .then(function(resultado){
           alertFactory.success('Guardando Cotización Maestro');
           $scope.idCotizacion = resultado.data[0].idCotizacion;
           $scope.idTrabajo = resultado.data[0].idTrabajo;
           $scope.arrayItem.forEach(function(item,i){
                cotizacionRepository.insertCotizacionDetalle($scope.idCotizacion,
                                                            item.idTipoElemento,
                                                            item.idItem,
                                                            item.precio,
                                                            item.cantidad,
                                                            item.idEstatus)
                .then(function(result){
                    alertFactory.success('Guardando Cotización Detalle');
                    var formArchivos = document.getElementById("uploader");
                    var contentForm = (formArchivos.contentWindow || formArchivos.contentDocument);
                    if (contentForm.document)
                        var btnSubmit = contentForm.document.getElementById("submit2");                
                        var elements = contentForm.document.getElementById("uploadForm").elements;
                    for(var i = 0; i < elements.length; i++)
                    {
                        if(elements[i].value != ""){
                            $scope.nombreArchivo = elements[i].value;
                            $scope.tipoArchivo = obtenerExtArchivo($scope.nombreArchivo);
                            $scope.idTipoArchivo = obtenerTipoArchivo($scope.tipoArchivo);                            
                            cotizacionRepository.insertEvidencia(tipoEvidencia,
                                                                $scope.idTipoArchivo,
                                                                $scope.idUsuario,
                                                                $scope.idCotizacion,
                                                                $scope.nombreArchivo)
                            .then(function(result){ 
                                alertFactory.success('Evidencia Guardada Correctamente');  
                                
                            },function(error){
                                alertFactory.error('Error');
                            });
                        }                        
                    }
                    //Submit del botón del Form para subir los archivos
                    idTrabajo = contentForm.document.getElementById("idTrabajo");
                    idCotizacion = contentForm.document.getElementById("idCotizacion");
                    idTrabajo.value = $scope.idTrabajo;
                    idCotizacion.value = $scope.idCotizacion;         
                    btnSubmit.click();                                                           
                },function(error){
                    alertFactory.error('Error');
                });             
            });                   
        }, function (error){
            alertFactory.error('Error');
        });
        }        
    };

    //Termina de guardar la información de los archivos
    $scope.FinishSave = function(){
        //$('#buttonEnviar').button('reset');
        alertFactory.success('Guardando Archivos');
        location.href = '/cotizacionConsulta';
    }

    //Se obtiene la extensión del archivo
    var obtenerExtArchivo = function(file){
        $scope.file = file;
        var res = $scope.file.substring($scope.file.length-4, $scope.file.length)
        return res;
    }

    //Obtener el tipo de archivo
    var obtenerTipoArchivo = function(ext){
        if(ext == '.pdf' || ext == '.doc' || ext == '.xls' || ext == '.docx' || ext == '.xlsx'){
            type = 1;
        } else if(ext == '.jpg' || ext == '.png' || ext == '.gif' || ext == '.bmp'){
            type = 2;
        } else {
            type = 3;
        }
        return type;
    }

    //Carga los datos de la cotizacion a editar
    $scope.editarCotizacion = function(idCotizacion,idTaller){
        cotizacionRepository.editarCotizacion($scope.editCotizacion.idCotizacion,
                                              $scope.editCotizacion.idTaller)
        .then(function(result){
            $scope.arrayItem = result.data;
            $scope.arrayCambios = $scope.arrayItem.slice();
            $scope.observaciones = result.data[0].observaciones;
            $scope.total = calculaTotalEditar();
            $scope.importe = calcularImporte();
        },function(error){
            alertFactory.error('Error');
        }); 
    }

    //Actualización de la cotización
    $scope.updateCotizacion =  function(observaciones){
        $scope.arrayCambios.forEach(function(item,i){
            cotizacionRepository.updateCotizacion($scope.editCotizacion.idCotizacion,
                                                  item.idTipoElemento,
                                                  item.idItem,
                                                  item.precio,
                                                  item.cantidad,
                                                  observaciones,
                                                  item.idEstatus)
            .then(function(result){
                alertFactory.success('Cotización Actualizada ');
                var formArchivos = document.getElementById("uploader");
                var contentForm = (formArchivos.contentWindow || formArchivos.contentDocument);
                if (contentForm.document)
                    var btnSubmit = contentForm.document.getElementById("submit2");                
                    var elements = contentForm.document.getElementById("uploadForm").elements;
                for(var i = 0; i < elements.length; i++)
                {
                    if(elements[i].value != ""){
                        $scope.nombreArchivo = elements[i].value;
                        $scope.tipoArchivo = obtenerExtArchivo($scope.nombreArchivo);
                        $scope.idTipoArchivo = obtenerTipoArchivo($scope.tipoArchivo);                            
                        cotizacionRepository.insertEvidencia(tipoEvidencia,
                                                            $scope.idTipoArchivo,
                                                            $scope.idUsuario,
                                                            $scope.editCotizacion.idCotizacion,
                                                            $scope.nombreArchivo)
                        .then(function(result){ 
                            alertFactory.success('Evidencia Guardada Correctamente');                              
                        },function(error){
                            alertFactory.error('Error');
                        });
                    }                        
                }
                //Submit del botón del Form para subir los archivos
                idTrabajo = contentForm.document.getElementById("idTrabajo");
                idCotizacion = contentForm.document.getElementById("idCotizacion");
                idTrabajo.value = $scope.editCotizacion.idTrabajo;
                idCotizacion.value = $scope.editCotizacion.idCotizacion;         
                btnSubmit.click();
                localStorageService.remove('objEditCotizacion');
                location.href = '/cotizacionConsulta';
            },function(error){
                alertFactory.error('Error');
            });
        })        
    }

    //Se obtienen datos de la unidad a editar
    var datosFicha = function(){
        if(localStorageService.get('objFicha') != null){
            $scope.objFicha = localStorageService.get('objFicha');
            $scope.numEconomico = $scope.objFicha[0].clienteNumEconomico;
            $scope.modeloMarca = $scope.objFicha[0].marca + '  ' + $scope.objFicha[0].modelo;
            $scope.trabajo = $scope.objFicha[0].trabajo; 
        }        
    }

    //Se obtienen datos de la cita para generar la cotización
    var datosCita = function(){
        if(localStorageService.get('cita') != null){
           $scope.citaDatos = localStorageService.get('cita');//Objeto de la pagina de tallerCita 
           $scope.numEconomico = $scope.citaDatos.numEconomico;
           $scope.modeloMarca = $scope.citaDatos.modeloMarca;
           $scope.trabajo = $scope.citaDatos.trabajo;     
        }       
    }
});
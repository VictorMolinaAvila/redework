(function () {
    'use strict';

    angular.module('app.table')
        .controller('nutritionController', ['$mdEditDialog', '$q', '$scope', '$timeout', '$state', 'tabelaService', nutritionController])
        .service('tabelaService', function($http, $window) {

    this.todasVagas = function(){
    return $http.get("http://localhost:8091/vaga/");
  }

  this.todasVagasBuscar = function(busca){
    return $http.get("http://localhost:8091/vaga/ObterVagasDoFiltroSelecionado/"+busca.cargo.id);
  }

  this.candidato = function(){
    var user_id = window.sessionStorage.getItem('user_id');
    return $http.get("http://localhost:8091/candidato/"+user_id);
  }

  this.selecao = function(){
    var user_id = window.sessionStorage.getItem('user_id');
    return $http.get("http://localhost:8091/notificacao/candidato/"+user_id);
  }

  this.todosCurriculos = function(){
    var user_id = window.sessionStorage.getItem('user_id');
    return $http.get("http://localhost:8091/curriculo/candidato/"+user_id);
  }

  this.todasAreas = function(){
    return $http.get("http://localhost:8091/areaAtuacao/");
  }

  this.buscaCargo = function(id){
    return $http.get("http://localhost:8091/cargo/ObterCargosDaAreaDeAtuacaoSelecionada/"+id);
    }

  
   this.obterEmpresa = function(vaga){
    return $http.get("http://localhost:8091/empresa/"+ vaga.empresa.empresa_id);
  }

  this.curriculoRecebido = function(empresa, curriculo, vaga){
    $http({
        url: 'http://localhost:8091/curriculorecebido',
        method: "POST",
        headers: {
           'Content-Type': 'application/json'
         },
        data: {"empresa": empresa, "curriculo": curriculo, "vaga":vaga}
    })
    .then(function(d){

    },
    function(d){

    });
  }



  });

    function nutritionController($mdEditDialog, $q, $scope, $timeout, $state, tabelaService) {
        
        $scope.selected = [];
        $scope.limitOptions = [5, 10, 15];
        $scope.curriculos = {};
        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };
        
        $scope.query = {
            order: 'descricao',
            limit: 5,
            page: 1
        };

        tabelaService.todasAreas().then(function(d){

          $scope.areas = d.data;
          
       
      });

      tabelaService.candidato().then(function(d){

          $scope.candidato = d.data;
          
       
      });

      tabelaService.selecao().then(function(d){

          $scope.notificacoes = d.data;
          
       
      });


        tabelaService.todasVagas().then(function(d){

          $scope.vagas = d.data;
          
          tabelaService.todosCurriculos().then(function(d){

          $scope.curriculos = d.data;
          
      });
       
      });

        $scope.buscaCargo = function (busca) {
        
            //busca = JSON.parse(busca)
           tabelaService.buscaCargo(busca.id).then(function(d){

          $scope.cargos = d.data;
          
      });
        };

            $scope.buscar= function (busca) {
        
            //busca = JSON.parse(busca)
           tabelaService.todasVagasBuscar(busca).then(function(d){

          $scope.vagas = d.data;
          
       
      });

        };

          $scope.candidatar = function (vaga, curriculo) {
           vaga.curriculo = undefined;
           console.log(vaga);
           tabelaService.obterEmpresa(vaga).then(function(d){
            var empresa = d.data;
            tabelaService.curriculoRecebido(empresa, curriculo, vaga);

        });

        };

        $scope.desserts = {
            "count": 9,
            "data": [
                {
                    "name": "Frozen yogurt",
                    "type": "Ice cream",
                    "calories": { "value": 159.0 },
                    "fat": { "value": 6.0 },
                    "carbs": { "value": 24.0 },
                    "protein": { "value": 4.0 },
                    "sodium": { "value": 87.0 },
                    "calcium": { "value": 14.0 },
                    "iron": { "value": 1.0 }
                }, 
            ]
        };
        
        $scope.editComment = function (event, dessert) {
            event.stopPropagation(); // in case autoselect is enabled
            
            var editDialog = {
                modelValue: dessert.comment,
                placeholder: 'Add a comment',
                save: function (input) {
                    if(input.$modelValue === 'Donald Trump') {
                        input.$invalid = true;
                        return $q.reject();
                    }
                    if(input.$modelValue === 'Bernie Sanders') {
                        return dessert.comment = 'FEEL THE BERN!'
                    }
                    dessert.comment = input.$modelValue;
                },
                targetEvent: event,
                title: 'Add a comment',
                validators: {
                    'md-maxlength': 30
                }
            };
            
            var promise;
            
            if($scope.options.largeEditDialog) {
                promise = $mdEditDialog.large(editDialog);
            } else {
                promise = $mdEditDialog.small(editDialog);
            }
            
            promise.then(function (ctrl) {
                var input = ctrl.getInput();
                
                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        };
        
        $scope.toggleLimitOptions = function () {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
        };
        
        $scope.getTypes = function () {
            return ['Candy', 'Ice cream', 'Other', 'Pastry'];
        };
        
        $scope.loadStuff = function () {
            $scope.promise = $timeout(function () {
                // loading
            }, 2000);
        }
        
        $scope.logItem = function (item) {
            console.log(item.name, 'was selected');
        };
        
        $scope.logOrder = function (order) {
            console.log('order: ', order);
        };
        
        $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        }
    }

})(); 
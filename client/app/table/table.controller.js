(function () {
    'use strict';

    angular.module('app.table')
        .controller('nutritionController', ['$mdEditDialog', '$q', '$scope', '$timeout', 'tabelaService', nutritionController])
        .service('tabelaService', function($http, $window) {

    this.todasVagas = function(){
    return $http.get("http://localhost:8090/vaga");
  }

  this.todosCurriculos = function(){
    return $http.get("http://localhost:8090/curriculo");
  }
  
    this.obterEmpresa = function(vaga){
    return $http.get("http://localhost:8090/empresa/"+vaga.empresa.id);
  }


  this.curriculoRecebido = function(empresa, curriculo, vaga){
         $http({
        url: 'http://localhost:8090/curriculorecebido',
        method: "POST",
        data: {"empresa":empresa , "curriculo":curriculo, "vaga":vaga}
    })
    .then(function(response) {

    },
    function(response) { // optional
            // failed
    });
  }







  });




    function nutritionController($mdEditDialog, $q, $scope, $timeout, tabelaService) {
        $scope.selected = [];
        $scope.limitOptions = [5, 10, 15];
        
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


         tabelaService.todasVagas().then(function(d){

          $scope.vagas = d.data;
          
           tabelaService.todosCurriculos().then(function(d){
                 $scope.curriculos = d.data;
            });
      });


          $scope.candidatar = function(vaga, curriculo) {
           vaga.curriculo = undefined;

           console.log(vaga);

           tabelaService.obterEmpresa(vaga).then(function(d){
                 var empresa = d.data;
                 tabelaService.curriculoRecebido(empresa, curriculo, vaga);
            });
           console.log(curriculo);




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
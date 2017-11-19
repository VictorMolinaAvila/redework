(function () {
    'use strict';

    angular.module('app.ui.form')
        .controller('curriculoListarController', ['$scope', '$q', '$timeout', '$window', '$mdDialog','$state', 'curriculoListarService', curriculoListarController])
         .service('curriculoListarService', function($http, $window) {

    this.obterCurriculos = function(){
    var user_id = window.sessionStorage.getItem('user_id');
    return $http.get("http://localhost:8090/curriculo/candidato/"+user_id);
  }

   this.deletarCurriculo = function(id){
     $http.delete("http://localhost:8090/curriculo/"+id);
     window.location.reload();
  }

});


    function curriculoListarController ($scope, $q, $timeout, $window, $mdDialog, $state, curriculoListarService) {
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

          $scope.toggleLimitOptions = function () {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
        };

        $scope.curriculos = {};

     

     curriculoListarService.obterCurriculos().then(function(d){

          $scope.curriculos = d.data;
          console.log(d.data);
       
      });

     

        $scope.criar = function () {
            
        $state.go('curriculo/criar');

        };

        $scope.editar = function (id) {
            
        $state.go('curriculo/editar', {id: id});

        };

        $scope.deletar = function (id , ev) {
        var confirm = $mdDialog.confirm()
                        .title('Realmente deseja remover?')
                        .targetEvent(ev)
                        .ok('Remover')
                        .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                
          curriculoListarService.deletarCurriculo(id);

             });

        };

       
        

    }
})(); 

(function () {
    'use strict';

    angular.module('app')
        .controller('certificacaoListarController', ['$scope', '$window', '$mdDialog', '$state','certificacaoListarService', certificacaoListarController])
         .service('certificacaoListarService', function($http, $window) {

  this.obterCertificacao = function(){
    var user_id = window.sessionStorage.getItem('user_id');
    return $http.get("http://localhost:8090/certificacao/candidato/"+user_id);
  }

   this.deletarCertificacao = function(id){
     $http.delete("http://localhost:8090/certificacao/"+id);
     window.location.reload();
  }



  
      });   

    function certificacaoListarController ($scope, $window, $mdDialog, $state, certificacaoListarService) {
        $state.transitionTo($state.current, {reload:true, inherit: false, notify:true});
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
   
        certificacaoListarService.obterCertificacao().then(function(d){

          $scope.certificacoes = d.data;
       
      });

        $scope.criar = function () {
            
        $state.go('certificacao/criar');

        };

        $scope.editar = function (id) {
            
        $state.go('certificacao/editar', {id: id});

        };

        $scope.deletar = function (id , ev) {
        var confirm = $mdDialog.confirm()
                        .title('Realmente deseja remover?')
                        .targetEvent(ev)
                        .ok('Remover')
                        .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                
          certificacaoListarService.deletarCertificacao(id);

             });

        };


    }
})(); 

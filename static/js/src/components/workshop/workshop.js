import template from './workshop.html';

export default function($timeout, $stateParams, code, blockly, Workspaces) {
  return {
    template: template,
    controllerAs: 'vm',
    scope: {
      model: '='
    },
    controller: function($scope) {
      this.workshop = $scope.model;
      this.selected = 'blocks';
      this.selectBlocks = selectBlocks;
      this.selectCode = selectCode;
      restoreWorkspace( this.workshop._id );

      function selectBlocks() {
        this.selected = 'blocks';
      }

      function selectCode() {
        this.selected = 'code';
        this.code = code.generate();
      }

      function restoreWorkspace(workshopId) {
        Workspaces.load( workshopId ).then(function(result) {
          if ( result ) {
            blockly.reloadWorkspace( result.data );
          }
        });
      }

    },
    link: function(scope, element) {

      $timeout(function() {
        blockly.init(element.find('#blockly')[0], element.find('#toolbox')[0]);
      }, 0, false);

      $( window ).resize(function() {
        element.find('.tab-content').css('height', $(window).height() - 100 + 'px' );
      });

    }
  };
}

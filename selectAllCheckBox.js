(function() {
   var app = angular.module('UserMgr');
   
   app.directive('selectAllCheckbox', function() {
      return {
         replace: true,
         restrict: 'E',
         scope: {
            checkboxes: '=',
            allselected: '=allSelected',
            allclear: '=allClear'
         },
         template: '<input type="checkbox" ng-model="master" ng-change="masterChange()">',
         controller: function($scope, $element) {
            $scope.masterChange = function() {
               if ($scope.master) {
                  angular.forEach($scope.checkboxes, function(cb, index) {
                     cb.isSelected = true;
                  });
               } else {
                  angular.forEach($scope.checkboxes, function(cb, index) {
                     cb.isSelected = !$scope.preIndeterminate;
                  });
               }
            };

            $scope.$watch('checkboxes', function() {
               var allSet = $scope.checkboxes.length > 0,
                  allClear = true;

               angular.forEach($scope.checkboxes, function(cb, index) {
                  if (cb.isSelected) {
                     allClear = false;
                  } else {
                     allSet = false;
                  }
               });

               if ($scope.allselected !== undefined) {
                  $scope.allselected = allSet;
               }
               if ($scope.allclear !== undefined) {
                  $scope.allclear = allClear;
               }

               $element.prop('indeterminate', false);
               if (allSet) {
                  $scope.preIndeterminate = true;
                  $scope.master = true;
               } else if (allClear) {
                  $scope.preIndeterminate = false;
                  $scope.master = false;
               } else {
                  $scope.preIndeterminate = $scope.master===null ? $scope.preIndeterminate:$scope.master;
                  $scope.master = null;
                  $element.prop('indeterminate', true);
               }

            }, true);
         }
      };
   });
})();

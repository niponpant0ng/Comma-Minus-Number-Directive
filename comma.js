var app = angular.module('Comma', [])
.directive('comma', ['$filter', function($filter){
  return {
    restrict: 'A',
    scope: {
      number: '=ngModel'
    },
    require: '?ngModel',

    link: function(scope, element, attrs, refModelCtrl)
    {
      if(!refModelCtrl)
      {
        return;
      }

      // $parsers called as soon as the value in the form input is modified by the user
      refModelCtrl.$parsers.push(function(val)
      {
        var _isTypeMinusBeforeZero = function(text)
        {
          return text === '-0';
        };
        var _isOneCharAndCharIsNotMinus = function(text){
          return text !== '-';
        };
        var clean = val;

        if(_isTypeMinusBeforeZero(val))
        {
          clean = '-';
        }
        else if(_isOneCharAndCharIsNotMinus(val))
        {
          clean = $filter('convertToNumber')(val);
          clean = $filter('number')(clean);
        }

        if (val !== clean)
        {
          refModelCtrl.$setViewValue(clean);// set new value at the element.(element is marked to dirty)
          refModelCtrl.$render();// update element to show new value from above command
        }

        return clean;
      });
    }
  };
}])
.filter('convertToNumber', function(){
  return function(text){
    if(isNaN(text))
    {
      return parseFloat(text.replace(/,/g, ''));
    }

    return parseFloat(text);
  };
});
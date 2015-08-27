var app = angular.module('Comma', [])
.directive('comma', ['$filter', function($filter){
  return {
    restrict: 'A',
    scope: {
      number: '=ngModel'
    },
    require: '?ngModel',

    controller: ['$scope', function($scope) {
      $scope.number = $filter('comma')($scope.number, false);
    }],

    link: function(scope, element, attrs, refModelCtrl)
    {
      if(!refModelCtrl)
      {
        return;
      }

      // $parsers called as soon as the value in the form input is modified by the user
      refModelCtrl.$parsers.push(function(val)
      {
        clean = $filter('comma')(val);

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
})
.filter('comma', ['$filter', function($filter){
  var _isTypeMinusBeforeZero = function(text)
  {
    return text === '-0';
  };

  var _isOneCharAndCharIsNotMinus = function(text){
    return text !== '-';
  };

  var _isOneCharAndCharIsDot = function(text)
  {
    return text === '.';
  };

  var _isFoundOneDot = function(text)
  {
    var count = 0;
    for(var pos = text.indexOf('.'); pos !== -1; pos = text.indexOf('.', pos + 1))
    {
      count++;
    }

    return count === 1;
  };

  return function(text, isNotSkipCheckDot){
    if(text == undefined)
    {
      return '';
    }
    if(isNotSkipCheckDot == undefined)
      isNotSkipCheckDot = true;

    text = text.toString();
    var clean = text;

    if(_isTypeMinusBeforeZero(text))
    {
      clean = '-';
    }
    else if(_isOneCharAndCharIsDot(text))
    {
      clean = '0';
    }
    else if(isNotSkipCheckDot && _isFoundOneDot(text));
    else if(_isOneCharAndCharIsNotMinus(text))
    {
      clean = $filter('convertToNumber')(text);
      clean = $filter('number')(clean);
    }

    return clean;
  };
}]);

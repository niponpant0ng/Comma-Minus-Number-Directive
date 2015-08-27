directive use for put comma into value but that can support negative value too
## How to use
This directive use with `angular.js` then add `Comma` as a dependency for your app:
```html
angular.module('myApp', ['Comma']);
```
and use it by put `comma` as attribute in element
```html
<input type="text" ng-model="number" comma="ngModel"/>
```

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import swimlanes from '../imports/components/swimlanes/swimlanes';
var angularDragula = require('angular-dragula');


angular.module('counterpoint', [
  angularMeteor,
  angularDragula(angular),
  swimlanes.name
]);

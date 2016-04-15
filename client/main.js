import angular from 'angular';
import angularMeteor from 'angular-meteor';
import swimlanes from '../imports/components/swimlanes/swimlanes';


angular.module('counterpoint', [
  angularMeteor,
  swimlanes.name
]);

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import swimlaneTemplate from './swimlanes.html';

class SwimlanesCtrl {
  constructor() {
    this.swimlanes = [{
      title: 'Backlog',
      cards: [
        {
          title: "Cool Feature",
          description: "These are coooool features!"
        },
        {
          title: "Unexciting Bug",
          description: "This is a bug that needs to be fixed."
        }
      ]

    }, {
      title: 'Development'
    }, {
      title: 'Test'
    },
    {
      title: 'Complete'
    }
   ];
  }
}

export default angular.module('swimlanes', [
  angularMeteor
])
  .component('swimlanes', {
    templateUrl: 'imports/components/swimlanes/swimlanes.html',
    controller: SwimlanesCtrl
  });

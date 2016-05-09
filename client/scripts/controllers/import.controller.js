var Papa = require('papaparse');

angular.module('counterpoint').controller('ImportCtrl', function ($scope, $mdDialog, $rootScope, $timeout, $mdToast) {

	angular.element('#csv_file').on('change', function (e) {
		var file = e.target.files[0]
		if (file.type != 'text/csv') {
			var msg = "this file type is " + file.type + ", not CSV"
			console.log(msg);
			toast(msg);
			return;
		}

		Papa.parse(file, {
			header: true,
			delimiter: "#",
			skipEmptyLines: true,
			complete(results, file) {
				$scope.headers = results.meta.fields;
				$scope.data = results.data;
			},
			error(err, file) {
				toast(err.message);
				console.log(err.message);
			}
		});
	});

	function sanitize(unsanitized) {
		console.log("Unsanitized: " + unsanitized);
		return unsanitized.replace(/\\/g, "").replace(/\n/g, "").replace(/\r/g, "")
			.replace(/\t/g, "").replace(/\f/g, "").replace(/"/g, "")
			.replace(/'/g, "").replace(/\&/g, "");
	}
	$scope.upload = function (e) {
		$scope.uploading = true;
		var backlog = null;
		angular.forEach($scope.data, function (task, index) {
			console.log(task);
			console.log("Summary " + task["Summary"]);
			Tasks.insert({
				name: task["Summary"].substring(0, 80),
				points: task["Story Points"],
				description: task["Summary"]
			}, function (error, task_id) {
				if (error == null || error == undefined) {
					backlog = Swimlanes.findOne({ name: "Backlog" });
					if (backlog == null) {
						Swimlanes.insert({
							name: "Backlog",
							order: 1,
							tasks: []
						});
					}
					backlog = Swimlanes.findOne({ name: "Backlog" });
					Swimlanes.update({ _id: backlog._id }, { $push: { tasks: { $each: [task_id] } } });
					console.log("in " + index);
					if (index == $scope.data.length - 1) {
						console.log("Done");
						$timeout(function () {
							$scope.uploading = false;
							$scope.data = [];
							$scope.headers = [];
							angular.element('#csv_file').val('');
							toast("File imported successfully");

						}, 1000);
					}
				} else {
					console.log(error);
					toast("Error while importing tasks");
				}
			});
		});
	};
	function toast(message) {
		$mdToast.show(
			$mdToast.simple()
				.textContent(message)
				.position("top right")
				.hideDelay(3000)
			);
	}
	$scope.helpers({
		data: function () {
			return [];
		},
		headers: function () {
			return [];
		},
		uploading: function () {
			return false;
		}

	});
});

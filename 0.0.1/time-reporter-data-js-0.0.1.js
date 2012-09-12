// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/time-reporter-data-js-0.0.1 -->

(function($, AJ) {
	$.initTimeReporterData = function(params) {

		// final parameters
		var client = params.client;

		// constants
		var aWorkUnit = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/1/1/n/Web_Time_Reporter_Docume/Types/Work_Unit");

		var aStartTime = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/1/1/n/Web_Time_Reporter_Docume/Types/Start_Time");

		var anEndTime = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/1/1/n/Web_Time_Reporter_Docume/Types/End_Time");

		var aWorkTimeInMinutes = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/1/1/n/Web_Time_Reporter_Docume/Types/Minutes_Worked");

		var anActivitiesDescription = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/1/1/n/Web_Time_Reporter_Docume/Types/Activities");

		var aProjectName = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/1/1/n/Web_Time_Reporter_Docume/Types/Project");

		var aCommentsText = client
				.reference("http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/1/1/n/Web_Time_Reporter_Docume/Types/Comments");

		var trd = {};

		trd.submit = function(node, timeData, onSuccess) {

			client.appendSafe({
				node: "unit",
				to: node,
				atClosestAddress: './',
				onSuccess: function(ar) {
					trd.priv.submitData(ar.appendedNode, timeData);
					trd.priv.appendText(node, timeData);
					onSuccess(ar.appendedNode);
				}
			});


		};

		trd.priv = {};

		trd.priv.submitData = function(node, timeData) {

			client.append({
				node : aWorkUnit,
				to : node
			});

			var startTime = client.append({
				node : timeData.startDate,
				to : node,
				atAddress : "./startTime"
			});

			client.append({
				node : aStartTime,
				to : startTime
			});

			var endTime = client.append({
				node : timeData.endDate,
				to : node,
				atAddress : "./endTime"
			});

			client.append({
				node : anEndTime,
				to : endTime
			});

			var minutesWorked = client.append({
				node : timeData.minutesWorked,
				to : node,
				atAddress : "./minutesWorked"
			});

			client.append({
				node : aWorkTimeInMinutes,
				to : minutesWorked
			});

			if (timeData.activities) {

				var activities = client.append({
					node : timeData.activities,
					to : node,
					atAddress : "./activities"
				});

				client.append({
					node : anActivitiesDescription,
					to : activities
				});

			}

			if (timeData.project) {
				var project = client.append({
					node : timeData.project,
					to : node,
					atAddress : "./project"
				});

				client.append({
					node : aProjectName,
					to : project
				});

			}

			if (timeData.comments) {

				var comments = client.append({
					node : timeData.comments,
					to : node,
					atAddress : "./comments"
				});

				client.append({
					node : aCommentsText,
					to : comments
				});
			}
		};

		trd.priv.generateText = function(timeData) {

			return "Unit [" + timeData.minutesWorked / 30 + " "
					+ timeData.project + " " + timeData.startDate + " -> "
					+ timeData.endDate + "]\n\n" + "Activites: "
					+ timeData.activities + "\n\n" + "Comments: "
					+ timeData.comments;

		};

		trd.priv.appendText = function(node, timeData) {

			var valueNode = client.dereference({
				ref : node
			});

			if (typeof valueNode === 'string' || valueNode instanceof String) {

				client.replace({
					node : node,
					withNode : valueNode + "\n"
							+ trd.priv.generateText(timeData)
				});

				return;
			}

			if (valueNode.value
					&& typeof valueNode.value === 'function'
					&& (typeof valueNode.value() === 'string' || valueNode
							.value() instanceof String)) {

				var newValue = client.updateValue({
					forNode : valueNode,
					newValue : valueNode.value() + "\n"
							+ trd.priv.generateText(timeData)
				});

				client.replace({
					node : node,
					withNode : newValue
				});

			}

		};

		return {
			submit : trd.submit
		};
	};

})(jQuery, AJ);

// <!-- one.end -->

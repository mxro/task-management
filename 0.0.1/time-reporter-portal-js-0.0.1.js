// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/time-reporter-portal-js-0.0.1 -->

(function($) {

	$.initTimeReporterPortal = function(params) {

		var elem = params.elem;
		var client = params.client;

		var form = $.initTimeReporterForm({
			elem : $(".timereporterform", elem)
		});

		var data = $.initTimeReporterData({
			client : client
		});

		// init ui
		(function() {

			$('.reportTimeButton', elem).click(
					function(evt) {
						evt.preventDefault();

						var operation = $('input[name=optionsRadios]:checked',
								elem).val();

						if (operation === "newPage") {
							alert("Operation not supported yet.");
							return;
						}

						if (operation === "existingPage") {

							var nodeAddress = $('.nodeAddress', elem)

							$('.portal', elem).hide();
							AJ.ui.showProgressBar();
							client.load({
								url : nodeAddress,
								secret : AJ.userNodeSecret,
								onSuccess : function(res) {
									AJ.ui.hideProgressBar();
									form.show(function(timeData) {
										form.hide();
										AJ.ui.showProgressBar();

										data.submit(res.loadedNode, timeData);

										client.commit({
											onSuccess : function() {
												AJ.ui.hideProgressBar();
												$('.portal', elem).show();
											}
										});

									});
								}
							});

							return;
						}
					});
		})();

		return {

		};
	};

})(jQuery);

// <!-- one.end -->

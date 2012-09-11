// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/time-reporter-portal-js-0.0.1 -->

(function($) {

		$.initTimeReporterPortal = function(params) {

			var elem = params.elem;

			var form =  $.initTimeReporterForm({elem: $(".timereporterform", elem)});
			
			// init ui
			(function() {
				
				
				$('.reportTimeButton', elem).click(function(evt) {
					evt.preventDefault();
					
					var operation= $('input[name=optionsRadios]:checked', elem).val();
					
					if (operation === "newPage") {
						alert("Operation not supported yet.");
						return;
					}
					
					if (operation === "existingPage") {
						
						var nodeAddress = $('.nodeAddress', elem)

						$('.portal', elem).hide();
						
						form.show(function(timeData) {
							form.hide();
							$('.portal', elem).show();
							
						});
						
						return;
					}
				});
			}) ();
			
			return {

			};
		};

	})(jQuery);

// <!-- one.end -->

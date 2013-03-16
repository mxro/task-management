// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/time-reporter-form-js-0.0.1 -->

(function($) {

	$.initTimeReporterForm = function(params) {

		var elem = params.elem;

		if (elem.length <= 0)
			throw "Please define valid element";

		var tr = {};

		tr.startDate = null;
		tr.minutesPaused = null;
		tr.minutesWorked = null;
		tr.endDate = null;
		tr.effectivenessRating = 4;
		tr.timer = null;
		tr.onFinalized = null;
		tr.onDiscard = null;
		tr.pauseStart = null;

		tr.show = function(onFinalized, onDiscard) {
			tr.onFinalized = onFinalized;
			tr.onDiscard = onDiscard;
			tr.startDate = new Date();
			tr.minutesPaused = 0.0;
			tr.endData = null;
			tr.minutesWorked = 0.0;
			tr.effectivenessRating = 4;
			
			//$('.timerDetails', elem).hide();

			$('.startTime', elem).html("undefined"/*new Date() + " "*/);

			$('.pausedTime', elem).html("00:00:00");

			$('.pauseNow', elem).removeAttr('disabled');
			$('.unpause', elem).attr('disabled', 'disabled');

			$('.minutesWorked', elem).val("0.000");

			$('.unitsWorked', elem).html("0.00");

			$('.activities', elem).val(" ");

			$('.project', elem).val("");

			$('.comments', elem).val(" ");
			
			$('.rateButton', elem).removeClass('active');
			$('.defaultRateButton', elem).addClass('active');
			
			$('.startButton', elem).removeAttr('disabled');
			
			$('.finalizeButton', elem).removeAttr('disabled');
			$('.discardButton', elem).removeAttr('disabled');
			
			elem.show();

		};

		tr.hide = function() {
			elem.hide();
		};
		
		tr.start = function() {
			// $('.timerDetails', elem).fadeIn('fast');
			tr.priv.startTimer();
		};

		tr.finalize = function() {
			var l={};
			if (tr.timer) {
				tr.priv.stopTimer();
				l.startDate = tr.startDate;
				l.endDate = new Date();
			} else {
				l.startDate = " ";
				l.endDate = " ";
			}
		
			res = {
				startDate : l.startDate,
				endDate : l.endDate,
				minutesWorked : $(".minutesWorked").val(),
				activities : $('.activities', elem).val(),
				project : $('.project', elem).val(),
				comments: $('.comments', elem).val(),
				effectivenessRating: tr.effectivenessRating
			};

			tr.onFinalized(res);

		};

		tr.discard = function() {
			tr.priv.stopTimer();
			
			tr.onDiscard();
		};
		
		tr.priv = {};

		tr.priv.startTimer = function() {
			if (tr.timer) {
				return;
			}
			$('.startTime', elem).html(new Date() + " ");
			tr.timer = setInterval(function() {
				if (tr.startDate) {
					var minutesPaused;
					if (!tr.pauseStart) {
						minutesPaused = tr.minutesPaused;
					} else {
						minutesPaused = tr.minutesPaused
								+ (new Date().getTime() - tr.pauseStart
										.getTime()) / (1000 * 60);
					}
					var minutes = (new Date().getTime() - tr.startDate
							.getTime())
							/ (1000 * 60) - minutesPaused;
					var units = minutes / 30;

					tr.minutesWorked = minutes;

					var minutesTxt = minutes + " ";
					var pausedTxt = minutesPaused + " ";
					if (minutesPaused === 0) {
						pausedTxt = "0.00";
					}
					var unitsTxt = units + " ";
					$('.minutesWorked', elem).val(minutesTxt.substring(0, 5));
					$('.pausedTime', elem).html(pausedTxt.substring(0, 5));
					$('.unitsWorked', elem).html(unitsTxt.substring(0, 5));
				}
			}, 1000);
		};

		tr.priv.stopTimer = function() {
			clearInterval(tr.timer);
			tr.timer = null;
		};

		// init Ui

		$('.startButton', elem).click(function(evt) {
			evt.preventDefault();
			tr.start();
			$('.startButton', elem).attr('disabled', 'disabled');
			
		});

		$('.pauseNow', elem).click(function(evt) {
			evt.preventDefault();
			tr.pauseStart = new Date();
			$('.unpause', elem).removeAttr('disabled');
			$('.pauseNow', elem).attr('disabled', 'disabled');
		});

		$('.unpause', elem).click(
				function(evt) {
					evt.preventDefault();
					tr.minutesPaused = tr.minutesPaused
							+ (new Date().getTime() - tr.pauseStart.getTime())
							/ (1000 * 60);
					tr.pauseStart = null;
					$('.pauseNow', elem).removeAttr('disabled');
					$('.unpause', elem).attr('disabled', 'disabled');
				});

		
		$('.rateButton', elem).click(function(evt) {
			evt.preventDefault();
			$('.rateButton').removeClass('active');
			$(this).addClass('active');
			tr.effectivenessRating = parseInt($('a', this).html());
			
		});
		
		$('.finalizeButton', elem).click(function(evt) {
			evt.preventDefault();
			tr.finalize();
			$('.finalizeButton', elem).attr('disabled', 'disabled');
			$('.discardButton', elem).attr('disabled', 'disabled');
		});

		$('.discardButton', elem).click(function(evt) {
			evt.preventDefault();
			tr.discard();
			$('.finalizeButton', elem).attr('disabled', 'disabled');
			$('.discardButton', elem).attr('disabled', 'disabled');
		});
		
		return {
			show : tr.show,
			hide: tr.hide,
			start : tr.start,
			finalize : tr.finalize,
			discard: tr.discard
		};
	};

})(jQuery);

// <!-- one.end -->

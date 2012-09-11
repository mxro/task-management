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
		tr.timer = null;
		tr.onFinalized = null;
		tr.pauseStart = null;

		tr.show = function(onFinalized) {
			tr.onFinalized = onFinalized;
			tr.startDate = new Date();
			tr.minutesPaused = 0.0;
			tr.endData = null;
			tr.minutesWorked = 0.0;

			$('.timerDetails', elem).hide();

			$('.startTime', elem).html(new Date() + " ");

			$('.pausedTime', elem).html("00:00:00");

			$('.pauseNow', elem).removeAttr('disabled');
			$('.unpause', elem).attr('disabled', 'disabled');

			$('.minutesWorked', elem).html("0.00");

			$('.unitsWorked', elem).html("0.00");

			$('.activities', elem).val(" ");

			$('.project', elem).val("1");

			$('.startButton', elem).removeAttr('disabled');
			
			elem.show();

		};

		tr.hide = function() {
			elem.hide();
		};
		
		tr.start = function() {
			$('.timerDetails', elem).fadeIn('fast');
			tr.priv.startTimer();
		};

		tr.finalize = function() {
			tr.priv.stopTimer();

			res = {
				startDate : tr.startDate,
				endDate : new Date(),
				minutesWorked : tr.minutesWorked,
				activities : $('.activites', elem).val(),
				project : $('.project', elem).val()
			};

			tr.onFinalized(res);

		}

		tr.priv = {};

		tr.priv.startTimer = function() {
			if (tr.timer) {
				return;
			}

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
					$('.minutesWorked', elem).html(minutesTxt.substring(0, 5));
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
			$('.finalizeButton', elem).removeAttr('disabled');
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

		$('.finalizeButton', elem).click(function(evt) {
			evt.preventDefault();
			tr.finalize();
			$('.finalizeButton', elem).attr('disabled', 'disabled');
		});

		return {
			show : tr.show,
			hide: tr.hide,
			start : tr.start,
			finalize : tr.finalize
		};
	};

})(jQuery);

// <!-- one.end -->

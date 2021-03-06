// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/time-reporter-form-js-0.0.1 -->

(function($) {

	$.initTimeReporterForm = function(params) {

		var rootElem = params.elem;
		var elem = null;
		
		if (rootElem.length <= 0) {
			throw "Please define valid element";
		}

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

		tr.show = function(type, onFinalized, onDiscard) {
			if (type === "measureTime") {
				elem = $(".measure", rootElem);
				$('.measure').show();
				$('.manualEntry').hide();
				tr.start();
			} else if (type === "manualEntry") {
				elem = $(".manualEntry", rootElem);
				$('.measure').hide();
				$('.manualEntry').show();
			} else {
				
				alert("Invalid type for time reporting: "+type);
				throw "Invalid type for time reporting: "+type;
			}
			
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
			
			$('.startButton', rootElem).removeAttr('disabled');
			
			$('.finalizeButton', rootElem).removeAttr('disabled');
			$('.discardButton', rootElem).removeAttr('disabled');
			
			
			rootElem.show();
			elem.show();

		};

		tr.hide = function() {
			rootElem.hide();
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
				minutesWorked : $('.minutesWorked', elem).val(),
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

		$('.startButton', rootElem).click(function(evt) {
			evt.preventDefault();
			tr.start();
			$('.startButton', rootElem).attr('disabled', 'disabled');
			
		});

		$('.pauseNow', rootElem).click(function(evt) {
			evt.preventDefault();
			tr.pauseStart = new Date();
			$('.unpause', rootElem).removeAttr('disabled');
			$('.pauseNow', rootElem).attr('disabled', 'disabled');
		});

		$('.unpause', rootElem).click(
				function(evt) {
					evt.preventDefault();
					tr.minutesPaused = tr.minutesPaused
							+ (new Date().getTime() - tr.pauseStart.getTime())
							/ (1000 * 60);
					tr.pauseStart = null;
					$('.pauseNow', rootElem).removeAttr('disabled');
					$('.unpause', rootElem).attr('disabled', 'disabled');
				});

		
		$('.rateButton', rootElem).click(function(evt) {
			evt.preventDefault();
			$('.rateButton').removeClass('active');
			$(this).addClass('active');
			tr.effectivenessRating = parseInt($('a', this).html());
			
		});
		
		$('.finalizeButton', rootElem).click(function(evt) {
			evt.preventDefault();
			tr.finalize();
			$('.finalizeButton', rootElem).attr('disabled', 'disabled');
			$('.discardButton', rootElem).attr('disabled', 'disabled');
		});

		$('.discardButton', rootElem).click(function(evt) {
			evt.preventDefault();
			tr.discard();
			$('.finalizeButton', rootElem).attr('disabled', 'disabled');
			$('.discardButton', rootElem).attr('disabled', 'disabled');
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

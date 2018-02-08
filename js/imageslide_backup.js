

(function($) {

/*
	var ImageSliderViewer = {
		Init : function(options) {

		},
		Next : function() {

		},
		Previous : function() {

		},
		SetCurrent : function() {

		}

	};
*/


	$.fn.Imageslide = function() {
		return this.each(function() {
			


			var self = $(this);
			/*
			var defaults = {
				showthumbs : true
			};
			var objOption = $.extend({}, defaults, option);
*/



			var ImageSlide = {
				objCurrent : null,
				strArrowLeft : '<svg width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve"><polyline fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "/></svg>',
				strArrowRight : '<svg width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve"><polyline fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/></svg>',

				Init : function() {
					var objImages = self.children('.imageslide-images');
	
					var strImageNavigation = '';
					objImages.children('img').each(function() {
						strImageNavigation += '<div style="background-image: url(\''+$(this).attr('src')+'\')"></div>';
					});

					self.append('<div class="imageslide-text"></div><div class="imageslide-imagenavigation">'+strImageNavigation+'</div>');
					self.children('.imageslide-images').prepend('<div class="imageslide-button prev">'+ImageSlide.strArrowLeft+'</div><div class="imageslide-button next">'+ImageSlide.strArrowRight+'</div>');
					
					this.SetCurrent(objImages.children('img').first());
					this.__UpdateText();

					$(self).on('click', '.imageslide-button', function() {
						ImageSlide.objCurrent = objImages.children('.current');
						if($(this).hasClass('prev')) {
							ImageSlide.Previous();
						} else {
							ImageSlide.Next();
						}
					});

					$(self).on('click', '.imageslide-imagenavigation div', function() {
						var intIndex = $(this).index();
						var objSwitch = $(objImages.children('img')[intIndex]);
						if(objSwitch.length) {
							ImageSlide.SetCurrent(objSwitch);
						}
					});

					$(self).on('swipeleft', function() {
						ImageSlide.objCurrent = objImages.children('.current');

						ImageSlide.Next();
						return false;
					});

					$(self).on('swiperight', function() {
						ImageSlide.objCurrent = objImages.children('.current');

						ImageSlide.Previous();
						return false;
					});
				},
				Next : function() {
					var objSwitch = this.objCurrent.next('img');
					if(!objSwitch.length) {
						this.SetFirst();
					} else {
						this.SetCurrent(objSwitch);
					}
				},
				Previous : function() {
					var objSwitch = this.objCurrent.prev('img');
					if(!objSwitch.length) {
						this.SetLast();
					} else {
						this.SetCurrent(objSwitch);
					}
				},
				SetCurrent : function(objSwitch) {
					self.intCurrentIndex = objSwitch.index() - 2;
					self.children('.imageslide-images').children('img').removeClass('current');
					objSwitch.addClass('current');

					this.__UpdateThumbNavigation();
					this.__UpdateText();
				},
				SetFirst : function() {
					objSwitch = self.children('.imageslide-images').children('img').first();
					this.SetCurrent(objSwitch);
				},
				SetLast : function() {
					objSwitch = self.children('.imageslide-images').children('img').last();
					this.SetCurrent(objSwitch);
				},
				__UpdateThumbNavigation : function() {
					self.children('.imageslide-imagenavigation').children('div').removeClass('current').removeClass('prev-current').removeClass('next-current');
					$(self.children('.imageslide-imagenavigation').children('div')[self.intCurrentIndex]).addClass('current');
					$(self.children('.imageslide-imagenavigation').children('div')[self.intCurrentIndex-1]).addClass('prev-current');
					$(self.children('.imageslide-imagenavigation').children('div')[self.intCurrentIndex+1]).addClass('next-current');
				},
				__UpdateText : function() {
					var strText = self.intCurrentIndex+1 + ' av ' + self.children('.imageslide-images').children('img').length;
					self.children('.imageslide-text').text(strText);
				}
			};
			ImageSlide.Init();
		});
	};


}(jQuery));




$(function() {
	$('#imageslide').Imageslide();
	$('#imageslide2').Imageslide();
	$('#imageslide3').Imageslide();
});
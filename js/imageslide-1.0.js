(function($) {
	$.fn.Imageslide = function(options) {
		var args = Array.prototype.slice.call(arguments, 0);
		return this.each(function() {
			var self = $(this);
			var plugin = this;
			var defaults = {
				'start' : 0,
				'showthumbs' : true,
				'showtext' : true,
				'countertext' : '{x} of {y}'
			};
			var objImages = self.children('.imageslide-images');
			
			var ImageSlide = {
				strArrowLeft : '<svg width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve"><polyline fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "/></svg>',
				strArrowRight : '<svg width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve"><polyline fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/></svg>',

				Init : function() {
					this.__AddNavigation();
					this.__BindEvents();
					this.__UpdateText();
					this.__InitStandardSettings();
					this.SetCurrentByIndex(objOptions.start);

					if(objImages.children('img').length <= 1) {
						this.__DisableArrows();
					}
				},

				Next : function() {
					var objSwitch = plugin.objCurrent.next('img');
					if(!objSwitch.length) {
						this.SetFirst();
					} else {
						this.SetCurrent(objSwitch);
					}
				},
				Previous : function() {
					var objSwitch = plugin.objCurrent.prev('img');
					if(!objSwitch.length) {
						this.SetLast();
					} else {
						this.SetCurrent(objSwitch);
					}
				},
				SetCurrentByIndex : function(intIndex) {
					var objSwitch = $(objImages.children('img')[intIndex]);
					this.SetCurrent(objSwitch);
				},
				SetCurrent : function(objSwitch) {
					self.intCurrentIndex = objSwitch.index() - 2;
					self.children('.imageslide-images').children('img').removeClass('current');
					objSwitch.addClass('current');
					plugin.objCurrent = objSwitch;

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
					var strText = objOptions.countertext.replace('{x}', self.intCurrentIndex+1);
					strText = strText.replace('{y}', self.children('.imageslide-images').children('img').length);
					self.children('.imageslide-text').text(strText);
				},
				__InitStandardSettings : function() {
					console.log(objOptions.showthumbs);
					if(objOptions.showthumbs) {
						self.find('.imageslide-imagenavigation').show();
					} else {
						self.find('.imageslide-imagenavigation').hide();
					}
					if(objOptions.showtext) {
						self.find('.imageslide-text').show();
					} else {
						self.find('.imageslide-text').hide();
					}
				},
				__BindEvents : function() {
					$(self).on('click', '.imageslide-button', function() {
						plugin.objCurrent = objImages.children('.current');
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
						plugin.objCurrent = objImages.children('.current');
						ImageSlide.Next();
						return false;
					});

					$(self).on('swiperight', function() {
						plugin.objCurrent = objImages.children('.current');
						ImageSlide.Previous();
						return false;
					});
				},
				__AddNavigation : function() {
					var strImageNavigation = '';
					objImages.children('img').each(function() {
						strImageNavigation += '<div style="background-image: url(\''+$(this).attr('src')+'\')"></div>';
					});

					self.append('<div class="imageslide-text"></div><div class="imageslide-imagenavigation">'+strImageNavigation+'</div>');
					self.children('.imageslide-images').prepend('<div class="imageslide-button prev">'+ImageSlide.strArrowLeft+'</div><div class="imageslide-button next">'+ImageSlide.strArrowRight+'</div>');
				},
				__DisableArrows : function() {
					self.find('.imageslide-button').hide();
					self.find('.imageslide-imagenavigation').hide();
					self.find('.imageslide-text').hide();
				}
			};

			if(options == undefined || typeof options === 'object' ) {
				var objOptions = $.extend({}, defaults, options)
				ImageSlide.Init();
			} else if(typeof options === 'string') {
				switch(options) {
					case 'Next':
						ImageSlide.Next();
						break;
					case 'Previous':
						ImageSlide.Previous();
						break;
					case 'SetLast':
						ImageSlide.SetLast();
						break;
					case 'SetFirst':
						ImageSlide.SetFirst();
						break;
					case 'SetIndex':
						ImageSlide.SetCurrentByIndex(args[1]);
						break;
				}
			}
			
		});
	};

}(jQuery));
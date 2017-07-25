/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(min-width: 961px) and (max-width: 1880px)',
		normal: '(min-width: 961px) and (max-width: 1620px)',
		narrow: '(min-width: 961px) and (max-width: 1250px)',
		narrower: '(max-width: 960px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {
		$("#wayoutfile").load("projects/wayout.html");

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');
			var url = document.URL;
			//alert(url);
			if(url == "https://muhsuanchen.github.io/")
				window.location = "https://muhsuanchen.github.io/index.html";
			else if(url == "https://muhsuanchen.github.io")
				window.location = "https://muhsuanchen.github.io/index.html";

			$window.on('load', function() {
				$body.removeClass('is-loading');

				if(url.includes("#"))
				{
					var id = url.substring(url.lastIndexOf('#') + 1);
					//sole.logcon(url);
					//console.log(id);
					if (id) {
						//alert(id);
						//console.log(id);
						var idObj = document.getElementById(id);
						//console.log(idObj.getAttribute("class"));
						idObj.click();
					}
				}
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly();

		// Nav.
			var $nav_a = $('#nav a');

			// Scrolly-fy links.
				$nav_a
					.scrolly()
					.on('click', function(e) {

						var t = $(this),
							href = t.attr('href');

						if (href[0] != '#')
							return;

						e.preventDefault();

						// Clear active and lock scrollzer until scrolling has stopped
							$nav_a
								.removeClass('active')
								.addClass('scrollzer-locked');

						// Set this link to active
							t.addClass('active');

					});

			// Initialize scrollzer.
				var ids = [];

				$nav_a.each(function() {

					var href = $(this).attr('href');

					if (href[0] != '#')
						return;

					ids.push(href.substring(1));

				});

				$.scrollzer(ids, { pad: 200, lastHack: true });

		// Header (narrower + mobile).

			// Toggle.
				$(
					'<div id="headerToggle">' +
						'<a href="#header" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Header.
				$('#header')
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'header-visible'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#headerToggle, #header, #main')
						.css('transition', 'none');


		/*---------------------------
		 Listener for data-reveal-id attributes
		----------------------------*/

			$('a[data-reveal-id]').click(function(event) {
				/*event.preventDefault();*/
				//console.log($(this).attr('data-reveal-id'));
				var modalLocation = $(this).attr('data-reveal-id');
				$('#'+modalLocation).reveal($(this).data());
			});

		/*---------------------------
		 Extend and Execute
		----------------------------*/

		    $.fn.reveal = function(options) {
		        
		        
		        var defaults = {  
			    	animation: 'fadeAndPop', //fade, fadeAndPop, none
				    animationspeed: 300, //how fast animtions are
				    closeonbackgroundclick: true, //if you click background will modal close?
				    dismissmodalclass: 'close-reveal-modal' //the class of a button or element that will close an open modal
		    	}; 
		    	
		        //Extend dem' options
		        var options = $.extend({}, defaults, options); 
			
		        return this.each(function() {
		        
		/*---------------------------
		 Global Variables
		----------------------------*/
		        	var modal = $(this),
		        		topMeasure  = parseInt(modal.css('top')),
						topOffset = modal.height() + topMeasure,
		          		locked = false,
						modalBG = $('.reveal-modal-bg');

		/*---------------------------
		 Create Modal BG
		----------------------------*/
					if(modalBG.length == 0) {
						modalBG = $('<div class="reveal-modal-bg" />').insertAfter(modal);
					}		    
		     
		/*---------------------------
		 Open & Close Animations
		----------------------------*/
					//Entrance Animations
					modal.bind('reveal:open', function () {
					  modalBG.unbind('click.modalEvent');
						$('.' + options.dismissmodalclass).unbind('click.modalEvent');
						if(!locked) {
							lockModal();
							if(options.animation == "fadeAndPop") {
								modal.css({'top': $(document).scrollTop()-topOffset, 'opacity' : 0, 'display' : 'block'});
								modalBG.fadeIn(options.animationspeed/2);
								modal.delay(options.animationspeed/2).animate({
									"top": $(document).scrollTop()+topMeasure + 'px',
									"opacity" : 1
								}, options.animationspeed,unlockModal());					
							}
							if(options.animation == "fade") {
								modal.css({'opacity' : 0, 'display' : 'block'});
								modalBG.fadeIn(options.animationspeed/2);
								modal.delay(options.animationspeed/2).animate({
									"opacity" : 1
								}, options.animationspeed,unlockModal());					
							} 
							if(options.animation == "none") {
								modal.css({'display' : 'block', 'top':$(document).scrollTop()+topMeasure});
								modalBG.css({"display":"block"});	
								unlockModal()				
							}
						}
						modal.unbind('reveal:open');
						//console.log('modal is open.');
						/*navigator.userAgent.match(/Android/i)
							 || navigator.userAgent.match(/webOS/i)
							 || navigator.userAgent.match(/iPhone/i)
							 || navigator.userAgent.match(/iPad/i)
							 || navigator.userAgent.match(/iPod/i)
							 || navigator.userAgent.match(/BlackBerry/i)
							 || navigator.userAgent.match(/Windows Phone/i) */
						if( window.innerWidth <= 960 ){
						    $("body").addClass("modal-open-mobile");
						    $("body").ontouchmove = function(e){ e.preventDefault(); }
						} else {
							console.log('desktop.');
							$("body").addClass("modal-open");
						}

						
						document.getElementById("headerToggle").style.display = "none";
						//document.body.addEventListener("touchmove", freezeVp, false);
						//$(this).addEventListener("touchmove", AVfreeze, false);
						//document.getElementsByTagName("BODY")[0].ontouchmove = function(e){ e.preventDefault(); }
					}); 	



					//Closing Animation
					modal.bind('reveal:close', function () {
					  if(!locked) {
							lockModal();
							if(options.animation == "fadeAndPop") {
								modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
								modal.animate({
									"top":  $(document).scrollTop()-topOffset + 'px',
									"opacity" : 0
								}, options.animationspeed/2, function() {
									modal.css({'top':topMeasure, 'opacity' : 1, 'display' : 'none'});
									unlockModal();
								});					
							}  	
							if(options.animation == "fade") {
								modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
								modal.animate({
									"opacity" : 0
								}, options.animationspeed, function() {
									modal.css({'opacity' : 1, 'display' : 'none'});
									unlockModal();
								});					
							}  	
							if(options.animation == "none") {
								modal.css({'display' : 'none', 'top' : topMeasure});
								modalBG.css({'display' : 'none'});	
							}		
						}
						modal.unbind('reveal:close');
						//console.log('modal is close.');
						
						if( window.innerWidth <= 960 ){
						    $("body").removeClass("modal-open-mobile");
						    $("body").ontouchmove = function(e){ return true; }
						} else {
							$("body").removeClass("modal-open");
						}
						document.getElementById("headerToggle").style.display = "block";
						//document.body.removeEventListener("touchmove", freezeVp, false);
						//document.getElementsByTagName("BODY")[0].ontouchmove = function(e){ return true; }
					});

				var freezeVp = function(e) {
				    e.preventDefault();
				};
				var AVfreeze = function(e) {
				    return true;
				};
		   	
		/*---------------------------
		 Open and add Closing Listeners
		----------------------------*/
		        	//Open Modal Immediately
		    	modal.trigger('reveal:open')
					
					//Close Modal Listeners
					var closeButton = $('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
					  modal.trigger('reveal:close')
					});
					
					if(options.closeonbackgroundclick) {
						modalBG.css({"cursor":"pointer"})
						modalBG.bind('click.modalEvent', function () {
						  modal.trigger('reveal:close')
						});
					}
					$('body').keyup(function(e) {
		        		if(e.which===27){ modal.trigger('reveal:close'); } // 27 is the keycode for the Escape key
					});
					
					
		/*---------------------------
		 Animations Locks
		----------------------------*/
					function unlockModal() { 
						locked = false;
					}
					function lockModal() {
						locked = true;
					}	
					
		        });//each call
		    }//orbit plugin call

	});

})(jQuery);

/* Image Slider */
var slideIndex = 1;
//showSlides(slideIndex);

function plusSlides(n, str) {
	showSlides(slideIndex += n, str);
}

function currentSlide(n, str) {
	showSlides(slideIndex = n, str);
}

function showSlides(n, str) {
	var current_slider = document.getElementById(str);
	var imageDiv, dotDiv;
	for (var i = 0; i < current_slider.childNodes.length; i++) {
		if (current_slider.childNodes[i].className == "slideshow-container")
			imageDiv = current_slider.childNodes[i];
		else if (current_slider.childNodes[i].className == "dot-container")
			dotDiv = current_slider.childNodes[i];
	}

	var firstImage, lastImage;
	var imageCount = 0;
	for (var i = 0; i < imageDiv.childNodes.length; i++) {
		//console.log("image className " + imageDiv.childNodes[i].className);
	    if (imageDiv.childNodes[i].className == "SlideImage fade") {
	    	if(imageCount == 0)
	    		firstImage = imageDiv.childNodes[i];
	    	else
	    		lastImage = imageDiv.childNodes[i];

	    	if(imageCount == slideIndex-1)
	    		imageDiv.childNodes[i].style.display = "block";
	    	else
	      		imageDiv.childNodes[i].style.display = "none";
	      	imageCount++;
	    }        
	}
	//console.log("imageCount " + imageCount);
	if (n > imageCount) {
		slideIndex = 1;
		firstImage.style.display = "block";
	} 
	if (n < 1) {
		slideIndex = imageCount;
		lastImage.style.display = "block";
	}

	var dotCount = 0;
	//console.log("slideIndex " + slideIndex);
	for (var i = 0; i < dotDiv.childNodes.length; i++) {
	    if (dotDiv.childNodes[i].className == "SlideImageDot" || dotDiv.childNodes[i].className == "SlideImageDot active") {
	    	if(dotCount == slideIndex-1)
	    		dotDiv.childNodes[i].className = "SlideImageDot active";
	    	else
	      		dotDiv.childNodes[i].className = "SlideImageDot";
	      	dotCount++;
	    }        
	}
}


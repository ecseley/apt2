(function ($, window, document, undefined) {

  'use strict';

  $(function () {
	// FireShell
		// Navigation
		$(document).ready(function() {
		  var menuToggle = $('#js-mobile-menu').unbind();
		  $('#js-navigation-menu').removeClass('show');

		  menuToggle.on('click', function(e) {
		    e.preventDefault();
		    $('#js-navigation-menu').slideToggle(function(){
		      if($('#js-navigation-menu').is(':hidden')) {
		        $('#js-navigation-menu').removeAttr('style');
		      }
		    });
		  });
		});

		/* open folding content */
		$('.cd-gallery a').on('click', function(event) {
			event.preventDefault();
			openItemInfo($(this).attr('href'));
		});

		/* close folding content */
		$('.cd-folding-panel .cd-close').on('click', function(event) {
			event.preventDefault();
			toggleContent('', false);
		});
		$('.cd-gallery').on('click'), 
/*jshint -W025 */
		function(event) {
			/* detect click n .cd-gallery::before when the .cd-folding-panel is open */
			if($(event.target).id('.cd-gallery') && ('.fold-is-open').length > 0 ) {
				toggleContent('', false);
			}
		}

		function openItemInfo(url) {
			/* check if mobile or desktop */
			var mq = viewportSize();
			if ($('.cd-gallery').offset().top > $(window).scrollTop() && mq !== 'mobile') {
				/* if content is visible above the .cd-gallery - scroll before opening the folding panel */
				$('body, html').animate({
					'scrollTop': $('.cd-gallery').offset().top
				}, 100, function() {
					toggleContent(url, true);
				});
			} else {
				toggleContent(url, true);
			}
		}

		function toggleContent(url, bool) {
			if ( bool ) {
				/* load and show new content */
				var foldingContent = $('.cd-fold-content');
				foldingContent.load(url+' .cd-fold-content > *', function(event){
					setTimeout(function() {
						$('body').addClass('overflow-hidden');
						$('.cd-folding-panel').addClass('is-open');
						$('.cd-main').addClass('fold-is-open');
					}, 100);
				});
			} else {
				/* close the folding panel */
				var mq = viewportSize();
				$('.cd-folding-panel').removeClass('is-open');
				$('.cd-main').removeClass('fold-is-open');

				(mq === 'mobile' || $('.no-csstransitions').length > 0 )
					/* according to the mq, immediately remove the .overflow-hidden of wait for the end of the animation */
					? $('body').removeClass('overflow-hidden')

					: $('.cd-main').find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
						$('body').removeClass('overflow-hidden');
						$('.cd-main').find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
					});
			}
		}

		function viewportSize() {
			/* retrieve the content value of .cd-main::before to check the actual mq */
			return window.getComputedStyle(document.querySelector('.cd-main'), '::before').getPropertyValue('content');
		}
  });

})(jQuery, window, document);

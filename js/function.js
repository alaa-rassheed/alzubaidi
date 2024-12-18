(function ($) {
	"use strict";

	var $window = $(window);
	var $body = $('body');

	/* Preloader Effect */
	// $window.on('load', function () {
	// 	$(".preloader").fadeOut(600);
	// });

	function initializeFunctions() {

		/* Sticky Header */
		if ($('.active-sticky-header').length) {
			$window.on('resize', function () {
				setHeaderHeight();
			});

			function setHeaderHeight() {
				$("header.main-header").css("height", $('header .header-sticky').outerHeight());
			}

			$(window).on("scroll", function () {
				var fromTop = $(window).scrollTop();
				setHeaderHeight();
				var headerHeight = $('header .header-sticky').outerHeight()
				$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
				$("header .header-sticky").toggleClass("active", (fromTop > 600));
			});
		}

		/* Slick Menu JS */
		$('#menu').slicknav({
			label: '',
			prependTo: '.responsive-menu'
		});

		if ($("a[href='#top']").length) {
			$("a[href='#top']").click(function () {
				$("html, body").animate({ scrollTop: 0 }, "slow");
				return false;
			});
		}

		/* Hero Slider Layout JS */
		const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
			slidesPerView: 1,
			speed: 1000,
			spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 4000,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});

		/* testimonial Slider JS */
		if ($('.testimonial-slider').length) {
			const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
				slidesPerView: 1,
				speed: 1000,
				spaceBetween: 30,
				loop: true,
				autoplay: {
					delay: 3000,
				},
				navigation: {
					nextEl: '.testimonial-button-next',
					prevEl: '.testimonial-button-prev',
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				breakpoints: {
					768: {
						slidesPerView: 2,
					},
					991: {
						slidesPerView: 3,
					}
				}
			});
		}

		/* Skill Bar */
		if ($('.skills-progress-bar').length) {
			$('.skills-progress-bar').waypoint(function () {
				$('.skillbar').each(function () {
					$(this).find('.count-bar').animate({
						width: $(this).attr('data-percent')
					}, 2000);
				});
			}, {
				offset: '50%'
			});
		}

		/* Youtube Background Video JS */
		if ($('#herovideo').length) {
			var myPlayer = $("#herovideo").YTPlayer();
		}

		/* Init Counter */
		if ($('.counter').length) {
			$('.counter').counterUp({ delay: 6, time: 3000 });
		}

		/* Image Reveal Animation */
		if ($('.reveal').length) {
			gsap.registerPlugin(ScrollTrigger);
			let revealContainers = document.querySelectorAll(".reveal");
			revealContainers.forEach((container) => {
				let image = container.querySelector("img");
				let tl = gsap.timeline({
					scrollTrigger: {
						trigger: container,
						toggleActions: "play none none none"
					}
				});
				tl.set(container, {
					autoAlpha: 1
				});
				tl.from(container, 1, {
					xPercent: -100,
					ease: Power2.out
				});
				tl.from(image, 1, {
					xPercent: 100,
					scale: 1,
					delay: -1,
					ease: Power2.out
				});
			});
		}

		/* Text Effect Animation */
		if ($('.text-anime-style-1').length) {
			let staggerAmount = 0.05,
				translateXValue = 0,
				delayValue = 0.5,
				animatedTextElements = document.querySelectorAll('.text-anime-style-1');

			animatedTextElements.forEach((element) => {
				let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.words, {
					duration: 1,
					delay: delayValue,
					x: 20,
					autoAlpha: 0,
					stagger: staggerAmount,
					scrollTrigger: { trigger: element, start: "top 85%" },
				});
			});
		}

		if ($('.text-anime-style-2').length) {
			let staggerAmount = 0.03,
				translateXValue = 20,
				delayValue = 0.1,
				easeType = "power2.out",
				animatedTextElements = document.querySelectorAll('.text-anime-style-2');

			animatedTextElements.forEach((element) => {
				let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.chars, {
					duration: 1,
					delay: delayValue,
					x: translateXValue,
					autoAlpha: 0,
					stagger: staggerAmount,
					ease: easeType,
					scrollTrigger: { trigger: element, start: "top 85%" },
				});
			});
		}

		if ($('.text-anime-style-3').length) {
			let animatedTextElements = document.querySelectorAll('.text-anime-style-3');

			animatedTextElements.forEach((element) => {
				//Reset if needed
				if (element.animation) {
					element.animation.progress(1).kill();
					element.split.revert();
				}

				element.split = new SplitText(element, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});
				gsap.set(element, { perspective: 400 });

				gsap.set(element.split.chars, {
					opacity: 0,
					x: "50",
				});

				element.animation = gsap.to(element.split.chars, {
					scrollTrigger: { trigger: element, start: "top 90%" },
					x: "0",
					y: "0",
					rotateX: "0",
					opacity: 1,
					duration: 1,
					ease: Back.easeOut,
					stagger: 0.02,
				});
			});
		}

		/* Parallaxie js */
		var $parallaxie = $('.parallaxie');
		if ($parallaxie.length && ($window.width() > 991)) {
			if ($window.width() > 768) {
				$parallaxie.parallaxie({
					speed: 0.55,
					offset: 0,
				});
			}
		}

		/* Contact form validation */
		var $contactform = $("#contactForm");
		$contactform.validator({ focus: false }).on("submit", function (event) {
			if (!event.isDefaultPrevented()) {
				event.preventDefault();
				submitForm();
			}
		});

		function submitForm() {
			/* Initiate Variables With Form Content*/
			var fullname = $("#fullname").val();
			var email = $("#email").val();
			var phone = $("#phone").val();
			var subject = $("#subject").val();
			var message = $("#msg").val();

			$.ajax({
				type: "POST",
				url: "form-process.php",
				data: "fullname=" + fullname + "&name=" + "&email=" + email + "&phone=" + phone + "&subject=" + subject + "&message=" + message,
				success: function (text) {
					if (text == "success") {
						formSuccess();
					} else {
						submitMSG(false, text);
					}
				}
			});
		}

		function formSuccess() {
			$contactform[0].reset();
			submitMSG(true, "Message Sent Successfully!")
		}

		function submitMSG(valid, msg) {
			if (valid) {
				var msgClasses = "h3 text-success";
			} else {
				var msgClasses = "h3 text-danger";
			}
			$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
		}
		/* Contact form validation end */

		/* Appointment form validation */
		var $appointmentForm = $("#appointmentForm");
		$appointmentForm.validator({ focus: false }).on("submit", function (event) {
			if (!event.isDefaultPrevented()) {
				event.preventDefault();
				submitappointmentForm();
			}
		});

		function submitappointmentForm() {
			/* Initiate Variables With Form Content*/
			var name = $("#name").val();
			var email = $("#email").val();
			var phone = $("#phone").val();
			var phone = $("#services").val();
			var date = $("#date").val();

			$.ajax({
				type: "POST",
				url: "form-appointment.php",
				data: "name=" + name + "&email=" + email + "&phone=" + phone + "&services=" + services + "&date=" + date,
				success: function (text) {
					if (text == "success") {
						appointmentformSuccess();
					} else {
						appointmentsubmitMSG(false, text);
					}
				}
			});
		}

		function appointmentformSuccess() {
			$appointmentForm[0].reset();
			appointmentsubmitMSG(true, "Message Sent Successfully!")
		}

		function appointmentsubmitMSG(valid, msg) {
			if (valid) {
				var msgClasses = "h3 text-success";
			} else {
				var msgClasses = "h3 text-danger";
			}
			$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
		}
		/* Appointment form validation end */

		/* Animated Wow Js */
		new WOW().init();

		/* Popup Video */
		if ($('.popup-video').length) {
			$('.popup-video').magnificPopup({
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: true
			});
		}
		const imgElement = document.querySelector('.accent-color');
		const svgElement = document.querySelector('svg');

		if (imgElement && svgElement) {
			const computedStyle = getComputedStyle(imgElement);
			const imgColor = computedStyle.color || '#000'; // Default to black if color isn't set
			svgElement.style.fill = imgColor;
		}

	}

	document.addEventListener('DOMContentLoaded', () => {
		initializeFunctions();
		const ease = "power4.inOut";
		const transitionBlock = document.querySelector(".block");
		// Handle navigation transitions
		function handlePageTransition(event) {
			event.preventDefault();
			const link = event.currentTarget;
			const targetUrl = link.getAttribute("href");

			// Skip hash links or current page links
			if (!targetUrl || targetUrl.startsWith("#") || targetUrl === window.location.pathname) {
				return;
			}

			// Push state to History API and fetch new content
			history.pushState(null, null, targetUrl);
			fetchPageContent(targetUrl);
		}

		// Fetch and replace page content
		function fetchPageContent(url) {
			animateExitTransition().then(() => {
				fetch(url)
					.then(response => {
						if (response.ok) {
							return response.text();
						} else {
							throw new Error("Failed to fetch page content");
						}
					})
					.then(html => {
						const parser = new DOMParser();
						const doc = parser.parseFromString(html, "text/html");
						const newContent = doc.querySelector("main");

						// Replace main content
						document.querySelector("main").innerHTML = newContent.innerHTML;

						// Reinitialize links and animations
						initializeFunctions();
						initializePageLinks();
						revealPageEntrance();
					})
					.catch(error => console.error(error));
			});
		}

		// Page entrance animation (fade-in)
		function revealPageEntrance() {
			gsap.set(transitionBlock, { opacity: 1, visibility: "visible" });
			return new Promise((resolve) => {
				gsap.to(transitionBlock, {
					opacity: 0,
					duration: 1,
					ease: ease,
					onComplete: () => {
						transitionBlock.style.visibility = "hidden";
						resolve();
					}
				});
			});
		}

		// Page exit animation (fade-out)
		function animateExitTransition() {
			gsap.set(transitionBlock, { opacity: 0, visibility: "visible" });
			return new Promise((resolve) => {
				gsap.to(transitionBlock, {
					opacity: 1,
					duration: 1,
					ease: ease,
					onComplete: resolve
				});
			});
		}

		// Initialize all links for transitions
		function initializePageLinks() {
			document.querySelectorAll("a").forEach((link) => {
				link.addEventListener("click", handlePageTransition);
			});
		}

		// Handle back/forward navigation
		window.addEventListener("popstate", () => {
			const targetUrl = window.location.pathname;
			fetchPageContent(targetUrl);
		});

		// Run entrance animation on page load
		revealPageEntrance().then(() => {
			initializePageLinks();
		});
	});


})(jQuery);


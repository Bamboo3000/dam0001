'use strict';

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookieMessage()
{
	if(getCookie('cookieConfirm') !== 'yes') {
		document.getElementById('cookieMessage').classList.add('show');
	}
}

function cookieAgree()
{
	setCookie('cookieConfirm', 'yes', 365);
	document.getElementById('cookieMessage').classList.remove('show');
}

function hasClass(el, cls) 
{
	return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}

function slideTo(el)
{
	$('html, body').animate({
		scrollTop: $(el).offset().top
	}, 500);
}

function lazyImages()
{
    $('.lazyset').each(function() {
		var $src = $(this).data('srcset');
		$(this).attr('srcset', $src).removeAttr('data-src');	
    });
	$('.lazy').each(function() {
		var $src = $(this).data('src');
		$(this).attr('src', $src).removeAttr('data-src');	
    });
}

$(document).ready(function() {

    $('.home__references-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        slideTransition: 'ease',
        smartSpeed: 500
    });

    var $owl = $('.galeria__carousel');
    $owl.owlCarousel({
        lazyLoad: true,
        loop: true,
        margin: 0,
        nav: false,
        items: 1,
        autoplay: false,
        slideTransition: 'ease',
        smartSpeed: 300
    });

    $('.galeria__item').on('click', function() {
        if($(window).width() > 575) {
            $('.galeria__modal').fadeIn(300);
            setTimeout(function() {
                $('.galeria__modal').addClass('open');
            }, 300);
            var $data = $(this).data('el');
            $owl.trigger('to.owl.carousel', [$data, 100]);
        }
    });

    $('.galeria__close').on('click', function() {
        $('.galeria__modal').removeClass('open').fadeOut(250);
    });

    $('.galeria__next').on('click', function() {
        $owl.trigger('next.owl.carousel');
    });
    $('.galeria__prev').on('click', function() {
        $owl.trigger('prev.owl.carousel');
    });

    $('.menuOpen').on('click', function() {
        $('.navigation__menu').slideToggle(200);
    });

});

$(window).on('load', function() {
    lazyImages();
    if($('#contact_map').length > 0) {
        initMap();
    }
});

function initMap()
{
	var contact_map = document.getElementById('contact_map');
	var map = new google.maps.Map(contact_map, {
		center: {lat: 50.1850268, lng: 19.4536811},
		zoom: 17,
		draggable: true,
		scaleControl: true,
        streetViewControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
	});
	// var pathArray = location.href.split( '/' );
	// var protocol = pathArray[0];
	// var host = pathArray[2];
	// var $url = protocol + '//' + host;
	// var image = {
	// 	url: $url+'/themes/searchit/assets/img/logo-pin.png',
	// 	// This marker is 20 pixels wide by 32 pixels high.
	// 	size: new google.maps.Size(160, 200),
	// 	// The origin for this image is (0, 0).
	// 	origin: new google.maps.Point(0, 0),
	// 	// The anchor for this image is the base of the flagpole at (0, 32).
	// 	anchor: new google.maps.Point(40, 100),
	// 	scaledSize: new google.maps.Size(80, 100)
	// };
	var marker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(50.1850268,19.4536811),
		// icon: image
	});
	map.set('styles', 
    [
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 33
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text",
            "stylers": [
                {
                    "gamma": "0.75"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "lightness": "-37"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f9f9f9"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "40"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "-37"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "100"
                },
                {
                    "weight": "2"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "80"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": "-4"
                },
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#c5dac6"
                },
                {
                    "visibility": "on"
                },
                {
                    "saturation": "-95"
                },
                {
                    "lightness": "62"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.school",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "gamma": "1.00"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text",
            "stylers": [
                {
                    "gamma": "0.50"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "gamma": "0.50"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#c5c6c6"
                },
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "lightness": "-13"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "lightness": "0"
                },
                {
                    "gamma": "1.09"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e4d7c6"
                },
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "47"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "lightness": "-12"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fbfaf7"
                },
                {
                    "lightness": "77"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "-5"
                },
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "-15"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": "47"
                },
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#acbcc9"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "saturation": "53"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "lightness": "-42"
                },
                {
                    "saturation": "17"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "lightness": "61"
                }
            ]
        }
    ]
	);
}
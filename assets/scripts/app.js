---
---
var hostSite = "2017.campkesemclaremont.us";
{% for modal in site.data.articles %}
// modals
$("#{{ modal.id }}-modal-button").animatedModal({
    modalTarget:'{{ modal.id }}-modal',
    animatedIn:'fadeInUp',
    animatedOut:'fadeOutDown',
    color:'#fff'
});

$("#get-involved-link-modal-button").animatedModal({
    modalTarget:'get-involved-modal',
    animatedIn:'fadeInUp',
    animatedOut:'fadeOutDown',
    color:'#fff'
});

// social-sharing
$("#share-{{ modal.id }}").jsSocials({
    url: "http://" + hostSite + "/{{ modal.id }}",
    text: "{{ modal.title }} - Camp Kesem at the Claremont Colleges",
    shares: ["email", "twitter", "facebook", "googleplus", "linkedin"],
    showCount: false
});
{% endfor %}

// Process animation
var countOptions = {
useEasing : true, 
useGrouping : true, 
separator : ',', 
decimal : '.', 
prefix : '', 
suffix : '' 
};
// financials doughnut
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}
var labels = [];
var financials = [];
var bgColor = [];
var bgHover = [];
var counters = [];
{% assign count = 0 %}
{% for fund in site.data.financials %}
    labels[{{ count }}] = "{{ fund.label }} ";
    financials[{{ count }}] = {{ fund.data }};
    bgColor[{{ count }}] = "{{ fund.color }}";
    bgHover[{{ count }}] = "{{ fund.hover }}";
    {% assign count = count | plus:1 %}
{% endfor %}
var data = {
    labels: labels,
    datasets:[
        {
            data: financials,
            backgroundColor: bgColor,
            hoverBackgroundColor: bgHover,
        }]
};
function makeFinChart() {
    var ctx = document.getElementById('financials').getContext('2d');
    var myDoughnutChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            tooltipFontSize: 20,
            tooltips: 
            {
              callbacks: {
                  label: function(tooltipItem, data, totalD) {
                      var label = data.labels[tooltipItem.index];
                      var value = data.datasets[0].data[tooltipItem.index];
                      var totalD = 0;
                      $.each(financials,function() {
                          totalD += this;
                      });
                      var percentage = Math.round(value / totalD * 100);
                      return label + ' - ' + percentage + '%';
                  }
              }
          },
        }
    });
}
var inView = false;
$(window).scroll(function () {
    if (isScrolledIntoView('#fundraising')) {
        if (inView) {
            return;
        }
        inView = true;
        makeFinChart();
    }
});

// bar chart
var ctx = document.getElementById("fundraising-barchart").getContext('2d');
    
var chart = new Chart(ctx, {
   type: 'bar',
   data: {
      labels: ['Individual Donations', 'Grants', 'Corporate Sponsorships', 'College Funding'], // responsible for how many bars are gonna show on the chart
      // create 12 datasets, since we have 12 items
      // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
      // put 0, if there is no data for the particular bar
      datasets: [{
         label: 'Counselors + Coordinators',
         data: [12492, 0, 0, 0],
         backgroundColor: '#008FBE'
      }, {
         label: 'Advisory Board',
         data: [2500, 0, 0, 0],
         backgroundColor: '#00C08A'
      }, {
         label: 'Kesem Alumni',
         data: [476,0, 0, 0],
         backgroundColor: '#A4D55D'
      }, {
         label: 'Grants',
         data: [0, 2500, 0, 0],
         backgroundColor: '#FFDB00'
      }, {
         label: 'Corporate Sponsorships',
         data: [0, 0, 1553, 0],
         backgroundColor: '#000'
      }, {
         label: 'College Funding',
         data: [0, 0, 0, 791],
         backgroundColor: '#cc181e'
      },]
   },
   options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
         xAxes: [{
            stacked: true // this should be set to make the bars stacked
         }],
         yAxes: [{
            stacked: true // this also..
         }]
      }
   }
});

// show mobile scroll
let didScroll;

$(window).scroll(function(event){
  didScroll = true;
});

// run hasScrolled() and reset didScroll status
setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

let lastScrollTop = 0;
function hasScrolled() {
    let delta = 5;
    let header = document.querySelector('header');
    let navbarHeight = $('header').outerHeight();

    let st = $(this).scrollTop();
    console.log(st)
    console.log(lastScrollTop)

    if (Math.abs(lastScrollTop - st) <= delta) {
        return;
    }

    // If current position > last position AND scrolled past navbar...
    if (st > lastScrollTop && st > navbarHeight){
        console.log('hello1')
        // Scroll Down
        console.log(navbarHeight)
        console.log(`-${navbarHeight}px`);
        header.style.top = `-${navbarHeight}px`;
    } else {
        console.log('hello2')
        // Scroll Up
        // If did not scroll past the document (possible on mac)...
        if(st + $(window).height() < $(document).height()) { 
            console.log('hello3')
            header.style.top = `0px`;
            $('.toggle-icon').removeClass('is-clicked');
        }
    }

    lastScrollTop = st;

}

// Core Javascript Initialization
var App = function() {
    'use strict';

    // Bootstra Components
    var handleBootstrapComponents = function() {
        // Bootstrap Carousel
        $('.carousel').carousel({
            interval: 5000,
            pause: 'hover'
        });

        // Tooltips
        $('.tooltips').tooltip();
        $('.tooltips-show').tooltip('show');
        $('.tooltips-hide').tooltip('hide');
        $('.tooltips-toggle').tooltip('toggle');
        $('.tooltips-destroy').tooltip('destroy');

        // Popovers
        $('.popovers').popover();
        $('.popovers-show').popover('show');
        $('.popovers-hide').popover('hide');
        $('.popovers-toggle').popover('toggle');
        $('.popovers-destroy').popover('destroy');
    }

    // Bootstrap Navbar Trigger
    var handleNavbarToggle = function() {
        $('.navbar-toggle').on('click', function(event) {
            if ($('.toggle-icon').hasClass('is-clicked')) {
                $('.toggle-icon').removeClass('is-clicked');
            } else {
                $('.toggle-icon').addClass('is-clicked');
            }
        });
    }

    // Handle Sidebar Menu
    var handleSidebarMenu = function() {
        $(document).ready(function($) {
            var $sidebar_trigger = $('.sidebar-trigger'),
                $sidebar_content_overlay = $('.sidebar-content-overlay');

            // open-close sidebar menu clicking on the menu icon
            $sidebar_trigger.on('click', function(event){
                event.preventDefault();

                $sidebar_trigger.toggleClass('is-clicked');
                $sidebar_content_overlay.toggleClass('sidebar-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
                $('.sidebar-nav').toggleClass('sidebar-menu-is-open');

                // check if transitions are not supported - i.e. in IE9
                if($('html').hasClass('no-csstransitions')) {
                    $('body').toggleClass('overflow-hidden');
                }
            });

            // close lateral menu clicking outside the menu itself
            $sidebar_content_overlay.on('click', function(event){
                if( !$(event.target).is('.sidebar-trigger') ) {
                    $sidebar_trigger.removeClass('is-clicked');
                    $sidebar_content_overlay.removeClass('sidebar-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                        $('body').removeClass('overflow-hidden');
                    });
                    $('.sidebar-nav').removeClass('sidebar-menu-is-open');
                    // check if transitions are not supported
                    if($('html').hasClass('no-csstransitions')) {
                        $('body').removeClass('overflow-hidden');
                    }

                }
            });

            // close sidebar menu scrolling on the content
            $(window).scroll(function() {
                if ($(this).scrollTop() > 200) {
                    $('.sidebar-content-overlay, .sidebar-nav').removeClass('sidebar-menu-is-open');
                    $('.sidebar-trigger').removeClass('is-clicked');
                }
            });
        });
    }

    // Services v1 Collapse
    var handleServicesV7 = function() {
        $('.services-v7-collapsed').hide();
        $('.services-v7').on('hover', function() {
            $(this).find('.services-v7-collapsed').slideToggle(300);
        });
    }

    // Work v1 Collapse
    var handleWorkV1 = function() {
        $('.work-v1-collapse').hide();
        $('.work-v1').on('hover', function() {
            $(this).find('.work-v1-collapse').slideToggle(400);
        });
    }

    // Topbar Transparent Dropdown
    var handleTopbarTDropdown = function() {
        $('.topbar-t-dropdown-menu').hide();
        $('.topbar-t-list-item').on('click', function() {
            $(this).find('.topbar-t-dropdown-menu').slideToggle(400);
        });
    }

    // Topbar transparent Shopping Dropdown
    var handleTopbarTShoppingDropdown = function() {
        $('.topbar-t-dropdown-menu').hide();
        $('.topbar-t-shopping-window').on('click', function() {
            $(this).find('.topbar-t-dropdown-menu').slideToggle(400);
        });
    }

    // Topbar e-Commerce Dropdown
    var handleTopbarEDropdown = function() {
        $('.topbar-e-dropdown-menu').hide();
        $('.topbar-e-list-item').on('click', function() {
            $(this).find('.topbar-e-dropdown-menu').slideToggle(400);
        });
    }

    // Topbar e-Commerce Shopping Dropdown
    var handleTopbarEShoppingDropdown = function() {
        $('.topbar-e-dropdown-menu').hide();
        $('.topbar-e-shopping-window').on('click', function() {
            $(this).find('.topbar-e-dropdown-menu').slideToggle(400);
        });
    }

    // Language Dropdown
    var handleLanguageBarDropdown = function() {
        $('.js-language-trigger').on('click', function() {
            $('.js-language-dropdown').toggle();
        });
    }

    // Language Push
    var handleLanguagePush = function() {
        $('.language-push-btn').on('click', function() {
            $('.language-push-open').slideToggle(400);
        });

        $(window).scroll(function(){
            if ($(this).scrollTop() > 1) $('.language-push-open').slideUp();
        });
    }
    
    // Team v7 Collapse
    var handleTeamV7 = function() {
        $('.team-v7-collapse').hide();
        $('.team-v7').on('click', function() {
            $(this).find('.team-v7-trigger').toggleClass('is-clicked');
            $(this).find('.team-v7-collapse').slideToggle(300);
        });
    }

    // Footer Toggle Expand
    var handleFooterToggleExpand = function() {
        $('.footer-toggle-collapse').hide();
        $('.footer-toggle-trigger').on('click', function(event) {
            event.preventDefault();

            $(this).toggleClass('is-open');
            $('.footer-toggle-collapse').slideToggle(500);

            $('html, body').animate({
                scrollTop: $(document).height()
            }, 500);
        });
    }

    // Scroll To Section
    var handleScrollToSection = function() {
        $(function() {
            $('a[href*=#scroll_]:not([href=#scroll_])').on('click', function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 70
                        }, 1000);
                        return false;
                    }
                }
            });
        });
    }

    // Handle Equal Height Interactive Banner
    var handleEqualIBannerBg = function() {
        $('.equal-height-ib-bg-img').each(function() {
            $(this).css('background-image', 'url(' + $(this).children('img').attr('src') + ')');
            $(this).children('img').hide();
        });
    }

    // Fullheight
    var handleFullheight = function() {
        var WindowHeight = $(window).height(),
            HeaderHeight;

        if ($(document.body).hasClass('promo-top-offset')) {
            HeaderHeight = $('.fullheight-header-offset').height();
        } else {
            HeaderHeight = 0;
        }

        $('.fullheight').css('height', WindowHeight - HeaderHeight);

        $(window).resize(function() {
            var WindowHeight = $(window).height();
            $('.fullheight').css('height', WindowHeight - HeaderHeight);
        });
    }

    // Vertical Center Aligned
    // Note! This works only with promo block and background image via CSS.
    var handleVerticalCenterAligned = function() {
        $('.vertical-center-aligned').each(function() {
            $(this).css('padding-top', $(this).parent().height() / 4 - $(this).height() / 2);
        });
        $(window).resize(function() {
            $('.vertical-center-aligned').each(function() {
                $(this).css('padding-top', $(this).parent().height() / 4 - $(this).height() / 2);
            });
        });
    }

    // Handle Toggle Collapse Box
    var handleToggleCollapseBox = function() {
        $('.theme-toggle-trigger').on('click', function(event) {
            $(this).toggleClass('.theme-toggle-content').hide();
            $(this).toggleClass('is-open').show();
            $('.theme-toggle-content').slideToggle(400);
        });
    }

    // Handle Header Fullscreen Navigation Overlay
    var handleHeaderFullscreenOverlay = function() {
        var overlay = $('.header-fullscreen-nav-bg-overlay'),
            close = $('.header-fullscreen-nav-close'),
            trigger = $('.header-fullscreen-nav-trigger'),
            HeaderNavigation = $('.header-fullscreen-nav-overlay');

        trigger.on('click', function() {
            HeaderNavigation.removeClass('header-fullscreen-nav-overlay-show');
            HeaderNavigation.addClass('header-fullscreen-nav-overlay-show');
        });

        close.on('click', function(e) {
            e.stopPropagation();
            HeaderNavigation.removeClass('header-fullscreen-nav-overlay-show');
        });
    }

    // Handle Search
    var handleSearch = function() {
        var SearchTrigger = $('.search-btn');
        SearchTrigger.on('click', function() {
            SearchTrigger.toggleClass('is-clicked');
            $('.search-field').fadeToggle(400);
        });
    }

    // Handle Search Classic
    var handleSearchClassic = function() {
        var SearchTrigger = $('.search-classic-btn');
        SearchTrigger.on('click', function() {
            SearchTrigger.toggleClass('is-clicked');
            $('.search-classic-field').fadeToggle(400);
        });
    }

    // Handle Search Fullscreen
    var handleSearchFullscreen = function() {
        var overlay = $('.search-fullscreen-bg-overlay'),
            close = $('.search-fullscreen-close'),
            trigger = $('.search-fullscreen-trigger'),
            SearchFullscreen = $('.search-fullscreen-overlay');

        trigger.on('click', function() {
            SearchFullscreen.removeClass('search-fullscreen-overlay-show');
            SearchFullscreen.addClass('search-fullscreen-overlay-show');
        });

        close.on('click', function(e) {
            e.stopPropagation();
            SearchFullscreen.removeClass('search-fullscreen-overlay-show');
        });
    }

    // Handle Search On Header
    var handleSearchOnHeader = function() {
        var SearchTrigger = $('.search-on-header-btn');
        SearchTrigger.on('click', function() {
            SearchTrigger.toggleClass('is-clicked');
            $('.search-on-header-field').fadeToggle(400);
        });
    }

    // Handle Search Push
    var handleSearchPush = function() {
        var SearchPushTrigger = $('.search-push-btn');
        SearchPushTrigger.on('click', function() {
            SearchPushTrigger.toggleClass('is-clicked');    
            $('.search-push-open').slideToggle(400);
        });

        $(window).scroll(function(){
            if ($(this).scrollTop() > 1) $('.search-push-open').slideUp(); {
                SearchPushTrigger.removeClass('is-clicked');    
            };
        });
    }

    return {
        init: function() {
            handleBootstrapComponents(); // initial setup for bootstrap components
            handleNavbarToggle(); // initial setup for navbar toggle
            handleSidebarMenu(); // initial setup for sidebar menu
            handleServicesV7(); // initial setup for services v7 collapse
            handleWorkV1(); // initial setup for work v1
            handleTopbarTDropdown(); // initial setup for topbar transparent dropdown
            handleTopbarTShoppingDropdown(); // initial setup for topbar transparent shopping dropdown
            handleTopbarEDropdown(); // initial setup for topbar e-commerce dropdown
            handleTopbarEShoppingDropdown(); // initial setup for topbar e-commerce shopping dropdown
            handleLanguageBarDropdown(); // initial setup for language dropdown
            handleLanguagePush(); // initial setup for language piush
            handleTeamV7(); // initial setup for team v7
            handleFooterToggleExpand(); // initial setup for footer toggle expand
            handleScrollToSection(); // initial setup for scroll to section
            handleEqualIBannerBg(); // initial setup for equal height interactive banner
            handleFullheight(); // initial setup for fullheight
            handleVerticalCenterAligned(); // initial setup for vertical center aligned
            handleToggleCollapseBox(); // initial setup for toggle collapse box
            handleHeaderFullscreenOverlay(); // initial setup for header fullscreen navigation overlay
            handleSearch(); // initial setup for search
            handleSearchClassic(); // initial setup for search classic
            handleSearchFullscreen(); // initial setup for search fullscreen
            handleSearchOnHeader(); // initial setup for search on header
            handleSearchPush(); // initial setup for search push
        }
    }
}();

$(document).ready(function() {
    App.init();
});

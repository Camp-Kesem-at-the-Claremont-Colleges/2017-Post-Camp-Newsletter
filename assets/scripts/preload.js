---
---
// Quote Randomization
var quotes = [];
var authors = [];
var positions = [];
{% assign i = 0 %}
{% for quote in site.data.quotes %}
quotes[{{ i }}] = {{ quote.quote }};
    {% if quote.author != blank %}
        authors[{{ i }}] = "{{ quote.author }}";
    {% else %}
        authors[{{ i }}] = "";
    {% endif %}
positions[{{ i }}] = "{{ quote.position }}"
{% assign i = i | plus: 1 %}
{% endfor %}
var totalQ = {{ i }};
var randomQ = Math.floor(Math.random() * totalQ);
var loadQuote = $('<h2 id="quote-load">"' + quotes[randomQ] + '"</h2><h2>' + authors[randomQ] + ' (' + positions[randomQ] + ') ' + '</h2><img class="loading-icon animate-flicker" src="/assets/img/sun.png">').hide().fadeIn(1500);
$('#quote').append(loadQuote);

// preloading
let body = document.querySelector('body');
body.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false);
$(window).load(function() {
    if ($(window).width() <= 991) {
        $( window ).resize(function() {
            document.querySelector('#loader-wrapper').style.height = $(window).height() + 60;
        })
    }
    setTimeout(function(){
        $('body').addClass('loaded');
        body.removeEventListener('touchmove', preventDefault, false);
    }, 6000);

});
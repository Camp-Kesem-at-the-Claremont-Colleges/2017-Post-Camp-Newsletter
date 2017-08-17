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
$(window).load(function() {
 
    setTimeout(function(){
        $('body').addClass('loaded');
    }, 6000);
 
});
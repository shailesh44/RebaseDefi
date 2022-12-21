/*Button JS Starts*/
jQuery(document).ready(function(){

    jQuery(".table-btn button").click(function()
    {
        if(jQuery('.table-btn button').hasClass('active'))
        {
            jQuery('.table-btn button').removeClass("active");
            jQuery(this).addClass("active");
        }
        else
        {
            jQuery('.table-btn button').removeClass("active");
        }
    });

    jQuery("#tab-content-1 .btn-search-bal-right").click(function()
    {
            jQuery('#tab-content-1 .btn-search-bal-right').toggleClass("active");
    });

    jQuery("#tab-content-2 .btn-search-bal-right").click(function()
    {
            jQuery('#tab-content-2 .btn-search-bal-right').toggleClass("active");
    });

});
/*Button JS Ends*/


/*Tabs JS Starts*/
function showtab(id){
    jQuery('.tab-content').removeClass('active');
    jQuery('#'+id).addClass('active');
}


jQuery(document).ready(function(){

    jQuery(".tab-title").click(function()
    {
        if(jQuery('.tab-title').hasClass('active'))
        {
            jQuery('.tab-title').removeClass("active");
            jQuery(this).addClass("active");
        }
        else
        {
            jQuery('.tab-title').removeClass("active");
        }
    });

});
/*Tabs JS Ends*/

/*Select JS Starts*/
$("#dpst_wdrl").change(function(){
    if($(this).val() == "Withdraw") {
        $('.dpst_wdrl').addClass('active');
    } else {
        $('.dpst_wdrl').removeClass('active');
    }
});
/*Select JS Ends*/

/*Countdown JS Starst*/
var target_date = new Date().getTime() + (1000*10000*48); // set the countdown date
var days, hours, minutes, seconds; // variables for time units

var countdown = document.getElementById("tiles"); // get tag element

getCountdown();

setInterval(function () { getCountdown(); }, 1000);

function getCountdown(){

    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    days = pad( parseInt(seconds_left / 86400) );
    seconds_left = seconds_left % 86400;

    hours = pad( parseInt(seconds_left / 3600) );
    seconds_left = seconds_left % 3600;

    minutes = pad( parseInt(seconds_left / 60) );
    seconds = pad( parseInt( seconds_left % 60 ) );

    // format countdown string + set tag value
    countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>";
}

function pad(n) {
    return (n < 10 ? '0' : '') + n;
}


/*Countdown JS Ends*/


/*Mobile Screen JS Starts*/
    /*if (screen.width <= 699) {
    document.location = "mobile.html";
    window.location = "mobile.html";
    }
if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    location.replace("mobile.html");
}
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    if (document.cookie.indexOf("iphone_redirect=false") == -1) window.location = "mobile.html";
}*/
/*Mobile Screen JS Ends*/
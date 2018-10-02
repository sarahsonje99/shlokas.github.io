var OPEN_IMAGE = 'open-image';

$('.fancy-button').click(function(e) {
    e.preventDefault();
    var type = $(this).data('type');
    
    // for team images
        var target = $(this).data('target');
        $('#black-overlay').fadeIn();
        $('#' + target + '-img').fadeIn();
        console.log(target);
        sessionStorage.setItem(OPEN_IMAGE, target);
})

$('.dev-image').click(function(e) {
    e.preventDefault();
    var type = $(this).data('type');
    
    // for team images
        var target = $(this).data('target');
        $('#black-overlay').fadeIn();
        $('#' + target + '-img').fadeIn();
        console.log(target);
        sessionStorage.setItem(OPEN_IMAGE, target);
})

$('.event-poster').click(function(e){
    var target = $(this).data('target');
    window.open('event/' + target);
})

$('#black-overlay').click(function(e) {
    e.preventDefault();
    var target = sessionStorage.getItem(OPEN_IMAGE);
    $('#black-overlay').fadeOut();
    $('#' + target + '-img').fadeOut();
    sessionStorage.removeItem(OPEN_IMAGE);
})


function flipTo(digit, n) {
    var current = digit.attr('data-num');
    digit.attr('data-num', n);
    digit.find('.front').attr('data-content', current);
    digit.find('.back, .under').attr('data-content', n);
    digit.find('.flap').css('display', 'block');
    setTimeout(function () {
        digit.find('.base').text(n);
        digit.find('.flap').css('display', 'none');
    }, 350);
}

function jumpTo(digit, n) {
    digit.attr('data-num', n);
    digit.find('.base').text(n);
}


function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function updateGroup(group, n, flip) {
    var digh = $('.hundred' + group);
    var nh = n/10;
    var digit1 = $('.ten' + group);
    var digit2 = $('.' + group);
    var numh = Math.floor(n/100);
    var num1 = Math.floor(nh % 10);
    var num2 = Math.floor(n % 10);
    if (digh.attr('data-num') != numh) {
        if (flip) flipTo(digh, numh);
        else jumpTo(digh, numh);
    }
    if (digit1.attr('data-num') != num1) {
        if (flip) flipTo(digit1, num1);
        else jumpTo(digit1, num1);
    }
    if (digit2.attr('data-num') != num2) {
        if (flip) flipTo(digit2, num2);
        else jumpTo(digit2, num2);
    }
}

function setTime(flip) {
    var time2 = getTimeRemaining("01/18/2019 12:00 AM");
    // console.log(time2);
    updateGroup('day', time2.days, flip);
    updateGroup('hour', time2.hours, flip);
    updateGroup('min', time2.minutes, flip);
    updateGroup('sec', time2.seconds, flip);
}

$(document).ready(function () {

    setTime(false);
    setInterval(function () {
        setTime(true);
    }, 1000);

});
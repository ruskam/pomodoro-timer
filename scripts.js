$(document).ready(function () {

    var breakTime = 5;
    var sessionTime = 25;
    var isOn = false;
    var sessionInterval = null;
    var breakInterval = null;
    var countingTime = sessionTime * 60;
    var sessionTimeIsOn = true;
    var finalBar = countingTime;
    var barHeight = $("#time-elapsing-area").height();
    var percentageInitial = 100;
    var percentageCurrent = 100;
    var interval = 100 / countingTime;
    console.log(countingTime, interval);
    $("#break-number").text(breakTime);
    $("#session-number").text(sessionTime);
    $("#time-elapsed").text(sessionTime);
    $("#timer-name").text("SESSION");

    $("#decr-break-time").click(function () {
        if (breakTime > 1) {
            breakTime--;
        }
        if (!sessionTimeIsOn) {
            countingTime = breakTime * 60;
            finalBar = countingTime;
            interval = 100 / countingTime;
            percentageCurrent = 100;
            $("#break-number").text(breakTime);
            $("#time-elapsed").text(breakTime);
            console.log(countingTime, interval);

        } else {
            $("#break-number").text(breakTime);
        }
    });

    $("#incr-break-time").click(function () {
        breakTime++;
        if (!sessionTimeIsOn) {
            countingTime = breakTime * 60;
            finalBar = countingTime;
            interval = 100 / countingTime;
            percentageCurrent = 100;
            $("#break-number").text(breakTime);
            $("#time-elapsed").text(breakTime);
            console.log(countingTime, interval);
        } else {
            $("#break-number").text(breakTime);
        }

    });

    $("#decr-session-time").click(function () {
        if (sessionTime > 1) {
            sessionTime--;
        }
        if (sessionTimeIsOn) {
            countingTime = sessionTime * 60;
            finalBar = countingTime;
            interval = 100 / countingTime;
            percentageCurrent = 100;
            $("#session-number").text(sessionTime);
            $("#time-elapsed").text(sessionTime);
            console.log(countingTime, interval);
        } else {
            $("#session-number").text(sessionTime);
        }

    });

    $("#incr-session-time").click(function () {
        sessionTime++;
        if (sessionTimeIsOn) {
            countingTime = sessionTime * 60;
            finalBar = countingTime;
            interval = 100 / countingTime;
            percentageCurrent = 100;
            $("#session-number").text(sessionTime);
            $("#time-elapsed").text(sessionTime);
            console.log(countingTime, interval);
        } else {
            $("#session-number").text(sessionTime);
        }
    });

    $("#time-elapsing-area").click(function () {
        if (!isOn) {
            startSessionTimer();
            isOn = true;
            //console.log("isOn=", isOn);
        } else {
            stopSessionTimer();
            isOn = false;
            //console.log("isOn=", isOn);
        }
    });

    function startSessionTimer() {
        makeInactive("#decr-break-time", "not-active");
        makeInactive("#incr-break-time", "not-active");
        makeInactive("#decr-session-time", "not-active");
        makeInactive("#incr-session-time", "not-active");

        sessionInterval = setInterval(function () {
            if (countingTime === 0 && sessionTimeIsOn) {

                $("#timer-name").text("BREAK");
                countingTime = breakTime * 60;
                sessionTimeIsOn = false;
                finalBar = countingTime;
                interval = 100 / countingTime;
                percentageCurrent = 100;
            }
            if (countingTime === 0 && !sessionTimeIsOn) {

                $("#timer-name").text("SESSION");
                countingTime = sessionTime * 60;
                sessionTimeIsOn = true;
                finalBar = countingTime;
                interval = 100 / countingTime;
                percentageCurrent = 100;
            }

            countingTime--;

            var seconds = countingTime % 60;
            var minutes = (countingTime - seconds) / 60;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            //if (seconds < 10) {
            $("#time-elapsed").text(minutes + ":" + seconds);
            /*$("#span-minutes").text(minutes);
            $("#span-seconds").text(seconds);
            console.log($("#span-minutes").text());
            console.log($("#span-seconds").text());*/

            // } else {
            $("#time-elapsed").text(minutes + ":" + seconds);
            /*$("#span-minutes").text(minutes);
            $("#span-seconds").text(seconds);

            console.log($("#span-minutes").text());
            console.log($("#span-seconds").text());*/
            //}

            /*Animation*/
            percentageCurrent -= interval;
            console.log(percentageCurrent);
            $("#time-elapsing-area").css(
                'background',
                'linear-gradient(#141215 ' + percentageCurrent + '%,#426e1f ' + percentageCurrent + '%'
            );
            /*Animation*/

        }, 1000);

    }

    function stopSessionTimer() {
        clearInterval(sessionInterval);
        makeActive("#decr-break-time", "not-active");
        makeActive("#incr-break-time", "not-active");
        makeActive("#decr-session-time", "not-active");
        makeActive("#incr-session-time", "not-active");
    }

    function makeInactive(divElement, classToAdd) {
        $(divElement).addClass(classToAdd);
    }

    function makeActive(divElement, classToAdd) {
        $(divElement).removeClass(classToAdd);
    }


});
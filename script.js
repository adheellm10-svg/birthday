/* =========================================
   SETTINGS
========================================= */

const birthdayPerson = "Samee";


/*
   EXACT BIRTHDAY UNLOCK TIME

   07 October 2026
   12:00 AM
   India Standard Time
*/

const birthdayDate =
    "2026-10-07T00:00:00+05:30";


/* =========================================
   SCREEN SWITCH
========================================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   START GAME
========================================= */

function startGame() {

    showScreen("gameScreen");

    startHeartGame();

}


/* =========================================
   HEART GAME
========================================= */

let score = 0;

let heartInterval;


function startHeartGame() {

    score = 0;

    document
        .getElementById("score")
        .textContent = score;


    clearInterval(heartInterval);


    heartInterval =
        setInterval(
            createHeart,
            700
        );

}


function createHeart() {

    if (score >= 5) {

        clearInterval(
            heartInterval
        );


        setTimeout(() => {

            showScreen(
                "lockScreen"
            );


            fireworks();

        }, 500);


        return;

    }


    const game =
        document.querySelector(
            ".game-area"
        );


    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "heart";


    heart.innerHTML =
        [
            "❤️",
            "💖",
            "💕",
            "💗"
        ][
            Math.floor(
                Math.random() * 4
            )
        ];


    const x =
        Math.random() *
        (
            game.clientWidth - 60
        );


    const y =
        90 +
        Math.random() *
        (
            game.clientHeight - 150
        );


    heart.style.left =
        x + "px";


    heart.style.top =
        y + "px";


    game.appendChild(
        heart
    );


    heart.onclick = function () {

        score++;


        document
            .getElementById("score")
            .textContent = score;


        burst(

            heart
                .getBoundingClientRect()
                .left,

            heart
                .getBoundingClientRect()
                .top

        );


        heart.remove();

    };


    setTimeout(() => {

        if (heart.parentNode) {

            heart.remove();

        }

    }, 1800);

}


/* =========================================
   SHOW GIFT
========================================= */

function showGift() {

    showScreen(
        "giftScreen"
    );

    fireworks();

}


/* =========================================
   OPEN GIFT
========================================= */

function openGift() {

    const gift =
        document.getElementById(
            "gift"
        );


    gift.classList.add(
        "open"
    );


    burst(

        window.innerWidth / 2,

        window.innerHeight / 2

    );


    setTimeout(() => {

        showScreen(
            "puzzleScreen"
        );

    }, 900);

}


/* =========================================
   PUZZLE
========================================= */

function checkAnswer() {

    const answer =
        document
            .getElementById(
                "answer"
            )
            .value;


    if (answer === "4") {

        document
            .getElementById(
                "wrong"
            )
            .textContent =
                "🎉 Correct! Surprise unlocked!";


        setTimeout(() => {

            document
                .getElementById(
                    "birthdayName"
                )
                .textContent =
                    birthdayPerson +
                    " ❤️";


            showScreen(
                "birthdayScreen"
            );


            startCountdown();


            celebration();

        }, 1000);

    }

    else {

        document
            .getElementById(
                "wrong"
            )
            .textContent =
                "❌ Hmm... Try again!";

    }

}


/* =========================================
   START COUNTDOWN
========================================= */

let countdownInterval;


function startCountdown() {

    clearInterval(
        countdownInterval
    );


    updateCountdown();


    countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );

}


/* =========================================
   UPDATE COUNTDOWN
========================================= */

function updateCountdown() {

    const target =
        new Date(
            birthdayDate
        ).getTime();


    const now =
        Date.now();


    const difference =
        target - now;


    /*
       If birthday has arrived
    */

    if (difference <= 0) {

        clearInterval(
            countdownInterval
        );


        unlockBirthday();

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    document
        .getElementById("days")
        .textContent =
            String(days)
            .padStart(2, "0");


    document
        .getElementById("hours")
        .textContent =
            String(hours)
            .padStart(2, "0");


    document
        .getElementById("minutes")
        .textContent =
            String(minutes)
            .padStart(2, "0");


    document
        .getElementById("seconds")
        .textContent =
            String(seconds)
            .padStart(2, "0");

}


/* =========================================
   UNLOCK REAL BIRTHDAY
========================================= */

function unlockBirthday() {

    const advanceWish =
        document.getElementById(
            "advanceWish"
        );


    const realBirthday =
        document.getElementById(
            "realBirthday"
        );


    const letter =
        document.getElementById(
            "letter"
        );


    /*
       Hide advance birthday wish
    */

    advanceWish.style.display =
        "none";


    /*
       Show real birthday message
    */

    realBirthday.style.display =
        "block";


    /*
       Open secret letter automatically
    */

    letter.style.display =
        "block";


    /*
       Big celebration
    */

    celebration();


    setTimeout(
        celebration,
        1500
    );


    setTimeout(
        celebration,
        3000
    );


    /*
       Scroll to the secret message
    */

    setTimeout(() => {

        letter.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }, 1000);

}


/* =========================================
   PARTICLE BURST
========================================= */

function burst(x, y) {

    const emojis = [

        "❤️",
        "✨",
        "💕",
        "⭐",
        "💖"

    ];


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const p =
            document.createElement(
                "div"
            );


        p.className =
            "particle";


        p.innerHTML =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        p.style.left =
            x + "px";


        p.style.top =
            y + "px";


        document.body.appendChild(
            p
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            50 +
            Math.random() * 150;


        const dx =
            Math.cos(angle) *
            distance;


        const dy =
            Math.sin(angle) *
            distance;


        p.animate(

            [

                {

                    transform:
                        "translate(0,0) scale(1)",

                    opacity: 1

                },

                {

                    transform:
                        `translate(${dx}px,${dy}px) scale(0)`,

                    opacity: 0

                }

            ],

            {

                duration:
                    1000 +
                    Math.random() * 500,

                easing:
                    "ease-out"

            }

        );


        setTimeout(() => {

            p.remove();

        }, 1600);

    }

}


/* =========================================
   FIREWORKS
========================================= */

function fireworks() {

    for (
        let f = 0;
        f < 4;
        f++
    ) {

        setTimeout(() => {

            const x =
                Math.random() *
                window.innerWidth;


            const y =
                Math.random() *
                window.innerHeight *
                0.6;


            for (
                let i = 0;
                i < 50;
                i++
            ) {

                const particle =
                    document.createElement(
                        "div"
                    );


                particle.className =
                    "firework";


                particle.style.left =
                    x + "px";


                particle.style.top =
                    y + "px";


                particle.style.background =
                    [

                        "#ff006e",
                        "#ffd60a",
                        "#00f5d4",
                        "#fff",
                        "#8338ec"

                    ][
                        Math.floor(
                            Math.random() * 5
                        )
                    ];


                document.body.appendChild(
                    particle
                );


                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const distance =
                    50 +
                    Math.random() * 180;


                const dx =
                    Math.cos(angle) *
                    distance;


                const dy =
                    Math.sin(angle) *
                    distance;


                particle.animate(

                    [

                        {

                            transform:
                                "translate(0,0) scale(1)",

                            opacity: 1

                        },

                        {

                            transform:
                                `translate(${dx}px,${dy}px) scale(0)`,

                            opacity: 0

                        }

                    ],

                    {

                        duration:
                            1000 +
                            Math.random() * 800,

                        easing:
                            "ease-out"

                    }

                );


                setTimeout(() => {

                    particle.remove();

                }, 2000);

            }

        }, f * 700);

    }

}


/* =========================================
   CELEBRATION
========================================= */

function celebration() {

    burst(

        window.innerWidth / 2,

        window.innerHeight / 2

    );


    fireworks();


    setTimeout(
        fireworks,
        1500
    );


    setTimeout(
        fireworks,
        3000
    );

}


/* =========================================
   SCROLL BUTTON
========================================= */

function scrollDown() {

    window.scrollBy({

        top:
            window.innerHeight * 0.8,

        behavior:
            "smooth"

    });

}


/* =========================================
   SCROLL BUTTON VISIBILITY
========================================= */

function updateScrollButton() {

    const button =
        document.getElementById(
            "scrollButton"
        );


    if (

        document.documentElement
            .scrollHeight

        >

        window.innerHeight + 50

    ) {

        button.style.display =
            "block";

    }

    else {

        button.style.display =
            "none";

    }

}


window.addEventListener(
    "resize",
    updateScrollButton
);


window.addEventListener(
    "scroll",
    updateScrollButton
);


updateScrollButton();

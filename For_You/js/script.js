/* =========================================
   ELEMENTS
========================================= */

const startButton = document.getElementById("startButton");
const replayButton = document.getElementById("replayButton");

const intro = document.getElementById("intro");
const scene = document.getElementById("scene");

const particlesContainer =
    document.getElementById("particles");

const roseContainer =
    document.getElementById("roseContainer");


/* =========================================
   PARTICLES
========================================= */

function createParticles() {

    particlesContainer.innerHTML = "";

    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");

        particle.className = "particle";

        const size =
            Math.random() * 3 + 1;

        const left =
            Math.random() * 100;

        const delay =
            Math.random() * 8;

        const duration =
            Math.random() * 8 + 7;

        const moveX =
            (Math.random() - 0.5) * 180;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        particle.style.left =
            `${left}%`;

        particle.style.bottom =
            `${Math.random() * 10 - 5}%`;

        particle.style.setProperty(
            "--duration",
            `${duration}s`
        );

        particle.style.setProperty(
            "--move-x",
            `${moveX}px`
        );

        particle.style.animationDelay =
            `${delay}s`;

        particlesContainer.appendChild(
            particle
        );
    }
}


/* =========================================
   START EXPERIENCE
========================================= */

function startExperience() {

    intro.classList.add("hidden");

    setTimeout(() => {

        scene.classList.add("active");

        createParticles();

    }, 700);
}


/* =========================================
   REPLAY
========================================= */

function replayExperience() {

    /*
       Remove the active class first.
       Then force the browser to recalculate
       the animation.
    */

    scene.classList.remove("active");

    intro.classList.remove("hidden");

    particlesContainer.innerHTML = "";

    setTimeout(() => {

        scene.classList.add("active");

        createParticles();

    }, 800);
}


/* =========================================
   MOUSE PARALLAX
========================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        const x =
            (event.clientX /
                window.innerWidth) * 100;

        const y =
            (event.clientY /
                window.innerHeight) * 100;


        document.documentElement.style
            .setProperty(
                "--mx",
                `${x}%`
            );


        document.documentElement.style
            .setProperty(
                "--my",
                `${y}%`
            );
    }
);


/* =========================================
   TOUCH PARALLAX
========================================= */

document.addEventListener(
    "touchmove",
    (event) => {

        if (!event.touches.length) {
            return;
        }

        const touch =
            event.touches[0];


        const x =
            (touch.clientX /
                window.innerWidth) * 100;

        const y =
            (touch.clientY /
                window.innerHeight) * 100;


        document.documentElement.style
            .setProperty(
                "--mx",
                `${x}%`
            );


        document.documentElement.style
            .setProperty(
                "--my",
                `${y}%`
            );
    },
    {
        passive: true
    }
);


/* =========================================
   BUTTON EVENTS
========================================= */

startButton.addEventListener(
    "click",
    startExperience
);


replayButton.addEventListener(
    "click",
    () => {

        /*
           Full reset.
           We temporarily remove the scene
           and rebuild the animation state.
        */

        scene.classList.remove("active");

        particlesContainer.innerHTML = "";

        setTimeout(() => {

            scene.classList.add("active");

            createParticles();

        }, 100);
    }
);


/* =========================================
   INITIALIZATION
========================================= */

createParticles();
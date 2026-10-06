window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.classList.add("hide");
        }
    }, 1200);
});
/* START BUTTON */
const startBtn = document.getElementById("startBtn");
if (startBtn) {
    startBtn.addEventListener("click", () => {
        const intro = document.querySelector(".intro");
        if (intro) {
            intro.scrollIntoView({
                behavior: "smooth"
            });
        }
        createHeartBurst();
    });
}
/* FLOATING HEARTS */
const heartContainer =
    document.getElementById("heartContainer");
function createFloatingHeart() {
    if (!heartContainer) return;
    const heart =
        document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML =
        Math.random() > 0.5 ? "♥" : "♡";
    heart.style.left =
        Math.random() * 100 + "%";
    heart.style.fontSize =
        (12 + Math.random() * 22) + "px";
    heart.style.animationDuration =
        (8 + Math.random() * 8) + "s";
    heart.style.opacity =
        (0.08 + Math.random() * 0.2);
    heartContainer.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 17000);

}
setInterval(createFloatingHeart, 1300);
/* HEART BURST */
function createHeartBurst() {
    if (!heartContainer) return;
    for (let i = 0; i < 15; i++) {
        const heart =
            document.createElement("div");
        heart.classList.add("floating-heart");
        heart.innerHTML = "♥";
        heart.style.left =
            (45 + Math.random() * 10) + "%";
        heart.style.bottom =
            "45%";
        heart.style.fontSize =
            (15 + Math.random() * 25) + "px";
        heart.style.animationDuration =
            (2 + Math.random() * 2) + "s";
        heartContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 4500);
    }
}
/* SCROLL REVEAL */
const revealElements =
    document.querySelectorAll(
        ".reason-card, .timeline-item, .polaroid, .playful-box, .little-item"
    );
const observer =
    new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );
revealElements.forEach(element => {
    observer.observe(element);
});
/* COUNTDOWN */
/*
   IMPORTANT:
   Change the time below if you know the exact time
   of your first meeting.
   Current setting:
   16 October 2026 at 00:00.
*/
const meetingDate =
    new Date("October 16, 2026 00:00:00").getTime();
function updateCountdown() {
    const now =
        new Date().getTime();
    const difference =
        meetingDate - now;
    const days =
        document.getElementById("days");
    const hours =
        document.getElementById("hours");
    const minutes =
        document.getElementById("minutes");
    const seconds =
        document.getElementById("seconds");
    if (
        !days ||
        !hours ||
        !minutes ||
        !seconds
    ) {
        return;
    }
    if (difference <= 0) {
        days.textContent = "♥";
        hours.textContent = "♥";
        minutes.textContent = "♥";
        seconds.textContent = "♥";
        return;
    }
    const dayValue =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );
    const hourValue =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );
    const minuteValue =
        Math.floor(
            (difference %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );
    const secondValue =
        Math.floor(
            (difference %
                (1000 * 60)) /
            1000
        );
    days.textContent =
        String(dayValue).padStart(2, "0");
    hours.textContent =
        String(hourValue).padStart(2, "0");
    minutes.textContent =
        String(minuteValue).padStart(2, "0");
    seconds.textContent =
        String(secondValue).padStart(2, "0");
}
updateCountdown();
setInterval(
    updateCountdown,
    1000
);
/* ENVELOPE */
const envelope =
    document.getElementById("envelope");
const letterMessage =
    document.getElementById("letterMessage");
if (envelope) {
    envelope.addEventListener("click", () => {
        if (
            envelope.classList.contains("open")
        ) {
            return;
        }
        envelope.classList.add("open");
        setTimeout(() => {
            if (letterMessage) {
                letterMessage.classList.add("show");
                letterMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }, 900);
        createHeartBurst();
    });
}
/*  REPLAY */
const replayBtn =
    document.getElementById("replayBtn");
if (replayBtn) {
    replayBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        createHeartBurst();
    });
}
/* POLAROID TILT */
const polaroids =
    document.querySelectorAll(".polaroid");
polaroids.forEach(polaroid => {
    polaroid.addEventListener(
        "mousemove",
        (event) => {
            const rect =
                polaroid.getBoundingClientRect();
            const x =
                event.clientX - rect.left;
            const y =
                event.clientY - rect.top;
            const centerX =
                rect.width / 2;
            const centerY =
                rect.height / 2;
            const rotateX =
                (y - centerY) / 20;
            const rotateY =
                (centerX - x) / 20;
            polaroid.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;
        }
    );
    polaroid.addEventListener(
        "mouseleave",
        () => {
            polaroid.style.transform = "";
        }
    );
});
/* LITTLE SURPRISE:CLICK THE DATE CARD */
const dateCard =
    document.querySelector(".date-card");
if (dateCard) {
    dateCard.addEventListener("click", () => {
        createHeartBurst();
    });
}
/* KEYBOARD ACCESSIBILITY */
document.addEventListener(
    "keydown",
    (event) => {
        if (
            event.key === "Enter" &&
            document.activeElement === startBtn
        ) {
            startBtn.click();
        }
    }
);
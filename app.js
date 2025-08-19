gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector(".cursor-circle");

window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3,
    ease: "power2.out",
  });
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".main-container",
    start: "top top",
    end: "bottom top",
    scrub: 0.5,
    pin: true,
    anticipatePin: 1,
  },
});

tl.to(
  ".gallery-img",
  {
    autoAlpha: 0,
    scale: 2.5,
    filter: "blur(8px)",
    ease: "expo.out",
    stagger: { each: 0.05, from: "random", ease: "power1.inOut" },
  },
  0
)
  .to(
    ".hero-text-initial h1",
    { autoAlpha: 0, y: 30, ease: "power1.in", duration: 0.3 },
    0
  )
  .to(
    ".hero-text-initial h2",
    { yPercent: -400, ease: "expo.inOut", duration: 0.6 },
    0.05
  );

gsap.to(".main-container", {
  autoAlpha: 0,
  ease: "power1.in",
  scrollTrigger: {
    trigger: ".reveal-section",
    start: "top 90%",
    end: "top 50%",
    scrub: 0.5,
  },
});

const quote = new SplitType("#reveal-text", { types: "words, chars" });
quote.words.forEach((word) => {
  word.style.whiteSpace = "pre";
  word.style.display = "inline-block";
});

gsap.set(quote.chars, { opacity: 0.15 });

const charRevealTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".reveal-section",
    start: "top 90%",
    end: "bottom bottom",
    scrub: 1,
  },
});

charRevealTl.fromTo(
  quote.chars,
  { opacity: 0.15 },
  { opacity: 1, ease: "none", stagger: 0.4 }
);

const canvas = document.getElementById("transition-canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const transition = { width: 0, height: 0 };
const maxDimension = Math.max(canvas.width, canvas.height) * 1.5;

const skillItems = document.querySelectorAll(".skill-item");

skillItems.forEach((item) => {
  gsap.set(item, {
    x: gsap.utils.random(-300, 300),
    y: gsap.utils.random(-300, 300),
    autoAlpha: 0,
  });
});

const transitionTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".reveal-section",
    start: "bottom bottom",
    end: "+=100%",
    scrub: 1,
    pin: true,
  },
});

transitionTl
  .to(transition, {
    width: maxDimension,
    height: maxDimension,
    ease: "power1.inOut",
    onUpdate: () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#f7f7f7";
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      context.fillRect(
        centerX - transition.width / 2,
        centerY - transition.height / 2,
        transition.width,
        transition.height
      );
    },
  })
  .to(".final-section", { opacity: 1, ease: "none" }, 0.1)
  .from(".large-avatar", { scale: 0.5, autoAlpha: 0, ease: "power2.out" }, 0.3)
  .from(".final-heading", { y: 30, autoAlpha: 0, ease: "power2.out" }, 0.4)
  .from(".final-description", { y: 30, autoAlpha: 0, ease: "power2.out" }, 0.5)
  .to(
    ".skill-item",
    { x: 0, y: 0, autoAlpha: 1, stagger: 0.1, ease: "power2.out" },
    0.6
  )
  .from(".socials", { y: 30, autoAlpha: 0, ease: "power2.out" }, 0.8);

const galleryImages = document.querySelectorAll(".gallery-img");
galleryImages.forEach((img) => {
  const iconWrapper = img.querySelector(".icon-wrapper");
  img.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(iconWrapper, {
      x: (x - rect.width / 2) * 0.7,
      y: (y - rect.height / 2) * 0.7,
      duration: 0.8,
      ease: "power3.out",
    });
  });
  img.addEventListener("mouseleave", () => {
    gsap.to(iconWrapper, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  });
});

skillItems.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(item, {
      x: (x - rect.width / 2) * 0.9,
      y: (y - rect.height / 2) * 0.9,
      duration: 0.2,
      ease: "power3.out",
    });
  });
  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      x: 0,
      y: 0,
      duration: 0.2,
      ease: "elastic.out(1, 0.3)",
    });
  });
});

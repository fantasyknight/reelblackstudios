/* Register Plugin */
gsap.registerPlugin(ScrollTrigger);

/* Gsap Infinite Text Flow Animation Effect */
// var elements = gsap.utils.toArray(".gsap-infinte-text-flow-animation");
var elements = gsap.utils.toArray(".services-card");

elements.forEach((item) => {
  var line = gsap.utils.selector(
    item.querySelector(".gsap-infinte-text-flow-animation")
  );

  var links = line("span"),
    tl = horizontalLoop(links, {
      repeat: -1,
      speed: 1 * 0.5,
      paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px")), // otherwise first element would be right up against the last when it loops. In this layout, the spacing is done with marginRight.
    });

  item.addEventListener("mouseenter", () => tl.resume());
  item.addEventListener("mouseleave", () => tl.pause());
});

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  var tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;

  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;

  return tl.pause();
}

var el = document.querySelector(".gallery-item");
var wrap = document.querySelector(".gallery1");

gsap.set(".gallery-item", { y: 100, autoAlpha: 0, scale: 0.7 });

gsap.to(".gallery-item", {
  duration: 0.7,
  autoAlpha: 1,
  y: 1,
  scale: 1,
  stagger: 0.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: wrap,
    start: "top bottom",
    toggleActions: "play pause resume reset",
  },
});

/* Excellent */
// var image3 = document.querySelector(".img3");
// gsap.set(image3, { transformPerspective: 700 });

// ScrollTrigger.create({
//   trigger: image3,
//   start: "center center",
//   onEnter: (self) => {
//     gsap.to(self.trigger, {
//       rotateX: 12,
//       rotateY: 30,
//       opacity: 0.5,
//       duration: 1,
//       ease: "power4.out",
//     });
//   },
//   onLeaveBack: (self) => {
//     gsap.to(self.trigger, {
//       rotateX: 0,
//       rotateY: 0,
//       opacity: 1,
//       duration: 1,
//       ease: "power4.out",
//     });
//   },
// });

gsap.set(".mfp-wrap", { y: 100 });
var allModalElements = document.querySelectorAll(".popup-modal");

for (var i = 0; i < allModalElements.length; i++) {
  allModalElements[i].addEventListener("click", openModal);
}

function openModal() {
  gsap.to(".mfp-wrap", { y: 0, duration: 2 });
}

// Hero Text
var timeline = gsap.timeline();
timeline
  .from(".review-title", { autoAlpha: 0, y: 100 }, 0.5)
  .from(".gsap-stage-text", { y: 100, autoAlpha: 0, stagger: 0.15 });

ScrollTrigger.create({
  trigger: ".review",
  start: "top bottom",
  animation: timeline,
  toggleActions: "play pause resume reset",
});

// Heading Slider Up animation
var slideUpAnimationElements = gsap.utils.toArray(".animation-slide-up");

slideUpAnimationElements.forEach(function (el) {
  ScrollTrigger.create({
    trigger: el,
    start: "top bottom",
    toggleActions: "play pause resume reset",
    animation: gsap.from(el, {
      autoAlpha: 0,
      y: 100,
      ease: "power2.out",
      duration: 0.7,
    }),
  });
});

gsap.from(".banner-scale", {
  autoAlpha: 0,
  scale: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".banner-scale",
    start: "top bottom",
    toggleActions: "play pause resume reset",
  },
});

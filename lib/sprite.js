const html = document.documentElement;
const canvas = document.getElementById("animation");
const context = canvas.getContext("2d");

const frameCount = 10;
const frameCountWidth = 5;
const frameCountHeight = 2;
const spriteWidth = 153;
const spriteHeight = 150;
const spriteSheet =
  "sprites.png";

const img = new Image();
img.src = spriteSheet;
canvas.width = spriteWidth;
canvas.height = spriteHeight;

const updateImage = (frameNumber) => {
  img.src = spriteSheet;
  var y = 20;
  var x = frameNumber * spriteWidth;
  if (frameNumber > frameCountWidth) {
    x = (frameNumber - frameCount / frameCountHeight) * spriteWidth;
    y += spriteHeight;
  }
  context.drawImage(
    img,
    x,
    y,
    img.width,
    img.height,
    0,
    0,
    img.width,
    img.height
  );
};

window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop * frameCount;
  const frame = Math.ceil((scrollFraction * frameCount) % frameCount);
  const frameNumber = Math.min(
    frameCount - 1,
    frame
  );
  requestAnimationFrame(() => updateImage(frameNumber));
});

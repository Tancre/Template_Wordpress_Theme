import Test from "./modules/Test";

const currentUrl = window.location.href;
const isMobile = window.matchMedia("(max-width: 1300px)").matches;

if (!currentUrl.includes("post")) {
  if (isMobile) {
  } else {
  }
} else {
  if (isMobile) {
  } else {
  }
}

var test = new Test();

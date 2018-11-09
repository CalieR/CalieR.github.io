let score = 0;

function getSadInterval() {
  return Date.now() + 1000; /* mole will be sad for 1 sec */
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
  // random number between 2000-20000 (0-18000 + 2000)
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000) * 2000;
}

function getKingStatus() {
  return Math.random() > 0.9;
}

const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-0")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-1")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-2")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-3")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-4")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-5")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-6")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-7")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-8")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-9")
  }
];

function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.next = getSadInterval();
      mole.status = "leaving";
      if (mole.king) {
        mole.node.children[0].src = "../assets/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "../assets/mole-leaving.png";
      }
      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      mole.node.children[0].classList.add("gone"); // adds the hole
      break;
    case "gone":
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.next = getHungryInterval();
      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      if (mole.king) {
        mole.node.children[0].src = "../assets/king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "../assets/mole-hungry.png";
      }
      break;
    case "hungry":
      mole.status = "sad";
      mole.next = getSadInterval();
      mole.node.children[0].classList.remove("hungry");
      if (mole.king) {
        mole.node.children[0].src = "../assets/king-mole-sad.png";
      } else {
        mole.node.children[0].src = "../assets/mole-sad.png";
      }
      break;
  }
}

function feed(event) {
  if (
    event.target.tagName !== "IMG" ||
    !event.target.classList.contains("hungry")
  ) {
    // they didn't click on an img?  they  didn't click on a hungry mole?  the event listener is on the whole background so its necessary to check
    return;
  }
  // they did click on a hungry mole:

  const mole = moles[parseInt(event.target.dataset.index)];

  mole.status = "fed"; // modifying mole status outside of the loop
  mole.next = getSadInterval();
  mole.node.children[0].classList.remove("hungry");
  if (mole.king) {
    score += 2;
    mole.node.children[0].src = "../assets/king-mole-fed.png";
  } else {
    mole.node.children[0].src = "../assets/mole-fed.png";
  }

  score++;
  if (score >= 10) {
    win();
  }

  document.querySelector("worm-container").style.width = `${10 * score}%`;
}

function win() {
  document.querySelector(".bg").classList.add("hide");
  document.querySelector(".win").classList.remove("hide");
}

// ...do this thing again once 100ms has passed...
let runAgainAt = Date.now() + 100;
function nextFrame() {
  const now = Date.now();
  if (runAgainAt <= now) {
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        getNextStatus(moles[i]);
      }
    }
    runAgainAt = now + 100;
  }
  requestAnimationFrame(nextFrame);
}

document.querySelector(".bg").addEventListener("click", feed);

nextFrame();

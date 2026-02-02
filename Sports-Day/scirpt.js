const scores = {
  red: 0,
  blue: 0,
  green: 0,
  yellow: 0
};


function OpeningCeremony(callback) {
  console.log("Sports Day is starting...");

  let count = 0;
  const interval = setInterval(() => {
    console.log("Opening Ceremony in progress...");
    count++;

    if (count === 3) {
      clearInterval(interval);
      console.log("Opening Ceremony completed\n");
      callback(scores);
    }
  }, 1000);
}


function Race100M(score, callback) {
  console.log("100m Race started...");

  setTimeout(() => {
    const times = {
      red: Math.random() * 6 + 10,
      blue: Math.random() * 6 + 10
    };

    console.log("Race Times:", times);

    if (times.red < times.blue) {
      score.red += 50;
      score.blue += 25;
      console.log("Red wins the race");
    } else {
      score.blue += 50;
      score.red += 25;
      console.log("Blue wins the race");
    }

    console.log("Scores after 100m Race:", score, "\n");
    callback(score);
  }, 3000);
}


function LongJump(score, callback) {
  console.log("Long Jump event started...");

  setTimeout(() => {
    const colors = ["red", "blue", "green", "yellow"];
    const winner = colors[Math.floor(Math.random() * colors.length)];

    score[winner] += 150;

    console.log(`${winner.toUpperCase()} won the Long Jump`);
    console.log("Scores after Long Jump:", score, "\n");

    callback(score);
  }, 2000);
}


function HighJump(score, callback) {
  console.log(" High Jump event started...");

  const userInput = prompt(
    "Enter the color with highest jump (red / blue / green / yellow):"
  );

  if (userInput && score.hasOwnProperty(userInput.toLowerCase())) {
    score[userInput.toLowerCase()] += 100;
    console.log(`${userInput.toUpperCase()} awarded 100 points`);
  } else {
    console.log("Invalid input or no input. No points awarded");
  }

  console.log("Scores after High Jump:", score, "\n");
  callback(score);
}


function AwardCeremony(score) {
  console.log("Award Ceremony Started...");
  console.log("Final Scores:", score);

  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);

  console.log(`1st Place: ${sorted[0][0]} (${sorted[0][1]} points)`);
  console.log(`2nd Place: ${sorted[1][0]} (${sorted[1][1]} points)`);
  console.log(`3rd Place: ${sorted[2][0]} (${sorted[2][1]} points)`);

  console.log("Sports Day Completed Successfully!");
}


OpeningCeremony((score) => {
  Race100M(score, (score) => {
    LongJump(score, (score) => {
      HighJump(score, AwardCeremony);
    });
  });
});

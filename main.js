import fetch from "node-fetch";

async function jsonDataParsing(){
    const response = await fetch('https://www.lucknowsupergiants.in/cricket/live/json/krlko05202023222240.json');
    const object = await response.json();
    return object;
}

// getVenue(match)
jsonDataParsing().then(data => {
    let venueName = data.Matchdetail.Venue.Name;
    console.log(venueName)
});


// getPlayerWithHighestScore(match)
const getPlayerWithHighestScore = jsonDataParsing().then(data => {
    let highestScore = data.Innings[0].FallofWickets;
    let highest = 0;
    for (let i = 0; i < highestScore.length; i++) {
        const score = Number(highestScore[i].Score);
        if (highest < score) {
            highest = score;
        }

    }
    console.log("Highest Score: " + highest)
});

// .getPlayerWithHighestWicket(match)
const getPlayerWithHighestWickets = jsonDataParsing().then(data => {
    let highestWicket = data.Innings[0].Bowlers;
    let highest = 0;
    for (let i = 0; i < highestWicket.length; i++) {
        const wicket = Number(highestWicket[i].Wickets);
        if (highest < wicket) {
            highest = wicket;
        }

    }
    console.log("Highest Wicket: " + highest)
});

//getStartingXI(match,i) //match will be the match object,i=0 means home team,i=1 
//means away team| return array of player names


const getStartingXI = (teamId) => { jsonDataParsing().then(data => {
        let getStartingXI = data.Teams[teamId].Players;
        let names = [];

        for (let key in getStartingXI) {
            let player = getStartingXI[key];

            if (player.Confirm_XI) {
                names.push(player.Name_Full);
            }
        }

        console.log(names);
    });
};

getStartingXI('1106'); 
getStartingXI('2954'); 


const getTossWinner = jsonDataParsing().then(data => {
    let tossWonBy = data.Matchdetail.Tosswonby
    let tossWonByTeamName = data.Teams[tossWonBy].Name_Full
    console.log(tossWonByTeamName)
})


// getHighestPartnership(match) | returns names of the players with the highest partnership in an array

const getHighestPartnership = (inningsIndex) => {
    return jsonDataParsing().then(data => {
        let partnership = data.Innings[inningsIndex].Partnerships;
        let teamA;
        let maxiA = 0;

        for (let i = 0; i < partnership.length; i++) {
            let x = Number(partnership[i].Runs);
            if (x > maxiA) {
                teamA = partnership[i].Batsmen;
                console.log(teamA)
                maxiA = x;
            }

        }
        console.log(teamA)


        let playerArray = [];
        let runners = data.Teams;

        for (let key in runners) {
            for (let value in runners[key]) {
                for (let prop in runners[key][value]) {
                    if (prop === teamA[0].Batsman || prop === teamA[1].Batsman) {
                        playerArray.push(runners[key][value][prop].Name_Full);
                    }
                }
            }
        }

        console.log("Players names are: " + playerArray[0] + " and " + playerArray[1] + ", the score is " + maxiA);
    });
};

getHighestPartnership(0); 
getHighestPartnership(1); 



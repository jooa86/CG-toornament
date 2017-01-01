const myKey = "TMAeQSNQWnb-1aQhZqQebnqcVqBd3j9Djrz7mQ0qGkI";
var toornamentData = null;
var team_array = [];
var firstRound = [];
var secondRound = [];
var thirdRound = [];
var finalRound = [];
var result_array = [];
var result_array_demo = [
		[[0,11],[0,22],[0,33],[0,44],[0,55],[0,66],[0,77],[0,88]],
		[[1,11],[1,22],[1,33],[1,44]],
		[[2,11],[2,22]],
		[[3,11]]
];

const handle_team = (result) => {
  if(result !== null){
      return result.name;
  }else{
    return  "N/A";
  }
};

const handle_score = (score, result) => {
	if(score === null)
	{
		if(result == 1){
			return 1;
		}else{
			return 0;
		}
	}else{
		return score;
	}
};

const match_opponents = (opponent) => {
		return {
			team: handle_team(opponent.participant),
			score: handle_score(opponent.score, opponent.result)
		};
};


const handle_match = (match) => {

	const r = match.opponents.map(match_opponents);

	if(match.group_number == 1)
	{
		switch(match.round_number)
		{
			case 1:
				team_array.push([r[0].team, r[1].team]);
				firstRound.push([r[0].score, r[1].score]);
				break;
			case 2:
				secondRound.push([r[0].score, r[1].score]);
				break;
			case 3:
				thirdRound.push([r[0].score, r[1].score]);
				break;
			case 4:
				finalRound.push([r[0].score, r[1].score]);
				break;
		}

	}else if(match.group_number == 2 && match.round_number == 1){
			finalRound.push([r[1].score, r[0].score]);
	}

};


axios.get('https://api.toornament.com/v1/tournaments/57fd38b5150ba019198b456e/matches?has_result=1&api_key=' + myKey)
.then(res => res.data)
.then(data => data.map(handle_match))
.then(function(result){


	toornamentData = {teams: team_array, results: [firstRound,secondRound,thirdRound,finalRound]};
	console.log(toornamentData);

	var parameters = {
	  teamWidth: 220,
	  scoreWidth: 50,
	  matchMargin: 30,
	  roundMargin: 30,
	  init: toornamentData
	};


	$('#brackets').bracket(parameters);

})
.catch(e => console.error(e));

$(function() {

});

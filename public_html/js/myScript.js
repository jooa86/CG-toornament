const myKey = "TMAeQSNQWnb-1aQhZqQebnqcVqBd3j9Djrz7mQ0qGkI";

const handle_result = (result) => {
	const outcomes = {
		1: "win",
		2: "draw",
		3: "loss"
	};
	return outcomes[result];
};

const handle_team = (result) => {
  if(result !== null){
      return result;
  }else{
    return {
        name: "N/A",
    };
  }
};

const handle_opponent = (opponent) => {
		return {
				team: handle_team(opponent.participant),
				score: opponent.score,
				result: handle_result(opponent.result)
		};
};

const handle_match = (match) => {
	const r = match.opponents.map(handle_opponent);
	return {
		match: "match: " + match.number + ", round: " + match.round_number + ", group: " + match.group_number,
		teams: r
	};
};

axios.get('https://api.toornament.com/v1/tournaments/57fd38b5150ba019198b456e/matches?has_result=1&api_key=' + myKey)
.then(res => res.data)
.then(data => data.map(handle_match))
.then(function(matches){
    document.getElementById('container').innerHTML = matches.map(function(response){
            return(
              '<div class="match-box">' + response.match +
                '<li>' + response.teams[0].team.name + ' VS. ' + response.teams[1].team.name +'</li>' +
                '<li>' + response.teams[0].score + ' VS. ' + response.teams[1].score +'</li>' +
                '<li>' + response.teams[0].result + ' VS. ' + response.teams[1].result +'</li>' +
              '</div>'
            );
    }).join('');
})
.catch(e => console.error(e));

const axios = require("axios")
const R = require('ramda')
const myKey = "TMAeQSNQWnb-1aQhZqQebnqcVqBd3j9Djrz7mQ0qGkI"


const handle_result = (result) => {
	const outcomes = {
		1: "win",
		2: "draw",
		3: "loss"
	};
	return outcomes[result]
}

const handle_opponent = (opponent) => {
		return {
				team: R.pathOr('N/A', ['participant', 'name'], opponent),
				score: opponent.score,
				result: handle_result(opponent.result)
		}
}


const handle_match = (match) => {
	const r = match.opponents.map(handle_opponent);
	return {match: `match ${match.number} round ${match.round_number} group ${match.group_number}`, "teams": r}
}


axios.get('https://api.toornament.com/v1/tournaments/57fd38b5150ba019198b456e/matches?has_result=1&api_key=' + myKey)
.then(res => res.data)
.then(data => data.map(handle_match))
.then(matches => JSON.stringify(matches, null, 2))
.then(matches => console.log(matches))
.catch(e => console.error(e))

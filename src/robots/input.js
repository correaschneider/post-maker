const readLine = require('readline-sync')
const GoogleTrendsApi = require('google-trends-api')
const state = require('./state')

async function robot() {
	let content = {}

	let searchTerm = askAndReturnSearchTerm()
	content.searchTerm = await askAndReturnTrend(searchTerm)

	state.save(content)

	function askAndReturnSearchTerm () {
		return readLine.question('Digite o termo a ser buscado: ')
	}

	async function askAndReturnTrend(term) {
		console.log('Aguarde ...')

		let trends = await getGoogleTrends(term)

		let choice = readLine.keyInSelect(trends, 'Selecione um trend')

		return trends[choice].split(' - ')[0]
	}

	async function getGoogleTrends(term) {
		let date = new Date()
		date.setFullYear(date.getFullYear() - 1)

		return await GoogleTrendsApi.relatedQueries({
				keyword: term,
				geo: 'BR',
				startTime: date
			}, async (err, results) => {
			if (err) {
				console.log('Ocorreu um erro', err)

				process.exit(0)
			}

			results = JSON.parse(results)

			let trends = await results.default.rankedList[1].rankedKeyword.map((keyword, i) => `${keyword.query} - ${keyword.value}`)

			return trends
		})
	}
}

module.exports = robot
const readline = require('readline-sync')

function robot() {
	const content = {}

	content.searchTerm = askAndReturnSearchTerm()

	function askAndReturnSearchTerm () {
		return readline.question('Digite o termo a ser buscado:')
	}

	console.log(content)
}

module.exports = robot
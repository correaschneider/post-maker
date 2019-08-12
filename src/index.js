const robots = {
	input: require('./robots/input'),
	text: require('./robots/text')
}

async function start() {
	await robots.input()
	await robots.text()
}

start();
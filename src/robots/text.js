const Algorithmia = require('algorithmia')
// const algorithmia = require('algorithmia')
const credentialsAlgorithmia = require('../credentials/algorithmia.json')

const state = require('./state')

function robot() {
    let content = state.load()

    fetchContentFromWikipedia(content)
    // sanitizeContent(content)
    // breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content) {
        return Algorithmia.client(credentialsAlgorithmia.api_key)
            .algo("web/WikipediaParser/0.1.2")
            .pipe({
                "lang": "pt",
                "articleName": content.searchTerm
            })
            .then((response) => {
                console.log(response)
                content.sourceContentOriginal = response

                state.save(content)
            });

        // const algorithmiaAuthenticated = algorithmia(credentialsAlgorithmia.api_key)
        // const wikipediaAlgorithm = algorithmiaAuthenticated.algo("web/WikipediaParser/0.1.2")
        // const wikipediaResponse = wikipediaAlgorithm.pipe(content.trendTopSelected)
        // const wikipediaContent = wikipediaResponse.get()

        // console.log(wikipediaContent)
    }
}

module.exports = robot
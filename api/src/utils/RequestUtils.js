module.exports = {
    getByTerm(term) {
        return [
            {
                'siteUrl': { '$regex': term, '$options': 'i' }
            },
            {
                'imageUrl': { '$regex': term, '$options': 'i' }
            },
            {
                'alt': { '$regex': term, '$options': 'i' }
            },
            {
                'title': { '$regex': term, '$options': 'i' }
            }
        ]
    }
}

import { db } from '~/lib/firebase'

export function get (options = { perPage: 3 }) {
  return db.collection('infographics')
    .orderBy('published_date', 'desc')
    .limit(options.perPage)
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          return {
            ...data,
            id: doc.id,
            published_date: data.published_date.toDate()
          }
        })
      }
      return []
    })
}

export function getById (id) {
  return db.collection('infographics')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          published_date: data.published_date.toDate()
        }
      }
      return null
    })
}

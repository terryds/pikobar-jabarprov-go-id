import { db } from '~/lib/firebase'

export function getCases (options) {
  return db.collection('statistics')
    .doc('jabar-dan-nasional')
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data()
      }
      return null
    })
}

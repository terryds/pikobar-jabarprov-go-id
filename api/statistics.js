import { db } from '~/lib/firebase'

export function getCases (options) {
  return db.collection('statistics')
    .doc('jabar-dan-nasional')
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        data.updated_at = data.updated_at.toDate()
        return {
          ...data
        }
      }
      return null
    })
}

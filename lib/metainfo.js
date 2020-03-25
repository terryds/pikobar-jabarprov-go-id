export function useDefaultMetaInfo () {
  return {
    title: process.env.APP_TITLE,
    meta: ['url', 'og:url'].map(prop => ({
      hid: prop,
      property: prop,
      content: process.env.URL
    }))
  }
}

export function useArticleMetaInfo ({
  title = process.env.APP_TITLE,
  description,
  url = process.env.URL,
  author,
  publishedTime,
  image = `${process.env.URL}/logo.jpg`
}) {
  const meta = [{
    hid: 'og:type',
    property: 'og:type',
    content: 'article'
  }]
  if (description) {
    meta.push(
      {
        hid: 'description',
        property: 'description',
        content: description
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      }
    )
  }
  if (url) {
    meta.push({
      hid: 'og:url',
      property: 'og:url',
      content: url
    })
  }
  if (author) {
    meta.push({
      hid: 'og:author',
      property: 'og:author',
      content: author
    })
  }
  if (publishedTime) {
    meta.push({
      hid: 'og:published_time',
      property: 'og:published_time',
      content: publishedTime
    })
  }
  if (image) {
    meta.push({
      hid: 'og:image',
      property: 'og:image',
      content: image
    })
  }
  return {
    title,
    meta
  }
}

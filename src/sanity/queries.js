export const projectsQuery = `
  *[_type == "project"] | order(orderRank) {
    _id,
    title,
    slug,
    category,
    thumbnail,
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    thumbnail { ..., asset-> },
    videoUrl,
    gallery[] {
      ...,
      asset->
    },
    body[] {
      ...,
      _type == "image" => { ..., asset-> }
    },
    columnsContent[] {
      columns,
      column1[] { ..., _type == "image" => { ..., asset-> } },
      column2[] { ..., _type == "image" => { ..., asset-> } },
      column3[] { ..., _type == "image" => { ..., asset-> } }
    }
  }
`


export const navPagesQuery = `
  *[_type == "page" && showInNav == true] | order(orderRank) {
    _id,
    title,
    navLabel,
    slug,
  }
`

export const allProjectsQuery = `
  *[_type == "project"] | order(orderRank) {
    _id,
    title,
    slug,
    category,
    thumbnail,
  }
`


export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body[] {
      ...,
      _type == "image" => { ..., asset-> }
    },
    columnsContent[] {
      columns,
      column1[] { ..., _type == "image" => { ..., asset-> } },
      column2[] { ..., _type == "image" => { ..., asset-> } },
      column3[] { ..., _type == "image" => { ..., asset-> } }
    }
  }
`

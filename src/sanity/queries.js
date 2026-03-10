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
    thumbnail,
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

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    publishedAt,
    thumbnail,
  }
`

export const postsCountQuery = `count(*[_type == "post"])`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    thumbnail,
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

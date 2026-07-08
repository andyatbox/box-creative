// Turns a pasted Vimeo/Gumlet URL or full embed code into a player iframe src.
export function getVideoEmbedSrc(input) {
  if (!input) return null
  const vimeoId = input.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1]
  if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}`
  const gumletId = input.match(/gumlet\.io\/embed\/([\w-]+)/)?.[1]
  if (gumletId) return `https://play.gumlet.io/embed/${gumletId}`
  return null
}

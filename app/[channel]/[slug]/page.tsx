import { getContentBySlug } from "@/lib/mdx"
import { notFound } from "next/navigation"

export default async function ContentPage({
  params,
}: {
  params: { channel: string; slug: string }
}) {
  const content = await getContentBySlug(params.channel, params.slug)

  if (!content) {
    notFound()
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto">
      {content.content}
    </article>
  )
}
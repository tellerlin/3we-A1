import { getAllContent } from "@/lib/mdx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function ChannelPage({
  params,
}: {
  params: { channel: string }
}) {
  const content = await getAllContent(params.channel)

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 capitalize">{params.channel}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item: any) => (
          <Link key={item.slug} href={`/${params.channel}/${item.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{item.category}</span>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
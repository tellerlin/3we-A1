import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, Map, BookOpen } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: BookOpen,
    title: "Skills",
    description: "Master essential outdoor skills and techniques",
    href: "/skills",
  },
  {
    icon: Compass,
    title: "Gear",
    description: "Find the right equipment for your adventures",
    href: "/gear",
  },
  {
    icon: Map,
    title: "Locations",
    description: "Discover amazing places to explore",
    href: "/locations",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to Adventure Hub
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive guide to outdoor adventures. Explore essential skills,
          discover the right gear, and find amazing locations for your next journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link key={feature.title} href={feature.href}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-8 w-8 mb-2" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click to explore {feature.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
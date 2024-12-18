import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export async function getContentBySlug(channel: string, slug: string) {
  const contentDir = path.join(process.cwd(), 'content', channel)
  const filePath = path.join(contentDir, `${slug}.mdx`)
  
  try {
    const source = fs.readFileSync(filePath, 'utf8')
    const { content, data } = matter(source)
    
    const mdx = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight, rehypeSlug],
        },
      },
    })

    return {
      content: mdx,
      frontmatter: data,
    }
  } catch (error) {
    console.error('Error reading MDX file:', error)
    return null
  }
}

export async function getAllContent(channel: string) {
  const contentDir = path.join(process.cwd(), 'content', channel)
  
  try {
    const files = fs.readdirSync(contentDir)
    const content = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const source = fs.readFileSync(path.join(contentDir, file), 'utf8')
        const { data } = matter(source)
        return {
          ...data,
          slug: file.replace('.mdx', ''),
        }
      })
      .sort((a: any, b: any) => (a.date > b.date ? -1 : 1))

    return content
  } catch (error) {
    console.error('Error reading content directory:', error)
    return []
  }
}
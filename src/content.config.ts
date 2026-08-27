import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    status: z.enum(['live', 'deployed', 'shipped']),
    statusLabel: z.string(),
    featured: z.boolean().default(false),
    date: z.date(),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    idx: z.string(),
    /**
     * Optional images/video for the card's visual slot. Paths are served from
     * `public/media/<slug>/`, kept out of the `/projects/*` route namespace so
     * page and asset paths never collide. Falls back to the project's ASCII art
     * when absent. `alt` is per-locale, which is why this lives in frontmatter
     * rather than in a slug-keyed map.
     */
    media: z
      .array(
        z.object({
          type: z.enum(['image', 'video']).default('image'),
          src: z.string(),
          alt: z.string(),
          poster: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const collections = { projects };

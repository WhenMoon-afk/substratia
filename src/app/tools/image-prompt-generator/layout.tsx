import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Image Prompt Generator - AI Art Prompt Builder | Substratia',
  description: 'Free drag-and-drop prompt builder for AI image generation. Create prompts for Midjourney, DALL-E, Stable Diffusion, Grok, and more. 50+ style presets, negative prompts, intensity sliders.',
  keywords: 'AI image prompt, Midjourney prompt generator, DALL-E prompt builder, Stable Diffusion prompts, image generation prompt, AI art prompt maker, negative prompts, style presets',
  openGraph: {
    title: 'Image Prompt Generator - Build AI Art Prompts Visually',
    description: 'Free tool to create image generation prompts. 50+ style presets, negative prompts, platform-specific output. Works with Midjourney, DALL-E, Stable Diffusion.',
    type: 'website',
    url: 'https://substratia.io/tools/image-prompt-generator',
  },
}

export default function ImagePromptGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import type { FeatureVideoSource } from '../types'

const video = (id: string, durationLabel: string): FeatureVideoSource => ({
  src: `https://kukurt123.github.io/system-pricing/videos/walkthroughs/${id}.mp4`,
  poster: `${import.meta.env.BASE_URL}videos/walkthroughs/${id}.jpg`,
  durationLabel,
})

export const featureVideos: Record<string, FeatureVideoSource> = {
  'core-system': video('core-system-core-only-v3', '2:38'),
  'cloud-backup': video('cloud-backup', '0:14'),
  'remote-access': video('remote-access', '0:56'),
  'ai-assistant': video('ai-assistant', '1:32'),
  'lab-scanning': video('lab-scanning', '0:33'),
  'inventory': video('inventory', '1:07'),
  'remote-encoding': video('remote-encoding', '1:15'),
  'dashboard': video('dashboard', '0:43'),
  'pediatrics-pack': video('pediatrics-pack', '1:06'),
}

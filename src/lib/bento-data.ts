export interface BentoTile {
  id: 'live_analytics' | 'voice' | 'email' | 'ai_content' | 'web' | 'lifecycle' | 'crm'
  title: string
  description: string
}

export const TILES: BentoTile[] = [
  {
    id: 'live_analytics',
    title: 'Live Analytics Dashboard',
    description: 'Real-time business metrics and performance tracking'
  },
  {
    id: 'voice', 
    title: 'AI Voice Automation',
    description: '24/7 intelligent call handling and customer interaction'
  },
  {
    id: 'email',
    title: 'Email Campaign Automation', 
    description: 'Smart email sequences and follow-up campaigns'
  },
  {
    id: 'ai_content',
    title: 'AI Content Generation',
    description: 'Automated content creation for marketing and communication'
  },
  {
    id: 'web',
    title: 'Web Data Collection',
    description: 'Automated lead research and data gathering'
  },
  {
    id: 'lifecycle',
    title: 'Lead Lifecycle Management',
    description: 'Complete pipeline tracking from lead to customer'
  },
  {
    id: 'crm',
    title: 'Platform Integrations',
    description: 'Connect with 100+ tools and services seamlessly'
  }
]
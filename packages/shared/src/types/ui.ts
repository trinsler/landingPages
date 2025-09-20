// UI Component Types for consistent usage across all apps

export interface TerminalConfig {
  title: string
  command?: string
  prompt?: string
  user?: string
  host?: string
}

export type BackgroundThemeName = 'tech' | 'growth' | 'matrix' | 'cyber'

export interface BackgroundTheme {
  theme: BackgroundThemeName
  intensity?: 'low' | 'medium' | 'high'
  animated?: boolean
}

export interface IconConfig {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  animated?: boolean
}

export interface CardVariant {
  variant: 'cyber' | 'neon' | 'glass' | 'terminal'
  size?: 'sm' | 'md' | 'lg' | 'full'
  hover?: boolean
  glow?: boolean
  interactive?: boolean
}

export interface AnimationConfig {
  type: 'slide-up' | 'fade-in' | 'matrix-rain' | 'glitch' | 'pulse'
  delay?: number
  duration?: number
  stagger?: boolean
}

export interface PageSection {
  id: string
  title: string
  description?: string
  component?: string
  props?: Record<string, any>
  background?: BackgroundTheme
  animation?: AnimationConfig
}

export interface Article {
  id: string
  title: string
  slug: string
  preview: string
  content?: string
  category: string
  tags: string[]
  author?: string
  publishedAt: string
  readTime: string
  featured?: boolean
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  classification?: 'public' | 'confidential' | 'secret' | 'top-secret'
}

export interface TrendItem {
  id: string
  title: string
  description: string
  category: string
  impact: 'low' | 'medium' | 'high' | 'critical'
  timeframe: string
  urgency: 'low' | 'medium' | 'high'
  implementationCost: 'low' | 'medium' | 'high'
  roiPotential: number
  icon?: IconConfig
  tags: string[]
}

export interface CaseStudy {
  id: string
  clientName: string
  industry: string
  location: string
  challenge: string
  solution: string
  results: {
    metric: string
    before: string | number
    after: string | number
    improvement: string
  }[]
  testimonial?: {
    quote: string
    author: string
    position: string
  }
  timeline: string
  budget: 'low' | 'medium' | 'high'
  tags: string[]
  featured?: boolean
}

export interface ServiceOffering {
  id: string
  name: string
  description: string
  features: string[]
  pricing?: {
    model: 'equity' | 'fixed' | 'subscription' | 'hybrid'
    startingPrice?: string
    equity?: string
  }
  deliverables: string[]
  timeline: string
  requirements: string[]
  icon?: IconConfig
  category: string
  popular?: boolean
}

export interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  avatar?: string
  skills: string[]
  experience: string
  achievements: string[]
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface ContactForm {
  name: string
  email: string
  company?: string
  budget?: string
  timeline?: string
  message: string
  services?: string[]
  newsletter?: boolean
  source?: string
}

export interface ContactFormService {
  label: string
  value: string
}

export interface ContactFormConfig {
  title?: string
  subtitle?: string
  showCompany?: boolean
  showBudget?: boolean
  showServices?: boolean
  showTimeline?: boolean
  showNewsletter?: boolean
  services?: ContactFormService[]
  variant?: 'default' | 'minimal' | 'card'
  submitEndpoint?: string
}
<template>
  <div class="py-16">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
          Unsere Dienstleistungen
        </h1>
        <p class="text-xl text-gray-600">
          Umfassende Digital Marketing Lösungen für lokale Unternehmen
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 mb-16">
        <div v-for="service in services" :key="service.title" class="bg-white p-8 rounded-2xl shadow-lg">
          <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
            <div class="w-8 h-8 bg-green-600 rounded"></div>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ service.title }}</h2>
          <p class="text-gray-600 mb-6">{{ service.description }}</p>
          <ul class="space-y-2">
            <li v-for="feature in service.features" :key="feature" class="flex items-center text-gray-600">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>

      <div class="text-center">
        <NuxtLink
          to="/contact"
          class="btn-primary"
        >
          Beratungstermin vereinbaren
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  RocketLaunchIcon,
  ArrowRightIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  SpeakerWaveIcon,
  ChartPieIcon
} from '@heroicons/vue/24/outline'

useHead({
  title: 'EQUITY-FOR-GROWTH SERVICES MATRIX - Trinsler Revolution'
})

const services = [
  {
    title: 'Growth-as-a-Service Revolution',
    description: 'Complete operational growth takeover. We become your growth department and scale your startup through equity partnership.',
    features: [
      'Full-Stack Growth Operations',
      'Viral Marketing Engineering', 
      'Product-Market-Fit Optimization',
      'Revenue Funnel Automation',
      'Team Scaling & Hiring',
      'Strategic Partnership Development'
    ],
    filename: 'growth_revolution.sh',
    command: 'execute_growth_takeover',
    module: 'CORE',
    icon: RocketLaunchIcon,
    iconBg: 'bg-gradient-to-r from-accent-neon to-accent-cyan',
    status: 'REVOLUTIONARY',
    statusColor: 'text-accent-neon',
    equityRange: '8-20%',
    monthlyFee: '€300-800',
    processStatus: 'SCALING'
  },
  {
    title: 'Digital Marketing Domination',
    description: 'Advanced digital marketing operations with data-driven strategies. SEO, content, and paid advertising mastery.',
    features: [
      'SEO & Content Warfare',
      'Social Media Amplification',
      'Paid Ads Optimization Engine',
      'Conversion Rate Hacking',
      'Analytics & Attribution',
      'Brand Authority Building'
    ],
    filename: 'marketing_domination.py',
    command: 'initialize_marketing_stack',
    module: 'MKT',
    icon: ChartBarIcon,
    iconBg: 'bg-gradient-to-r from-accent-purple to-accent-pink',
    status: 'DOMINATING',
    statusColor: 'text-accent-purple',
    equityRange: '5-15%',
    monthlyFee: '€200-500',
    processStatus: 'OPTIMIZING'
  },
  {
    title: 'Product Growth Engineering',
    description: 'Product-led growth strategies and user acquisition funnels. We engineer viral loops and retention systems.',
    features: [
      'User Onboarding Optimization',
      'Viral Growth Loop Creation',
      'Retention & Engagement Hacks',
      'A/B Testing Framework',
      'User Journey Analytics',
      'Feature Adoption Tracking'
    ],
    filename: 'product_growth.js',
    command: 'deploy_growth_loops',
    module: 'PLG',
    icon: MagnifyingGlassIcon,
    iconBg: 'bg-gradient-to-r from-accent-cyan to-accent-orange',
    status: 'VIRAL',
    statusColor: 'text-accent-cyan',
    equityRange: '6-18%',
    monthlyFee: '€250-600',
    processStatus: 'VIRAL_SPREADING'
  },
  {
    title: 'Revenue Operations Matrix',
    description: 'Complete revenue operations overhaul. Sales funnel automation, CRM optimization, and revenue intelligence.',
    features: [
      'Sales Funnel Automation',
      'CRM & Pipeline Optimization',
      'Revenue Attribution',
      'Lead Scoring & Qualification',
      'Sales Process Engineering',
      'Revenue Forecasting AI'
    ],
    filename: 'revenue_matrix.exe',
    command: 'scale_revenue_operations',
    module: 'REV',
    icon: ChartPieIcon,
    iconBg: 'bg-gradient-to-r from-accent-orange to-accent-neon',
    status: 'SCALING',
    statusColor: 'text-accent-orange',
    equityRange: '7-16%',
    monthlyFee: '€280-650',
    processStatus: 'REVENUE_MAXIMIZED'
  }
]
</script>
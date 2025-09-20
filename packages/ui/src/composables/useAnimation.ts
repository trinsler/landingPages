import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'
import type { AnimationConfig } from '@monorepo/shared'

export interface AnimationState {
  isVisible: Ref<boolean>
  isAnimating: Ref<boolean>
  progress: Ref<number>
  setupIntersectionObserver: (element: Element) => void
}

export function useAnimation(config: Partial<AnimationConfig> = {}): AnimationState {
  const isVisible = ref(false)
  const isAnimating = ref(false)
  const progress = ref(0)

  let observer: IntersectionObserver | null = null
  let animationFrame: number | null = null

  const startAnimation = () => {
    if (isAnimating.value) return

    isAnimating.value = true
    let start: number | null = null
    const duration = config.duration || 1000

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start

      progress.value = Math.min(elapsed / duration, 1)

      if (progress.value < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        isAnimating.value = false
        progress.value = 1
      }
    }

    animationFrame = requestAnimationFrame(animate)
  }

  const setupIntersectionObserver = (element: Element) => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              isVisible.value = true
              startAnimation()
            }, config.delay || 0)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
  }

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
  })

  return {
    isVisible,
    isAnimating,
    progress,
    setupIntersectionObserver
  }
}

export function useStaggeredAnimation(items: any[], baseDelay = 0, staggerDelay = 200) {
  const visibleItems = ref<Set<number>>(new Set())

  const showItem = (index: number) => {
    setTimeout(() => {
      visibleItems.value.add(index)
    }, baseDelay + (index * staggerDelay))
  }

  const showAllItems = () => {
    items.forEach((_, index) => showItem(index))
  }

  const isItemVisible = (index: number) => {
    return visibleItems.value.has(index)
  }

  return {
    visibleItems,
    showItem,
    showAllItems,
    isItemVisible
  }
}

export function useMatrixEffect() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
  const columns = ref<string[]>([])
  const drops = ref<number[]>([])

  const initMatrix = (width: number) => {
    const cols = Math.floor(width / 20)
    columns.value = Array(cols).fill('')
    drops.value = Array(cols).fill(1)
  }

  const updateMatrix = () => {
    for (let i = 0; i < drops.value.length; i++) {
      const char = characters[Math.floor(Math.random() * characters.length)]
      if (char && columns.value[i] !== undefined) {
        columns.value[i] += char
      }

      const currentDrop = drops.value[i]
      if (currentDrop && currentDrop * 20 > window.innerHeight && Math.random() > 0.975) {
        drops.value[i] = 0
        columns.value[i] = ''
      }
      const currentDropValue = drops.value[i]
      if (currentDropValue !== undefined && currentDropValue !== null) {
        drops.value[i] = currentDropValue + 1
      }
    }
  }

  return {
    columns,
    drops,
    initMatrix,
    updateMatrix
  }
}
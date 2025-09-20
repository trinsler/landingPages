import { ref, computed, watch, onMounted, onUnmounted, type Ref } from 'vue'

export interface ScrollState {
  x: Ref<number>
  y: Ref<number>
  isScrolling: Ref<boolean>
  direction: Ref<'up' | 'down' | null>
  reachedTop: Ref<boolean>
  reachedBottom: Ref<boolean>
}

export function useScroll(): ScrollState {
  const x = ref(0)
  const y = ref(0)
  const isScrolling = ref(false)
  const direction = ref<'up' | 'down' | null>(null)

  let lastY = 0
  let scrollTimeout: number | null = null

  const reachedTop = computed(() => y.value <= 0)
  const reachedBottom = computed(() => {
    if (typeof window === 'undefined') return false
    return y.value + window.innerHeight >= document.documentElement.scrollHeight - 10
  })

  const handleScroll = () => {
    if (typeof window === 'undefined') return

    x.value = window.scrollX
    y.value = window.scrollY

    direction.value = y.value > lastY ? 'down' : 'up'
    lastY = y.value

    isScrolling.value = true

    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    scrollTimeout = window.setTimeout(() => {
      isScrolling.value = false
    }, 150)
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll)
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
  })

  return {
    x,
    y,
    isScrolling,
    direction,
    reachedTop,
    reachedBottom
  }
}

export interface IntersectionOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
}

export function useIntersectionObserver(
  options: IntersectionOptions = {}
) {
  const isIntersecting = ref(false)
  const entry = ref<IntersectionObserverEntry | null>(null)
  const target = ref<Element | null>(null)

  let observer: IntersectionObserver | null = null

  const observe = (element: Element) => {
    if (observer) {
      observer.disconnect()
    }

    target.value = element

    observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (firstEntry) {
          entry.value = firstEntry
          isIntersecting.value = firstEntry.isIntersecting
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px',
        root: options.root ?? null
      }
    )

    observer.observe(element)
  }

  const unobserve = () => {
    if (observer && target.value) {
      observer.unobserve(target.value)
    }
  }

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    isIntersecting,
    entry,
    observe,
    unobserve
  }
}

export function useElementVisibility(threshold = 0.1) {
  const isVisible = ref(false)
  const hasBeenVisible = ref(false)

  const { observe, isIntersecting } = useIntersectionObserver({
    threshold
  })

  watch(isIntersecting, (visible) => {
    isVisible.value = visible
    if (visible && !hasBeenVisible.value) {
      hasBeenVisible.value = true
    }
  })

  return {
    isVisible,
    hasBeenVisible,
    observe
  }
}
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

export interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage: number
  networkLatency: number
  bundleSize: number
  componentsCount: number
  lastUpdate: Date
}

export interface ResourceMetrics {
  images: number
  scripts: number
  stylesheets: number
  fonts: number
  totalSize: number
  loadedResources: number
  failedResources: number
}

export const usePerformance = () => {
  const metrics = ref<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkLatency: 0,
    bundleSize: 0,
    componentsCount: 0,
    lastUpdate: new Date()
  })

  const resourceMetrics = ref<ResourceMetrics>({
    images: 0,
    scripts: 0,
    stylesheets: 0,
    fonts: 0,
    totalSize: 0,
    loadedResources: 0,
    failedResources: 0
  })

  // Performance measurement utilities
  const measureRenderTime = async (fn: () => Promise<void> | void): Promise<number> => {
    const start = performance.now()
    await fn()
    await nextTick() // Wait for DOM updates
    const end = performance.now()
    return end - start
  }

  const measureAsyncOperation = async <T>(
    operation: () => Promise<T>,
    operationName: string = 'Unknown'
  ): Promise<{ result: T; duration: number }> => {
    const start = performance.now()
    
    try {
      const result = await operation()
      const duration = performance.now() - start
      
      console.log(`Performance: ${operationName} took ${duration.toFixed(2)}ms`)
      
      return { result, duration }
    } catch (error) {
      const duration = performance.now() - start
      console.warn(`Performance: ${operationName} failed after ${duration.toFixed(2)}ms`, error)
      throw error
    }
  }

  // Memory monitoring
  const getMemoryUsage = (): number => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const memory = (performance as any).memory
      if (memory) {
        return memory.usedJSHeapSize
      }
    }
    return 0
  }

  const monitorMemoryUsage = (intervalMs: number = 5000) => {
    const interval = setInterval(() => {
      metrics.value.memoryUsage = getMemoryUsage()
      
      // Warn if memory usage is high
      if (metrics.value.memoryUsage > 50 * 1024 * 1024) { // 50MB
        console.warn('High memory usage detected:', metrics.value.memoryUsage)
      }
    }, intervalMs)

    return () => clearInterval(interval)
  }

  // Resource monitoring
  const analyzeResources = () => {
    if (typeof window === 'undefined') return

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    
    const analysis: ResourceMetrics = {
      images: 0,
      scripts: 0,
      stylesheets: 0,
      fonts: 0,
      totalSize: 0,
      loadedResources: 0,
      failedResources: 0
    }

    resources.forEach(resource => {
      // Count resource types
      if (resource.name.includes('.jpg') || resource.name.includes('.png') || 
          resource.name.includes('.gif') || resource.name.includes('.webp') ||
          resource.name.includes('.svg')) {
        analysis.images++
      } else if (resource.name.includes('.js')) {
        analysis.scripts++
      } else if (resource.name.includes('.css')) {
        analysis.stylesheets++
      } else if (resource.name.includes('.woff') || resource.name.includes('.ttf')) {
        analysis.fonts++
      }

      // Calculate sizes and status
      if (resource.transferSize) {
        analysis.totalSize += resource.transferSize
        analysis.loadedResources++
      }

      if (resource.responseEnd === 0) {
        analysis.failedResources++
      }
    })

    resourceMetrics.value = analysis
    return analysis
  }

  // Network latency estimation
  const measureNetworkLatency = (): Promise<number> => {
    return new Promise((resolve) => {
      const start = performance.now()
      const img = new Image()
      
      img.onload = img.onerror = () => {
        const latency = performance.now() - start
        metrics.value.networkLatency = latency
        resolve(latency)
      }
      
      // Use a tiny image for latency test
      img.src = '/favicon.ico?' + Date.now()
    })
  }

  // Bundle size analysis
  const estimateBundleSize = () => {
    if (typeof window === 'undefined') return 0

    const scripts = document.querySelectorAll('script[src]')
    let estimatedSize = 0

    scripts.forEach(script => {
      // Rough estimation based on average JS file sizes
      estimatedSize += 100000 // 100KB average per script
    })

    metrics.value.bundleSize = estimatedSize
    return estimatedSize
  }

  // Component counting (Vue-specific)
  const countComponents = () => {
    if (typeof window === 'undefined') return 0

    // Count Vue components by looking for data-v- attributes
    const vueElements = document.querySelectorAll('[data-v-]')
    metrics.value.componentsCount = vueElements.length
    return vueElements.length
  }

  // Comprehensive performance audit
  const runPerformanceAudit = async (): Promise<PerformanceMetrics> => {
    const start = performance.now()

    // Measure various performance aspects
    await Promise.all([
      measureNetworkLatency(),
      nextTick(() => {
        analyzeResources()
        estimateBundleSize()
        countComponents()
      })
    ])

    metrics.value.loadTime = performance.now()
    metrics.value.renderTime = performance.now() - start
    metrics.value.memoryUsage = getMemoryUsage()
    metrics.value.lastUpdate = new Date()

    return metrics.value
  }

  // Performance optimization helpers
  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle = false
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  const createLazyLoader = () => {
    const loadedImages = new Set<string>()
    
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      if (loadedImages.has(src)) {
        const img = new Image()
        img.src = src
        return Promise.resolve(img)
      }

      return new Promise((resolve, reject) => {
        const img = new Image()
        
        img.onload = () => {
          loadedImages.add(src)
          resolve(img)
        }
        
        img.onerror = () => {
          reject(new Error(`Failed to load image: ${src}`))
        }
        
        img.src = src
      })
    }

    const preloadImages = async (urls: string[]): Promise<HTMLImageElement[]> => {
      const promises = urls.map(url => loadImage(url))
      return Promise.all(promises)
    }

    return {
      loadImage,
      preloadImages,
      loadedImages: () => Array.from(loadedImages)
    }
  }

  // Virtual scrolling helper for large lists
  const createVirtualScroller = (
    itemHeight: number,
    containerHeight: number,
    totalItems: number
  ) => {
    const visibleCount = Math.ceil(containerHeight / itemHeight)
    const buffer = Math.floor(visibleCount / 2)

    const calculateVisibleRange = (scrollTop: number) => {
      const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer)
      const end = Math.min(totalItems - 1, start + visibleCount + buffer * 2)
      
      return {
        start,
        end,
        visibleItems: end - start + 1,
        offsetY: start * itemHeight
      }
    }

    return {
      calculateVisibleRange,
      itemHeight,
      visibleCount,
      totalHeight: totalItems * itemHeight
    }
  }

  // Progressive loading for large datasets
  const createProgressiveLoader = <T>(
    loadFunction: (offset: number, limit: number) => Promise<T[]>,
    chunkSize: number = 20
  ) => {
    const data = ref<T[]>([])
    const isLoading = ref(false)
    const hasMore = ref(true)
    const currentOffset = ref(0)

    const loadMore = async (): Promise<void> => {
      if (isLoading.value || !hasMore.value) return

      isLoading.value = true
      
      try {
        const newData = await loadFunction(currentOffset.value, chunkSize)
        
        if (newData.length < chunkSize) {
          hasMore.value = false
        }
        
        data.value.push(...newData as T[])
        currentOffset.value += newData.length
      } catch (error) {
        console.error('Failed to load more data:', error)
      } finally {
        isLoading.value = false
      }
    }

    const reset = () => {
      data.value = []
      currentOffset.value = 0
      hasMore.value = true
      isLoading.value = false
    }

    return {
      data,
      isLoading,
      hasMore,
      loadMore,
      reset
    }
  }

  // Performance budget monitoring
  const performanceBudget = {
    maxLoadTime: 3000, // 3 seconds
    maxRenderTime: 100, // 100ms
    maxMemoryUsage: 100 * 1024 * 1024, // 100MB
    maxBundleSize: 1024 * 1024, // 1MB
    maxNetworkLatency: 1000 // 1 second
  }

  const checkPerformanceBudget = (currentMetrics: PerformanceMetrics) => {
    const violations = []

    if (currentMetrics.loadTime > performanceBudget.maxLoadTime) {
      violations.push(`Load time: ${currentMetrics.loadTime}ms > ${performanceBudget.maxLoadTime}ms`)
    }

    if (currentMetrics.renderTime > performanceBudget.maxRenderTime) {
      violations.push(`Render time: ${currentMetrics.renderTime}ms > ${performanceBudget.maxRenderTime}ms`)
    }

    if (currentMetrics.memoryUsage > performanceBudget.maxMemoryUsage) {
      violations.push(`Memory usage: ${currentMetrics.memoryUsage} > ${performanceBudget.maxMemoryUsage}`)
    }

    if (currentMetrics.bundleSize > performanceBudget.maxBundleSize) {
      violations.push(`Bundle size: ${currentMetrics.bundleSize} > ${performanceBudget.maxBundleSize}`)
    }

    if (currentMetrics.networkLatency > performanceBudget.maxNetworkLatency) {
      violations.push(`Network latency: ${currentMetrics.networkLatency}ms > ${performanceBudget.maxNetworkLatency}ms`)
    }

    if (violations.length > 0) {
      console.warn('Performance budget violations:', violations)
    }

    return {
      passed: violations.length === 0,
      violations
    }
  }

  return {
    metrics,
    resourceMetrics,
    measureRenderTime,
    measureAsyncOperation,
    getMemoryUsage,
    monitorMemoryUsage,
    analyzeResources,
    measureNetworkLatency,
    runPerformanceAudit,
    
    // Optimization helpers
    debounce,
    throttle,
    createLazyLoader,
    createVirtualScroller,
    createProgressiveLoader,
    
    // Performance budget
    performanceBudget,
    checkPerformanceBudget
  }
}

// Auto-initialize performance monitoring
export const useAutoPerformanceMonitoring = () => {
  const { runPerformanceAudit, monitorMemoryUsage, checkPerformanceBudget, metrics } = usePerformance()
  
  onMounted(async () => {
    // Run initial audit
    await runPerformanceAudit()
    
    // Start memory monitoring
    const stopMonitoring = monitorMemoryUsage(10000) // Every 10 seconds
    
    // Check budget compliance
    checkPerformanceBudget(metrics.value)
    
    onUnmounted(() => {
      stopMonitoring()
    })
  })

  return {
    metrics,
    runPerformanceAudit
  }
}
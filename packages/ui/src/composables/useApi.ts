import { ref, computed, type Ref } from 'vue'

export interface ApiState<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<Error | null>
  isSuccess: Ref<boolean>
  isError: Ref<boolean>
  refetch: () => Promise<void>
  mutate: (newData: T) => void
}

export interface ApiConfig {
  immediate?: boolean
  cache?: boolean
  timeout?: number
  retries?: number
}

export function useApi<T>(fetcher: () => Promise<T>, config: ApiConfig = {}): ApiState<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const isSuccess = computed(() => data.value !== null && error.value === null)
  const isError = computed(() => error.value !== null)

  const execute = async (attempt = 0): Promise<void> => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      const controller = new AbortController()

      if (config.timeout) {
        setTimeout(() => controller.abort(), config.timeout)
      }

      const result = await fetcher()
      data.value = result
    } catch (err) {
      const apiError = err instanceof Error ? err : new Error('Unknown error')

      if (config.retries && attempt < config.retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)))
        return execute(attempt + 1)
      }

      error.value = apiError
    } finally {
      loading.value = false
    }
  }

  const mutate = (newData: T) => {
    data.value = newData
    error.value = null
  }

  if (config.immediate !== false) {
    execute()
  }

  return {
    data,
    loading,
    error,
    isSuccess,
    isError,
    refetch: () => execute(),
    mutate,
  }
}

export function useAsyncData<T>(key: string, fetcher: () => Promise<T>, config: ApiConfig = {}) {
  const cache = new Map<string, T>()

  const wrappedFetcher = async () => {
    if (config.cache && cache.has(key)) {
      return cache.get(key)!
    }

    const result = await fetcher()

    if (config.cache) {
      cache.set(key, result)
    }

    return result
  }

  return useApi(wrappedFetcher, config)
}

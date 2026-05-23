import { API_BASE_URL } from '@/lib/constants'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>
}

const isDev = process.env.NODE_ENV === 'development'
const API_TIMEOUT_MS = isDev ? 2500 : 8000

function buildUrl(path: string, params?: FetchOptions['params']) {
  const url = new URL(path.startsWith('http') ? path : `${API_BASE_URL}${path}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return url.toString()
}

export async function apiFetch<T>(
  path: string,
  { params, signal, ...options }: FetchOptions = {}
): Promise<T> {
  const url = buildUrl(path, params)
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      ...options,
      signal: signal ?? controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: options.next ?? { revalidate: isDev ? 30 : 120 },
    })

    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      throw new ApiError(
        body.message || `Request failed with status ${response.status}`,
        response.status
      )
    }

    return response.json() as Promise<T>
  } finally {
    clearTimeout(timeout)
  }
}

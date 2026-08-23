/**
 * ══════════════════════════════════════════════════════════════
 *  API Client — Base fetch wrapper for Payload CMS REST API
 * ══════════════════════════════════════════════════════════════
 */
import type { ApiError } from '../types';

export interface ApiClientConfig {
  baseUrl: string;
  /** Optional JWT token for authenticated requests (future admin app) */
  getToken?: () => Promise<string | null>;
  /** Request timeout in ms (default: 15000) */
  timeout?: number;
}

let _config: ApiClientConfig = {
  baseUrl: 'https://www.makhanaghar.in/api',
  timeout: 15000,
};

/**
 * Initialize the API client with configuration.
 * Call this once at app startup.
 */
export function configureApi(config: Partial<ApiClientConfig>): void {
  _config = { ..._config, ...config };
}

export function getApiConfig(): ApiClientConfig {
  return _config;
}

/**
 * Build a full URL with query parameters.
 */
function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(`${_config.baseUrl}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

/**
 * Core fetch wrapper with error handling.
 */
export async function apiRequest<T>(
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: unknown;
    params?: Record<string, string | number | boolean | undefined>;
    headers?: Record<string, string>;
  } = {},
): Promise<T> {
  const { method = 'GET', body, params, headers: extraHeaders } = options;

  const url = buildUrl(path, params);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  };

  // Inject auth token if available (for future admin app)
  if (_config.getToken) {
    const token = await _config.getToken();
    if (token) {
      headers['Authorization'] = `JWT ${token}`;
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), _config.timeout ?? 15000);

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData: ApiError;
      try {
        errorData = await response.json() as ApiError;
      } catch {
        errorData = {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }
      throw errorData;
    }

    return (await response.json()) as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw {
        message: 'Request timed out',
        status: 408,
      } satisfies ApiError;
    }

    // Re-throw ApiError objects
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      'status' in error
    ) {
      throw error;
    }

    throw {
      message: error instanceof Error ? error.message : 'Network error',
      status: 0,
    } satisfies ApiError;
  }
}

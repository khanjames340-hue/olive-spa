import { useCallback, useEffect, useState } from 'react'

// Loads data from the API and reloads whenever `deps` change
export default function useApiData(fetcher, deps) {
  const [state, setState] = useState({ data: null, error: null, loading: true })
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))
    fetcher().then(
      (data) => !cancelled && setState({ data, error: null, loading: false }),
      (error) => !cancelled && setState((s) => ({ ...s, error, loading: false }))
    )
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce])

  const reload = useCallback(() => setNonce((n) => n + 1), [])
  const setData = useCallback(
    (updater) => setState((s) => ({ ...s, data: updater(s.data) })),
    []
  )

  return { ...state, reload, setData }
}

export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

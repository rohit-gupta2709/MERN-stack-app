import { useCallback, useEffect, useRef, useState } from 'react'

export const useHttpHook = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const activeHttpRequests = useRef([])

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        const httpAbortCtrll = new AbortController()
        activeHttpRequests.current.push(httpAbortCtrll)
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrll.signal
            })

            const responseData = await response.json()

            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrll)

            if (!response.ok) {
                throw new Error(responseData.message)
            }
            setLoading(false)
            return responseData
        } catch (err) {
            setLoading(false)
            setError(err.message)
            throw err
        }
    }, [])

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, [])

    return { loading, error, sendRequest, clearError }

}


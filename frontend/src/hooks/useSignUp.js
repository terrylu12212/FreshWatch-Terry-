import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const signup = async (email, password) => {
        setError(null)
        setIsLoading(true)
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }
        if (response.ok) {
            //save user to local storage so if close browser and open back up still logged in
            localStorage.setItem('user', JSON.stringify(json))
            //update auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }

    }
    return {signup, error, isLoading}
}
import isEqual from 'lodash.isequal'
import { useEffect, useState } from 'react'
import usePrevious from './usePrevious'

const useDerivedState = (initialState) => {
  const computedState =
    initialState instanceof Function ? initialState() : initialState
  const [state, setState] = useState(computedState)
  const prevState = usePrevious(computedState)

  useEffect(() => {
    if (!isEqual(computedState, prevState)) {
      setState(computedState)
    }
  }, [computedState, prevState])

  return [state, setState]
}

export default useDerivedState

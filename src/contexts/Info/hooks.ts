import { useContext } from 'react'
import { InfoContext } from './context'

export const useBaseInfo = () => useContext(InfoContext)
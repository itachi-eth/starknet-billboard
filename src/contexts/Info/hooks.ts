import { useContext } from 'react'
import { InfoContext } from './context'

export const useInfo = () => useContext(InfoContext)
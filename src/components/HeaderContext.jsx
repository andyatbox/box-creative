'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const HeaderContext = createContext(null)

export function HeaderProvider({ children }) {
 const [header, setHeader] = useState(null)
 return (
 <HeaderContext.Provider value={{ header, setHeader }}>
 {children}
 </HeaderContext.Provider>
 )
}

export function useHeader() {
 return useContext(HeaderContext)
}

export function HeaderTitleSetter({ category, title }) {
 const ctx = useContext(HeaderContext)
 useEffect(() => {
 ctx?.setHeader({ category, title })
 return () => ctx?.setHeader(null)
 }, [category, title])
 return null
}

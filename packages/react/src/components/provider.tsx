import { BaseClient } from "@aegis/core";
import * as React from "react";
import { createContext, FC, type ReactNode } from 'react'

export const AegisContext = createContext({} as any)
AegisContext.displayName = 'aegis'

interface AegisProviderFieldsType {
    AegisInstance: BaseClient
    children?: ReactNode
}

export const AegisProvider: FC<AegisProviderFieldsType> = ({AegisInstance, children}) => {
    return <AegisContext.Provider value= {{AegisInstance}} >{children} </AegisContext.Provider>
}
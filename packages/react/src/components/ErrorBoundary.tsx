import * as React from 'react'
import { type FC, ReactNode, Component } from 'react'
import { BaseClient } from '@aegis/core'
import { AegisContext } from './provider'

interface ErrorInfo {
    componentStack: any
}

interface ErrorBoundaryFieldsType {
    AegisInstance: BaseClient
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

interface ErrorBoundaryProps {
    onError?: (a: any, b: any) => void
    fallback?: any
    children?: ReactNode
    instance: BaseClient
}

export class ErrorBoundaryWrapper extends Component<ErrorBoundaryProps> {
    readonly state: ErrorBoundaryState
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: true,
        }
    }

    componentDidCatch(err: Error, { componentStack }: ErrorInfo) {
        const { onError } = this.props
        onError?.(err, componentStack)
        this.setState({
            hasError: true
        })
    }

    render() {
        return (this.state.hasError ? this.props.fallback : this.props.children ) ?? null
    }
}

export function ErrorBoundary(props: ErrorBoundaryFieldsType) {
    return (
        <AegisContext.Consumer>
            {
                ({AegisInstance}) => (
                    <ErrorBoundaryWrapper {...props} instance={props.AegisInstance || AegisInstance} >{ props.children }</ErrorBoundaryWrapper>
                )
            }
        </AegisContext.Consumer>
    )
}

export function WithErrrorBoundary(props: ErrorBoundaryFieldsType) {
    return function (WrappedComponent: FC) {
        const componentName = WrappedComponent.displayName || WrappedComponent.name || 'unknown'
        const wrapped: FC = (wrappedProps: any) => (
            <ErrorBoundary {...props}>
                <WrappedComponent {...wrappedProps}></WrappedComponent>
            </ErrorBoundary>
        )
        wrapped.displayName = componentName
        return wrapped
    }
}
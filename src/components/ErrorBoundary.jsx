import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('App crashed:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center bg-rose-50 p-6">
          <div className="max-w-lg w-full bg-white border border-rose-200 rounded-xl p-6 text-rose-900">
            <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
            <p className="mb-4">The page crashed while rendering. Please try reloading. If this keeps happening, use the Test page to verify the backend.</p>
            <pre className="text-xs bg-rose-50 p-3 rounded overflow-auto max-h-48">{String(this.state.error)}</pre>
            <div className="mt-4 flex gap-2">
              <button onClick={() => this.setState({ hasError: false, error: null })} className="px-3 py-2 bg-rose-600 text-white rounded">Try again</button>
              <a href="/test" className="px-3 py-2 bg-gray-700 text-white rounded">Go to Test</a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

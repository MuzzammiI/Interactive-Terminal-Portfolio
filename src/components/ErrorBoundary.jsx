import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Terminal Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4">
          <div className="terminal-window max-w-2xl w-full">
            <div className="terminal-header">
              <div className="terminal-controls">
                <div className="terminal-control close bg-red-500" />
                <div className="terminal-control minimize bg-yellow-500" />
                <div className="terminal-control maximize bg-green-500" />
              </div>
              <div className="terminal-title">Error - Terminal Crashed</div>
            </div>
            <div className="terminal-body">
              <div className="space-y-4">
                <div className="text-red-400 text-xl font-semibold">
                  💥 Terminal Crashed
                </div>
                <div className="text-terminal-gray">
                  <p>Something went wrong with the terminal interface.</p>
                  <p className="mt-2">Please refresh the page to restart the terminal.</p>
                </div>
                <div className="bg-terminal-window p-4 rounded border border-red-500">
                  <div className="text-red-400 font-semibold mb-2">Error Details:</div>
                  <pre className="text-sm text-terminal-gray overflow-auto">
                    {this.state.error?.toString()}
                  </pre>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-terminal-green text-terminal-bg px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
                >
                  Restart Terminal
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h3 style={{ color: 'red', padding: '20px' }}> 404 ,Something went wrong in this section.</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
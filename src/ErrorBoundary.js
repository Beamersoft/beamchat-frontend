import React from 'react';

import FallbackComponent from './ErrorBoundaryAnimation';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidMount() {
		// Vibration.vibrate(1000);
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	render() {
		const {
			hasError,
		} = this.state;

		const {
			children,
		} = this.props;

		if (hasError) {
			return (<FallbackComponent />);
		}

		if (children) {
			return children;
		}
		return null;
	}
}

export default ErrorBoundary;

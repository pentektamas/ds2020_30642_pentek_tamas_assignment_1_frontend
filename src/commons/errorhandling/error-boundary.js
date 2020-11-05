import React from 'react'
import styles from '../styles/project-style.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        console.log("error:" + error);
        console.log("info:" + info);
    }

    render() {
        if (this.state.hasError) {
            return <h1 className={styles.errorTitle}>An error occured at component level.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary

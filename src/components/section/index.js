import React from 'react';
import styles from './styles.js';

export default class Section extends React.Component {
  render() {
    const {children} = this.props;

    return (
      <div style={styles.section}>
        {children}
      </div>
    );
  }
}

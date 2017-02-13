import React from 'react';
import styles from './index.css';

export default class Section extends React.Component {
  render() {
    const {children} = this.props;

    return (
      <div className={styles.section}>
        {children}
      </div>
    );
  }
}

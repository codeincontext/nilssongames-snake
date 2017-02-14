import React from 'react';
import styles from './index.css';

export default class Button extends React.Component {
  render() {
    const {children, isSelected, isDisabled, handleClick, value} = this.props;
    const classes = [
      styles.button,
      isSelected ? styles['button--selected'] : ''
    ].join(' ');

    return (
      <button className={classes} onClick={handleClick} value={value} disabled={isDisabled}>
        {children}
      </button>
    );
  }
}

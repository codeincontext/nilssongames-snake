import React from 'react';
import styles from './styles.js';

export default class Button extends React.Component {
  render() {
    const {children, isSelected, isDisabled, handleClick, value} = this.props;
    const classes = [
      'button',
      isSelected ? 'button--selected' : ''
    ].join(' ');

    return (
      <button className={classes} onClick={handleClick} value={value} disabled={isDisabled}>
        <style>{styles}</style>
        {children}
      </button>
    );
  }
}

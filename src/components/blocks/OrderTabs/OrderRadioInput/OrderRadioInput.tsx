import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './OrderRadioInput.module.scss';

type OrderRadioInputProps = {
  name: string;
  label: string;
  value: number;
  isChecked: boolean;
  onClick: (value: number) => void;
};

const OrderRadioInput = ({ name, value, isChecked, onClick, label }: OrderRadioInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <label
      className={classNames(styles.root, {
        [styles.stateActive]: isChecked,
        [styles.stateFocused]: isFocused,
      })}
    >
      <input
        type="radio"
        className={styles.input}
        name={name}
        value={value}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        onClick={() => onClick(value)}
        checked={isChecked}
      />
      {label}
    </label>
  );
};

export default OrderRadioInput;

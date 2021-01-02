import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

  const radioInput = useRef(null);
  const onFocusListener = useCallback((mutationsList) => {
    mutationsList.forEach(({ attributeName, target }: { attributeName: string; target: HTMLElement }) => {
      if (attributeName === 'class') {
        setIsFocused(target.classList.contains('focus-visible'));
      }
    });
  }, []);

  const mutationObserver = useMemo(() => new MutationObserver(onFocusListener), [onFocusListener]);
  useEffect(() => {
    if (radioInput.current !== null) {
      // @ts-ignore
      mutationObserver.observe(radioInput.current, { attributes: true });
    }
    return () => {
      mutationObserver.disconnect();
    };
  }, [mutationObserver]);

  return (
    <label
      className={classNames(styles.root, {
        [styles.stateActive]: isChecked,
        [styles.stateFocused]: isFocused,
      })}
    >
      <input
        ref={radioInput}
        type="radio"
        className={styles.input}
        name={name}
        value={value}
        onChange={() => onClick(value)}
        checked={isChecked}
      />
      {label}
    </label>
  );
};

export default OrderRadioInput;

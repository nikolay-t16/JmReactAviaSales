import React from 'react';

import styles from './TicketsFilter.module.scss';

export type TicketsFilterItem = {
  code: string;
  label: string;
  isChecked: boolean;
};

type TicketsFilterProps = {
  items: TicketsFilterItem[];
};

function TicketsFilter(props: TicketsFilterProps) {
  const { items } = props;
  const itemsNode = items.map(({ code, label, isChecked }) => (
    <label className={styles.ticketsFilter__item}>
      <input name={code} className={styles.ticketsFilter__itemInput} type="checkbox" checked={isChecked} />
      <span className={styles.ticketsFilter__itemCheckmark} />
      <span className={styles.ticketsFilter__itemLabel}>{label}</span>
    </label>
  ));
  return (
    <div className={styles.ticketsFilter}>
      <div className={styles.ticketsFilter__tittle}>Количество пересадок</div>
      {itemsNode}
    </div>
  );
}

export default TicketsFilter;

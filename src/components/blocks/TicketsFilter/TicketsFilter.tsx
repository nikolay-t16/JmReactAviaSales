import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './TicketsFilter.module.scss';

import * as actions from '../../../store/actions';
import { FilterItemData, StateData } from '../../../store/reducer';

export type TicketsFilterItem = {
  code: string;
  label: string;
  isChecked: boolean;
};

type TicketsFilterProps = {
  filterItems: Map<string, FilterItemData>;
  checkFn: (code: string) => void;
};

function TicketsFilter({ filterItems, checkFn }: TicketsFilterProps) {
  const itemsNode = Array.from(filterItems).map(([code, { label, isChecked }]) => (
    <label key={code} className={styles.ticketsFilter__item}>
      <input
        onChange={() => checkFn(code)}
        name={code}
        className={styles.ticketsFilter__itemInput}
        type="checkbox"
        checked={isChecked}
      />
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

export default connect(
  ({ filterItems }: StateData) => ({ filterItems }),
  (dispatch) => {
    const { checkFn } = bindActionCreators(actions, dispatch);
    return { checkFn };
  },
)(TicketsFilter);

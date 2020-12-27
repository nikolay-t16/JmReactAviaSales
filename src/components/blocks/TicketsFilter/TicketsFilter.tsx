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
  filterItems: Map<number, FilterItemData>;
  checkFn: (code: number) => void;
};

function TicketsFilter({ filterItems, checkFn }: TicketsFilterProps) {
  const itemsNode = Array.from(filterItems).map(([code, { label, isChecked }]) => (
    <label key={code} className={styles.item}>
      <input onChange={() => checkFn(code)} className={styles.itemInput} type="checkbox" checked={isChecked} />
      <span className={styles.itemCheckmark} />
      <span className={styles.itemLabel}>{label}</span>
    </label>
  ));
  return (
    <div className={styles.root}>
      <div className={styles.tittle}>Количество пересадок</div>
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

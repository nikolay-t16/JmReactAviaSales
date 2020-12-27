import React from 'react';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './OrderTabs.module.scss';

import { StateData } from '../../../store/reducer';
import * as actions from '../../../store/actions';

type OrderTabsProps = {
  orderTabs: string[];
  orderType: number;
  checkOrderTab: (tab: number) => void;
};

function OrderTabs({ orderTabs, orderType, checkOrderTab }: OrderTabsProps) {
  const arrTabsNode = orderTabs.map((tabName, tabIndex) => (
    <button
      className={classNames(styles.tab, { [styles.tab_stateActive]: tabIndex === orderType })}
      type="button"
      onClick={() => checkOrderTab(tabIndex)}
      key={tabName}
    >
      {tabName}
    </button>
  ));
  return <div className={styles.root}>{arrTabsNode}</div>;
}

export default connect(
  ({ orderTabs, orderType }: StateData) => ({ orderTabs, orderType }),
  (dispatch) => {
    const { checkOrderTab } = bindActionCreators(actions, dispatch);
    return { checkOrderTab };
  },
)(OrderTabs);

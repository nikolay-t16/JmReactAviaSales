import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './OrderTabs.module.scss';

import { StateData } from '../../../store/reducer';
import * as actions from '../../../store/actions';
import OrderRadioInput from './OrderRadioInput/OrderRadioInput';

type OrderTabsProps = {
  orderTabs: string[];
  orderType: number;
  checkOrderTab: (tab: number) => void;
};

function OrderTabs({ orderTabs, orderType, checkOrderTab }: OrderTabsProps) {
  const arrTabsNode = orderTabs.map((tabName, tabIndex) => (
    <OrderRadioInput
      key={tabName}
      name="orderTabs"
      label={tabName}
      value={tabIndex}
      isChecked={tabIndex === orderType}
      onClick={(index) => checkOrderTab(index)}
    />
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

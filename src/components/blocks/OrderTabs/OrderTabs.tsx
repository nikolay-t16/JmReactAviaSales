import React from 'react';
import classNames from 'classnames';

import styles from './OrderTabs.module.scss';

type OrderTabsProps = {
  tabs: string[];
  activeTab: number;
  onChange: (tabIndex: number) => void;
};

function OrderTabs(props: OrderTabsProps) {
  const { tabs, activeTab, onChange } = props;
  const arrTabsNode = tabs.map((tabName, tabIndex) => (
    <button
      className={classNames(styles.orderTabs__tab, { [styles.orderTabs__tab_stateActive]: tabIndex === activeTab })}
      type="button"
      onClick={() => onChange(tabIndex)}
      key={tabName}
    >
      {tabName}
    </button>
  ));
  return <div className={styles.orderTabs}>{arrTabsNode}</div>;
}

export default OrderTabs;

import React, { useState } from 'react';

import styles from './IndexPage.module.scss';

import OrderTabs from '../../blocks/OrderTabs/OrderTabs';
import TicketsFilter from '../../blocks/TicketsFilter/TicketsFilter';
import TicketComponent from '../../blocks/TicketComponent/TicketComponent';

function IndexPage() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const onChangeTab = (tabIndex: number) => setActiveTabIndex(tabIndex);
  const orderTabs = ['Самый дешевый', 'Самый быстрый'];

  return (
    <div className={styles.indexPage}>
      <img className={styles.indexPage__logo} src="/Logo.png" alt="logo" />
      <form className={styles.indexPage__form}>
        <div className={styles.indexPage__formOrderTabs}>
          <OrderTabs tabs={orderTabs} activeTab={activeTabIndex} onChange={onChangeTab} />
        </div>
        <div className={styles.indexPage__formFilter}>
          <TicketsFilter />
        </div>
        <div className={styles.indexPage__formResults}>
          <div className={styles.indexPage__formResultsTicket}>
            <TicketComponent />
          </div>
        </div>
      </form>
    </div>
  );
}

export default IndexPage;

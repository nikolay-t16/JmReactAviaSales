import React from 'react';

import styles from './IndexPage.module.scss';

import OrderTabs from '../../blocks/OrderTabs/OrderTabs';
import TicketsFilter from '../../blocks/TicketsFilter/TicketsFilter';
import TicketsList from '../../layouts/TicketsList/TicketsList';

function IndexPage() {
  return (
    <div className={styles.indexPage}>
      <img className={styles.indexPage__logo} src="/Logo.png" alt="logo" />
      <form className={styles.indexPage__form}>
        <div className={styles.indexPage__formOrderTabs}>
          <OrderTabs />
        </div>
        <div className={styles.indexPage__formFilter}>
          <TicketsFilter />
        </div>
        <div className={styles.indexPage__formResults}>
          <TicketsList />
        </div>
      </form>
    </div>
  );
}
export default IndexPage;

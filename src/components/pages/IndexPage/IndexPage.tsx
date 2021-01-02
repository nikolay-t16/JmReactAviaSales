import React from 'react';

import styles from './IndexPage.module.scss';

import OrderTabs from '../../blocks/OrderTabs/OrderTabs';
import TicketsFilter from '../../blocks/TicketsFilter/TicketsFilter';
import TicketsList from '../../layouts/TicketsList/TicketsList';

function IndexPage() {
  return (
    <div className={styles.root}>
      <img className={styles.logo} src="/Logo.svg" width={82} alt="logo" />
      <form className={styles.form}>
        <div className={styles.formOrderTabs}>
          <OrderTabs />
        </div>
        <div className={styles.formFilter}>
          <TicketsFilter />
        </div>
        <div className={styles.formResults}>
          <TicketsList />
        </div>
      </form>
    </div>
  );
}
export default IndexPage;

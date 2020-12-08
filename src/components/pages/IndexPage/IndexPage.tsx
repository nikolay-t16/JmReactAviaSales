import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './IndexPage.module.scss';

import OrderTabs from '../../blocks/OrderTabs/OrderTabs';
import TicketsFilter from '../../blocks/TicketsFilter/TicketsFilter';
import TicketComponent from '../../blocks/TicketComponent/TicketComponent';
import WithApi from '../../helpers/WithApi';
import AviaSales from '../../../helpers/AviaSales';
import { TicketData } from './TicketData';
import * as actions from '../../../store/actions';
import { StateData } from '../../../store/reducer';

type IndexPageProps = {
  tickets: TicketData[];
  fetchTickets: () => Promise<{ tickets: TicketData[]; stop: boolean }>;
  addTickets: (tickets: TicketData[]) => Promise<void>;
};

function IndexPage({ tickets, fetchTickets, addTickets }: IndexPageProps) {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const onChangeTab = (tabIndex: number) => setActiveTabIndex(tabIndex);
  const orderTabs = ['Самый дешевый', 'Самый быстрый'];

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const res = await fetchTickets();
          const { tickets: newTickets } = res;
          addTickets(newTickets);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('error', error);
        }
      };
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const makeTicketKey = ({
    carrier,
    price,
    segments: [{ origin, destination, date, stops: forwardStops }, { date: dateBack, stops: backStops }],
  }: TicketData) => {
    return [carrier, origin, destination, date, dateBack, price, forwardStops, backStops].join('_');
  };
  const ticketNodes = tickets.map((ticket) => (
    <div className={styles.indexPage__formResultsTicket}>
      <TicketComponent key={makeTicketKey(ticket)} ticket={ticket} />
    </div>
  ));

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
        <div className={styles.indexPage__formResults}>{ticketNodes}</div>
      </form>
    </div>
  );
}

const mapMethodsToProps = (aviaSales: AviaSales) => {
  return {
    fetchTickets: aviaSales.fetchTickets.bind(aviaSales),
  };
};

const IndexPageWithApi = WithApi(mapMethodsToProps)(IndexPage);

export default connect(
  ({ tickets }: StateData) => ({ tickets }),
  (dispatch) => {
    const { addTickets } = bindActionCreators(actions, dispatch);
    return { addTickets };
  },
)(IndexPageWithApi);

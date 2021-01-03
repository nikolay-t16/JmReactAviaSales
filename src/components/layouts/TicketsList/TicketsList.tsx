import React, { useEffect, useRef, useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BeatLoader } from 'react-spinners';
import styles from './TicketsList.module.scss';
import AviaSales from '../../../helpers/AviaSales';
import WithApi from '../../helpers/WithApi';
import { FilterItemData, FilterTypes, StateData } from '../../../store/reducer';
import * as actions from '../../../store/actions';
import { TicketData } from '../../pages/IndexPage/TicketData';
import TicketComponent from '../../blocks/TicketComponent/TicketComponent';

type TicketsListProps = {
  tickets: TicketData[];
  filterItems: Map<number, FilterItemData>;
  orderType: number;
  fetchTickets: () => Promise<{ tickets: TicketData[]; stop: boolean }>;
  addTickets: (tickets: TicketData[]) => void;
  errorMessageTimeOut: any;
};

const TicketsList = ({
  tickets,
  filterItems,
  fetchTickets,
  addTickets,
  errorMessageTimeOut,
  orderType,
}: TicketsListProps) => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const timeOut = useRef(errorMessageTimeOut);
  useEffect(
    () => {
      let stopFetching = false;
      const fetchData = async () => {
        try {
          const res = await fetchTickets();
          const { tickets: newTickets, stop } = res;
          if (!stopFetching) addTickets(newTickets);
          if (stop) {
            setIsFetching(false);
            stopFetching = stop;
          }
        } catch (error) {
          if (!stopFetching) {
            setErrorMessage(error.message);
            timeOut.current = setTimeout(() => {
              setErrorMessage('');
            }, 2000);
          }
          // eslint-disable-next-line no-console
          console.log('error', error);
        }
        if (stopFetching) return;
        await fetchData();
      };
      fetchData();
      return () => {
        stopFetching = true;
        clearTimeout(timeOut.current);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timeOut],
  );
  const makeTicketKey = ({
    carrier,
    price,
    segments: [{ origin, destination, date, stops: forwardStops }, { date: dateBack, stops: backStops }],
  }: TicketData) => {
    return [carrier, origin, destination, date, dateBack, price, forwardStops, backStops].join('_');
  };

  const filterTickets = () => {
    const isFilterEmpty = (): boolean => {
      for (const [, item] of filterItems) {
        if (item.isChecked) {
          return false;
        }
      }
      return true;
    };

    if (isFilterEmpty()) return [];

    if (filterItems.get(FilterTypes.ALL)?.isChecked) return tickets;

    return tickets.filter((ticket) => {
      const stopsCount = ticket.segments[0].stops.length + ticket.segments[1].stops.length;
      if (filterItems.get(FilterTypes.NO_TRANSFER)?.isChecked && stopsCount === 0) return true;
      if (filterItems.get(FilterTypes.TRANSFER_1)?.isChecked && stopsCount === 1) return true;
      if (filterItems.get(FilterTypes.TRANSFER_2)?.isChecked && stopsCount === 2) return true;
      if (filterItems.get(FilterTypes.TRANSFER_3)?.isChecked && stopsCount === 3) return true;
      return false;
    });
  };

  const sortTickets = (fistTicket: TicketData, secondTicket: TicketData) => {
    if (orderType === 0) {
      if (fistTicket.price < secondTicket.price) return -1;
      if (fistTicket.price > secondTicket.price) return 1;
      return 0;
    }
    const fistTicketDuration = fistTicket.segments[0].duration + fistTicket.segments[1].duration;
    const secondTicketDuration = secondTicket.segments[0].duration + secondTicket.segments[1].duration;

    if (fistTicketDuration < secondTicketDuration) return -1;
    if (fistTicketDuration > secondTicketDuration) return 1;
    return 0;
  };

  const makeTicketNodes = (ticketItems: TicketData[]) => {
    if (ticketItems.length === 0) {
      if (isFetching) return <BeatLoader />;
      return <>Рейсов, подходящих под заданные фильтры, не найдено</>;
    }

    const ticketsList = ticketItems.slice(0, 19).map((ticket) => (
      <div className={styles.ticket}>
        <TicketComponent key={makeTicketKey(ticket)} ticket={ticket} />
      </div>
    ));

    return (
      <>
        {isFetching ? <BeatLoader /> : null}
        {ticketsList}
      </>
    );
  };

  const filteredTickets = filterTickets();

  filteredTickets.sort(sortTickets);

  const ticketNodes = makeTicketNodes(filteredTickets);

  return (
    <div>
      {errorMessage !== '' ? <div className={styles.error}>{errorMessage}</div> : null}
      {ticketNodes}
    </div>
  );
};

const mapMethodsToProps = (aviaSales: AviaSales) => {
  return {
    fetchTickets: aviaSales.fetchTickets.bind(aviaSales),
  };
};

const TicketsListWithApi = WithApi(mapMethodsToProps)(TicketsList);

export default connect(
  ({ tickets, filterItems, orderType }: StateData) => ({ tickets, filterItems, orderType }),
  (dispatch) => {
    const { addTickets } = bindActionCreators(actions, dispatch);
    return { addTickets };
  },
)(TicketsListWithApi);

import React from 'react';
import { format, formatDistanceStrict } from 'date-fns';
import { ru } from 'date-fns/locale';

import styles from './TicketComponent.module.scss';
import { TicketData, TicketSegmentData } from '../../pages/IndexPage/TicketData';

type TicketComponentProps = {
  ticket: TicketData;
};

function TicketComponent({ ticket }: TicketComponentProps) {
  const {
    carrier,
    price,
    segments: [forward, back],
  } = ticket;
  const transformDateToTime = (date: number) => format(date, 'HH:II');
  const makeDepartureSchedule = (dateOut: number, duration: number) => {
    return (
      <>
        {transformDateToTime(dateOut)} - {transformDateToTime(dateOut + duration)}
      </>
    );
  };
  const makeFlightScheduleNode = (segment: TicketSegmentData) => {
    return (
      <div className={styles.infoColumnItem}>
        <div className={styles.infoColumnItemHeader}>
          {segment.origin} - {segment.destination}
        </div>
        <div className={styles.infoColumnItemValue}>
          {makeDepartureSchedule(Date.parse(segment.date), segment.duration * 60 * 1000)}
        </div>
      </div>
    );
  };

  const makeDurationIfoNode = (segment: TicketSegmentData) => {
    return (
      <div className={styles.infoColumnItem}>
        <div className={styles.infoColumnItemHeader}>В пути</div>
        <div className={styles.infoColumnItemValue}>
          {formatDistanceStrict(Date.parse(segment.date), Date.parse(segment.date) + segment.duration * 60 * 1000, {
            locale: ru,
          })}
        </div>
      </div>
    );
  };

  const makeStopsLabel = (stropsCount: number): string => {
    if (stropsCount === 0) return 'нет пересадок';
    if ([2, 3, 4].includes(stropsCount % 10) && ![12, 13, 14].includes(stropsCount % 100)) {
      return `${stropsCount} пересадки`;
    }

    if (stropsCount % 10 === 1) return `${stropsCount} пересадка`;
    return `${stropsCount} пересадок`;
  };

  const makeStopsInfoNode = (segment: TicketSegmentData) => {
    return (
      <div className={styles.infoColumnItem}>
        <div className={styles.infoColumnItemHeader}>{makeStopsLabel(segment.stops.length)}</div>
        <div className={styles.infoColumnItemValue}>{segment.stops.join(', ')}</div>
      </div>
    );
  };

  return (
    <div className={styles.ticketComponent}>
      <div className={styles.header}>
        <div className={styles.headerPrice}>{price.toLocaleString('ru-RU')} Р</div>
        <div className={styles.headerLogo}>
          <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="" />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoColumn}>
          {makeFlightScheduleNode(forward)}
          {makeFlightScheduleNode(back)}
        </div>
        <div className={styles.infoColumn}>
          {makeDurationIfoNode(forward)}
          {makeDurationIfoNode(back)}
        </div>
        <div className={styles.infoColumn}>
          {makeStopsInfoNode(forward)}
          {makeStopsInfoNode(back)}
        </div>
      </div>
    </div>
  );
}

export default TicketComponent;

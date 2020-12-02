import React from 'react';

import styles from './TicketComponent.module.scss';

function TicketComponent() {
  return (
    <div className={styles.ticketComponent}>
      <div className={styles.ticketComponent__header}>
        <div className={styles.ticketComponent__headerPrice}>13 400 Р</div>
        <div className={styles.ticketComponent__headerLogo}>
          <img src="/S7_Logo.png" alt="" />{' '}
        </div>
      </div>
      <div className={styles.ticketComponent__info}>
        <div className={styles.ticketComponent__infoColumn}>
          <div className={styles.ticketComponent__infoColumnItem}>
            <div className={styles.ticketComponent__infoColumnItemHeader}>Mow - Hkt</div>
            <div className={styles.ticketComponent__infoColumnItemValue}>10:45 - 08:00</div>
          </div>
          <div className={styles.ticketComponent__infoColumnItem}>
            <div className={styles.ticketComponent__infoColumnItemHeader}>Mow - Hkt</div>
            <div className={styles.ticketComponent__infoColumnItemValue}>10:45 - 08:00</div>
          </div>
        </div>
        <div className={styles.ticketComponent__infoColumn}>
          <div className={styles.ticketComponent__infoColumnItem}>
            <div className={styles.ticketComponent__infoColumnItemHeader}>Mow - Hkt</div>
            <div className={styles.ticketComponent__infoColumnItemValue}>10:45 - 08:00</div>
          </div>
          <div className={styles.ticketComponent__infoColumnItem}>
            <div className={styles.ticketComponent__infoColumnItemHeader}>Mow - Hkt</div>
            <div className={styles.ticketComponent__infoColumnItemValue}>10:45 - 08:00</div>
          </div>
        </div>
        <div className={styles.ticketComponent__infoColumn}>
          <div className={styles.ticketComponent__infoColumnItem}>
            <div className={styles.ticketComponent__infoColumnItemHeader}>Mow - Hkt</div>
            <div className={styles.ticketComponent__infoColumnItemValue}>10:45 - 08:00</div>
          </div>
          <div className={styles.ticketComponent__infoColumnItem}>
            <div className={styles.ticketComponent__infoColumnItemHeader}>Mow - Hkt</div>
            <div className={styles.ticketComponent__infoColumnItemValue}>10:45 - 08:00</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketComponent;

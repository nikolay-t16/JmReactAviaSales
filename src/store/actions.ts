import { ACTION_CHECK, ACTION_ADD_TICKETS } from './reducer';
import { TicketData } from '../components/pages/IndexPage/TicketData';

export const checkFn = (payload: number) => ({ type: ACTION_CHECK, payload });
export const addTickets = (payload: TicketData) => ({ type: ACTION_ADD_TICKETS, payload });

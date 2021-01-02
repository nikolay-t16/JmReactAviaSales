import { TicketData } from '../components/pages/IndexPage/TicketData';
import { ACTION_ADD_TICKETS, ACTION_CHECK, ACTION_CHECK_ORDER_TAB } from './types';

type ActionData = {
  type: string;
  payload?: any;
};

export type FilterItemData = {
  label: string;
  isChecked: boolean;
};
export type StateData = {
  filterItems: Map<number, FilterItemData>;
  orderType: number;
  orderTabs: string[];
  tickets: TicketData[];
};

export enum FilterTypes {
  ALL = 0,
  NO_TRANSFER = 1,
  TRANSFER_1 = 2,
  TRANSFER_2 = 3,
  TRANSFER_3 = 4,
}

const filterItems = new Map<number, FilterItemData>([
  [FilterTypes.ALL, { label: 'Все', isChecked: false }],
  [FilterTypes.NO_TRANSFER, { label: 'Без пересадок', isChecked: true }],
  [FilterTypes.TRANSFER_1, { label: '1 пересадка', isChecked: false }],
  [FilterTypes.TRANSFER_2, { label: '2 пересадки', isChecked: false }],
  [FilterTypes.TRANSFER_3, { label: '3 пересадки', isChecked: false }],
]);

const defaultState: StateData = {
  orderTabs: ['Самый дешевый', 'Самый быстрый'],
  orderType: 0,
  filterItems,
  tickets: [],
};

const reducer = (state: StateData = defaultState, { type, payload }: ActionData) => {
  const actions: any = {
    [ACTION_CHECK]: (code: number): StateData => {
      const setAllChecked = (items: Map<number, FilterItemData>, isChecked: boolean): void => {
        for (const [, item] of items) {
          item.isChecked = isChecked;
        }
      };
      const checkIsAllChecked = (items: Map<number, FilterItemData>): boolean => {
        for (const [filterCode, item] of items) {
          if (filterCode !== FilterTypes.ALL && !item.isChecked) {
            return false;
          }
        }
        return true;
      };

      const newFilterItems = new Map(filterItems);
      const item = newFilterItems.get(code);

      if (!item) {
        return state;
      }

      const isChecked = !item.isChecked;
      if (code === FilterTypes.ALL) {
        setAllChecked(newFilterItems, isChecked);
        return { ...state, filterItems: newFilterItems };
      }

      item.isChecked = isChecked;

      if (!isChecked || checkIsAllChecked(newFilterItems)) {
        const filterAll = newFilterItems.get(FilterTypes.ALL);
        if (filterAll) {
          filterAll.isChecked = isChecked;
        }
      }

      return { ...state, filterItems: newFilterItems };
    },
    [ACTION_CHECK_ORDER_TAB]: (code: number): StateData => {
      return { ...state, orderType: code };
    },
    [ACTION_ADD_TICKETS]: (addTickets: TicketData[]): StateData => {
      const { tickets } = state;
      return { ...state, tickets: [...tickets, ...addTickets] };
    },
  };
  const action = actions[type];
  if (action) {
    return action(payload);
  }
  return state;
};

export default reducer;

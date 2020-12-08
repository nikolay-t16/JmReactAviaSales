import { TicketData } from '../components/pages/IndexPage/TicketData';

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
  [FilterTypes.TRANSFER_1, { label: '1 пересадка', isChecked: true }],
  [FilterTypes.TRANSFER_2, { label: '2 пересадки', isChecked: true }],
  [FilterTypes.TRANSFER_3, { label: '3 пересадки', isChecked: false }],
]);
export const ACTION_CHECK = 'CHECK';
export const ACTION_ADD_TICKETS = 'ADD_TICKETS';

const reducer = (state: StateData = { filterItems, tickets: [] }, { type, payload }: ActionData) => {
  const actions: any = {
    [ACTION_CHECK]: (code: number): StateData => {
      const newFilterItems = new Map(filterItems);
      const item = filterItems.get(code);
      if (item) {
        item.isChecked = !item.isChecked;
      }
      const filterItemAll = newFilterItems.get(FilterTypes.ALL) || ({} as any);
      if (code !== FilterTypes.ALL) {
        filterItemAll.isChecked = false;
      } else if (filterItemAll.isChecked) {
        for (const [filterCode, filterItem] of newFilterItems) {
          if (filterCode !== FilterTypes.ALL) filterItem.isChecked = false;
        }
      }
      return { ...state, filterItems: newFilterItems };
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

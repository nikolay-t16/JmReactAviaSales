type ActionData = {
  type: string;
  payload?: any;
};

export type FilterItemData = {
  label: string;
  isChecked: boolean;
};
export type StateData = {
  filterItems: Map<string, FilterItemData>;
};

const filterItems = new Map<string, FilterItemData>([
  ['all', { label: 'Все', isChecked: false }],
  ['no_transfer', { label: 'Без пересадок', isChecked: true }],
  ['1_transfer', { label: '1 пересадка', isChecked: true }],
  ['2_transfer', { label: '1 пересадки', isChecked: true }],
  ['3_transfer', { label: '1 пересадки', isChecked: false }],
]);
export const ACTION_CHECK = 'CHECK';

const reducer = (state: StateData = { filterItems }, { type, payload }: ActionData) => {
  const actions: any = {
    [ACTION_CHECK]: (code: string): StateData => {
      const newFilterItems = new Map(filterItems);
      const item = filterItems.get(code);
      if (item) {
        item.isChecked = !item.isChecked;
      }
      return { ...state, filterItems: newFilterItems };
    },
  };
  const action = actions[type];
  if (action) {
    return action(payload);
  }
  return state;
};

export default reducer;

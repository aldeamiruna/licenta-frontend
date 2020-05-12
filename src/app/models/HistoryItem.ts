import Item from './Item';
import State from './State';

export default class HistoryItem {
    id: number;
    id_item: number;
    status_item: State;
    date: Date;
    comment: string;
}
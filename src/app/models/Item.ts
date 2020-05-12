import User from './User';
import ItemType from './ItemType';
import Room from './Room';
import State from './State';

export default class Item {

    id: number;
    comment: string;
    inventoryNumber: number;
    model: string;
    producer: string;
    serialId: string;
    room: Room;
    state: State;
    itemStatus: string;
    user: User;
    itemType: ItemType;

}

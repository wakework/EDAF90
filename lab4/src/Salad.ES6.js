import { v4 as uuidv4 } from 'uuid';

/* Class Salad from Lab1 */
class Salad {
    inv = {}; 
    static instanceCounter = 0;

    constructor() {
        this.uuid = uuidv4();
    }

    add(name, properties) { // return this object to make it chainable
        this.inv[name] = properties;
        return this;
    }

    remove(name) { //return this object to make it chainable
        delete this.inv[name];
        return this;
    }
}
export default Salad;
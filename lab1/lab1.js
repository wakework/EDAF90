'use strict';

/**
 * Reflection question 1
   Objectet är dynamiskt, därför kan vi lämna kolumner tomma!
 */

const imported = require("./inventory.js");
console.log(imported.inventory['Sallad']);

console.log('Object.keys():')
let names = Object.keys(imported.inventory);
names
    .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
    .forEach(name => console.log(name));

/**
 * Reflection question 2
 * Arrays med olika typer av enumerable kommer bara skriva ut vissa element.
   En for in loop returnerar alla elemnet även om de bara är ärvda från
   protpotyp kedjan.
 */


console.log('\n--- Assignment 1 ---------------------------------------')

/* Test */
let newNames = names.filter((name) => imported.inventory[name].foundation === true);

/* Assignment 1 function */
function makeOptions(names, value) {
    let options = [];
    names
        .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
        .forEach(function (element) {
            options.push('<option value=' + element + '> ' + element +
                ', ' + imported.inventory[element].price + 'kr</option>');
        });
    return options;
}

/* Log for Assignment 1 */
console.log(makeOptions(newNames, 'foundation'));


console.log('\n--- Assignment 2 ---------------------------------------')

/* Class for Assignment 2 */
class Salad {
    inv = {}; // object inte array
    static instanceCounter = 0;

    constructor() {
        this.uuid = 'salad_' + Salad.instanceCounter++;
        //Object.freeze(this.uuid); // Read only
    }

    add(name, properties) { // return this object to make it chainable
        this.inv[name] = properties;
        return this;
    }

    remove(name) { //return this object to make it chainable
        /*let keys = Object.keys(this.inv);
        let values = Object.values(this.inv);

        let idx = keys.indexOf(name);
        this.total -= values[idx].price;

        delete keys[idx];
        delete values[idx];

         let newInv = [];
        for (let i = 0; i < keys.length; i++) {
            newInv[keys[i]] = values[i];
        }
        this.inv = newInv;
        */
        delete this.inv[name];
        return this;
    }
}



/* Create a Salad */
let myCaesarSalad = new Salad()
.add('Sallad', imported.inventory['Sallad'])
.add('Kycklingfilé', imported.inventory['Kycklingfilé'])
.add('Bacon', imported.inventory['Bacon'])
.add('Krutonger', imported.inventory['Krutonger'])
.add('Parmesan', imported.inventory['Parmesan'])
.add('Ceasardressing', imported.inventory['Ceasardressing'])
.add('Gurka', imported.inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
//myCaesarSalad.remove('Gurka'); // FRÅGA
//console.log(JSON.stringify(myCaesarSalad) + '\n');


console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function () {
    let salads = Object.keys(this.inv);
    let totprice = salads.reduce((price, name) => price + this.inv[name].price, 0);

    return totprice;
}

Salad.prototype.count = function (t) { // går att lösa som price
    let values = Object.values(this.inv);
    let counter = 0;

    if (t === 'foundation') {
        return values.filter((e) => e.foundation === true).length;
    } else if (t === 'protein') {
        return values.filter((e) => e.protein === true).length;
    } else if (t === 'extra') {
        values.forEach(function (e) {
            if (e.extra === true) {
                counter++;
            }
        });
        return counter;
    } else {
        return values.filter((e) => e.dressing === true).length;
    }
}
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad har 3 tillbehör
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');

/* reflection question 3
* typeof Salad: function
* typeof Salad.prototype: object
* typeof Salad.prototype.prototype: undefined
* typeof myCaesarSalad: object
* typeof myCaesarSalad.prototype: undefined
*/

console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));


console.log('\n--- Assignment 4 ---------------------------------------')

/* Class GourmetSalad for Assignment 4 */
class GourmetSalad extends Salad {

    add(name, prop, size = 1) {
        if (this.inv[name]) {
            this.inv[name].size = this.inv[name].size + size;
        } else {
            let tempProp = { ...prop };
            tempProp.size = size;
            super.add(name, tempProp);
        }
        return this;
    }

    remove(name) {
        delete super.inv[name];
        return this;
    }
}

let myGourmetSalad = new GourmetSalad()
.add('Sallad', imported.inventory['Sallad'], 0.5)
.add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2)
.add('Bacon', imported.inventory['Bacon'], 0.5)
.add('Krutonger', imported.inventory['Krutonger'])
.add('Parmesan', imported.inventory['Parmesan'], 2)
.add('Ceasardressing', imported.inventory['Ceasardressing']);

console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');


console.log('\n--- Assignment 5 ---------------------------------------')

console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

/**
 * Reflection question 4
   In which object are static properties stored?
   https://www.javatpoint.com/static-vs-const-in-javascript

   A static variable is a class property that is used in a class and not on the instance of the class.
   The variable is stored on the data segment area of the memory, and the same value is shared among
   every instance created in a class. To use a static variable, we use the static keyword. We can use
   the static keyword for making a static value, a static function, with classes, operators, properties
   and work as a utility function for the application or websites. The value of a static variable is set
   at the run time and is a kind of global value that can be used for the instance of the specified class.
 */

/**
* Reflection question 5 
* Can you make the uuid read only? Object.freeze(this.uuid);
*/

/**
 * Reflection question 6
 * Can properties be private? jepp använd # före uuidt
 * this.#uuid = nåt
 */



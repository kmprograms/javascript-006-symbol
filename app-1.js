// WELL KNOWN SYMBOLS
// Czyli zestaw stalych ktore sa typu Symbol i ktore sa wykorzystywane
// przez inne obiekty i typy JS

// -------------------------------------------------------------------------
// Symbol.hasInstance
// -------------------------------------------------------------------------
// Wykorzystywany kiedy pracuje operator instanceof
// przykladowo kiedy wywolujesz x instanceof y to tak naprawde wywolujesz
// x[Symbol.hasInstance](y)

class MyArrayClass {
    static [Symbol.hasInstance](x) {
        return Array.isArray(x);
    }
}

console.log([] instanceof MyArrayClass);
console.log([10, 20, 30] instanceof MyArrayClass);
console.log({name: 'ANDY'} instanceof MyArrayClass);

// -------------------------------------------------------------------------
// Symbol.iterator
// -------------------------------------------------------------------------

class MyItems {

    // przeladowanie operatora of, ktory wykorzystujesz w petli for of
    * [Symbol.iterator]() {
        let i = 0;
        while (this[i]) {
            yield this[i];
            ++i;
        }
    }
}

const items = new MyItems();
items[0] = 10;
items[1] = 20;
items[2] = 30;

for (let item of items) {
    console.log(item);
}


// -------------------------------------------------------------------------
// Symbol.isConcatSpreadable
// -------------------------------------------------------------------------
// informuje funkcje concat z klasy Arrays czy instancja klasy moze z nia pracowac
// najczesciej chodzi o klase ktora rozszerza Array

class ExtraArray1 extends Array {
    get [Symbol.isConcatSpreadable]() {
        return true;
    }
}

class ExtraArray2 extends Array {
    get [Symbol.isConcatSpreadable]() {
        return false;
    }
}

const ea1 = new ExtraArray1();
ea1[0] = 10;
ea1[1] = 20;

const ea2 = new ExtraArray2();
ea2[0] = 30;
ea2[1] = 40;

console.log([100, 200].concat(ea1).concat(ea2));


// -------------------------------------------------------------------------
// Symbol.match
// -------------------------------------------------------------------------
// mozesz implementowac twoj wlasny matcher do pracy z funkcja match
class CustomMatcher {
    constructor(value) {
        this.value = value;
    }

    [Symbol.match](expression) {
        const index = expression.indexOf(this.value);
        return index === -1 ? null : this.value;
    }
}

const expression1 = 'today is thursday'.match(new CustomMatcher('is'));
const expression2 = 'today is thursday'.match(new CustomMatcher('es'));
console.log(expression1);
console.log(expression2);


// -------------------------------------------------------------------------
// Symbol.search
// -------------------------------------------------------------------------
class CustomSearch {
    constructor(value) {
        this.value = value;
    }

    [Symbol.search](expression) {
        return expression.indexOf(this.value);
    }
}

const expression3 = 'today'.search(new CustomSearch('da'));
const expression4 = 'today'.search(new CustomSearch('ia'));
console.log(expression3);
console.log(expression4);


// -------------------------------------------------------------------------
// Symbol.toPrimitive
// -------------------------------------------------------------------------
// przetwarzanie obiektu do typu prymitywnego

class PrimitiveConverter {

    constructor(object) {
        this.object = object;
    }

    [Symbol.toPrimitive](value) {
        if (value === 'string') {
            return this.object?.name;
        } else if (value === 'number') {
            return this.object?.name.length;
        }
        return this.object;
    }
}

const primitiveConverter = new PrimitiveConverter({name: 'HELLO'});
console.log(String(primitiveConverter));
console.log(+primitiveConverter);
console.log(Number(primitiveConverter));

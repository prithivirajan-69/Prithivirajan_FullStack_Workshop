// Type Checker Utility (Modern JS)

function typeOf(value) {

    // Primitive & special cases
    if (value === null) return `null`;
    if (value === undefined) return `undefined`;
    if (Number.isNaN(value)) return `nan`;

    // Instance checks using array method
    const instanceTypes = [
        { type: `array`, check: Array.isArray },
        { type: `date`, check: v => v instanceof Date },
        { type: `map`, check: v => v instanceof Map },
        { type: `set`, check: v => v instanceof Set },
        { type: `regexp`, check: v => v instanceof RegExp },
        { type: `error`, check: v => v instanceof Error },
        { type: `promise`, check: v => v instanceof Promise }
    ];

    const matched = instanceTypes.find(item => item.check(value));
    if (matched) return `${matched.type}`;

    // Fallback to JS typeof
    return `${typeof value}`;
}

/* =========================
   Given Test Cases
========================= */
console.log(typeOf(null));                 // "null"
console.log(typeOf(undefined));            // "undefined"
console.log(typeOf(42));                   // "number"
console.log(typeOf(NaN));                  // "nan"
console.log(typeOf("hello"));              // "string"
console.log(typeOf(true));                 // "boolean"
console.log(typeOf(Symbol()));             // "symbol"
console.log(typeOf([]));                   // "array"
console.log(typeOf({}));                   // "object"
console.log(typeOf(() => {}));             // "function"
console.log(typeOf(new Date()));            // "date"
console.log(typeOf(new Map()));             // "map"
console.log(typeOf(new Set()));             // "set"
console.log(typeOf(/regex/));               // "regexp"
console.log(typeOf(new Error()));           // "error"
console.log(typeOf(Promise.resolve()));     // "promise"

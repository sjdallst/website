/*
 * handlebars-helpers.js
 *
 * Custom helpers for handlebars
 */

/*
 * Helper for equality of two values
 * {{#ifeq a b}}a was true{{else}}b was true{{/ifeq}}
 */
exports.ifeq = function(v1, v2, options) {
    return v1 === v2 ? options.fn(this) : options.inverse(this);
};


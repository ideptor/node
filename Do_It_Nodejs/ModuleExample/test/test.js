var assert = require('assert');

describe('string#split', function() {
    it('shoud return array', function() {
        assert(Array.isArray('a,b,c'.split(',')));
    });
});
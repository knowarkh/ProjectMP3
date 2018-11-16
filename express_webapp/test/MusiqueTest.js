var expect = require('chai').expect;
var database = require('../bin/db-connection');

describe('music', function() {
    it('should be invalid if titre is empty', function(done) {
        var m = new database.Musique();

        m.validate(function(err) {
            expect(err.errors.titre).to.exist;
            expect(err.errors.cheminMP3).to.exist;
            expect(err.errors.artiste).to.exist;
            done();
        });
    });
});

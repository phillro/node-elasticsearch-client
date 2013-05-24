var Faker = require('Faker');

var random = {
    number: function (max) {
        max = max || 10000;
        return Faker.Helpers.randomNumber(max);
    },

    string: function (str_len) {
        str_len = str_len || 8;
        var chars = "abcdefghiklmnopqrstuvwxyz";
        var random_str = '';
        for (var i = 0; i < str_len; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            random_str += chars.substring(rnum, rnum + 1);
        }
        return random_str;
    },

    email: function () {
        return this.string() + '+' + this.string() + '@' + 'example.com';
    }
};

module.exports = random;

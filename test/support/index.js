require('../../index');

module.exports = {
    random: require('./random'),
    walk_dir: require('./walk_dir'),

    shallow_clone: function (object) {
        var ret = {};
        if (object) {
            Object.keys(object).forEach(function (val) {
                ret[val] = object[val];
            });
        }
        return ret;
    }
};

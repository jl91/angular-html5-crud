app.factory('LocalDatabaseService', function () {

    function LocalDatabaseService() {

        this.findAll = function (entity) {
            var collection = localStorage.getItem(entity);

            return JSON.parse(collection);
        };
        this.findBy = function (entity, filter) {
            var collection = this.findAll(entity);
            var collectionLength = collection.length;
            if (collection.length) {

            }
        };
        this.findOneBy = function (filter) {

        };
        this.insert = function (entity, data) {
            try {
                data._id = Date.now();
                var collection = this.findAll(entity);
                if (!collection) {
                    localStorage.setItem(entity, '[]');
                    collection = JSON.parse(this.findAll(entity));
                }
                collection.push(data);
                localStorage.setItem(entity, JSON.stringify(collection));
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        };
        this.update = function (entity, data) {
            var collection = JSON.parse(this.findAll(entity));
            for (var row in collection) {
                if (collection[row]._id === data._id) {
                    for (var key in collection[row]) {
                        collection[row][key] = data[key];
                    }

                    collection[row];
                }
            }

        };

        this.save = function (entity, data) {
            var result = false;
            if (data._id !== '' && data._id !== undefined) {
                result = this.update(entity, data);
            } else {
                result = this.insert(entity, data);
            }
            return result;
        };

        this.remove = function (entity, id) {

        };
    }
    return new LocalDatabaseService();
});
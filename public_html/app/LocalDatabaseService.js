app.factory('LocalDatabaseService', function () {

    function LocalDatabaseService() {

        this.findAll = function (entity) {
            var collection = localStorage.getItem(entity);
            return JSON.parse(collection);
        };

        this.findOne = function (entity, id) {
            var collection = this.findAll(entity);
            var collectionLength = collection.length;
            if (collectionLength) {
                for (var index in collection) {
                    if (collection[index]._id === id) {
                        return collection[index];
                    }
                }
            }
        };

        this.insert = function (entity, data) {
            try {
                data._id = Date.now();
                var collection = this.findAll(entity);
                if (!collection) {
                    localStorage.setItem(entity, '[]');
                    collection = this.findAll(entity);
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

            try {
                var collection = this.findAll(entity);
                for (var index in collection) {
                    if (collection[index]._id === data._id) {
                        collection[index] = data;
                        localStorage.setItem(entity, JSON.stringify(collection));
                        return true;
                    }
                }
                return false;
            } catch (e) {
                console.log(e);
                return false;
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
            var collection = this.findAll(entity);

            for (var index in collection) {
                if (collection[index]._id === id) {
                    collection.splice(index, 1);
                    console.log(collection);
                    localStorage.setItem(entity, JSON.stringify(collection));
                    return true;
                }
            }
            return false;

        };
    }
    return new LocalDatabaseService();
});
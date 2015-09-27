app.controller('CRUDController', ['LocalDatabaseService', function (LocalDatabaseService) {
        this.user = {};
        this.user.name = '';
        this.user.age = '';
        this.user.email = '';
        this.fetchAll = function () {
            return LocalDatabaseService.findAll('User');
        };
        this.save = function () {
            var result = LocalDatabaseService.save('User', this.user);
            if (result) {
                this.user = {};
            } else {
                alert('Houve um erro!');
            }
        };

        this.remove = function (id) {
            LocalDatabaseService.remove('User', id);
        };
        this.edit = function (id) {
            this.user = LocalDatabaseService.findOne('User', id);
        };
    }
]);
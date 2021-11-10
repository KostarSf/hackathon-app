class Database {
    #client;

    #dbName;
    #clUsers;
    #clAllowed;

    #assert;

    #offlineMode;

    constructor(offlineMode = false) {
        this.#offlineMode = offlineMode;

        const MongoClient = require('mongodb').MongoClient;
        this.#assert = require('assert');

        const url = 'mongodb+srv://kostar:JExJliN2LER6cN8A@cluster0.8mdgo.mongodb.net/?retryWrites=true&w=majority';

        this.#dbName = 'itru';
        this.#clUsers = 'users';
        this.#client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });

        this.connection_check();
    }

    connection_check() {
        if (this.#offlineMode) {
            console.log("[WARN]  Connection to database is disabled");
            return;
        }

        console.log(`[INFO]  Connecting to database ${this.#dbName}...`);
        this.#client.connect((err) => {
            if (err === null || err === undefined) {
                const db = this.#client.db(this.#dbName);

                db.listCollections().toArray((err, colls) => {
                    if (err === null || err === undefined) {
                        console.log("[INFO]  Connected successfully to database");
                    } else {
                        console.log(err.name + ": " + err.message);
                    }
                });
            } else {
                console.log(err);
                console.log(
                    `[ERROR] Database connection error\n` +
                    `        ${err.name}: ${err.message}\n` +
                    "        Database currently unavailable"
                );
            }
        });
    }

    async fetch_login(email, hash, callback) {
        if (this.#offlineMode) {
            callback({
                message: "Database currently unavailable"
            });
            return;
        }

        console.log(`\nFetching login data for '${email}'...`);

        var error = {
            message: String
        };

        var hasNoErrors = false;

        var hasInUsers = false;
        var matchPassword = false;

        var user = await this.#db_findOne(this.#clUsers, { "email": email });

        if (user !== null) {
            hasInUsers = true;
            if (user.hash === hash) {
                matchPassword = true;
            }
        }

        if (hasInUsers) {
            if (matchPassword) {
                hasNoErrors = true;
                console.log("   | Hash is matched")
            } else {
                error.message = "wrong_password";
                console.log("   | Hash is NOT matched")
            }
        } else {
            error.message = "restricted_email";
        }

        hasNoErrors ? console.log("Status: Ok") : console.log("Status: " + error.message);
        hasNoErrors ? callback(null) : callback(error);
    }

    async fetch_register(email, key, callback) {
        if (this.#offlineMode) {
            callback({
                message: "Database currently unavailable"
            });
            return;
        }

        console.log(`\nFetching registration data for '${email}'...`);

        var error = {
            message: String
        };

        var hasNoErrors = false;

        var hasInUsers = false;
        var hasInAllowed = false;
        var isKeyNeeded = false;
        var hasKeyMatched = false;
        var givedBlankKey = false;

        hasInUsers = await this.#db_fetch_isExist(this.#clUsers, { "email": email });



        if (hasInUsers) {
            error.message = "already_registered";
        } else {
            hasNoErrors = true;
        }

        hasNoErrors ? console.log("Status: User can be registered") : console.log("Status: " + error.message);
        hasNoErrors ? callback(null) : callback(error);
    }

    async fetch_recover(email, callback) {
        if (this.#offlineMode) {
            callback({
                message: "Database currently unavailable"
            });
            return;
        }

        console.log(`\nFetching recover data for '${email}'...`);

        var error = {
            message: String
        };

        var hasNoErrors = false;

        var hasInUsers = false;

        hasInUsers = await this.#db_fetch_isExist(this.#clUsers, { "email": email });

        if (hasInUsers) {
            hasNoErrors = true;
        } else {
            error.message = "restricted_email";
        }

        hasNoErrors ? console.log("Status: Ok") : console.log("Status: " + error.message);
        hasNoErrors ? callback(null) : callback(error);
    }

    async #db_fetch_isExist(collection, parameters) {
        var result = null;

        await this.#client.db(this.#dbName).collection(collection).findOne(parameters).then((value) => {
            if (value !== null) {
                console.log(`   | Item is exist in '${collection}'`);
                result = true;
            } else {
                console.log(`   | Item does not exist in '${collection}'`);
                result = false;
            }
        });

        return result;
    }

    async #db_findOne(collection, parameters) {
        var data = null;

        await this.#client.db(this.#dbName).collection(collection).findOne(parameters).then((value) => {
            if (value !== null) {
                console.log(`   | Found matching item in '${collection}'`);
                data = value;
            } else {
                console.log(`   | Nothing has found in '${collection}'`);
                data = value;
            }
        });

        return data;
    }

    async register_user(user, callback) {
        if (this.#offlineMode) {
            callback({
                message: "Database currently unavailable"
            });
            return;
        }

        console.log(`\nRegistering user '${user.email}'...`);

        await this.#client.db(this.#dbName).collection(this.#clUsers).insertOne(user).then(() => {
            console.log("Result: Success");
            callback(null);
        }, (reason) => {
            console.log("Result: Fail");
            console.log(reason);
            callback(reason);
        });
    }
}

module.exports = Database;

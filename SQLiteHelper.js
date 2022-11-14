import {openDatabase} from "expo-sqlite";

const db = openDatabase("CW_expo_DB");

export const createTables = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS tripTable (" +
            "id INTEGER PRIMARY KEY NOT NULL, " +
            "name VARCHAR, " +
            "destination VARCHAR, " +
            "date VARCHAR, " +
            "risk VARCHAR, " +
            "description VARCHAR);",
            [],
            (tx, res) => {
                console.log("Table created successfully");
            },
            error => {
                console.log("Error on creating table " + error.message);
            }
        );
    })
    return db;
}

export const tripTestData = ({name, destination, date, risk, description}) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO tripTable (name, destination, date, risk, description) VALUES (?,?,?,?,?);",
            ["Test123456789", "TestDesty123456", "19/11/2001", "Yes", "TestDescrip"],
            (tx, res) => {
                console.log("Table created successfully");
            },
            error => {
                console.log("Error on creating table " + error.message);
            }
        )
    })
}

export const tripCreate = ({tName, tDestination, test, tRisk, tDescription}) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO tripTable (name, destination, date, risk, description) VALUES (?,?,?,?,?);",
            [tName, tDestination, test, tRisk, tDescription],
            (tx, res) => {
                console.log("Table created successfully");
            },
            error => {
                console.log("Error on creating table " + error.message);
            }
        )
    })
}

export const tripRead = (callBack) => {
    db.transaction((tx) => {
        tx.executeSql("SELECT * FROM tripTable;",
            [],
            (_, {rows: {_array}}) => {
                callBack(_array);
            }
        );
    })
}


export const tripUpdate = ({id, rName, rDestination, rTest, rRisk, rDescription}) => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE tripTable SET " +
            "name = ?, " +
            "destination = ?, " +
            "date = ?, " +
            "risk = ?, " +
            "description = ? " +
            "WHERE id = ?;",
            [rName, rDestination, rTest, rRisk, rDescription, id],
            (tx, res) => {
                console.log("Update created successfully");
            },
            error => {
                console.log("Error on update table " + error.message);
            }
        )
    })
}

export const tripDeleteAll = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM tripTable;",
            [],
            (tx, res) => {
                console.log("Table delete successfully");
            },
            error => {
                console.log("Error on delete table " + error.message);
            }
        )
    })
}

export const expenseDeleteAll = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM expense2;",
            [],
            (tx, res) => {
                console.log("Expense delete successfully");
            },
            error => {
                console.log("Error on delete expense " + error.message);
            }
        )
    })
}

export const tripDeleteByID = (id) => {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM tripTable WHERE id=?;",
            [id],
            (tx, res) => {
                console.log("Table delete successfully");
            },
            error => {
                console.log("Error on delete table " + error.message);
            }
        )
    })
}

export const expenseDeleteByID = (id) => {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM expense2 WHERE trip_id=?;",
            [id],
            (tx, res) => {
                console.log("Table delete successfully");
            },
            error => {
                console.log("Error on delete table " + error.message);
            }
        )
    })
}

export const createExpense = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS expense2 (" +
            "id INTEGER PRIMARY KEY NOT NULL, " +
            "type VARCHAR, " +
            "amount VARCHAR, " +
            "time VARCHAR, " +
            "trip_id INTEGER, " +
            "FOREIGN KEY(trip_id) REFERENCES tripTable(id));",
            [],
            (tx, res) => {
                console.log("Expense created successfully");
            },
            error => {
                console.log("Error on creating Expense " + error.message);
            }
        );
    })
    return db;
}

export const expenseCreate = ({trip_id, exType, exAmount, exTime}) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO expense2 (trip_id, type, amount, time) VALUES (?,?,?,?);",
            [trip_id, exType, exAmount, exTime],
            (tx, res) => {
                console.log("Expense created successfully");
            },
            error => {
                console.log("Error on creating expense " + error.message);
            }
        )
    })
}

export const expenseCreateTest = ({trip_id, exType, exAmount, exTime}) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO expense2 (trip_id, type, amount, time) VALUES (?,?,?,?);",
            ["1", "Food", "2000", "Mon Nov 14 2022 23:25:38 GMT+0700 (Indochina Time)"],
            (tx, res) => {
                console.log("Expense created successfully");
            },
            error => {
                console.log("Error on creating expense " + error.message);
            }
        )
    })
}


export const expenseRead = (callback, trip_id) => {
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM expense2 WHERE trip_id=" + trip_id + ";",
            [],
            (_, {rows: {_array}}) => {
                callback(_array);
            }
        );
    })
}
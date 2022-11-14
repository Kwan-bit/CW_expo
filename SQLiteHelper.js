import {openDatabase} from "expo-sqlite";

const db = openDatabase("CW_expo_DB");

export const createTables = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS officalCWEXPO (" +
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
            "INSERT INTO officalCWEXPO (name, destination, date, risk, description) VALUES (?,?,?,?,?);",
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
            "INSERT INTO officalCWEXPO (name, destination, date, risk, description) VALUES (?,?,?,?,?);",
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
        tx.executeSql("SELECT * FROM officalCWEXPO;",
            [],
            (_, {rows: {_array}}) => {
                callBack(_array);
            }
        );
    })
}


export const tripUpdate = ({id, rName, rDestination, rTest, rRisk, rDescription}) => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE officalCWEXPO SET " +
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

export const tripDeleteAll = (callBack) => {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM officalCWEXPO;",
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
export const tripDeleteByID = (id) => {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM officalCWEXPO WHERE id=?;",
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

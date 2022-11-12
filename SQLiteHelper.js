import {openDatabase} from "expo-sqlite";

const db = openDatabase("CW_expo_DB");

export const createTables = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS f4124f1 (" +
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
            "INSERT INTO f4124f1 (name, destination, date, risk, description) VALUES (?,?,?,?,?);",
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

export const tripCreate = ({tName, tDestination, tDate, tRisk, tDescription}) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO f4124f1 (name, destination, date, risk, description) VALUES (?,?,?,?,?);",
            [tName, tDestination, tDate, tRisk, tDescription],
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
        tx.executeSql("SELECT * FROM f4124f1;",
            [],
            (_, {rows: {_array}}) => {
                callBack(_array);
            }
        );
    })
}

export const tripUpdate = ({name, destination, date, risk, description}) => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE f4124f1 " +
            "name = ?, " +
            "destination = ?, " +
            "date = ?, " +
            "risk = ?, " +
            "description = ? " +
            "WHERE id = ?;",
            [name, destination, date, risk, description],
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
            "delete from f4124f1;",
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
            "DELETE FROM f4124f1 WHERE id=?;",
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

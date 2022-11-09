import {openDatabase} from "expo-sqlite";

const db = openDatabase("MainDB")

function openDB() {
    const createTables = () => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Test (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
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
            )
        })
    }
}

export const tripCreate = ({name, destination, date, risk, description}) => {
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Test (name, destination, date, risk, description) VALUES (?,?,?,?,?);",
            [name, destination, date, risk, description],
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
    db.transaction(tx => {
        tx.executeSql("SELECT * FROM Test;",
            [],
            (_, {rows: {_array}}) => {
                callBack(_array);
            }
        );
    })
}

export const tripUpdate = ({name, destination, date, risk, description}) => {
    db.transaction(tx => {
        tx.executeSql(
            "UPDATE Test SET " +
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

export const tripDeleteAll = ({name, destination, date, risk, description}) => {
    db.transaction(tx => {
        tx.executeSql(
            "DELETE * FROM Test;",
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
export const tripDeleteByID = (id) => {
    db.transaction(tx => {
        tx.executeSql(
            "DELETE FROM Test WHERE id=?;",
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

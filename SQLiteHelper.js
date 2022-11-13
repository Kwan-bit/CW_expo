import {openDatabase} from "expo-sqlite";

const db = openDatabase("CW_expo_DB");

export const createTables = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS vrqwrvq2rv1 (" +
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
            "INSERT INTO vrqwrvq2rv1 (name, destination, date, risk, description) VALUES (?,?,?,?,?);",
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
            "INSERT INTO vrqwrvq2rv1 (name, destination, date, risk, description) VALUES (?,?,?,?,?);",
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
        tx.executeSql("SELECT * FROM vrqwrvq2rv1;",
            [],
            (_, {rows: {_array}}) => {
                callBack(_array);
            }
        );
    })
}

// export const tripRead = (callBack) => {
//     db.transaction((tx) => {
//         tx.executeSql("SELECT * FROM vrqwrvq2rv1 WHERE id=1;",
//             [],
//             (_, {rows: {_array}}) => {
//                 callBack(_array);
//             }
//         );
//     })
// }



export const tripUpdate = ({rName, rDestination, rTest, rRisk, rDescription}) => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE vrqwrvq2rv1 " +
            "name = ?, " +
            "destination = ?, " +
            "date = ?, " +
            "risk = ?, " +
            "description = ? " +
            "WHERE id = ?;",
            [rName, rDestination, rTest, rRisk, rDescription],
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
            "delete from vrqwrvq2rv1;",
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
export const tripDeleteByID = (rId) => {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM vrqwrvq2rv1 WHERE id=?;",
            [rId],
            (tx, res) => {
                console.log("Table delete successfully");
            },
            error => {
                console.log("Error on delete table " + error.message);
            }
        )
    })
}

import React, {useEffect} from 'react';
import Tabs from "./navigation/tabs";
import {NavigationContainer} from '@react-navigation/native';
import {createExpense, createTables} from "./SQLiteHelper";

const App = () => {
    useEffect(() => {
        const loadData = async () => {
            await createTables();
            await createExpense();
        };
        loadData();
    }, []);

    return (
        <NavigationContainer>
            <Tabs/>
        </NavigationContainer>

    );
}

export default App;

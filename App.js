import React, {useEffect} from 'react';
import Tabs from "./navigation/tabs";
import {NavigationContainer} from '@react-navigation/native';
import {createTables} from "./SQLiteHelper";

const App = () => {
    useEffect(() => {
        const loadData = async () => {
            await createTables();
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

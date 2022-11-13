import {FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {Searchbar} from "react-native-paper";
import {Header} from "@rneui/themed";
import {useCallback, useState} from "react";
import {Card} from "react-native-elements";
import {useFocusEffect} from "@react-navigation/native";
import {tripRead} from "../SQLiteHelper";

const SearchTrip = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [lTrip, listTrip] = useState([])

    useFocusEffect(
        useCallback(() => {

            const getData = () => {
                try {tripRead(listTrip);}
                catch (error) {console.log(error);}
            };
            getData();
            return () => {listTrip([])};
        }, [])
    );

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = lTrip.filter(function (item) {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearchQuery(text);

        } else if (!text){
            setFilteredDataSource([]);
            setSearchQuery(text);
        }
        else {
            setFilteredDataSource(lTrip);
            setSearchQuery(text);
        }
    };

    const renderSearchItem = ({item}) => (
        <Card key={item.id} containerStyle={styles.card}>
            <View   style={styles.row}>
                <Text style={styles.idCard}>{item.id}</Text>
                <View style={styles.column}>
                    <Text style={styles.textCard}>
                        {item.name.length < 13 ? `${item.name}` : `${item.name.substring(0, 10)}...`}
                    </Text>
                    <Text style={styles.textCard}>
                        {item.destination.length < 13 ? `${item.destination}` : `${item.destination.substring(0, 10)}...`}
                    </Text>
                </View>
                <View style={styles.column2}>
                    <Text style={styles.textCard}>{new Date(item.date).toLocaleDateString()}</Text>
                    <Text style={styles.textCard}>Require Assessment: {item.risk}</Text>
                </View>
            </View>
        </Card>

    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <View style={styles.container}>
                <Header
                    centerComponent={{text: 'Search Trip', style: {color: '#000000', fontSize: 20}}}
                    containerStyle={{
                        backgroundColor: '#ffffff',
                        justifyContent: 'space-around',
                    }}
                />
                <Searchbar
                    style={styles.search}
                    placeholder="Search"
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={searchQuery}
                />
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={filteredDataSource}
                        renderItem={renderSearchItem}
                        keyExtractor={(item) => item.id}
                    />
                </SafeAreaView>


            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 817
    },
    search: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
    },
    idCard: {
        fontSize: 40,
        paddingRight: 0,
        width: 60,
    },
    textCard: {
        fontSize: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "right",
        width: 250,
        paddingBottom: 0,
    },
    column: {
        flexDirection: "column",
        justifyContent: "right",
        width: 105,
        paddingTop: 4
    },
    column2: {
        flexDirection: "column",
        justifyContent: "right",
        width: 200,
        paddingTop: 4
    },
    card: {
        backgroundColor: "#ffffff",
        borderWidth: 0,
        borderRadius: 15,
        shadowRadius: 5,
        shadowColor: "#2d2d2d",
        shadowOpacity: 1,
        shadowOffset: {width: 4, height: 4},
    },

});

export default SearchTrip;

import {useCallback, useState} from 'react';
import {Alert, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {tripDeleteAll, tripRead} from "../SQLiteHelper";
import {Card} from 'react-native-elements';
import {useFocusEffect} from "@react-navigation/native";
import {Header} from "@rneui/themed";

const TripList = () => {
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

    const deleteList = () => {
        tripDeleteAll(listTrip);
        listTrip([]);
    }

    const confirmAlert = () =>
        Alert.alert(
            "Delete all trips",
            "Are you sure to delete all trips in list ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Canceled delete all trips!"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: (deleteList)
                }
            ]
        );


    const renderItem = ({item}) => (
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
        <View style={styles.container}>
            <Header
                centerComponent={{ text: 'All Trips', style: { color: '#000000', fontSize: 20 } }}
                rightComponent={{
                    icon: 'delete', color: '#000000', paddingRight: 15, size: 25, onPress: () => confirmAlert()
                }}
                containerStyle={{
                    backgroundColor: '#ffffff',
                    justifyContent: 'space-around',
                }}
            />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={lTrip}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 817
    },
    card: {
        backgroundColor: "#ffffff",
        borderWidth: 0,
        borderRadius: 15,
        shadowRadius: 5,
        shadowColor: "#2d2d2d",
        shadowOpacity: 1,
        shadowOffset: {width: 5, height: 5},
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
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
});

export default TripList;
import {useCallback, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {expenseRead} from "../SQLiteHelper";
import {Card} from 'react-native-elements';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {Header} from "@rneui/themed";

const ExpenseList = ({route}) => {
    const {trip_id} = route.params;

    const navigation = useNavigation();
    const [lExpense, listExpense] = useState([])

    useFocusEffect(
        useCallback(() => {

            const getData = () => {
                try {
                    expenseRead(listExpense, trip_id);
                } catch (error) {
                    console.log(error);
                }
            };
            getData();
            return () => {
                listExpense([])
            };
        }, [])
    );

    const goToEdit = (trip_id) => {
        navigation.navigate('Switch', {
            screen: "AddExpense",
            params: {
                trip_id
            },
        });
    };


    const renderItem = ({item}) => (
        <Card key={item.id} containerStyle={styles.card}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.textCard}>{item.type}</Text>
                    <Text style={styles.textCard}>{new Date(item.time).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.idCard}>
                    {item.amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').length < 12 ? `${item.amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` :
                        `${item.amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').substring(0, 9)}...`}
                </Text>

            </View>
        </Card>

    );

    return (
        <View style={styles.container}>
            <Header
                centerComponent={{text: 'All Expenses in trip ID: ' + trip_id, style: {color: '#000000', fontSize: 20}}}
                rightComponent={{
                    icon: 'add', color: '#000000', paddingRight: 15, size: 25, onPress: () => {
                        navigation.navigate('Switch', {
                            screen: "AddExpense",
                            params: {
                                trip_id
                            },
                        });
                    }
                }}
                containerStyle={{
                    backgroundColor: '#ffffff',
                    justifyContent: 'space-around',
                }}
            />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={lExpense}
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
        shadowOffset: {width: 4, height: 4},
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    idCard: {
        fontSize: 40,
        paddingRight: 0,
        width: 250,
        textAlign: 'right'
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
        width: 80,
        paddingTop: 4
    },
});

export default ExpenseList;
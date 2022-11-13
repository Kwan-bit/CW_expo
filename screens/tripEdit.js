import {useCallback, useEffect, useState} from "react";
import {StyleSheet, View, Text, Keyboard, Pressable, SafeAreaView, TouchableWithoutFeedback, Alert} from "react-native";
import {Input, CheckBox, Button, Dialog, Header} from "@rneui/themed";
import RNDateTimePicker, {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {createTables, tripCreate, tripDeleteByID, tripRead, tripReadById, tripUpdate} from "../SQLiteHelper";
import {TextInput} from "react-native-paper";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {openDatabase} from "expo-sqlite";

const EditTrip = ({route}) => {
    const { date, description, destination, id, name, risk } =
        route.params;
    console.log(route)


    // const [data, setData] = useState({
    //     id: id,
    //     name: name,
    //     destination: destination,
    //     date: new Date(),
    //     description: description,
    //     risk: risk,
    // });
    //


    // const onNameChange = (text) => setData({...data, name: text});
    // const onDestinationChange = (text) => setData({...data, destination: text});
    // const onDescriptionChange = (text) => setData({...data, description: text});
    // const onDateChange = (e, date) => setData({...data, date: new Date(date)});
    // const onRiskAssessmentChange = (value) =>
    //     setData({...data, risk: value});
    //
    // const showMode = () => {
    //     DateTimePickerAndroid.open({
    //         value: new Date(),
    //         onChange: onDateChange,
    //         mode: "date",
    //         is24Hour: true,
    //     });
    // };
    //
    // const onSubmit = () => {
    //     try {
    //         if (
    //             !data.name ||
    //             !data.destination ||
    //             !data.date ||
    //             !data.risk
    //         ) {
    //
    //             return;
    //         }
    //         tripUpdate({
    //             ...data,
    //             date: `${data.date.getDate()}/${data.date.getMonth()}/${data.date.getFullYear()}`,
    //         });
    //
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    //
    // const onDelete = () => {
    //     try {
    //         tripDeleteByID(id);
    //         navigation.goBack();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
//======================================================================================================
//     const db = openDatabase("CW_expo_DB");
//     const tripReadById = () => {
//         db.transaction((tx) => {
//             tx.executeSql(
//                 "SELECT * FROM vrqwrvq2rv1 WHERE id=1;",
//                 [],
//                 (tx, res) => {
//                     const len = res.rows.length;
//                     if (len > 0) {
//                         let results = [];
//                         for (let i = 0; i < len; i++) {
//                             let item = res.rows.item(i);
//                             results.push({name: item.name, destination: item.destination, date: item.date
//                                 , risk: item.risk, description: item.description});
//                         }
//                         reTrip(results);
//                         console.log(rTrip)
//                     }
//                 }
//             )
//         })}
//

    // useEffect(() => {
    //     const loadData = async () => {
    //         await tripReadById();
    //     };
    //     loadData();
    // }, []);
    //
    //
    const navigation = useNavigation();
    //
    const [rTrip, reTrip] = useState([])
    const [rId, reId] = useState('1');
    const [rName, reName] = useState(name);
    const [rDestination, reDestination] = useState(destination);
    const [rDate, reDate] = useState(new Date());
    let [rTest, reTestDate] = useState('');
    const [rRisk, reRisk] = useState(risk);
    const [rDescription, reDescription] = useState(description);

    const [isDisplayDate, setShow] = useState(false);
    const [tDate, tempDate] = useState(new Date());
    const changeSelectedDate = (event, selectedDate) => {

        const currentDate = selectedDate || new Date(tDate);
        tempDate(currentDate);
    };

    const onButtonToggle = () => {
        setShow(isDisplayDate !== true);
    };

    // const onDeleteID = () => {
    //     try {
    //         tripDeleteByID(id);
    //         navigation.goBack();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    //
    const confirmDelete = () =>
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
                    onPress: (tripDeleteByID(1), navigation.navigate('List'))
                }
            ]
        );

    const onUpdate = () => {
        if (rName.trim().length !== 0  && rDestination.trim().length !== 0 && rRisk.trim().length !== 0) {
            try {
                tripCreate({rName, rDestination, rTest, rRisk, rDescription});
                reName("");
                reDestination("");
                tempDate(new Date())
                reTestDate("")
                reRisk("");
                reDescription("")
                navigation.navigate('List')
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert('Empty field', 'Please fill all requested field!');
        }
    }

    const onBackList = () => {
        navigation.navigate('List')
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <View style={styles.container}>
                <Header
                    centerComponent={{text: 'Edit Trip', style: {color: '#000000', fontSize: 20}}}
                    rightComponent={{
                        icon: 'delete', color: '#000000', paddingRight: 15, size: 25, onPress: () => onBackList()
                    }}
                    containerStyle={{
                        backgroundColor: '#ffffff',
                        justifyContent: 'space-around',
                    }}
                />


                <TextInput
                    value={rName}
                    style={styles.input}
                    onChangeText={reName}
                    label={
                        <Text>
                            Name <Text style={{color: 'red'}}>*</Text>
                        </Text>
                    }
                    placeholder='Name of the trip'
                    mode="outlined"
                    theme={{colors: {primary: '#000000'}}}
                />
                <TextInput
                    value={rDestination}
                    style={styles.input}
                    onChangeText={reDestination}
                    label={
                        <Text>
                            Destination <Text style={{color: 'red'}}>*</Text>
                        </Text>
                    }
                    placeholder='Destination'
                    mode="outlined"
                    theme={{colors: {primary: '#000000'}}}
                />

                {/*<Pressable onPress={onButtonToggle}>*/}
                {/*    <View pointerEvents="none">*/}
                {/*        <TextInput*/}
                {/*            value={data.date.toLocaleDateString(undefined, {*/}
                {/*                month: 'long',*/}
                {/*                day: 'numeric',*/}
                {/*                year: 'numeric'*/}
                {/*            })}*/}
                {/*            style={styles.input}*/}
                {/*            onChangeText={test = (data.date).toString()}*/}

                {/*            mode="outlined"*/}
                {/*            theme={{colors: {primary: '#000000'}}}*/}
                {/*            editable={false}*/}
                {/*            selectTextOnFocus={false}*/}
                {/*        />*/}
                {/*    </View>*/}
                {/*</Pressable>*/}

                {/*<SafeAreaView style={isDisplayDate ? styles.testContainer : 0}>*/}
                {/*    {isDisplayDate && (*/}
                {/*        <RNDateTimePicker*/}
                {/*            value={tDate}*/}
                {/*            mode="date"*/}
                {/*            onChange={changeSelectedDate}*/}
                {/*            display="spinner"*/}
                {/*            style={{*/}
                {/*                height: 100,*/}
                {/*                width: 375,*/}
                {/*                marginLeft: 20,*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*</SafeAreaView>*/}


                <Text style={styles.risk}>Require Risk Assessment<Text style={{color: 'red'}}> *</Text></Text>
                <View style={styles.checkBoxWrapper}>
                    <CheckBox
                        center
                        title='Yes'
                        checkedIcon='dot-circle-o'
                        checked={rRisk === 'Yes'}
                        onPress={() => reRisk('Yes')}
                        tintColors={{true: '#F15927', false: 'black'}}
                        containerStyle={{backgroundColor: 'transparent'}}
                        uncheckedIcon='circle-o'
                        style={styles.input}
                    />
                    <CheckBox
                        center
                        title='No'
                        checkedIcon='dot-circle-o'
                        checked={rRisk === 'No'}
                        onPress={() => reRisk('No')}
                        containerStyle={{backgroundColor: 'transparent'}}
                        uncheckedIcon='circle-o'
                        style={styles.input}
                    />
                </View>

                <TextInput
                    value={rDescription}
                    style={styles.inputDes}
                    onChangeText={reDescription}
                    label='Description'
                    placeholder='Description'
                    multiline={true}
                    numberOfLines={5}
                    mode="outlined"
                    theme={{colors: {primary: '#000000'}}}
                />

                <Pressable
                    onPress={onUpdate}
                    style={({pressed}) => [
                        {backgroundColor: pressed ? '#4f4f4f' : 'black'},
                        styles.button
                    ]}>
                    <Text style={styles.text}>Add To Database</Text>
                </Pressable>

            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 817
    },
    checkBoxWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "rgba(255,255,255,0)",
    },
    input: {
        height: 50,
        backgroundColor: "#ffffff",
        marginTop: 30,
        marginRight: 20,
        marginLeft: 20,
    },
    inputDes: {
        height: 120,
        backgroundColor: "#ffffff",
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20,
    },
    risk: {
        marginTop: 20,
        marginLeft: 30,
    },
    button: {
        width: 375,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        marginTop: 50,
        marginLeft: 20
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6
    },
    inputWrapper: {
        width: 325,
        marginTop: 20,
        marginBottom: 10,
    },
    testContainer: {
        width: 375,
        height: 120,
    },
    date: {
        marginTop: 10,

    },
});

export default EditTrip;

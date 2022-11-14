import {useState} from "react";
import {StyleSheet, View, Text, Keyboard, Pressable, SafeAreaView, TouchableWithoutFeedback, Alert} from "react-native";
import {CheckBox, Header} from "@rneui/themed";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {tripDeleteByID, tripUpdate} from "../SQLiteHelper";
import {TextInput} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

const EditTrip = ({route}) => {
    const {date, description, destination, id, name, risk} =
        route.params;

    const navigation = useNavigation();

    const [rName, reName] = useState(name);
    const [rDestination, reDestination] = useState(destination);
    const [rDate, reDate] = useState(new Date(date));
    let [rTest, reTestDate] = useState('');
    const [rRisk, reRisk] = useState(risk);
    const [rDescription, reDescription] = useState(description);

    const [isDisplayDate, setShow] = useState(false);

    const changeSelectedDate = (event, selectedDate) => {
        const currentDateData = selectedDate || new Date(rDate);
        reDate(currentDateData);
    };

    const onButtonToggle = () => {
        setShow(isDisplayDate !== true);
    };

    const onDelete = () => {
        try {
            tripDeleteByID(id);
            navigation.navigate('List')
        } catch (error) {
            console.log(error)
        }
    }

    const confirmDelete = () =>
        Alert.alert(
            "Delete this trips",
            "Are you sure to delete "+rName +" information ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Canceled delete"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: (onDelete)
                }
            ]
        );

    const onUpdate = () => {
        if (rName.trim().length !== 0 && rDestination.trim().length !== 0 && rRisk.trim().length !== 0) {
            try {
                tripUpdate({id, rName, rDestination, rTest, rRisk, rDescription});
                navigation.navigate('List')
                Alert.alert('Done', 'Update success!');
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert('Empty field', 'Please fill all requested field!');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <View style={styles.container}>
                <Header
                    centerComponent={{text: 'Edit Trip', style: {color: '#000000', fontSize: 20}}}
                    rightComponent={{
                        icon: 'delete', color: '#000000', paddingRight: 15, size: 25, onPress: () => confirmDelete()
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


                <Pressable onPress={onButtonToggle}>
                    <View pointerEvents="none">
                        <TextInput
                            value={rDate.toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                            style={styles.input}
                            onChangeText={rTest = rDate.toString()}

                            mode="outlined"
                            theme={{colors: {primary: '#000000'}}}
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    </View>
                </Pressable>

                <SafeAreaView style={isDisplayDate ? styles.testContainer : 0}>
                    {isDisplayDate && (
                        <RNDateTimePicker
                            value={rDate}
                            mode="date"
                            onChange={changeSelectedDate}
                            display="spinner"
                            style={{
                                height: 100,
                                width: 375,
                                marginLeft: 20,
                            }}
                        />
                    )}
                </SafeAreaView>


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

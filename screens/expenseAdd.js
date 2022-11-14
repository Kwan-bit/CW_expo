import {useState} from "react";
import {
    Alert,
    Keyboard,
    Pressable, SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {Header} from "@rneui/themed";
import {TextInput} from 'react-native-paper';
import {expenseCreate} from "../SQLiteHelper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from "@react-navigation/native";

const CreateExpense = ({route}) => {
    const {trip_id} = route.params;

    const navigation = useNavigation();
    const [items, setItems] = useState([
        {
            label: "Food",
            value: "Food",
        },
        {
            label: "Transport",
            value: "Transport",
        },
        {
            label: "Travel",
            value: "Travel",
        },
    ]);

    const onCreate = () => {
        if (exAmount.trim().length !== 0 && exType.trim().length !== 0) {
            try {
                expenseCreate({trip_id, exAmount, exType, exTime});
                expenseAmount("");
                expenseType("");
                tempTime(new Date())
                expenseTime("")
                navigation.navigate('Switch', {
                    screen: "Expense",
                    params: {
                        trip_id
                    },
                });
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert('Empty field', 'Please fill all requested field!');
        }
    }
    const [exAmount, expenseAmount] = useState('');
    const [exType, expenseType] = useState('');
    const [tTime, tempTime] = useState(new Date());
    let [exTime, expenseTime] = useState('');

    const [showDropDown, setShowDropDown] = useState(false);
    const [isDisplayDate, setShow] = useState(false);
    const changeSelectedDate = (event, selectedDate) => {

        const currentDate = selectedDate || new Date(tTime);
        tempTime(currentDate);
    };

    const onButtonToggle = () => {
        setShow(isDisplayDate !== true);
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <View style={styles.container}>
                <Header
                    centerComponent={{text: 'Create Trip', style: {color: '#000000', fontSize: 20}}}
                    containerStyle={{
                        backgroundColor: '#ffffff',
                        justifyContent: 'space-around',
                    }}
                />

                <SafeAreaView style={showDropDown === true ? styles.drop : styles.input}>
                    <DropDownPicker
                        open={showDropDown}
                        setOpen={setShowDropDown}
                        items={items}
                        value={exType}
                        showDropDown={() => setShowDropDown(true)}
                        onDismiss={() => setShowDropDown(false)}

                        setValue={expenseType}
                        setItems={setItems}

                        multiple={false}

                        // list={typeList}
                    />
                </SafeAreaView>

                <TextInput
                    value={exAmount.replace(/[^0-9]/g, '')}
                    style={styles.input}
                    onChangeText={expenseAmount}
                    label={
                        <Text>
                            Amount <Text style={{color: 'red'}}>*</Text>
                        </Text>
                    }
                    placeholder='Amount'
                    mode="outlined"
                    theme={{colors: {primary: '#000000'}}}
                />

                <Pressable onPress={onButtonToggle}>
                    <View pointerEvents="none">
                        <TextInput
                            value={tTime.toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                            style={styles.input}
                            onChangeText={exTime = tTime.toString()}

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
                            value={tTime}
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


                <Pressable
                    onPress={onCreate}
                    style={({pressed}) => [
                        {backgroundColor: pressed ? '#4f4f4f' : 'black'},
                        styles.button
                    ]}>
                    <Text style={styles.text}>Add Expense</Text>
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
    drop: {
        height: 50,
        backgroundColor: "#ffffff",
        marginTop: 30,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 120,
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

export default CreateExpense;

import {useState} from "react";
import {
    Keyboard,
    Pressable, SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {CheckBox, Header} from "@rneui/themed";
import {TextInput} from 'react-native-paper';
import {tripCreate} from "../SQLiteHelper";
import {useNavigation} from "@react-navigation/native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const CreateTrip = () => {
    const navigation = useNavigation();

    const onCreate = () => {
        try {
            tripCreate({tName, tDestination, test, tRisk, tDescription});
            tempName("");
            tempDestination("");
            tempDate(new Date())
            testDate("")
            tempRisk("");
            tempDescription("")
            navigation.navigate('List')
        } catch (error) {
            console.log(error)
        }
    }

    const [tName, tempName] = useState('');
    const [tDestination, tempDestination] = useState('');
    const [tDate, tempDate] = useState(new Date());
    let [test, testDate] = useState(' ');
    const [tRisk, tempRisk] = useState('');
    const [tDescription, tempDescription] = useState('');

    const [isDisplayDate, setShow] = useState(false);

    const changeSelectedDate = (event, selectedDate) => {

        const currentDate = selectedDate || new Date(tDate);
        tempDate(currentDate);
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


                <TextInput
                    value={tName}
                    style={styles.input}
                    onChangeText={tempName}
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
                    value={tDestination}
                    style={styles.input}
                    onChangeText={tempDestination}
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
                            value={tDate.toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                            style={styles.input}
                            onChangeText={test = tDate.toString()}

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
                            testID="dateTimePicker"
                            value={tDate}
                            mode="date"
                            is24Hour={true}
                            format={{day: 'numeric', month: 'long', year: 'numeric'}}
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
                        checked={tRisk === 'Yes'}
                        onPress={() => tempRisk('Yes')}
                        tintColors={{true: '#F15927', false: 'black'}}
                        containerStyle={{backgroundColor: 'transparent'}}
                        uncheckedIcon='circle-o'
                        style={styles.input}
                    />
                    <CheckBox
                        center
                        title='No'
                        checkedIcon='dot-circle-o'
                        checked={tRisk === 'No'}
                        onPress={() => tempRisk('No')}
                        containerStyle={{backgroundColor: 'transparent'}}
                        uncheckedIcon='circle-o'
                        style={styles.input}
                    />
                </View>

                <TextInput
                    value={tDescription}
                    style={styles.inputDes}
                    onChangeText={tempDescription}
                    label='Description'
                    placeholder='Description'
                    multiline={true}
                    numberOfLines={5}
                    mode="outlined"
                    theme={{colors: {primary: '#000000'}}}
                />

                <Pressable
                    onPress={onCreate}
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

export default CreateTrip;

import React, {useRef, useState} from 'react';
import {Animated, Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import plus from '../assets/plus.png'
import edit from '../assets/edit.png'
import {FontAwesome5} from '@expo/vector-icons'
import TripList from "../screens/tripList";
import {tripTestData} from "../SQLiteHelper";
import CreateTrip from "../screens/tripAdd";
import SearchTrip from "../screens/tripSearch";
import EditTrip from "../screens/tripEdit";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}>
            <Stack.Screen name="List" component={TripList}/>
            <Stack.Screen name="Edit" component={EditTrip}/>
        </Stack.Navigator>
    );
}

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>)

const Tabs = () => {
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                style: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 40,
                    marginHorizontal: 20,
                    height: 60,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {width: 10, height: 10},
                    paddingHorizontal: 20,
                }
            }}
        >
            <Tab.Screen
                name={"Switch"}
                component={MyStack}
                options={{
                    initialRouteName: 'List',
                    tabBarIcon: ({focused}) => (
                        <View style={{
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="list"
                                size={20}
                                color={focused ? 'red' : 'gray'}
                            ></FontAwesome5>
                        </View>)
                }} listeners={({navigation, route}) => ({
                tabPress: e => {
                    Animated.spring(tabOffsetValue, {
                        toValue: 0, useNativeDriver: true
                    }).start();
                }
            })}
            />

            <Tab.Screen
                name={"Add"}
                component={CreateTrip}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) =>
                        (
                            <Image
                                source={plus}
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: '#ffffff',
                                }}
                            />
                        ),
                    tabBarButton: (props) =>
                        (
                            <CustomTabBarButton {...props}/>
                        )
                }}
            />

            <Tab.Screen
                name={"Search"}
                component={SearchTrip}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="search"
                                size={20}
                                color={focused ? 'red' : 'gray'}
                            ></FontAwesome5>
                        </View>)
                }}
                listeners={({navigation, route}) => (
                    {
                        tabPress: e => {
                            Animated.spring(tabOffsetValue, {
                                toValue: getWidth(), useNativeDriver: true
                            }).start();
                        }
                    })}/>
        </Tab.Navigator>);

}

function getWidth() {
    let width = Dimensions.get("window").width
    width = width - 80
    return width / 5
}

// fast send test data
function EmptyScreen() {
    return (
        <Pressable
            style={styles.button2}
            onPress={tripTestData}>
            <Text style={styles.text}>Test</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow: {
        shadowColor: '#1c032b',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    button2: {
        width: 325,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        marginTop: 100
    },
});

export default Tabs;
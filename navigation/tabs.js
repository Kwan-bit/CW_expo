import {StatusBar} from 'expo-status-bar';
import React, {useRef} from 'react';
import {Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import plus from '../icons/plus.png'
import {FontAwesome5} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) => (<TouchableOpacity
        style={{
            top: -30, justifyContent: 'center', alignItems: 'center', ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70, height: 70, borderRadius: 35, backgroundColor: '#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>)

const Tabs = () => {
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    return (<Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false, headerShown: true, style: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 40,
                    marginHorizontal: 20,
                    height: 60,
                    borderRadius: 10,

                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {
                        width: 10, height: 10
                    },
                    paddingHorizontal: 20,
                }
            }}
        >
            <Tab.Screen name={"Home"} component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (<View style={{
                    position: 'absolute', top: 20
                }}>
                    <FontAwesome5
                        name="home"
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
            })}/>

            <Tab.Screen name={"Search"} component={SearchScreen} options={{
                tabBarIcon: ({focused}) => (<View style={{
                    position: 'absolute', top: 20
                }}>
                    <FontAwesome5
                        name="search"
                        size={20}
                        color={focused ? 'red' : 'gray'}
                    ></FontAwesome5>
                </View>)
            }} listeners={({navigation, route}) => ({
                tabPress: e => {
                    Animated.spring(tabOffsetValue, {
                        toValue: getWidth(), useNativeDriver: true
                    }).start();
                }
            })}/>

            <Tab.Screen name={"ActionButton"} component={EmptyScreen} options={{
                tabBarIcon: ({focused}) => (


                    <Image source={plus} style={{
                        width: 30, height: 30, tintColor: '#ffffff',
                    }}
                    />), tabBarButton: (props) => (<CustomTabBarButton {...props}/>)
            }}
            />

            <Tab.Screen name={"Notifications"} component={NotificationScreen} options={{
                tabBarIcon: ({focused}) => (<View style={{
                    position: 'absolute', top: 20
                }}>
                    <FontAwesome5
                        name="bell"
                        size={20}
                        color={focused ? 'red' : 'gray'}
                    ></FontAwesome5>
                </View>)
            }} listeners={({navigation, route}) => ({
                tabPress: e => {
                    Animated.spring(tabOffsetValue, {
                        toValue: getWidth() * 3, useNativeDriver: true
                    }).start();
                }
            })}/>

            <Tab.Screen name={"Settings"} component={SettingsScreen} options={{
                tabBarIcon: ({focused}) => (<View style={{
                    position: 'absolute', top: 20
                }}>
                    <FontAwesome5
                        name="user-alt"
                        size={20}
                        color={focused ? 'red' : 'gray'}
                    ></FontAwesome5>
                </View>)
            }} listeners={({navigation, route}) => ({
                tabPress: e => {
                    Animated.spring(tabOffsetValue, {
                        toValue: getWidth() * 4, useNativeDriver: true
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

function EmptyScreen() {
    return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    </View>);
}

function SettingsScreen() {
    return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
    </View>);
}

function HomeScreen() {
    return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
    </View>);
}

function NotificationScreen() {
    return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Notifications!</Text>
    </View>);
}

function SearchScreen() {
    return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Search!</Text>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    }, shadow: {
        shadowColor: '#1c032b', shadowOffset: {
            width: 0, height: 10,
        }, shadowOpacity: 0.25, shadowRadius: 3.5, elevation: 5
    }
});

export default Tabs;
import React from "react";
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { useNavigation } from "@react-navigation/native";

export default function CustomDrawer(props) {

    const navigation = useNavigation();
    


    const handleLogout = () => {
        fetch('http://192.168.1.42:19001/logout', {
            method: 'POST',
        })
        .then(() => {
            // Perform any necessary cleanup or redirect logic after logout
            // For example, you can navigate the user to the login screen
            navigation.navigate('Login');
        })
        .catch((error) => {
            // Handle any errors that occur during the logout process
            console.error('Logout error:', error);
        });
    };


    return(
        <View style={{flex:1,backgroundColor:'black'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            
                          
                        </View>
                    </View>

                    <View style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color='orange'
                                size={size}
                                />
                            )}
                            label="Map"
                            labelStyle={{ color: 'orange' }}
                            inactiveBackgroundColor='#808080'

                           
                            onPress={() => {props.navigation.navigate('Map')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={'orange'}
                                size={size}
                                />
                            )}
                            label="Summary"
                            labelStyle={{ color: 'orange' }}
                            inactiveBackgroundColor='#808080'

                            onPress={() => {props.navigation.navigate('Summary')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={'orange'}
                                size={size}
                                />
                            )}
                            label="New Form"
                            labelStyle={{ color: 'orange' }}
                            inactiveBackgroundColor='#808080'

                            onPress={() => {props.navigation.navigate('NewForm')}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="information-outline" 
                                color={'orange'}
                                size={size}
                                />
                            )}
                            label="About"
                            labelStyle={{ color: 'orange' }}
                            inactiveBackgroundColor='#808080'

                            onPress={() => {props.navigation.navigate('About')}}
                        />
                        <View style={styles.bottomDrawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                    name="logout" 
                                    color={'orange'}
                                    size={size}
                                />
                            )}
                            label="Logout"
                            labelStyle={{ color: 'orange' }}
                            inactiveBackgroundColor='#808080'
                            
                            onPress={handleLogout}
                        />
                        <Text style={styles.footerText}>© 2023 SSP. All rights reserved.</Text>
        
                    </View>
                    </View>
                </View>
            </DrawerContentScrollView>    
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      backgroundColor:'black',
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginTop:450,
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    footerText: {
        marginTop: 5,
        marginLeft:5,
        fontSize: 12,
        color: '#808080',
        paddingRight:1,
        textAlign:"center",

      },
  });



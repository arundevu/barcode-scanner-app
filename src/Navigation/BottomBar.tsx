import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartShopping,faBarcode } from "@fortawesome/free-solid-svg-icons";
import Barcode from "../Page/BarCode";
import Cart from "../Page/Cart";
import { NavigationContainer } from "@react-navigation/native";
{/* <FontAwesomeIcon icon={faCartShopping} /> */}
{/* <FontAwesomeIcon icon={faBarcode} /> */}
const BottomBar=()=>{
    const Tab = createMaterialBottomTabNavigator();
    const bottombarDatas = [
      { iconName: "Home", icon: faBarcode, screenName: Barcode },
      { iconName: "Bookmark", icon: faCartShopping, screenName: Cart },
     
    ];

    return(

        <Tab.Navigator
        initialRouteName="Home"
        activeColor={'white'}
        barStyle={{ backgroundColor: 'red' }}
        labeled={false}
      >
        {bottombarDatas.map((res, i) => {
          return (
            <Tab.Screen
              key={i}
              name={res.iconName}
              component={res.screenName}
              options={{
                tabBarLabel: "",
                tabBarIcon: ({ focused }) => (
                  <FontAwesomeIcon
                    icon={res.icon}
                    size={24}
                    // color={focused ? COLORS.yellow01 : COLORS.light}
                    color={'yellow'}
                  />
                ),
              }}
            />
          );
        })}
      </Tab.Navigator>
    )
}

export default BottomBar;
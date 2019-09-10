import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

const DashboadCard = (props) => {
    return (        
        <TouchableOpacity onPress={props.onPress}
        style={{ flex: 1, margin: "20%", backgroundColor: "rgba(250, 250, 250, 0.5)", borderRadius: 15, justifyContent: "space-around", elevation: 2 }} >
         <View style={{ alignItems:"center" }} >
           <Image source={props.img} style={{ width: "50%", resizeMode: "contain" }} />
         </View>
         <View style={{ alignItems:"center" }} >
           <Text style={{ color:"#FFF", fontSize: 18, fontWeight:"bold", padding: 3 }} >{props.title}</Text>
           <Text style={{ color:"#FFF", fontSize: 16, padding: 3 }} >{props.newUpdates} New updates</Text>
         </View>
       </TouchableOpacity>
    );
}

export default DashboadCard;
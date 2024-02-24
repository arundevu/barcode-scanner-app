import { Input } from "native-base";
import { Text, View, StyleSheet } from "react-native";

export const Inputs = (props:any) =>{
    return<Input style={styles.input}  value={props?.value} onChangeText={(e)=>{
        props.handleChange(e ,props?.name)}}    />
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
    },
    input:{
        borderWidth:0.5,
    }
  });
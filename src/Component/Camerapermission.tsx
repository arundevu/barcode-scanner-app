// import { CameraView, Camera } from "expo-camera/next";
import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TextInput, Modal } from "react-native";
import { BottomSheet, Button, ListItem } from "@rneui/themed";
import { Inputs } from "./Input";
import { GetProduct } from "../Redux/GetProduct";
import { Select } from "native-base";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CameraPermission(props: any) {

    const dispatch = useDispatch();
  const [service, setService] = React.useState<any>();
  const [pop, setPop] = React.useState<any>('');
  const [inputData, setInputData] = React.useState({
    name: "",
    price: "",
    gst: "",
    qty:1
  });

  const selectionData = [{ text: "2%" }, { text: "6%" }, { text: "8%" }];

  const [items, setItems] = useState<any>([]);
  const [scanned,setScanned] = useState<any>();
  const [isScan,setIsScan] = useState<any>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const[popClose , setPopClode] = useState<any>(false)
  
  const handleBarCodeScanned = async ({ type, data }: any) => {
    AsyncStorage.getItem("scanned").then((res)=>{
        console.log(res ,'ressssssssss afterrrrrrr');
            if(res == null){
                setPop('')
            }else{
                setPop(res)
            }
        });
        AsyncStorage.getItem("pop").then((res)=>{
            console.log(res , 'Popopopopopop');
            
        if(res != 'true'){
            AsyncStorage.setItem("scanned",'scanned')
        }
    })

    setItems([data]);
    setIsVisible(true);
        setScanned(true);
        setModalVisible(true);
   
  };
  // variables
  const [isVisible, setIsVisible] = useState(false);
  const handleChange = (e: any,name:any) => {
    switch (name) {
        case 'name':
            setInputData({...inputData ,name:e})
            break;
        case 'price':
            setInputData({...inputData ,price:e})
            break;
        case 'gst':
            setInputData({...inputData ,gst:e})
            break;
    
        default:
            break;
    }
  };
  const handleAddCart = async() => {
   

    dispatch(GetProduct(inputData))
    props.setShowScanner(false);
    setScanned(false)
    setIsScan(false)
  };

  const showAlertMsg = () =>{}
  const handlePop=()=>{
    AsyncStorage.removeItem("scanned");
    setModalVisible(false)
    setIsVisible(true)
    props.setShowScanner(false);
    props.setScanned(false);
    setPopClode(true)
    AsyncStorage.setItem("pop",'true');
  }
  return (
    <View style={styles.container}>
      {!isVisible && (
        <Camera
          onBarCodeScanned={props.scanned ? undefined : handleBarCodeScanned}
          barCodeScannerSettings={{ barCodeTypes: ["qr", "pdf417"] }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
     {pop == '' ? <BottomSheet modalProps={{}} isVisible={isVisible}>
        {items.map((l: any, i: any) => (
          <>
            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: 12,
                paddingVertical: 10,
              }}
            >
              <View>
                <View>
                  <Text>Name:</Text>
                </View>
                <View>
                  <Inputs value={inputData.name} name={'name'} setInputData={setInputData} handleChange={handleChange} />
                </View>
              </View>
              <View>
                <View>
                  <Text>Price:</Text>
                </View>
                <View>
                  <Inputs value={inputData?.price} name={'price'} setInputData={setInputData} handleChange={handleChange} />
                </View>
              </View>
              <View style={{ marginBottom: 10 }}>
                <View>
                  <Text>Gst:</Text>
                </View>
                <View>
                  <Select
                    key={props.keys}
                    selectedValue={service}
                    placeholder={"gst"}
                    mt={1}
                    onValueChange={(itemValue) => handleChange(itemValue ,'gst')}
                    borderWidth={0.5}
                  >
                    {selectionData.map((data: any, index: any) => {
                      return (
                        <Select.Item
                          key={index}
                          label={data.text}
                          value={data.text}
                        />
                      );
                    })}
                  </Select>
                </View>
              </View>
              <Button
                style={{ marginVertical: 10 }}
                onPress={handleAddCart}
              >
                Add to Cart
              </Button>
            </View>
          </>
        ))}
      </BottomSheet> : 
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want scan again ?</Text>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'60%'}}>
            <Button title="Close" onPress={() =>{
                AsyncStorage.removeItem("scanned");
                setIsVisible(true)
                setModalVisible(false)}} />
            <Button title="Ok" onPress={handlePop}/>
            </View>
          </View>
        </View>
      </Modal>
      
      } 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

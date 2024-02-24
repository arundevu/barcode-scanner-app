import React, { useEffect, useState } from "react";
import { View,StyleSheet,Text, TextInput, Button, Modal } from "react-native";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { DelProduct, GetProduct } from "../Redux/GetProduct";

const Cart =()=>{
    const data:any[] = []
    const[cartData ,setCartData] = useState<any>([])
    const[sampleCartData ,setSampleCartData] = useState<any>([])
    const [number, setNumber] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [index, setIndex] = useState<any>();
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const product = useSelector((state: any) => {
            return state.data.product;
    });
    useEffect(() => {
        const totalPrice = product.reduce((accumulator, currentItem) => {
            const price = parseFloat(currentItem.price);
            const gstPercentage = parseFloat(currentItem.gst.replace('%', '')) / 100;
            const totalPriceWithGST = price * (1 + gstPercentage);
            return accumulator + totalPriceWithGST;
          }, 0);
          setTotal(totalPrice);
            setCartData(product)
            setSampleCartData(product);
    }, [product]);

    useEffect(()=>{
        const totalPrice = cartData.reduce((accumulator, currentItem) => {
            const price = parseFloat(currentItem.price);
            const gstPercentage = parseFloat(currentItem.gst.replace('%', '')) / 100;
            const totalPriceWithGST = price * (1 + gstPercentage);
            return accumulator + totalPriceWithGST;
          }, 0);
          setTotal(totalPrice);
    },[quantity])

    const handleIncrement = (i: any) => {
       
        const updatedData = cartData.map((item, index) => {
            if (index === i) {
                const updatedItem = {...item}; 
                updatedItem.qty += 1;
                updatedItem.price = parseFloat(sampleCartData[i].price) * updatedItem.qty;
                return updatedItem;
            }
            return item;
        });
        console.log(updatedData ,'updatedData');
        
        setCartData(updatedData);
        setQuantity(quantity + 1)
        
    };

  const handleDecrement = (i:any) => {
    setQuantity(quantity - 1)
    const updatedData = cartData.map((item, index) => {
        if (item.qty > 1) {
            if (index === i) {
                const updatedItem = {...item}; 
                updatedItem.qty -= 1;
                updatedItem.price = parseFloat(sampleCartData[i].price) * updatedItem.qty;
                return updatedItem;
            }
          }else{
              setModalVisible(true)
          }
      
        return item;
    });
    console.log(updatedData ,'updatedData deccc');
    
    setCartData(updatedData);
   
    setIndex(i)
  };

  
  
    return(
        <View style={styles.container}>
            {cartData.length !=0
             && cartData.map((res,i)=>{
                return<View key={i} style={styles.list}>
                    <View style={styles.content1}>
                    <Text style={styles.listText}>Name : {res.name}</Text>
                    <Text style={styles.listText}>price : {res.price}</Text>
                    </View>
                    <View style={styles.content2}>
                    <Button title="-" onPress={()=>handleDecrement(i)} />
                    <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setQuantity(parseInt(text) || 0)}
          value={String(res.qty)}
        />
         <Button title="+" onPress={()=>handleIncrement(i)} />
                        </View>
                    </View>
            })}
              <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want remove this item ?</Text>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'60%'}}>
            <Button title="Close" onPress={() => setModalVisible(false)} />
            <Button title="Ok" onPress={() => {
              const data =  cartData.filter((res ,ind)=> ind != index )
              console.log(data ,'datasssss beffff');
                 dispatch(DelProduct(data))
                setModalVisible(false)} 
        }/>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <Text>Total with GST: {total}</Text>
      </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        paddingVertical:40,
        paddingHorizontal:10
    },
    list:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:"green",
        padding:8,
        borderRadius:10,
        marginVertical:10
    },
    listText:{
        color:'white'
    },
    content1:{
        width:'60%'
    },
    content2:{
        display:'flex',
        flexDirection:'row',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      input: {
        height: 40,
        width: 60,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        marginHorizontal: 10,
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
})

export default Cart;
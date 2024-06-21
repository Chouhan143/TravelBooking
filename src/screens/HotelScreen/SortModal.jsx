import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React,{useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors,SF,SH,SW } from '../../utils';
import RadioButtonGroup from '../../components/commonComponents/RadioButtonGroup';
const SortModal = ({setModalVisible}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { id: 1, label: 'our top picks' },
        { id: 2, label: 'price (lowest first) ' },
        { id: 3, label: 'property rating and price' },
        { id: 4, label: 'best reviewed & lowest price ' },
        { id: 5, label: 'distance from downtown ' },
        { id: 6, label: 'top reviewed' },
        { id: 7, label: 'homes & apartments first ' },
    ];

  return (
    <View>
    <TouchableOpacity onPress={() =>setModalVisible(false)}>
    <Entypo name={'cross'} color={Colors.theme_background} size={30} style={{alignSelf:'flex-end'}}/>
   </TouchableOpacity>
      <Text style={{color:'black',fontFamily:'Poppins-Bold',fontSize:SF(15)}}>Sort by</Text>
      <View style={{marginTop:SH(20),marginBottom:SH(65)}}>
      {options.map(option => (
        <RadioButtonGroup
            key={option.id}
            label={option.label}
            selected={selectedOption === option.id}
            onPress={() => setSelectedOption(option.id)}
            
        />
    ))}
      </View>
    </View>
  )
}

export default SortModal

const styles = StyleSheet.create({})
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity,ActivityIndicator } from "react-native";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import { SH, SF } from "../../utils";
import { HelpScreenStyles } from "../../styles";
import { Spacing } from "../../components";
import { KeyboardAvoidingView } from "react-native";
import { FAQ } from '../../../utils/BaseUrl';
const FAQScreen = () => {
  const { Colors } = useTheme();
  const navigation = useNavigation();
  const HelpScreenStyle = HelpScreenStyles(Colors);
  const [faqData, setFaqData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading,setLoading]=useState('');
  const FAQ = async () => {
    try {
      const res = await axios.get("https://sajyatra.sajpe.in/admin/api/get-faq");
      const content = res.data.data[0].content;
      parseFAQContent(content);
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    }
  };

  const parseFAQContent = (content) => {
    const parsedData = [];
    const cleanContent = content.replace(/&nbsp;/g, ' ').replace(/<br>/g, ''); 
    const lines = cleanContent.split("<p>");

    let currentQuestion = "";
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(/<\/?[^>]+(>|$)/g, "").trim();

      if (line.endsWith("?")) {
        if (currentQuestion) {
          parsedData.push({ question: currentQuestion, answer: "" });
        }
        currentQuestion = line;
      } else if (currentQuestion && line !== "") {
        parsedData.push({ question: currentQuestion, answer: line });
        currentQuestion = "";
      }
    }

    if (currentQuestion) {
      parsedData.push({ question: currentQuestion, answer: "" });
    }

    setFaqData(parsedData);
  };

  useEffect(() => {
    FAQ();
  }, []);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.theme_background} />
      </View>
    );
  }

  return (
    
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ display: "flex", flexDirection: "row", marginLeft: SH(20), marginVertical: SH(15) }}>
        <Entypo name={"menu"} color={Colors.theme_background} size={35} onPress={() => navigation.navigate("Root")} />
        <Text style={{ color: Colors.theme_background, fontSize: SF(25) }}>FAQ</Text>
      </View>
      <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20 }}>
        <KeyboardAvoidingView enabled>
          {faqData.map((item, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => handleToggle(index)} style={{ flex: 1 }}>
                  <Text style={{ color: Colors.theme_background, fontSize: SF(18), fontFamily: 'Poppins-Medium' }}>
                    {item.question}
                  </Text>
                </TouchableOpacity>
                <Entypo
                  name={expandedIndex === index ? "chevron-thin-up" : "chevron-thin-down"}
                  size={20}
                  color={Colors.theme_background}
                  onPress={() => handleToggle(index)}
                  style={{marginTop:-SH(15)}}
                />
              </View>
              {expandedIndex === index && (
                <Text style={{ color: "black", fontSize: SF(16), fontFamily: 'Poppins-Regular' }}>
                  {item.answer}
                </Text>
              )}
            </View>
          ))}
          <Spacing space={SH(30)} />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default FAQScreen;



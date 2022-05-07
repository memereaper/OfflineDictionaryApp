import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Dictionary from '../database'

export default class App extends React.Component {
    getWord=(word)=>{
        var searchKeyword=word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
        return fetch(url)
        .then((data)=>{
            if(data.status==200)
            {
            return data.json()
            }
            else
            {
                return null
            }
        
        })
        .then((response)=>{
            var responseObject=response

            if(responseObject)
            {
                var wordData = dictionary[text]["word"]
                var definition=dictionary[text]["definition"]
                var lexicalCategory = dictionary[text]["lexicalCategory"]

                this.setState({
                    "word":wordData,
                    "definition":definition,
                    "lexicalCategory":lexicalCategory
                })
            }
            else{
                this.setState({
                    "word":this.setState.text,
                    "definition":"Not Found",
                })
            }
        })
    }
    constructor() {
      super();
      this.state = {
        text: '',
        displayText: '',
      };
    }
    render() {
        <View style={styles.detailContainer}>
            <Text style={styles.detailsTitle}>
                Word:{" "}
            </Text>
        </View>
      return (
          <SafeAreaProvider>
            <TextInput
              style={styles.inputBox}
              onChangeText={(text) => {
                this.setState({ text: text,isSearchPressed:false,
                word:"Loading...",
                lexicalCategory:'',
                 examples:[],
                 definition: ""});
              }}
              value={this.state.text}
            />
            <TouchableOpacity
                style={styles.goButton}
                onPressed={()=>{
                    this.setState({isSearchPressed=true});
                    this.getWord(this.state.text)
                }}
                >
            </TouchableOpacity>
          </SafeAreaProvider>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#b8b8b8',
    },
    inputbox: {
      marginTop: 100,
      width: '80%',
      alignSelf: 'center',
      textAlign: 'center',
      height: 40,
      borderWidth: 4,
      outline: 'none',
    },
    goButton: {
      width: '50%',
      height: 55,
      alignSelf: 'center',
      padding: 10,
      margin: 10,
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 30,
      fontSize: 'bold',
    },
    displayText: {
      textAlign: 'center',
      fontSize: 30,
    },
  });
  
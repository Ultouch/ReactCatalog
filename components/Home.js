import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Product from '../models/Product';

const Home = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
        return () => {
        };
    }, [isFocused]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/product/getall');
            const json = await response.json();
            setData([]);
            for(let i in json['products']){
                let product = new Product();
                product.set(json['products'][i]);
                setData((prevData) => [...prevData, product]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (id) => {
        navigation.navigate('edit', { id: id });
    };

    const handleDelete = (id) => {
        fetch('http://localhost:8080/product/deleteproduct/' + id, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((responseData) => {
            fetchData();
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item}) => 
                    <View style={styles.content}>
                        <View style={styles.content_1}>
                            <Text>{item.code} {item.label} </Text>
                        </View>
                        <View style={styles.content_2}>
                            <TouchableOpacity style={styles.button} onPress={() => handleEdit(item.id)}>
                                <Text style={styles.buttonText}>EDIT</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.content_2}>
                            <TouchableOpacity style={styles.button1} onPress={() => handleDelete(item.id)}>
                                <Text style={styles.buttonText}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    content: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    content_1: {
        width: '50%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
    },
    content_2: {
        width: '20%',
        height: '100%',
        paddingLeft: 5,
    },
    button: {
        backgroundColor: 'green',
        width: '100%',
        height: '100%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button1: {
        backgroundColor: 'red',
        width: '100%',
        height: '100%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
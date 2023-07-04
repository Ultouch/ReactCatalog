import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useIsFocused } from '@react-navigation/native';
import Product from '../models/Product';

const Edit = () => {
    const route = useRoute();
    const isFocused = useIsFocused();
    const { id } = route.params;
    const [product, setProduct] = useState(new Product());

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
        return () => {
        };
    }, [isFocused]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/product/getproduct/' + id);
            const json = await response.json();
            setProduct((prevData) => ({
                ...prevData,
                id: json['product']['id'],
                code: json['product']['code'],
                label: json['product']['label'],
                price: json['product']['price']
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleProductChange = (key, value) => {
        setProduct((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        fetch('http://localhost:8080/product/editproduct', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        .then((response) => response.json())
        .then((responseData) => {
            navigation.navigate('home');
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Code"
                value={product.code}
                onChangeText={(text) => handleProductChange('code', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Label"
                value={product.label}
                onChangeText={(text) => handleProductChange('label', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={product.price}
                onChangeText={(text) => handleProductChange('price', text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>EDIT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 15,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
    },
    button: {
        backgroundColor: 'green',
        width: '100%',
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Edit;
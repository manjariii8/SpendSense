import React from 'react';

import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default function PrimaryButton({
    title,
    onPress,
}) {

    return (

        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
        >

            <LinearGradient
                colors={['#7C3AED', '#A78BFA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
            >

                <Text style={styles.text}>
                    {title}
                </Text>

            </LinearGradient>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    button: {
        paddingVertical: 18,

        borderRadius: 18,

        marginBottom: 18,

        alignItems: 'center',
    },

    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
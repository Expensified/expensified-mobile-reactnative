import React from "react"
import {
    View,
    Text,
    Button,
    StyleSheet
} from "react-native"

export default function DashboardContainer(props) {
    return (
        <View style={styles.container}>
            <Text>Hello World!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    }
})
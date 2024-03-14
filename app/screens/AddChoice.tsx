import { useState } from "react"
import { Button, Modal, StyleSheet, View } from "react-native"
import Dashboard from "./Dashboard"

const AddChoice = (props) => {

  return (

    <>
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.modalPage}>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Add Task" onPress={props.onAddTask} />
                </View>
                <View style={styles.button}>
                    <Button title="Add Category" onPress={() => {}} />
                </View>
                <View style={styles.button}>
                    <Button title="Cancel" onPress={props.onCancel} />
                </View>
            </View>
            </View>
        </Modal>
    </>
  )
}
export default AddChoice

const styles = StyleSheet.create({
    modalPage: {
        padding: 50,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        opacity: 0.7,
        height: '100%',
    },
    buttonContainer: {
        marginTop: 16,
        alignItems: 'center',
      },
    button: {
        width: 100,
        marginHorizontal: 8,
        fontSize: 50,
      },
})


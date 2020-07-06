import React, {useEffect, useState} from  'react'
import {SafeAreaView, FlatList, Text, StyleSheet, StatusBar} from 'react-native'

import api from './services/api'

export default function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        })
    }, [])
    return (
        <>
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={style.container}>
                <FlatList
                          data = {projects}
                          keyExtractor={project => project.id}
                          renderItem = {({item}) => (
                              <Text style={style.project}>{item.title}</Text>
                          )}
                />
            </SafeAreaView>


        </>
        )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#7159c1',
        flex: 1,

    },
    project: {
        color: '#fff',
        fontSize: 20
    }
})

// @ts-nocheck
import React from 'react'

import codePush from 'react-native-code-push'
import App from '../App'
import ColorCodeHelper from "../theme/ColorCodeHelper";
import * as SplashScreen from 'expo-splash-screen';
import {UpdateScreen} from "./UpdateScreen";

export class CodePushWrapperNative extends React.Component {
    static isSyncingFinished(status) {
        return (
            status === codePush.SyncStatus.UP_TO_DATE ||
            status === codePush.SyncStatus.UPDATE_INSTALLED
        )
    }

    static getStatusMessage(status) {
        switch (status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                return 'Checking for updates.'
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                return 'Downloading package.'
            case codePush.SyncStatus.INSTALLING_UPDATE:
                return 'Installing update.'
            case codePush.SyncStatus.UP_TO_DATE:
                return 'Up-to-date.'
            case codePush.SyncStatus.UPDATE_INSTALLED:
                return 'Update installed.'
            default:
                return `Unkown Status: ${status}`
        }
    }

    constructor(props) {
        super(props)
        this.placeholder = 'placeholder'
        this.state = {
            status: codePush.SyncStatus.CHECKING_FOR_UPDATE,
            receivedBytes: 0,
            totalBytes: 0,
            initialColorMode: null,
        }
    }

    async componentDidMount() {
        let initialColorMode = await ColorCodeHelper.getColorModeFromStorage();
        await this.setState({
            initialColorMode: initialColorMode
        });
        SplashScreen.hideAsync();
    }

    async setStatus(status) {
        console.log(CodePushWrapperNative.getStatusMessage(status))
        await this.setState({
            status,
        })
    }

    /**
     * Implementing
     * https://github.com/microsoft/react-native-code-push/blob/master/docs/api-js.md
     */
    async codePushStatusDidChange(status) {
        await this.setStatus(status)
    }

    /**
     * Implementing
     * https://github.com/microsoft/react-native-code-push/blob/master/docs/api-js.md
     */
    async codePushDownloadDidProgress(progress) {
        const { receivedBytes } = progress
        const { totalBytes } = progress
        console.log(`${receivedBytes} of ${totalBytes} received.`)
        await this.setState({
            receivedBytes,
            totalBytes,
        })
    }

    render() {
        if (CodePushWrapperNative.isSyncingFinished(this.state.status) && !!this.state.initialColorMode) {
            return <App initialColorMode={this.state.initialColorMode} />
        } else {
            return <App initialColorMode={this.state.initialColorMode} >
                <UpdateScreen receivedBytes={this.state.receivedBytes} totalBytes={this.state.totalBytes} status={this.state.status} initialColorMode={this.state.initialColorMode} />
            </App>
        }
    }
}

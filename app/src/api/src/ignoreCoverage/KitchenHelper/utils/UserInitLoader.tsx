// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {View,Text} from 'native-base';
import {ConfigHolder} from "../ConfigHolder";
import {useSynchedJSONState} from "../synchedstate/SynchedState";
import {RequiredStorageKeys} from "../storage/RequiredStorageKeys";
import ServerAPI from "../ServerAPI";

export const UserInitLoader = (props) => {

  console.log("UserInitLoader Component")

  const [userLocalSaved, setUser] = useSynchedJSONState(RequiredStorageKeys.USER);
  const [syncedUser, setSyncedUser] = useState({});

  const [serverInfoLocalSaved, setServerInfo] = useSynchedJSONState(RequiredStorageKeys.SERVER_INFO);
  const [syncedServerInfo, setSyncedServerInfo] = useState({});



  const configHolderUser = ConfigHolder.instance.getUser();

  async function load(){
    console.log("UserInitLoader load")
    let serverStatus = await loadServerInfo();
    let isOffline = !serverStatus;
    console.log("isOffline: "+isOffline)
    await ConfigHolder.instance.setState({offline: isOffline});
    if(!isOffline){
      let userRemote = await ConfigHolder.instance.loadUser();
      setUser(userRemote);
      setSyncedUser(userRemote);

      setServerInfo(serverStatus)
      setSyncedServerInfo(serverStatus)
    } else {
      ServerAPI.tempStore.serverInfo = serverInfoLocalSaved;
      await ConfigHolder.instance.setUser(userLocalSaved, null);
    }
  }

  async function loadServerInfo(){
    try{
      return await ServerAPI.getServerInfo();
    } catch (err){
      console.log("Error at get Server Info: ",err);
    }
  }

  useEffect(() => {
    load();
  }, [])

  useEffect(() => {
    if(JSON.stringify(userLocalSaved) == JSON.stringify(syncedUser)){
      ConfigHolder.instance.setUser(userLocalSaved, null);
    }
  }, [userLocalSaved, syncedUser])

  useEffect(() => {
    if(JSON.stringify(serverInfoLocalSaved) == JSON.stringify(syncedServerInfo)){
      ServerAPI.tempStore.serverInfo = serverInfoLocalSaved;
    }
  }, [serverInfoLocalSaved, syncedServerInfo])

  return (
    <View>
      <Text>{"User Init Loader"}</Text>
      <Text>{"configHolderUser: "+JSON.stringify(configHolderUser, null, 2)}</Text>

      <Text>{JSON.stringify(userLocalSaved, null, 2)}</Text>
    </View>
  );
}

// @ts-nocheck
import React, {useEffect, useState} from "react";
import {Platform} from "react-native";
import {ConfigHolder} from "../ConfigHolder";
import {keyof} from "ts-keyof";
import {Button, Flex, FormControl, Input, View, Text} from "native-base";
import {FormButton} from "../buttons/FormButton";
import {InternalLink} from "../navigation/InternalLink";
import {Login} from "./Login";
import ServerAPI from "../ServerAPI";
import {handleLoginWithCredentials} from "./EmailLogin";

export const Register = (props) => {

	let hideDrawer = false;

  const [registerInitiated, setRegisterInitiated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

	if(!ConfigHolder.instance.isDrawerHidden()){
		//console.log("Login calls hide drawer");
		hideDrawer = true;
	}
	if(Platform.OS!=="web"){
		hideDrawer = false;
	}

	// corresponding componentDidMount
	useEffect(() => {
		if(hideDrawer){
			ConfigHolder.instance.setHideDrawer(true);
		}

	}, [props?.route?.params])

	if(hideDrawer){
		return null;
	}

	async function registerUser(){
    if(!registerInitiated){
      await setRegisterInitiated(true);

      if(password===passwordConfirm){
        try{
          let directus = ServerAPI.getPublicClient();

          let answer = await directus.users.createOne({
            email: email,
            password: password
          })

          console.log("Send login request");
          await handleLoginWithCredentials(email, password);
        } catch (err){
          console.log(err);
        } finally {
          await setRegisterInitiated(false);
        }
      }
    }
  }


  return (
    <View style={{flex: 1}}>
      <Text fontSize="4xl" fontWeight={800}>
        {"Register"}
      </Text>
      <FormControl isRequired>
        <View style={{marginVertical: 10}}>
          <Input
            isDisabled={registerInitiated}
            onChange={(event) => { // @ts-ignore
              setEmail(event.target.value)}}
            type="email"
            value={email}
            placeholder="Email"
            size="lg" />
        </View>
      </FormControl>
      <FormControl isRequired>
        <View style={{marginVertical: 10}} >
          <Input
            isDisabled={registerInitiated}
            nativeID={"password"}
            type={"password"}
            onChange={(event) => { // @ts-ignore
              setPassword(event.nativeEvent.text)
            }} placeholder="Password" size="lg" />
        </View>
      </FormControl>
      <FormControl isRequired>
        <View style={{marginVertical: 10}} >
          <Input
            isDisabled={registerInitiated}
            nativeID={"password"}
            type={"password"}
            onChange={(event) => { // @ts-ignore
              setPasswordConfirm(event.nativeEvent.text)
            }} placeholder="Password Confirm" size="lg" />
        </View>
      </FormControl>
      <Flex flexDirection={"row"} justify={"space-between"}>
        <FormButton disabled={registerInitiated} onPress={() => {registerUser()}}>
          {"Register"}
        </FormButton>
        <InternalLink destination={Login}>{"Sign In"}</InternalLink>
      </Flex>
    </View>
  )
}

Register.displayName = keyof({ Register });

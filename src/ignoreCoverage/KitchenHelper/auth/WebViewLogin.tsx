// @ts-nocheck
import React, {FunctionComponent, useEffect} from 'react';
import {Divider, Flex, Spinner, Text, View} from "native-base";
import {FormButton} from "../buttons/FormButton";
import {UserItem} from "@directus/sdk";
import {SignOutButton} from "./SignOutButton";
import {EmailLogin} from "./EmailLogin";
import {AuthProvidersLoginOptions} from "./AuthProvidersLoginOptions";
import {ConfigHolder} from "../ConfigHolder";

export interface WebViewLoginFormState {
	user?: UserItem;
	refresh: () => void,
	loaded: boolean,
  handleContinue: any
}
export const WebViewLogin: FunctionComponent<WebViewLoginFormState> = (props) => {

	// corresponding componentDidMount
	useEffect(() => {
    if(!!props.loaded && ConfigHolder.autoLogin && !!props.user){
      props.handleContinue();
    }
	}, [props])

	function renderSignIn(){
		return(
			<View>
				<Text fontSize="4xl" fontWeight={800}>
					{"Sign in"}
				</Text>
			</View>
		)
	}

  function renderLoading(){
    return(
      <View style={{flex: 1}}>
        <View style={{marginVertical: 20}}></View>
        <Spinner />
        <View style={{marginVertical: 20}}></View>
      </View>
    )
  }

  function renderRememberThisAccount(user){
    let identifier = user.email || user.first_name;
    return(
      <View style={{flex: 1}}>
        <View style={{marginVertical: 20}}></View>
        <Text><Text bold={true} >{identifier}</Text> is currentrly authenticated. If you recognize this account, press continue.</Text>
        <View style={{marginVertical: 20}}></View>
        <Flex flexDirection={"row"} justify={"space-between"}>
          <SignOutButton />
          <FormButton onPress={async () => {
            await props.handleContinue();
            //
          }}>
            {"Continue"}
          </FormButton>
        </Flex>
      </View>
    )
  }

  function renderLoginOptions(){

	  let mailLogin = null;
	  if(ConfigHolder.showMailLogin){
      mailLogin = (<EmailLogin />)
    }

    return(
      <>
        {mailLogin}
        <View style={{marginVertical: 20}} >
          <Divider />
        </View>
        <AuthProvidersLoginOptions />
      </>
    )
  }

	function renderLoginInformations(){
		let user = props.user;
		if(!props.loaded){
			return renderLoading();
		}
		if(!!user){
		  if(!!user.isGuest){
        return renderRememberThisAccount(user);
		  } else {
        return renderRememberThisAccount(user);
      }
		} else {
			return renderLoginOptions();
		}
	}

	return (
		<>
			{renderSignIn()}
			{renderLoginInformations()}
		</>
	)
}

// @ts-nocheck
import React, {FunctionComponent, useEffect, useState} from 'react';
import ServerAPI from "../ServerAPI";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Login} from "./Login";
import EnviromentHelper from "../EnviromentHelper";
import {Button, Flex, FormControl, Input, View} from "native-base";
import {InternalLink} from "../navigation/InternalLink";
import {ResetPassword} from "./ResetPassword";
import {FormButton} from "../buttons/FormButton";
import {ConfigHolder} from "../api/ConfigHolder";
import {Register} from "./Register";
import {Icon} from "../components/Icon";

const showResetPassword = false;
const showEmailLogin = true;

export interface WebViewLoginFormState {

}
export const handleLoginWithCredentials = async (email, password) => {
  let directus = ServerAPI.getPublicClient();
  let response = await directus.auth.login({
    email: email, //'admin@example.com',
    password: password //'d1r3ctu5',
  });
  let token = response?.refresh_token;
  if(!!token){
    NavigatorHelper.navigate(Login, {[EnviromentHelper.getDirectusAccessTokenName()]: token} )
    return true;
  }
  return false;
}

export const EmailLogin: FunctionComponent<WebViewLoginFormState> = (props) => {

	const markerRef = React.createRef();

	const [reloadnumber, setReloadnumber] = useState(0)
	const [loginInitiated, setLoginInitiated] = useState(false)
  const [loginIncorrect, setLogginIncorrect] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	async function handleLoginWithEmail(){
		await setLoginInitiated(true);
		try{
      await handleLoginWithCredentials(email, password)
		} catch (err){
			console.log(err);
			setLoginInitiated(false);
      setLogginIncorrect(true);
      setPassword("");
		} finally {
		}
	}

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	function renderInvisibleForm(){
		let output = [];
		output.push(<input className='form-control' name={"email"} value={email}/>)
		output.push(<input className='form-control' name={"password"} value={password}/>)
		return(
			<div key={reloadnumber} style={{display: "none"}}>
				<form ref={markerRef} action={"/"} method="post">
					{output}
					<input type='submit' className='btn btn-success'/>
				</form>
			</div>
		)
	}

	function renderResetPasswordButton(){
		if(showResetPassword){
			return (
				<InternalLink destination={ResetPassword}>{"Forgot Password"}</InternalLink>
			)
		}
		return null;
	}

	function renderRegisterButton(){
    if(ConfigHolder.showMailRegister){
      return(
        <FormButton loading={loginInitiated} disabled={loginInitiated} onPress={() => {NavigatorHelper.navigateWithoutParams(Register)}}>
          {"Register"}
        </FormButton>
      )
    }
    return null;
  }

	function renderEmailLogin(){
    const toggleShowPasswordIcon = showPassword ? "eye" : "eye-off";
    let rightElement = (
      <Button roundedLeft="0" onPress={() => {setShowPassword(!showPassword)}}>
        <Icon name={toggleShowPasswordIcon} size="sm" />
      </Button>
    )


		if(showEmailLogin){
			return(
				<>
					<FormControl isRequired>
						<View style={{marginVertical: 10}}>
							<Input
								isDisabled={loginInitiated}
								nativeID={"username"}
								type={"email"}
								//TODO extract the on change method to an extra class to call the callback
								onChange={async (event) => { // @ts-ignore
									setEmail(event.nativeEvent.text)
								}}
								placeholder="Email" size="lg" />
						</View>
					</FormControl>
					<FormControl isInvalid={loginIncorrect}  isRequired>
						<View style={{marginVertical: 10}} >
							<Input
								isDisabled={loginInitiated}
                value={password}
								nativeID={"password"}
                type={showPassword ? "text" : "password"}
                InputRightElement={rightElement}
								onChange={(event) => { // @ts-ignore
									setPassword(event.nativeEvent.text)
								}} placeholder="Password" size="lg" />
              <FormControl.ErrorMessage>
                Incorrect email or password
              </FormControl.ErrorMessage>
						</View>
					</FormControl>
					<Flex flexDirection={"row"} justify={"space-between"} >
						<FormButton loading={loginInitiated} disabled={loginInitiated} onPress={() => {handleLoginWithEmail()}}>
							{"Sign In"}
						</FormButton>
            {renderRegisterButton()}
					</Flex>
          <Flex flexDirection={"row"} justify={"space-between"} >
            {renderResetPasswordButton()}
          </Flex>
				</>
			)
		}
		return null;
	}

	return (renderEmailLogin())
}

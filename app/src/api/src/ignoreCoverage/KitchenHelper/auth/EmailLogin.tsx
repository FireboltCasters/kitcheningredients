// @ts-nocheck
import React, {FunctionComponent, useEffect, useState} from 'react';
import ServerAPI from "../ServerAPI";
import {Login} from "./Login";
import EnviromentHelper from "../EnviromentHelper";
import {Button, Flex, FormControl, Input, Tooltip, View} from "native-base";
import {InternalLink} from "../navigation/InternalLink";
import {ResetPassword} from "./ResetPassword";
import {FormButton} from "../buttons/FormButton";
import {ConfigHolder} from "./../ConfigHolder";
import {Register} from "./Register";
import {Icon} from "../components/Icon";
import {Navigation} from "../navigation/Navigation";
import {TranslationKeys} from "../translations/TranslationKeys";

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
    Navigation.navigateTo(Login, {[EnviromentHelper.getDirectusAccessTokenName()]: token})
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

  const useTranslation = ConfigHolder.plugin.getUseTranslationFunction();
  const translation_email = useTranslation(TranslationKeys.email);
  const translation_register = useTranslation(TranslationKeys.register);
  const translation_password = useTranslation(TranslationKeys.password);
  const translation_password_show = useTranslation(TranslationKeys.password_visible);
  const translation_password_hide = useTranslation(TranslationKeys.password_hidden);
  const translation_forgot_password = useTranslation(TranslationKeys.forgot_password);
  const translation_sign_in = useTranslation(TranslationKeys.sign_in);

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


	function renderResetPasswordButton(){
		if(showResetPassword){
			return (
				<InternalLink destination={ResetPassword}>{translation_forgot_password}</InternalLink>
			)
		}
		return null;
	}

	function renderRegisterButton(){
    if(ConfigHolder.showMailRegister){
      return(
        <FormButton accessibilityLabel={translation_register} loading={loginInitiated} disabled={loginInitiated} onPress={() => {
          Navigation.navigateTo(Register)
        }}>
          {translation_register}
        </FormButton>
      )
    }
    return null;
  }

	function renderEmailLogin(){
    const toggleShowPasswordIcon = showPassword ? "eye" : "eye-off";
    const accessibilityLabel = showPassword ? translation_password_show : translation_password_hide

    let rightElement = (
      <Tooltip label={accessibilityLabel} >
        <Button accessibilityLabel={accessibilityLabel} roundedLeft="0" onPress={() => {setShowPassword(!showPassword)}}>
          <Icon invert={true} name={toggleShowPasswordIcon} size="sm" />
        </Button>
      </Tooltip>
    )


		if(showEmailLogin){
			return(
				<>
					<FormControl isRequired>
						<View style={{marginVertical: 10}}>
							<Input
								isDisabled={loginInitiated}
								nativeID={"username"}
								type={translation_email}
								//TODO extract the on change method to an extra class to call the callback
								onChange={async (event) => { // @ts-ignore
									setEmail(event.nativeEvent.text)
								}}
								placeholder={translation_email} size="lg" />
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
								}} placeholder={translation_password} size="lg" />
              <FormControl.ErrorMessage>
                Incorrect email or password
              </FormControl.ErrorMessage>
						</View>
					</FormControl>
					<Flex flexDirection={"row"} justify={"space-between"} >
						<FormButton accessibilityLabel={translation_sign_in} loading={loginInitiated} disabled={loginInitiated} onPress={() => {handleLoginWithEmail()}}>
							{translation_sign_in}
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

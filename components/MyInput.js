import React from "react";
import {TextInput} from "react-native";

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWD_REGEX = /^.{8,20}$/;
export const NAME_REGEX = /^[a-zA-Záéíóú ÁÉÍÓÚ]{2,30}$/;
export const EMAIl_PROPS = {regex: EMAIL_REGEX, replaceRegex: null, placeholder: "voyaganar@mail.com", autoCompleteType: "email", keyboardType: "email-address", secureTextEntry: false, autoCapitalize:"none", warning: "El email deber ser válido"};
export const PASSWD_PROPS = {regex: PASSWD_REGEX, replaceRegex: null, placeholder: "TengoSuerte123", autoCompleteType: "password", keyboardType: "default", secureTextEntry: false, autoCapitalize:"none", warning: "Ingresá mínimo 8 y máximo 20 caracteres"};
export const NAME_PROPS = {regex: NAME_REGEX, replaceRegex: /[^a-zA-Z\sáéíúó]+/, placeholder: "Nombre", autoCompleteType: "name", keyboardType: "default", secureTextEntry: false, autoCapitalize:"words", warning: "Ingresá mínimo 2 y máximo 30 caracteres"};
export const SURNAME_PROPS = {regex: NAME_REGEX, replaceRegex: /[^a-zA-Z\sáéíúó]+/, placeholder: "Apellido", autoCompleteType: "name", keyboardType: "default", secureTextEntry: false, autoCapitalize:"words", warning: "Ingresá mínimo 2 y máximo 30 caracteres"};

export default function MyInput ({editable, inputProps, onValid, onInvalid, initialValue, style, placeholder}){

    const onChangeText = (value) => {
        value = value.replace(inputProps.replaceRegex, '');
        if(inputProps.regex.test(value)) {
            onValid(value);
        } else {
            onInvalid(value);
        }
    };

    return (
        <TextInput
            style={style}
            editable={editable}
            onChangeText={onChangeText}
            value={initialValue}
            placeholder={placeholder}
            placeholderTextColor={"#8d8d8d"}
            {...inputProps}
        />
    )
};
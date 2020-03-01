import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";
import PhoneInput from "../components/PhoneInput";
import SmsCodeInput from "./SmsCodeInput";
import {useAuth} from "../services/use-auth";
const [PHONE, CODE] = ["phone", "code"];
const [ START, VALID, SENDING, VERIFY, VERIFY_VALID, VERIFYING, INVALID_CODE, DONE] = [
    {disbled: true,  msg: "Enviar SMS", color: Colors.gris, type: PHONE},
    {disbled: false, msg: "Enviar SMS", color: Colors.verde, type: PHONE},
    {disbled: true,  msg: "Enviando...", color: Colors.azul, type: PHONE},
    {disbled: true, msg: "Verificar", color: Colors.gris, type: CODE},
    {disbled: false, msg: "Verificar", color: Colors.verde, type: CODE},
    {disbled: true,  msg: "Verificando...", color: Colors.azul, type: CODE},
    {disbled: true,  msg: "Código inválido", color: Colors.rojo, type: CODE},
    {disbled: true,  msg: "Listo", color: Colors.verde},
];
const OPACITY = .5 ;

const parsePhone = (formatted) => `+549${formatted.replace(/[^0-9]/g, '')}`;

export default function SmsButton() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [smsState, setSmsState] = useState(START);
    const {sendSms, verifyCode} = useAuth();

    const onValidNumber = (formatted) => {
        setPhoneNumber(formatted);
        setSmsState(VALID);
    };
    const onInvalidNumber = (formatted) => {
        setPhoneNumber(formatted);
        setSmsState(START);
    };
    const onValidCode = (code) => {
        setCode(code);
        setSmsState(VERIFY_VALID);
    };
    const onInvalidCode = (code) => {
        setCode(code);
        setSmsState(VERIFY);
    };
    const onPress = () => {
        switch (smsState) {
            case(VALID):
                sendSms(parsePhone(phoneNumber))
                  .then(() => {
                      setSmsState(VERIFY);
                  })
                  .catch(() => setSmsState(VALID));
                setSmsState(SENDING);
                break;
            case(VERIFY_VALID):
                verifyCode(parsePhone(phoneNumber), code)
                  .catch(() => {
                      setSmsState(INVALID_CODE);
                      setTimeout(() => {
                          setSmsState(VERIFY_VALID)
                      }, 3000)
                  });
                setSmsState(VERIFYING);
                break;
            default:break;
        }
    };

    let input = <PhoneInput onValidNumber={onValidNumber} onInvalidNumber={onInvalidNumber} initialNumber={phoneNumber} style={styles.PhoneInput}/>;
    let text = "Ingresá tu número de teléfono para recibir el código de activación.";
    if(smsState.type === PHONE) {
        input = <PhoneInput onValidNumber={onValidNumber} onInvalidNumber={onInvalidNumber} initialNumber={phoneNumber} style={styles.PhoneInput}/>
    } else if(smsState.type === CODE) {
        text = "Te enviamos un código por SMS, ingresalo acá para entrar a tu cuenta";
        input = <SmsCodeInput onValidCode={onValidCode} onInvalidCode={onInvalidCode} initialCode={code} style={styles.PhoneInput}/>
    } else {
        input = <View/>
    }
    return(
        <View>
            <View style={styles.BoldTextContainer}>
                <Text style={styles.BoldText}>{text}</Text>
            </View>
            {input}
            <TouchableOpacity disabled={smsState.disabled} onPress={onPress} activeOpacity={OPACITY} style={{...styles.SendBtn, backgroundColor: smsState.color}}>
                <Text style={styles.SendBtnText}>{smsState.msg}</Text>
            </TouchableOpacity>
            {(smsState === VERIFY || smsState === VERIFY_VALID) &&
                <TouchableOpacity onPress={() => setSmsState(VALID)}>
                    <Text style={styles.MistakeText}>{`Editar el número ${phoneNumber}`}</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const MARGIN = 20;
const styles = StyleSheet.create({
    BoldTextContainer: {
        justifyContent: 'flex-end',
        marginTop : MARGIN*2,
        marginLeft : MARGIN,
        marginRight : MARGIN
    },
    BoldText : {
        color:'#ffffff',
        textAlign:'center',
        fontSize: 19,
        fontWeight: "500"
    },
    PhoneInput: {
        marginTop: MARGIN*2,
        marginLeft: MARGIN*2,
        marginRight: MARGIN*2,
        height: 40,
    },
    SendBtn: {
        borderRadius: 40,
        height: 50,
        flexDirection: "row",
        justifyContent: 'space-around',
        marginTop: MARGIN,
        marginLeft: MARGIN*2,
        marginRight: MARGIN*2,
    },
    SendBtnText: {
        fontSize: 25,
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: "500",
        color: "white"
    },
    MistakeText: {
        marginTop: MARGIN,
        textDecorationLine: "underline",
        color:'#ffffff',
        textAlign:'center',
        fontSize: 17,
        fontWeight: "500"
    }
});
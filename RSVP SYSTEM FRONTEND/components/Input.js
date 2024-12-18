import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function Input  (props) {
  
  const {
    label,
    placeholder,
    secureTextEntry,
    value,
    cb,
    inputMode,
    multiline,
    keyboard,
    leftIcon,
    options,
    rightIcon,
    show,
    required,
    type
  } = props;
  
  return (
    show && <View className="flex flex-col gap-2 mb-4">
      <Text className="text-neutral-300">{label}<Text className='text-red-700'>{required && '*'}</Text></Text>
      {(options && options.length > 0) ? (
        <View className='w-full gap-2 flex flex-row flex-wrap'>
          {options?.map((option, index) => (
            <Pressable
              onPress={() => {
                cb((prev) => option?.value ?? option?.label);
              }}
              key={index}
              className={`border-[1.5px] bg-neutral-900 border-neutral-800 p-4 text-center rounded-[18px] ${(option?.value ?? option?.label) === value && "bg-[#B615DD]"}}`}
            >
              <Text className="text-white text-center w-full">
                {option?.label}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : 
        <View className={`text-white border-[1.5px] ${rightIcon && 'pr-10'} bg-neutral-900 border-neutral-800 focus:border-[#B615DD] focus:border-opacity-70  rounded-[18px] flex flex-row justify-between items-center`}>
          {leftIcon}
          <TextInput
            className="text-white p-4 w-full"
            autoComplete="off"
            cursorColor={"#B615DD"}
            passwordRules={{
              minlength: 8,
              maxlength: 20,
              digits: true,
              symbols: true,
              required: true,
            }}
            required={required}
            keyboardType={keyboard}
            inputMode={inputMode}
            multiline={multiline}
            placeholder={placeholder}
            placeholderTextColor={"#989898"}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={(text) => cb((prev) => text)}
          />
          {rightIcon} 
        </View>
      }
    </View>
  );
};


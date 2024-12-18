import { View, Text } from "react-native";
import React from "react";
import { useToast } from "../../context/ToastContext";
import { SafeAreaView } from "react-native-safe-area-context";

const ToastHeader = () => {
  const { toast } = useToast();

  return (
    toast.show && (
      <SafeAreaView
        className={`p-4 ${
          toast.type === "success" ? "bg-purple-500" : "bg-red-600"
        } ${
          toast.show ? "translate-y-0" : "-translate-y-[100%]"
        } overflow-hidden transition-all duration-100`}
      >
        <Text className="text-white">{toast.message}</Text>
      </SafeAreaView>
    )
  );
};

export default ToastHeader;

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { Link } from "expo-router";

const ConfigPayment = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
    >
      <StatusBar style="light" />
      {/*  */}
      <Text style={{ textAlign: "center", marginBottom: 20 }}>
        Config payment screen
      </Text>
      <Link style={{ textAlign: "center" }} href="/make_payment">
        Go to - Make payment screen
      </Link>
      {/*  */}
    </SafeAreaView>
  );
};

export default ConfigPayment;

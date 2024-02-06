import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { Link } from "expo-router";

const PaymentFeedback = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
    >
      <StatusBar style="light" />
      {/*  */}
      <Text style={{ textAlign: "center", marginBottom: 20 }}>
        Payment feedback screen
      </Text>
      <Link style={{ textAlign: "center" }} href="/config_payment">
        Back to - Config payment screen
      </Link>
      {/*  */}
    </SafeAreaView>
  );
};

export default PaymentFeedback;

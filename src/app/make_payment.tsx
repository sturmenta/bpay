import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { Link } from "expo-router";

const MakePayment = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
    >
      <StatusBar style="light" />
      {/*  */}
      <Text style={{ textAlign: "center", marginBottom: 20 }}>
        Make payment screen
      </Text>
      <Link style={{ textAlign: "center" }} href="/payment_feedback">
        Go to - Payment feedback screen
      </Link>
      {/*  */}
    </SafeAreaView>
  );
};

export default MakePayment;

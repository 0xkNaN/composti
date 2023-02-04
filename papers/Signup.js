import { useEffect, useState } from "react";

import { StyleSheet, View, ActivityIndicator } from "react-native";
import { TouchableRipple, Surface, Text } from "react-native-paper";

import AuthStepper from "../components/auth/Stepper";
import EntryPhone from "../components/Entries/Phone";
import CodeEntry from "../components/Entries/Code";
import CategoryItem from "../components/auth/CategoryItem";

import Logo from "../assets/logo.svg";
import GreenerIcon from "../assets/signup/greener.svg";
import ComposterIcon from "../assets/signup/composter.svg";
import GreenerWIcon from "../assets/signup/greenerW.svg";
import ComposterWIcon from "../assets/signup/composterW.svg";

const Step0 = ({ isGreener, isComposter, setType, setStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.logo}>
          <Logo width={89} height={86} />
        </View>
        <Text style={styles.title}>Bienvenu à Composti</Text>
        <Text style={styles.subTitle}>Choose you account type and fulfill necessary information about your profile</Text>

        <TouchableRipple
          style={{ ...styles.type, ...(isComposter ? styles.typeActive : {}), marginBottom: 20 }}
          onPress={() => setType("__composter")}
          rippleColor="rgba(42, 223, 128, 0.07)">
          <Surface elevation={0} style={styles.typeInner}>
            <View style={{ ...styles.typeLogo, ...(isComposter ? styles.typeLogoActive : {}) }}>
              {!isComposter && <ComposterIcon />}
              {isComposter && <ComposterWIcon />}
            </View>
            <View style={styles.typeContent}>
              <Text style={styles.typeTitle}>Composter</Text>
              <Text style={styles.typeDesc}>Lorem ipsum dolor sit amet.{"\n"} Non quas tenetur non soluta nobis.</Text>
            </View>
          </Surface>
        </TouchableRipple>

        <TouchableRipple
          style={{ ...styles.type, ...(isGreener ? styles.typeActive : {}), marginBottom: 40 }}
          onPress={() => setType("__greener")}
          rippleColor="rgba(42, 223, 128, 0.07)">
          <Surface elevation={0} style={styles.typeInner}>
            <View style={{ ...styles.typeLogo, ...(isGreener ? styles.typeLogoActive : {}) }}>
              {!isGreener && <GreenerIcon />}
              {isGreener && <GreenerWIcon />}
            </View>
            <View style={styles.typeContent}>
              <Text style={styles.typeTitle}>Greener</Text>
              <Text style={styles.typeDesc}>Lorem ipsum dolor sit amet.{"\n"} Non quas tenetur non soluta nobis.</Text>
            </View>
          </Surface>
        </TouchableRipple>

        <TouchableRipple style={styles.button} onPress={() => setStep(1)}>
          <Text style={styles.buttonLabel}>Continue</Text>
        </TouchableRipple>
      </View>

      <View style={styles.containerBottom}>
        <TouchableRipple style={styles.buttonTrans}>
          <Text style={styles.buttonTransLabel}>
            Already have an account?{" "}
            <Text style={styles.buttonTransLabelColor} onPress={() => navigation.navigate("Singin", {})}>
              Signin
            </Text>
          </Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

const Step1 = ({ phone, setPhone, step, setStep }) => {
  return (
    <View style={styles.containerWithSteps}>
      <AuthStepper title="Créer votre compte a fin de commencer à trier et collecter vos déchets organiques" step={step} setStep={setStep} />

      <View style={styles.containerTopStepper}>
        <View style={styles.containerTopStepperInner}>
          <EntryPhone value={phone} setValue={setPhone} />
        </View>

        <TouchableRipple style={styles.button} onPress={() => setStep(2)}>
          <Text style={styles.buttonLabel}>Continue</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

const Step2 = ({ code, setCode, codeLoading, setCodeLoading, step, setStep }) => {
  const incCode = (x) => {
    setCode((c) => `${c}${x}`);
  };

  const startCode = () => {
    [1, 2, 3, 4, 5, 6].forEach((x) => {
      setTimeout(() => {
        incCode(x);
        if (x === 6) setCodeLoading(false);
      }, x * 10);
    });
  };

  useEffect(() => {
    if (code) return;

    setCode("");
    setTimeout(() => {
      startCode();
    }, 500);
  }, []);

  return (
    <View style={styles.containerWithSteps}>
      <AuthStepper title="Créer votre compte a fin de commencer à trier et collecter vos déchets organiques" step={step} setStep={setStep} />

      <View style={styles.containerTopStepper}>
        <View style={styles.containerTopStepperInner}>
          <CodeEntry code={code} />
        </View>

        <TouchableRipple
          style={styles.button}
          onPress={() => {
            if (codeLoading) return;
            setStep(3);
          }}>
          <View>
            {codeLoading && <ActivityIndicator size="large" color="#ffffff" />}
            {!codeLoading && <Text style={styles.buttonLabel}>Continue</Text>}
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};

const Step3 = ({ categories, setCategories, step, setStep }) => {
  const raw = [
    { title: "Category One", id: "category-1" },
    { title: "Category Two", id: "category-2" },
    { title: "Category Three", id: "category-3" }
    // { title: "Category Four", id: "category-4" }
  ];

  console.log("#Step3 :: ", categories);

  const setCategoriesHandler = (id) => {
    console.log("#setCategoriesHandler :: ", id);

    if (categories.indexOf(id) > -1) {
      setCategories((cats) => cats.filter((cId) => cId !== id));
    } else {
      setCategories((cats) => [...cats, id]);
    }
  };

  // TODO: navigate to "Dashboard"

  return (
    <View style={styles.containerWithSteps}>
      <AuthStepper title="Créer votre compte a fin de commencer à trier et collecter vos déchets organiques" step={step} setStep={setStep} />

      <View style={styles.containerTopStepper}>
        <View style={styles.containerTopStepperInner}>
          {raw.map((category, idx) => (
            <CategoryItem key={idx} data={category} isSelected={categories.indexOf(category.id) > -1} hander={setCategoriesHandler} />
          ))}
        </View>

        <TouchableRipple style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonLabel}>Go to your dashboard</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

const Signup = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("");

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeLoading, setCodeLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const isGreener = type === "__greener";
  const isComposter = type === "__composter";

  // __reload__;

  const sProps = {
    isGreener,
    isComposter,
    step,
    setStep,
    type,
    setType,
    phone,
    setPhone,
    code,
    setCode,
    codeLoading,
    setCodeLoading,
    categories,
    setCategories,
    navigation
  };

  if (step === 0) return <Step0 {...sProps} />;
  if (step === 1) return <Step1 {...sProps} />;
  if (step === 2) return <Step2 {...sProps} />;
  if (step === 3) return <Step3 {...sProps} />;
  else return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 0,
    margin: 0
  },
  containerWithSteps: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 0,
    margin: 0
  },
  // ...
  containerTop: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  containerTopStepper: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingBottom: 30

    // TODO: remove this
    // borderWidth: 1,
    // borderColor: "red"
  },
  containerTopStepperInner: {
    marginBottom: 70
    // height: 100,
    // marginBottom: 40,

    // TODO: remove this
    // borderWidth: 1,
    // borderColor: "green"
  },
  logo: {
    marginBottom: 40
  },
  title: {
    color: "#001927",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 15
  },
  subTitle: {
    color: "#75828A",
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "400",
    marginBottom: 30
  },
  type: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#001927",
    borderRadius: 4
  },
  typeActive: {
    borderColor: "#2adf80"
  },
  typeInner: {
    flexDirection: "row"
  },
  typeLogo: {
    width: 80,
    height: 80,
    borderColor: "#001927",
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  typeLogoActive: {
    borderColor: "#2adf80",
    backgroundColor: "#2adf80"
  },
  typeContent: {
    width: "75%",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  typeTitle: {
    color: "#001927",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    marginBottom: 5
  },
  typeDesc: {
    color: "#75828A",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400"
  },
  // ...
  containerBottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    height: 55,
    backgroundColor: "#2adf80",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonLabel: {
    color: "#001927",
    fontSize: 16,
    fontWeight: "700"
  },
  buttonTrans: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTransLabel: {
    color: "#02314a",
    fontSize: 14,
    fontWeight: "600"
  },
  buttonTransLabelColor: {
    color: "#2adf80"
  }
});

export default Signup;

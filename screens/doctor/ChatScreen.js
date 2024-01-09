import React, {
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import { SearchBar } from "@rneui/themed";

import { Path } from "../../constants/path";
import { AuthContext } from "../../store/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import NotificationBell from "../../components/ui/NotificationBell";
import HeaderText from "../../components/ui/HeaderText";
import NormalText from "../../components/ui/NormalText";
import MediumText from "../../components/ui/NormalText";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import SearchInput from "../../components/FormElements/SearchInput";
import PatientListCard from "../../components/Cards/PatientListCard";

import { globalStyles } from "../../constants/globalcss";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Colors } from "../../constants/styles";
import { faPaperPlane, faSmile } from "@fortawesome/free-regular-svg-icons";
import InputHybrid from "../../components/FormElements/InputHybrid";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

export default function ChatScreen({ route, navigation }) {
  //TOKEN
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const [isLoading, setIsLoading] = useState(true);
  const item = route.params.item;
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      roomId: item.id,
      timeStamp: timeStamp,
      message: message,
      user: item.user,
    };
    setMessage("");

    if (message !== "") {
      await addDoc(
        collection(doc(firestore, "chats", item.id), "messages"),
        _doc
      )
        .then(() => {})
        .catch((err) => alert(err));
    } else {
      Alert.alert("Empty");
    }
  };

  useLayoutEffect(() => {
    const msgQuery = query(
      collection(firestore, "chats", item?.id, "messages"),
      orderBy("timeStamp", "asc")
    );

    const unsubscibe = onSnapshot(msgQuery, (querySnap) => {
      const upMsg = querySnap.docs.map((doc) => doc.data());
      setMessages(upMsg);
      setIsLoading(false);
    });

    return unsubscibe;
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <HeaderText>{item.chatName}</HeaderText>
      <View style={styles.outerView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={160}
        >
          <>
            <ScrollView>
              {isLoading ? (
                <>
                  <View>
                    <ActivityIndicator animating size="large" />
                  </View>
                </>
              ) : (
                <>
                  {messages?.map((msg, i) =>
                    msg.user.doctor_id === token.doctor_id ? (
                      <>
                        <View style={{ margin: 4 }} key={i}>
                          <View style={styles.senderTextStyle}>
                            <NormalText styleProp={{ color: "white" }}>
                              {msg.message}
                            </NormalText>
                          </View>

                          <View style={{ alignSelf: "flex-end" }}>
                            {msg?.timeStamp?.seconds && (
                              <MediumText>
                                {new Date(
                                  parseInt(msg?.timeStamp?.seconds) * 1000
                                ).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                })}
                              </MediumText>
                            )}
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        <View style={styles.receiverTextStyle} key={i}>
                          <View style={styles.receiverInner}>
                            <Image
                              source={{
                                uri:
                                  Path.IMAGE_URL + msg?.user?.user_image ===
                                  null
                                    ? "white_bg_image.png"
                                    : msg?.user?.user_image,
                              }}
                              resizeMode="cover"
                              style={styles.userAvatar}
                            />

                            <View style={styles.senderTextStyle}>
                              <NormalText styleProp={{ color: "white" }}>
                                {msg.message}
                              </NormalText>
                            </View>

                            <View style={{ alignSelf: "flex-start" }}>
                              {msg?.timeStamp?.seconds && (
                                <MediumText>
                                  {new Date(
                                    parseInt(msg?.timeStamp?.seconds) * 1000
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  })}
                                </MediumText>
                              )}
                            </View>
                          </View>
                        </View>
                      </>
                    )
                  )}
                </>
              )}
            </ScrollView>

            <View style={styles.inputAreaCover}>
              <View style={styles.inputArea}>
                <Pressable onPress={() => {}}>
                  <FontAwesomeIcon
                    icon={faSmile}
                    size={24}
                    color={Colors.mainBlue}
                  />
                </Pressable>

                <TextInput
                  style={styles.txtInput}
                  onChangeText={(text) => setMessage(text)}
                  value={message}
                  placeholder="Type Here..."
                  placeholderTextColor="black"
                />

                <FontAwesomeIcon
                  icon={faMicrophone}
                  size={24}
                  color={Colors.mainBlue}
                />
              </View>
              <Pressable onPress={sendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} size={24} color="black" />
              </Pressable>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerView: {
    borderRadius: 24,
    paddingHorizontal: 8,
    flex: 1,
  },
  txtInput: {
    flex: 1,
    height: 32,
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
  },
  inputArea: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 16,
    paddingHorizontal: 4,
    marginHorizontal: 4,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  senderTextStyle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: "#007fff",
    alignSelf: "flex-end",
  },
  inputAreaCover: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  receiverTextStyle: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 8,
  },
  receiverInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  userAvatar: {
    height: 48,
    width: 48,
    borderRadius: "50%",
  },
});
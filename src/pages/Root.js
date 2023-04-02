import {
    withAuthenticator,
    Button,
    Heading,
    Text,
    TextField,
    View,
  } from "@aws-amplify/ui-react";
  
  export default function Root() {
    return (
      <View>
        <Text fontSize="3em">UBICE Rekognition</Text>
        <img src={`${process.env.PUBLIC_URL}/ubice.png`} />
      </View>
    );
  }
  
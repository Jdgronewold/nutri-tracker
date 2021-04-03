// LinkComponent.js

import React, { ReactComponentElement, ReactNode } from "react";
import { View, Platform, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { LinkProps } from "next/link"

interface WrapperLinkProps extends LinkProps {
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  children: ReactNode
}

let Link: React.FC<WrapperLinkProps> = null;

if (Platform.OS === "web") {
  Link = require('next/link').default;
}

const LinkComponent = (props: WrapperLinkProps) => {
  if (Platform.OS === "web") {
    // it will be used for web
    return (
      <Link href={props.href}>
        <a>
          <View style={props.style}>{props.children}</View>
        </a>
      </Link>
    );
  } else {
    // it will be used for iOS, Android
    return (
      <TouchableOpacity style={props.style} onPress={props.onPress}>
        {props.children}
      </TouchableOpacity>
    );
  }
};

export default LinkComponent;

// use LinkComponent like below

// const id = 265;
// const openJobDetails = () => navigation.navigate("JobDetails", params);
// <LinkComponent
//      href={`/jobs/${id}`}
//      onPress={openJobDetails}
//      style={styles.container}
//    >
//  <Text>Open a job</Text>
// </LinkComponent>
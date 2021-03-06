import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Dimensions } from "react-native";
import { navigation } from "react-navigation";

import {
  Container,
  Content,
  Icon,
  Input,
  Text,
  Button,
  StyleProvider,
  Header,
  Left,
  Right,
  Body,
  Title
} from "native-base";
import getTheme from "../../../native-base-theme/components";
import material from "../../../native-base-theme/variables/material";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import MyHeader from "../../Header";

const { height } = Dimensions.get('window');
const cardHeight = (height-202)/4<150 ? 150 : (height-202)/4;

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: 270,
    resizeMode: "cover" // or 'stretch'
  },
  notifications: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#003366",
    height: 60,
    padding: 10,
    alignItems: "center"
  },
  notification_text: {
    color: "white",
    padding: 5
  },
  card_outer: {
    height: cardHeight,
    alignItems: "center"
  },
  card_inner: {
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  card_image_container: {
    width: 130,
    height: 100,
    overflow: "hidden",
    alignItems: "center"
  },
  card_image: {
    height: 100,
    width: 115,
    resizeMode: "contain"
  },
  card_content_outer: {
    width: 200,
    height: 100,
    justifyContent: "center",
    padding: 10
  },
  catd_content_main: {
    fontSize: 22,
    color: "#FFF"
  },
  card_content_left: {
    fontSize: 13
  },
  card_content_right: {
    fontSize: 13,
    color: "#515A5A"
  },
  required_bgcolor: {
    backgroundColor: "#F8AB19"//"#FAAC00"
  },
  required_updates_color: {
    color: "#FFF"
  },
  review_bgcolor: {
    backgroundColor: "#1991F8"//"028EFB"
  },
  review_updates_color: {
    color: "#FFF"
  },
  completed_bgcolor: {
    backgroundColor: "#12B25C"//"00B358"
  },
  completed_updates_color: {
    color: "#FFF"
  },
  rejected_bgcolor: {
    backgroundColor: "#FF3B00"//"FF0000"
  },
  rejected_updates_color: {
    color: "#FFF"
  },
  icon_font_awesome: {
    fontSize: 20
  }
});

export default ({ navigation, dashboard, servicesData, token, _onRefresh, state }) => {
  
  const loadServiceRequestsByStatus = statusId => {
    navigateToMyRequestWithTitleandLabel(statusId);
    servicesData({ statusId, token: token.token });
  };
  

  const navigateToMyRequestWithTitleandLabel = statusId => {
    switch (statusId) {
      case 1: {
        navigation.navigate("UserActions", {
          headerTitle: "Action Required",
          noDataLabel: "No new action required item available"
        });
        break;
      }
      case 2: {
        navigation.navigate("UserActions", {
          headerTitle: "In Review",
          noDataLabel: "Service not requested"
        });
        break;
      }

      case 3: {
        navigation.navigate("UserActions", {
          headerTitle: "Completed",
          noDataLabel: "No recent completed service request"
        });
        break;
      }
      case 4: {
        navigation.navigate("UserActions", {
          headerTitle: "Rejected",
          noDataLabel: "No recent rejected service request"
        });
        break;
      }
      default:
        break;
    }
  };
  return (
    <Container>
      <MyHeader navigation={navigation} header="Dashboard" />
        <ScrollView 
          refreshControl={
            <RefreshControl
              refreshing={state.Refreshing}
              onRefresh={_onRefresh}
            />
          } 
        >
        <View
          style={{
            flex: 1,
            backgroundColor: "#183E61",
            borderTopColor: "#34495E",
            borderTopWidth: 1,
            AlignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={{ flexDirection: "row", padding: 15 }}>
            <Icon
              style={{ color: "white", fontSize: 22 }}
              name="notifications"
            />
            <Text style={{ color: "white", fontSize: 17, paddingLeft: 8 }}>
              {" "}
              You have{" "}
              {dashboard.data
                ? dashboard.data.Tiles.ActionRequiredNewUpdateCount +
                  dashboard.data.Tiles.InReviewNewUpdateCount +
                  dashboard.data.Tiles.CompletedNewUpdateCount +
                  dashboard.data.Tiles.RejectedNewUpdateCount
                : 0}{" "}
              Updates{" "}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => loadServiceRequestsByStatus(1)}
          style={[styles.card_outer, styles.required_bgcolor]}
        >
          <View style={styles.card_inner}>
            <View style={styles.card_image_container}>
              <Image
                source={require("../../Assets/tickets/ticket_required.png")}
                style={styles.card_image}
              />
            </View>
            <View style={[styles.card_content_outer]}>
              <View>
                <Text style={styles.catd_content_main}>Action Required</Text>
              </View>
              {dashboard.data && (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.card_content_left,
                      styles.required_updates_color
                    ]}
                  >
                    {dashboard.data.Tiles.ActionRequiredNewUpdateCount} New updates
                  </Text>
                  <Text style={styles.card_content_right}>
                    {" "}
                  </Text>
                </View>
              )}
            </View>

            <IconFontAwesome
              style={[{ color: "#515A5A" }, styles.icon_font_awesome]}
              name="angle-double-right"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => loadServiceRequestsByStatus(2)}
          style={[styles.card_outer, styles.review_bgcolor]}
        >
          <View style={styles.card_inner}>
            <View style={styles.card_image_container}>
              <Image
                source={require("../../Assets/tickets/ticket_review.png")}
                style={styles.card_image}
              />
            </View>
            <View style={[styles.card_content_outer]}>
              <View>
                <Text style={styles.catd_content_main}>In Review</Text>
              </View>
              {dashboard.data && (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.card_content_left,
                      styles.review_updates_color
                    ]}
                  >
                    {dashboard.data.Tiles.InReviewNewUpdateCount} New updates
                  </Text>
                  <Text style={styles.card_content_right}>
                    {" "}
                  </Text>
                </View>
              )}
            </View>

            <IconFontAwesome
              style={[{ color: "#515A5A" }, styles.icon_font_awesome]}
              name="angle-double-right"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => loadServiceRequestsByStatus(3)}
          style={[styles.card_outer, styles.completed_bgcolor]}
        >
          <View style={styles.card_inner}>
            <View style={styles.card_image_container}>
              <Image
                source={require("../../Assets/tickets/ticket_completed.png")}
                style={styles.card_image}
              />
            </View>
            <View style={[styles.card_content_outer]}>
              <View>
                <Text style={styles.catd_content_main}>Completed</Text>
              </View>
              {dashboard.data && (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.card_content_left,
                      styles.completed_updates_color
                    ]}
                  >
                    {dashboard.data.Tiles.CompletedNewUpdateCount} New updates
                  </Text>
                  <Text style={styles.card_content_right}>
                    {" "}
                  </Text>
                </View>
              )}
            </View>

            <IconFontAwesome
              style={[{ color: "#515A5A" }, styles.icon_font_awesome]}
              name="angle-double-right"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => loadServiceRequestsByStatus(4)}
          style={[styles.card_outer, styles.rejected_bgcolor]}
        >
          <View style={styles.card_inner}>
            <View style={styles.card_image_container}>
              <Image
                source={require("../../Assets/tickets/ticket_rejected.png")}
                style={styles.card_image}
              />
            </View>
            <View style={[styles.card_content_outer]}>
              <View>
                <Text style={styles.catd_content_main}>Rejected</Text>
              </View>
              {dashboard.data && (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.card_content_left,
                      styles.rejected_updates_color
                    ]}
                  >
                    {dashboard.data.Tiles.RejectedNewUpdateCount} New updates
                  </Text>
                  <Text style={styles.card_content_right}>
                    {" "}
                  </Text>
                </View>
              )}
            </View>

            <IconFontAwesome
              style={[{ color: "#515A5A" }, styles.icon_font_awesome]}
              name="angle-double-right"
            />
          </View>
        </TouchableOpacity>
        </ScrollView>
    </Container>
  );
};

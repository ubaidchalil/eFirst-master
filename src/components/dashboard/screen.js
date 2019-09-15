import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  Dimensions,
  ScrollView
} from "react-native";
import { navigation } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
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
import EStyleSheet from "react-native-extended-stylesheet";
import MyHeader from "../../Header";
import { Col, Row, Grid } from "react-native-easy-grid";
import DashboardCard from "./card";

const { height, width } = Dimensions.get("window");
const cardHeight = (height - 202) / 4 < 150 ? 150 : (height - 202) / 4;

const entireScreenWidth = width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });
let styles = StyleSheet.create({});

export default ({
  navigation,
  dashboard,
  servicesData,
  token,
  _onRefresh,
  state
}) => {
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
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={state.Refreshing}
            onRefresh={_onRefresh}
          />
        }
      >
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={require("../../Assets/bg_all.jpg")}
        >
          <View
            style={{
              backgroundColor: "rgba(250, 250, 250, 0.13)",
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

          <Grid>
            <Row>
              <Col style={{}}>
                <DashboardCard
                  onPress={() => loadServiceRequestsByStatus(1)}
                  img={require("../../Assets/dashboard-action-req.png")}
                  title="Action Required"
                  color={"#971000"}
                  newUpdates={
                    dashboard.data &&
                    dashboard.data.Tiles.ActionRequiredNewUpdateCount
                  }
                />
              </Col>
              <Col>
                <DashboardCard
                  onPress={() => loadServiceRequestsByStatus(2)}
                  img={require("../../Assets/dashboard-inreview.png")}
                  title="In Review"
                  color={"#7500D5"}
                  newUpdates={
                    dashboard.data &&
                    dashboard.data.Tiles.InReviewNewUpdateCount
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <DashboardCard
                  onPress={() => loadServiceRequestsByStatus(3)}
                  img={require("../../Assets/dashboard-completed.png")}
                  title="Completed"
                  color={"#007f00"}
                  newUpdates={
                    dashboard.data &&
                    dashboard.data.Tiles.CompletedNewUpdateCount
                  }
                />
              </Col>
              <Col>
                <DashboardCard
                  onPress={() => loadServiceRequestsByStatus(4)}
                  img={require("../../Assets/dashboard-pending.png")}
                  title="Rejected"
                  color={"#ff0030"}
                  newUpdates={
                    dashboard.data &&
                    dashboard.data.Tiles.RejectedNewUpdateCount
                  }
                />
              </Col>
            </Row>
          </Grid>
        </ImageBackground>
      </ScrollView>
    </Container>
  );
};
const eStyles = EStyleSheet.create({
  containerStyle: {
    height: `500 rem`
  }
});

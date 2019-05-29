import React, { Component } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  Container,
  Picker,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Radio,
  Text,
  ListItem,
  Button,
  Textarea,
  Header,
  Left,
  Right,
  Body,
  Title
} from "native-base";
import { NavigationActions } from "react-navigation";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../../constants";
import Modal from "react-native-modal";
import MyHeader from "../../../../Header";

const styles = {
  item_margin: {
    marginTop: 5
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
};

const DocumentAttestation = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  token,
  navigation,
  state
}) => {

  componentDidUpdate = () => {
    
  };

  navigateToScreen = route => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    navigation.dispatch(navigateAction);
  };

  const  visa_options = {
    title: "Select Service",
    options: ["New Visa", "Renew Visa", "Visa Cancelation"],
    "New Visa" : {
      title: "Service Type",
      options : [
        "Entry Permit",
        "Change Status",
        "Visa Stamping",
        "Visa Full Pack"
      ],
      "Entry Permit": { 
        title: "Visa Type",
        options : [
          "Partner/Investor Visa",
          "Family Visa"
        ],
        "Partner/Investor Visa" : {
          title: "Location",
          options : [
            "Inside Country",
            "Outside Country"
          ]
        },
        "Family Visa" : {
          title: "Who is the Sponsor?",
          options : [
            "Partner/Investor",
            "Employee"
          ],
          "Partner/Investor" : {
            title: "Whom to Sponsor?",
            options : [
              "Husband/Wife",
              "Parents",
              "Child"
            ],
            "Husband/Wife" : {
              title : "Select Location",
              options : [
                "Inside Country",
                "Outside Country"
              ]
            },
            "Parents" : {
              title : "Select Parents",
              options : [
                "Mother",
                "Father",
                "Mother & Father"
              ]
            },
            "Child" : {
              title : "Select Child Age",
              options : [
                "Below 18",
                "Girl Above 18",
                "Boy 18 - 21",
                "Boy Above 21"
              ]
            }
          },
          "Employee" : {
            title: "Whom to Sponsor?",
            options : [
              "Husband/Wife",
              "Parents",
              "Child"
            ],
            "Husband/Wife" : {
              title : "Select Location",
              options : [
                "Inside Country",
                "Outside Country"
              ]
            },
            "Parents" : {
              title : "Select Parents",
              options : [
                "Mother",
                "Father",
                "Mother & Father"
              ]
            },
            "Child" : {
              title : "Select Child Age",
              options : [
                "Below 18",
                "Girl Above 18",
                "Boy 18 - 21",
                "Boy Above 21"
              ]
            }
          }
        }
      },
      "Change Status":{
        title: "Visa Type",
        options : [
          "Partner/Investor/Employee Visa",
          "Family Visa"
        ]
      },
      "Visa Stamping":{
        title: "Visa Type",
        options : [
          "Partner/Investor Visa",
          "Family Visa",
          "New Born"
        ],
        "Partner/Investor Visa" : {
          title: "Stamping Speed",
          options : [
            "Normal",
            "Urgent"
          ]
        },
        "Family Visa" : {
          title: "Who is the Sponsor?",
          options : [
            "Partner/Investor",
            "Employee"
          ],
          "Partner/Investor" : {
            title: "Stamping Speed",
            options : [
              "Normal",
              "Urgent"
            ]
          },
          "Employee" : {
            title: "Visa Duration",
            options : [
              "3 Years",
              "2 Years"
            ],
            "3 Years" : {
              title: "Stamping Speed",
              options : [
                "Normal",
                "Urgent"
              ]
            },
            "2 Years" : {
              title: "Stamping Speed",
              options : [
                "Normal",
                "Urgent"
              ]
            }
          }
        }
      },
      "Visa Full Pack" : {
        title: "Visa Type",
        options : [
          "Partner/Investor Visa",
          "Family Visa"
        ],
        "Partner/Investor Visa" : {
          title : "Select Location",
          options : [
            "Inside Country",
            "Outside Country"
          ],
          "Inside Country" : {
            title : "Medical Certificate Process Speed",
            options : [
              "Normal",
              "48 Hours",
              "24  Hours",
              "5 Hours"
            ]
          },
          "Outside Country" : {
            title : "Medical Certificate Process Speed",
            options : [
              "Normal",
              "48 Hours",
              "24  Hours",
              "5 Hours"
            ]
          }
        },
        "Family Visa" : {
          title: "Who is the Sponsor?",
          options : [
            "Partner/Investor",
            "Employee"
          ],
          "Partner/Investor" : {
            title: "Whom to Sponsor?",
            options : [
              "Husband/Wife",
              "Parents",
              "Child"
            ],
            "Husband/Wife" : {
              title : "Select Location",
              options : [
                "Inside Country",
                "Outside Country"
              ]
            },
            "Parents" : {
              title : "Select Parents",
              options : [
                "Mother",
                "Father",
                "Mother & Father"
              ]
            },
            "Child" : {
              title : "Select Child Age",
              options : [
                "Below 18",
                "Girl Above 18",
                "Boy 18 - 21",
                "Boy Above 21"
              ]
            }
          },
          "Employee" : {
            title: "Whom to Sponsor?",
            options : [
              "Husband/Wife",
              "Parents",
              "Child"
            ],
            "Husband/Wife" : {
              title : "Select Location",
              options : [
                "Inside Country",
                "Outside Country"
              ]
            },
            "Parents" : {
              title : "Select Parents",
              options : [
                "Mother",
                "Father",
                "Mother & Father"
              ]
            },
            "Child" : {
              title : "Select Child Age",
              options : [
                "Below 18",
                "Girl Above 18",
                "Boy 18 - 21",
                "Boy Above 21"
              ]
            }
          }
        
        }
        
      }
    },
    "Renew Visa" : {
      title: "Visa Type",
      options : [
        "Partner/Investor Visa",
        "Family Visa"
      ],
        "Partner/Investor Visa" : {
          title: "Renewal Process Speed",
          options : [
            "Normal",
            "Urgent"
          ]
        },
        "Family Visa" : {
          title: "Sponsor Type",
          options : [
            "Partner/Investor",
            "Employee"
          ],
          "Partner/Investor" : {
            title: "Whome to Renew",
            options : [
              "Partner/Investor",
              "Employee"
            ],
            "Partner/Investor" : {
              title: "Visa Duration",
              options : [
                "3 Years",
                "2 Years"
              ],
              "3 Years" : {
                title: "Renewal Process Speed",
                options : [
                  "Normal",
                  "Urgent"
                ]
              },
              "2 Years" : {
                title: "Renewal Process Speed",
                options : [
                  "Normal",
                  "Urgent"
                ]
              }
            },
            "Employee" : {
              title: "Visa Duration",
              options : [
                "3 Years",
                "2 Years"
              ],
              "3 Years" : {
                title: "Renewal Process Speed",
                options : [
                  "Normal",
                  "Urgent"
                ]
              },
              "2 Years" : {
                title: "Renewal Process Speed",
                options : [
                  "Normal",
                  "Urgent"
                ]
              }
            }
          },
          "Employee" : {
            title: "Whome to Renew",
            options : [
              "Partner/Investor",
              "Employee"
            ],
            "Partner/Investor" : {
              title: "Visa Duration",
              options : [
                "3 Years",
                "2 Years"
              ],
              "3 Years" : {
                title: "Renewal Process Speed",
                options : [
                  "Normal",
                  "Urgent"
                ]
              },
              "2 Years" : {
                title: "Renewal Process Speed",
                options : [
                  "Normal",
                  "Urgent"
                ]
              }
            },
            "Employee" : {
              title: "Visa Duration",
              options : [
                "3 Years",
                "2 Years"
              ],
              "3 Years" : {
                title: "Renewal Process Speed",
                options : [
                  "Normal",
                  "Urgent"
                ]
              },
              "2 Years" : {
                title: "Renewal Process Speed",
                options : [
                  "Normal",
                  "Urgent"
                ]
              }
            }
          }
        }
    },
    "Visa Cancelation" : {
      title: "Visa Type",
      options : [
        "Partner/Investor",
        "Family Visa"
      ],
      "Partner/Investor" : {
        title : "Select Location",
        options : [
          "Inside Country",
          "Outside Country"
        ]
      },
      "Family Visa" : {
        title : "Select Location",
        options : [
          "Inside Country",
          "Outside Country"
        ]
      }
    }
  };
  return (
    <Container>
      <MyHeader navigation={navigation} header="My Services" />

      <View
        style={{
          backgroundColor: "#F7F9F9",
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 10
        }}
      >
        <View>
          <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5 }}>
            VISA SERVICES
          </Text>
        </View>
        <Right>
        </Right>
      </View>
      <Content style={{ padding: 10 }}>
       
        <ScrollView>
          <Form>
            <Item>
              <Input
                placeholder="Name"
                name="CustomerName"
                label="Name"
                onChangeText={value => setFieldValue("CustomerName", value)}
                value={values.CustomerName}
                error={touched.CustomerName && errors.CustomerName}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.CustomerName && (
                <Text style={{ color: "red" }} visible={errors.CustomerName}>
                  {errors.CustomerName}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Input
                placeholder="Email"
                name="Email"
                label="Email"
                onChangeText={value => setFieldValue("Email", value)}
                value={values.Email}
                error={touched.Email && errors.Email}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.Email && (
                <Text style={{ color: "red" }} visible={errors.Email}>
                  {errors.Email}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Input
                placeholder="Mobile"
                name="PersonalPhone"
                label="Mobile"
                onChangeText={value => setFieldValue("PersonalPhone", value)}
                value={values.PersonalPhone}
                error={touched.PersonalPhone && errors.PersonalPhone}
                underlineColor={Color.secondary}
              />
              <Input
                placeholder="Office"
                name="Office"
                label="Office"
                onChangeText={value => setFieldValue("OfficePhone", value)}
                value={values.OfficePhone}
                error={touched.OfficePhone && errors.OfficePhone}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.PersonalPhone && (
                <Text style={{ color: "red" }} visible={errors.PersonalPhone}>
                  {errors.PersonalPhone}
                </Text>
              )}
              {errors.OfficePhone && (
                <Text style={{ color: "red" }} visible={errors.OfficePhone}>
                  {errors.OfficePhone}
                </Text>
              )}
            </Item>
            


            <Item style={styles.item_margin}>
              <Textarea
                rowSpan={5}
                placeholder="Address Line 1"
                underline
                name="Address"
                label="Address"
                onChangeText={value => setFieldValue("Address", value)}
                value={values.Address}
                error={touched.Address && errors.Address}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.Address && (
                <Text style={{ color: "red" }} visible={errors.Address}>
                  {errors.Address}
                </Text>
              )}
            </Item>

            <Item style={styles.item_margin}>
              <Input
                placeholder="Street"
                name="Street"
                label="Street"
                onChangeText={value => setFieldValue("Street", value)}
                value={values.Street}
                error={touched.Street && errors.Street}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.Street && (
                <Text style={{ color: "red" }} visible={errors.Street}>
                  {errors.Street}
                </Text>
              )}
            </Item>
            
            
            <Item style={styles.item_margin}>
              <Input
                placeholder="City"
                name="City"
                label="City"
                onChangeText={value => setFieldValue("City", value)}
                value={values.City}
                error={touched.City && errors.City}
                underlineColor={Color.secondary}
              />
              <Input
                placeholder="PO Box"
                name="POBox"
                label="POBox"
                onChangeText={value => setFieldValue("POBox", value)}
                value={values.POBox}
                error={touched.POBox && errors.POBox}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.City && (
                <Text style={{ color: "red" }} visible={errors.City}>
                  {errors.City}
                </Text>
              )}
              {errors.POBox && (
                <Text style={{ color: "red" }} visible={errors.POBox}>
                  {errors.POBox}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Input
                placeholder="Country"
                name="Country"
                label="Country"
                onChangeText={value => setFieldValue("Country", value)}
                value={values.Country}
                error={touched.Country && errors.Country}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.Country && (
                <Text style={{ color: "red" }} visible={errors.Country}>
                  {errors.Country}
                </Text>
              )}
            </Item>

            
            <Button
              style={{ backgroundColor: "#183E61", marginBottom: 50 }}
              full
              rounded
              onPress={() => { navigation.navigate("VisaServceType", { options: visa_options }) }}
            >
              <Text>Next</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
};

export default withFormik({
  mapPropsToValues: ({
    
  }) => ({
    
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    
  }),

  handleSubmit: (values, { props }) => {
    
  }
})(DocumentAttestation);

import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

import { Item, Icon, Text } from "native-base";
const TermsAndCondition = ({ setShowTerms }) => (
  <View style={styles.modalContent}>
    <Item style={{ flexDirection: "row", padding: 7 }}>
      <View
        style={{
          flexDirection: "row",
          fontSize: 17,
          padding: 10,
          paddingHorizontal: 15,
          flex: 0.9,
          fontWeight: "bold"
        }}
      >

        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Terms and Condition
        </Text>

      </View>
      <TouchableOpacity
        style={{ flex: 0.1 }}
        onPress={() => {
          setShowTerms(false);
        }}
      >
        <Icon name="close" />
      </TouchableOpacity>
    </Item>
    <ScrollView>
    <View style={{ padding: 20 }}>
      <Text  style={styles.txtNormal} >

       Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the <Text style={styles.txtBold} >“https://app.efirst.ae”</Text> website and the <Text style={styles.txtBold} >“Efirst”</Text> mobile application (the "Service") operated by <Text style={styles.txtBold} >“EMIRATES FIRST BUSINESS SERVICE LLC</Text> ("us", "we", or "our")”.
       </Text>
       <Text style={styles.txtNormal} >
Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
        </Text>
        <Text style={styles.txtNormal} >
        <Text style={styles.txtBold} >
By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
        </Text>
        </Text>
        <Text style={styles.txtTitle} >
Govt. fees and Service charges
        </Text>
        <Text style={styles.txtNormal} >
Our charges includes Govt. fees which will be the exact charges mentioned <Text style={styles.txtRedUnderline} >as per the UAE government norms</Text> and there will a service charge which is mentioned separately with the price.
</Text>
<Text style={styles.txtTitle} >
Purchases
</Text>
<Text  style={styles.txtNormal} >
If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, and your billing address. Credit card information is always encrypted during transfer over networks.
</Text>
<Text  style={styles.txtNormal} >
You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.
</Text>
<Text  style={styles.txtNormal} >
The Service may employ the use of third-party services for the purpose of facilitating payment and the completion of any Purchase. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.
</Text>
<Text  style={styles.txtNormal} >
We reserve the right to refuse or cancel your order at any time for reasons including but not limited to product or service availability, errors in the description or price of the product or service, error in your order or other reasons.
</Text>
<Text  style={styles.txtNormal} >
We reserve the right to refuse or cancel your order if we have reason, in our sole discretion, to suspect fraud or an unauthorized or illegal transaction is suspected.
</Text>
<Text  style={styles.txtTitle} >
Availability, Errors and Inaccuracies
</Text>
<Text  style={styles.txtNormal} >
We are constantly updating our offerings of products and services on the Service. The products or services available on our Service may be mispriced, described inaccurately, or unavailable, and we may experience delays in updating information on the Service and in our advertising on other web sites. You expressly agree that any such offer of a product or service does not constitute a legal offer capable of attracting legal consequences.
</Text>
<Text  style={styles.txtNormal} >
We cannot and do not guarantee the accuracy or completeness of any information, including prices, product images, specifications, availability, and services. We reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice. Section "Availability, Errors and Inaccuracies" is without prejudice to existing statutory rights.
</Text>

<Text  style={styles.txtTitle} >
Price Changes
</Text>
<Text  style={styles.txtNormal} >
<Text  style={styles.txtBold} >Efirst</Text> in its sole discretion and at any time, may modify the prices for the Services. Any Service price change will become effective soon after we update it.
</Text>
<Text  style={styles.txtNormal} >
<Text  style={styles.txtBold} >Efirst</Text> will provide you with a reasonable prior notice of any change in Subscription prices to give you an opportunity to terminate your Subscription before such change becomes effective.
</Text>
<Text  style={styles.txtNormal} >
Your continued use of the Service after the Subscription price change comes into effect constitutes your agreement to pay the modified Subscription price amount.
</Text>

<Text  style={styles.txtTitle} >
Refunds
</Text>
<Text  style={styles.txtNormal} >
Refunds are available in case your service requests are rejected due to any documents issues or any other. <Text  style={styles.txtRedItalic} >To process your refund, we will be contacting by manually or you can send a message to the admin with your email and order number which you received to your email after purchase.</Text>
</Text>
<Text  style={styles.txtNormal} >
Certain refund requests may be considered by Efirst on a case-by-case basis and granted in sole discretion of Efirst.
</Text>

<Text  style={styles.txtTitle} >
Accounts</Text>
<Text  style={styles.txtNormal} >
When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
</Text>
<Text  style={styles.txtNormal} >
You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
</Text>
<Text  style={styles.txtNormal} >
You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene. You expressly agree that we cannot be held liable for any loss or damage arising out of any misrepresentations you make in this regard.
</Text>

<Text  style={styles.txtTitle} >
Intellectual Property
</Text>
<Text  style={styles.txtNormal} >
The Service and its original content, features and functionality are and will remain the exclusive property of <Text  style={styles.txtBold} >Efirst</Text> and its licensors. The Service is protected by copyright, trademark, and other laws of UAE. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of <Text  style={styles.txtBold} >Efirst</Text>.
</Text>
<Text  style={styles.txtNormal} >

</Text>
<Text  style={styles.txtTitle} >
Content
</Text>
<Text  style={styles.txtNormal} >
Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the …
</Text>
<Text  style={styles.txtTitle} >
Links to Other Web Sites
</Text>
<Text  style={styles.txtNormal} >
Our Service may contain links to third-party web sites or services that are not owned or controlled by <Text  style={styles.txtBold} >“EMIRATES FIRST BUSINESS SERVICE LLC”.</Text>
</Text>
<Text  style={styles.txtNormal} >
<Text  style={styles.txtBold} >“EMIRATES FIRST BUSINESS SERVICE LLC”</Text> has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that <Text  style={styles.txtBold} >“EMIRATES FIRST BUSINESS SERVICE LLC”</Text> shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
</Text>
<Text  style={styles.txtTitle} >
Disclaimer
</Text>
<Text  style={styles.txtNormal} >
Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
</Text>
<Text  style={styles.txtNormal} >
<Text  style={styles.txtBold} >Efirst</Text> its subsidiaries, affiliates, and its licensors do not warrant that <Text  style={styles.txtRedUnderline} >a) the Service will function within a time period, secure or available at any particular time or location;</Text> b) any errors or defects will be corrected; c) the results of using the Service will meet your requirements.
</Text>
<Text  style={styles.txtTitle} >
Governing Law
</Text>
<Text  style={styles.txtNormal} >
These Terms shall be governed and construed in accordance with the laws of UAE, without regard to its conflict of law provisions.
</Text>
<Text  style={styles.txtNormal} >
Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
</Text>
<Text  style={styles.txtTitle} >
Termination
</Text>
<Text  style={styles.txtNormal} >
We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
</Text>
<Text  style={styles.txtNormal} >
Upon termination, your right to use the Service will immediately cease.
</Text>
<Text  style={styles.txtTitle} >
Changes
</Text>
<Text  style={styles.txtNormal} >
We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 15 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
</Text>
<Text  style={styles.txtTitle} >

Contact Us
</Text>
<Text  style={styles.txtNormal} >
If you have any questions about these Terms, please contact us.

      </Text>
    </View>
    </ScrollView>
  </View>
);
export default TermsAndCondition;
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  txtNormal : {
    paddingTop: 5,
    fontSize: 13
  },
  txtBold : {
    fontSize: 13,
    fontWeight: "bold"
  },
  txtTitle : {
    paddingTop: 5,
    fontSize: 13,
    fontWeight: "bold",
    textDecorationLine: 'underline'
  },
  txtRedUnderline : {
    fontSize: 13,
    fontWeight: "bold",
    textDecorationLine: 'underline',
    color: "red",
    fontStyle: "italic"
  },
  txtRedItalic : {
    fontSize: 13,
    fontWeight: "bold",
    color: "red",
    fontStyle: "italic"
  }
});

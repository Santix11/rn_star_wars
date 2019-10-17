const React = require("react-native");
const { Dimensions } = React;
const width = Dimensions.get("window").width;
export default {
  containerImage: {
    width: null,
    height: null,
    flex: 1
  },
  card: {
    backgroundColor: "transparent",
    elevation: 0
  },
  // cardView: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#9BA3A7",
  //   height: 180
  // },

  cardView: {
    borderRadius: 10,
    borderColor: '#01C89E',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#fff'
  },

  cardHeader: {
    backgroundColor: "transparent",
    paddingBottom: 10,
    height: 65,
    marginTop: 10
  },
  cardItem: {
    backgroundColor: "transparent", flex: 1, flexDirection: "row", justifyContent: "space-around"
  },
  cardItem2: {
    backgroundColor: "transparent", flex: 1, flexDirection: "column", justifyContent: "space-around",justifyContent: 'center',
    alignItems: 'center'
  },
  date: {
    textAlign: "right",
    fontSize: 10,
    fontWeight: "400"
  },

  button: {
    height: 33,
    width: 140,
    marginTop: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 11,
    color: 'white'
  },

  listContentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    flex: 1,
  },

  footer: {
    width,
    flexDirection: "row",
    // height: 100,
    // borderWidth: 0,
    // alignSelf: "stretch",
    // alignItems: "center",
    // justifyContent: "space-around",
    backgroundColor: "#616D74"
  },
  footerText: {
    color: 'white'
  },
};

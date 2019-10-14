import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    flex: 1,
    width: width,
    height: 500
  },
  backButton: {
    position: "absolute",
    left: 5,
    top: 5
  },
  spinner: {
    position: "absolute"
  },
  detailView: {
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingHorizontal: 10,
    flexDirection: "row"
  },
  detailViewImage: {
    width: 50,
    height: 50
  }
});
export default styles;

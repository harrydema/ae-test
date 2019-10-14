// @flow
import * as React from "react";
import { View, Text, ActivityIndicator, Share } from "react-native";
import DetailView from "../../screens/DetailView";
import { connect } from "react-redux";
import { fetchPictureDetails } from "./actions";
import { selectHiResImage } from "./selectors";

export interface Props {
  navigation: any;
  fetchPictureDetails: Function;
  isLoading: boolean;
  hiResImage: Function;
}
export interface State {
  imageUrl: string;
}

class DetailViewContainer extends React.Component<Props, State> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "transparent",
      position: "absolute",
      height: 50,
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0
    },
    headerTintColor: "#FFF"
  };

  componentDidMount() {
    const { navigation, fetchPictureDetails } = this.props;
    const { pictureDetails } = navigation.state.params;
    console.log(pictureDetails);
    if (!this.props.hiResImage(pictureDetails.id)) {
      fetchPictureDetails(pictureDetails.id);
    }
  }

  share = async (imageId: number): void => {
    const { pictureDetails } = this.props.navigation.state.params;
    const { hiResImage } = this.props;
    await Share.share({
      message: hiResImage(pictureDetails.id).full_picture
    });
  };

  applyFilter = (type): void => {
    // TODO: implement apply image filter function
  };

  render() {
    const { pictureDetails } = this.props.navigation.state.params;
    const { isLoading, hiResImage } = this.props;
    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (!isLoading && !hiResImage(pictureDetails.id)) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text>There was an error when trying to get the image.</Text>
        </View>
      );
    }

    return (
      <DetailView
        imageUrl={hiResImage(pictureDetails.id).full_picture}
        author={hiResImage(pictureDetails.id).author}
        camera={hiResImage(pictureDetails.id).camera}
        pictureDetails={pictureDetails}
        shareCallback={this.share}
        isLoading={isLoading}
        applyFilterCallback={this.applyFilter}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchPictureDetails: imageId => dispatch(fetchPictureDetails(imageId))
  };
}

const mapStateToProps = state => ({
  hiResImage: imageId => selectHiResImage(state, imageId),
  isLoading: state.detailViewReducer.isLoading
});

export default connect(
  mapStateToProps,
  bindAction
)(DetailViewContainer);

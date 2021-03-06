// @flow
import * as React from "react";
import { View, Image, Dimensions } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import styles from "./styles";
import DetailsFooter from "./components/DetailsFooter";

type Props = {
  imageUrl: string,
  isLoading: boolean,
  shareCallback: Function,
  applyFilterCallback: Function,
  pictureDetails: Object
};

// TODO: it would be great to see here loader, pinch to zoom here and pan

class DetailView extends React.PureComponent<Props> {
  render() {
    const {
      imageUrl,
      isLoading,
      shareCallback,
      applyFilterCallback,
      pictureDetails,
      author,
      camera
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageZoom
            cropWidth={Dimensions.get("window").width}
            cropHeight={Dimensions.get("window").height}
            imageWidth={Dimensions.get("window").width}
            imageHeight={500}
            panToMove
          >
            <Image
              source={{ uri: imageUrl }}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </ImageZoom>
        </View>
        <DetailsFooter
          pictureDetails={pictureDetails}
          shareCallback={shareCallback}
          applyFilterCallback={applyFilterCallback}
          author={author}
          camera={camera}
        />
      </View>
    );
  }
}

export default DetailView;

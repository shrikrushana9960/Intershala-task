import React, { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import { Image } from "antd";

const PostCard = ({ item }) => {
  const [tags, setTags] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading
  const [color, setColor] = useState("");

  function getRandomColor() {
    // Generate random values for red, green, and blue components
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // Construct the CSS color string
    var color = "rgb(" + r + ", " + g + ", " + b + ")";

    return color;
  }
  function colorToBase64(color) {
    // Create a temporary canvas element
    var canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    var ctx = canvas.getContext("2d");

    // Fill a pixel with the given color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);

    // Get the image data
    var imageData = ctx.getImageData(0, 0, 1, 1);

    // Convert the image data to Base64
    var base64 = canvas.toDataURL(); // defaults to PNG format

    // Clean up
    canvas = null;

    return base64;
  }
  useEffect(() => {
    if (item) {
      setColor(colorToBase64(getRandomColor()));

      let dataTags = "";
      item?.tags?.map((item) => {
        dataTags += " #" + item;
      });

      setTags(dataTags);
    }
  }, [item]);

  const handleImageLoad = (e) => {
    setImageLoaded(true); // Set imageLoaded to true when image is loaded
  };

  return (
    <div
     
      style={{ marginBottom: "10px", width: "100%", overflow: "hidden" }}
    
    >
      {item.link && (
        <Chip
          style={{
            background: "green",
            fontFamily: "Outfit",
            borderRadius: "5px",
            float: "right",
            color: "white",
            marginBottom: "-45px",
            marginRight: "5px",
            marginTop: "5px",
            position: "relative",
            zIndex: "1",
          }}
          label={item.vendorType || "Service"}
        ></Chip>
      )}

      {item.type == "image" ? (
        <Image
          loading="lazy"
          src={item.uri}
          alt={imageLoaded && item?.tags?.[0]}
          style={{
            height: "300px",
            width: "100%",
            // display:imageLoaded?"block":"none",
            overflow: "hidden",
            borderRadius: "5px",
            objectFit: "cover",
          }}
          preview={{
            visible: false,
            onVisibleChange: () => {},
          }}
          objectFit="cover"
          fallback={color}
          onLoad={handleImageLoad} // Call handleImageLoad when image is loaded
        />
      ) : (
        <video
          style={{
            height: "300px",
            width: "100%",
            borderRadius: "5px",
            objectFit: "cover",
            overflow: "hidden",
          }}
          // controls
        >
          {" "}
          <source src={item.uri} type="video/mp4"></source>
        </video>
      )}
      <div
        style={{
          fontFamily: "Outfit",
          fontSize: "13px",
          color: "black",
          fontWeight: "bold",
          maxHeight: "50px",
          gap: "5px",
          marginTop: "5px",
          maxHeight: "100px",
          overflow: "hidden",
        }}
      >
        {item.desc}
      </div>
      <div
        style={{
          fontFamily: "Outfit",
          fontSize: "13px",
          color: "gray",

          gap: "5px",
          height: "18px",
          overflow: "clip",
          marginTop: "5px",
        }}
      >
        {tags}
      </div>
    </div>
  );
};

export default PostCard;

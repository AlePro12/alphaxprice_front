import { useEffect, useState } from "react";
import { useMediaQuery, Context as ResponsiveContext } from "react-responsive";

const Desktop = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: "portrait" });
  const isRetina = useMediaQuery({ minResolution: "2dppx" });

  console.log("isDesktopOrLaptop: " + isDesktopOrLaptop);
  console.log("isBigScreen: " + isBigScreen);
  console.log("isTabletOrMobile: " + isTabletOrMobile);
  console.log("isPortrait: " + isPortrait);

  //edit Body class
  useEffect(() => {
    if (isDesktopOrLaptop) {
      document.body.classList.add("desktop");
    } else {
      document.body.classList.remove("desktop");
    }
  }, [isDesktopOrLaptop]);
  useEffect(() => {
    if (isBigScreen) {
      document.body.classList.add("bigScreen");
    } else {
      document.body.classList.remove("bigScreen");
    }
  }, [isBigScreen]);
  useEffect(() => {
    if (isTabletOrMobile) {
      document.body.classList.add("tabletOrMobile");
    } else {
      document.body.classList.remove("tabletOrMobile");
    }
  }, [isTabletOrMobile]);
  //get width and height of window
  const [Screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  return <div style={{}}>{children}</div>;
};
export default Desktop;

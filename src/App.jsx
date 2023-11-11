import { Route, Routes } from "react-router-dom";
import Header from "./pages/layouts/header";
import Home from "./pages/screens/Home/home";
import DrumKit from "./pages/screens/Drum-kit/drumKit";
import Clock from "./pages/screens/clock/clock";
import Variables from "./pages/screens/variables/variables";
import ArrayCardio1 from "./pages/screens/arrayCardio1/ArrayCardio1";
import FlexPanelGallery from "./pages/screens/flexPanelGallery/flexPanelGallery";
import TypeAhead from "./pages/screens/typeAhead/typeAhead";
import ArrayCardio2 from "./pages/screens/arrayCardio2/arrayCardio2";
import ScrollToTop from "./scrollToTop";
import CanvasPainting from "./pages/screens/canvasPainting/canvasPainting";
import DevTools from "./pages/screens/devToolsDomination/devTools";
import CheckBoxes from "./pages/screens/checkBoxes/checkBoxes";
import VideoPlayer from "./pages/screens/videoPlayer/videoPlayer";
import NotFound from "./pages/not-found/NotFound";

function App() {
  return (
    <>
      <Header />

      <ScrollToTop />

      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/drum-kit" element={<DrumKit />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/variables" element={<Variables />} />
        <Route path="/array-cardio-1" element={<ArrayCardio1 />} />
        <Route path="/flex-panel-gallery" element={<FlexPanelGallery />} />
        <Route path="/type-ahead" element={<TypeAhead />} />
        <Route path="/array-cardio-2" element={<ArrayCardio2 />} />
        <Route path="/canvas-painting" element={<CanvasPainting />} />
        <Route path="/dev-tools" element={<DevTools />} />
        <Route path="/checkboxes" element={<CheckBoxes />} />
        <Route path="/video-player" element={<VideoPlayer />} />


        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;

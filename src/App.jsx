import './App.css'
import TopHeader from "./components/TopHeader/TopHeader.jsx";
import Slider from "./components/Slider/Slider.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Facilities from "./components/Facilities/Facilities.jsx";
import SlotTime from "./components/Slot/SlotTime.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import WhatsappFloating from "./components/Utils/WhatsappFloating.jsx";

const App = () => {

  return (
    <>
      <TopHeader/>
      <Slider/>
      <AboutUs/>
      <Facilities/>
      <SlotTime/>
      <Contact/>
      <Footer/>
      <WhatsappFloating/>
    </>
  )
}

export default App

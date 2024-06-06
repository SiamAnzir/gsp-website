import whatsapp from "../../assets/Whatsapp.png";

const WhatsappFloating = () => {
    return (
        <div className="floating-whatsapp">
            <a
                href="https://api.whatsapp.com/send/?phone=%2B8801727437077&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
            >
                <img src={whatsapp} alt="whatsapp" className="w-100" />
            </a>
        </div>
    );
};

export default WhatsappFloating;
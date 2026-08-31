import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { WHATSAPP_URL } from "../../store/site.js";

/**
 * Swapped from a PNG to the FontAwesome glyph already in the bundle: it stays
 * crisp at any density and drops an image request from every page load.
 */
const WhatsappFloating = () => (
  <a
    className="floating-whatsapp"
    href={WHATSAPP_URL}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat with us on WhatsApp"
  >
    <FontAwesomeIcon icon={faWhatsapp} />
    <span className="floating-whatsapp__label">Chat with us</span>
  </a>
);

export default WhatsappFloating;

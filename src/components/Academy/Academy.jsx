import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTrophy } from "@fortawesome/free-solid-svg-icons";
import Reveal from "../Utils/Reveal.jsx";
import Picture from "../Utils/Picture.jsx";
import Lightbox from "../Utils/Lightbox.jsx";
import media from "../../store/media.json";
import { ACADEMY, ACADEMY_VIDEOS, BOOKING_URL } from "../../store/site.js";

/**
 * Gallery tiles come straight from the generated manifest, so adding a photo is
 * a matter of dropping it in src/assets/_originals/academy/ and re-running
 * `npm run optimize:images` — no code change here.
 *
 * The set is deliberately mixed orientation (portrait phone shots alongside the
 * older landscape posts), which is why the layout below is masonry rather than
 * a fixed-ratio grid: cropping every portrait to a landscape cell cut the
 * players out of the frame.
 */
const GALLERY = media.academy.map((item, i) => ({
  name: item.name,
  alt: `Galacticos Sports Academy — photo ${i + 1}`,
}));

const VIDEOS = ACADEMY_VIDEOS.map((v) => ({ ...v, type: "video" }));

/**
 * Squad photo beside the intro copy. Named rather than positional so the intro
 * keeps a deliberate image, with a fallback so the section still renders if that
 * file is replaced. It must be one of the landscape sources — the 4:3 frame
 * would crop the players out of a vertical phone shot.
 */
const FEATURE = GALLERY.find((p) => p.name === "img-0773") ?? GALLERY[0];

/** "Stephen Kadogo" -> "SK", for the placeholder badge on coach cards. */
const initials = (name) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

const Academy = () => {
  const [photoIndex, setPhotoIndex] = useState(null);
  const [videoIndex, setVideoIndex] = useState(null);

  return (
    <section id="academy" className="section">
      <Container>
        {/* ---------------------------------------------------------- header */}
        <Reveal className="academy-intro">
          {/*
            Derived from src/assets/academy-logo.png: the supplied file is a
            black plate with the lettering knocked out to transparent, sitting in
            a mostly-empty square canvas — invisible on this dark background. The
            version served here is trimmed to the wordmark and colour-inverted,
            so it reads as a white badge with the page showing through the type.
          */}
          {/* The wordmark carries the name, so it is the heading rather than
              sitting above a duplicate text version of itself. */}
          <h2 className="academy-intro__name">
            <img
              src="/media/academy-logo.png"
              alt={ACADEMY.name}
              className="academy-intro__logo"
              width={1307}
              height={235}
            />
          </h2>
          <p className="academy-intro__tagline">{ACADEMY.tagline}</p>
        </Reveal>

        <Reveal className="academy-stats" delay={80}>
          {ACADEMY.stats.map((stat) => (
            <div key={stat.label} className="academy-stat">
              <span className="academy-stat__value">{stat.value}</span>
              <span className="academy-stat__label">{stat.label}</span>
            </div>
          ))}
        </Reveal>

        {/* ----------------------------------------------------------- intro */}
        <Row className="align-items-center g-4 g-lg-5 mt-2">
          <Col lg={6}>
            <Reveal variant="left">
              {ACADEMY.intro.map((paragraph, i) => (
                <p key={i} className={i === 0 ? "lead-text" : "body-text"}>
                  {paragraph}
                </p>
              ))}
              <ul className="attribute-pills">
                {ACADEMY.attributes.map((attribute) => (
                  <li key={attribute}>{attribute}</li>
                ))}
              </ul>
            </Reveal>
          </Col>
          <Col lg={6}>
            <Reveal variant="right" delay={80}>
              <div className="academy-feature">
                <Picture
                  section="academy"
                  name={FEATURE?.name}
                  alt="Galacticos Sports Academy squad on the pitch"
                  sizes="(max-width: 991px) 92vw, 46vw"
                />
              </div>
            </Reveal>
          </Col>
        </Row>

        {/* ------------------------------------------------ vision & mission */}
        <Row className="g-4 mt-3 mt-lg-4">
          {[ACADEMY.vision, ACADEMY.mission].map((block, i) => (
            <Col md={6} key={block.title}>
              <Reveal className="purpose-card h-100" delay={i * 80}>
                <h3 className="purpose-card__title">{block.title}</h3>
                {block.body.map((paragraph, j) => (
                  <p key={j} className="body-text">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </Col>
          ))}
        </Row>

        {/* ---------------------------------------------------- coaching team */}
        <Reveal className="academy-subhead">
          <h3>Our Coaching Team</h3>
          <p className="body-text">{ACADEMY.coachesIntro}</p>
        </Reveal>

        <Row className="g-4">
          {ACADEMY.coaches.map((coach, i) => (
            <Col md={6} lg={4} key={coach.name}>
              <Reveal className="coach-card h-100" delay={(i % 3) * 80}>
                {coach.photo ? (
                  <img
                    src={coach.photo}
                    alt={coach.name}
                    className="coach-card__photo"
                  />
                ) : (
                  <span className="coach-card__badge" aria-hidden="true">
                    {initials(coach.name)}
                  </span>
                )}
                <h4 className="coach-card__name">{coach.name}</h4>
                <p className="coach-card__role">{coach.role}</p>
                <p className="coach-card__bio">{coach.bio}</p>
              </Reveal>
            </Col>
          ))}
        </Row>

        {/* ------------------------------------------------ more than football */}
        <Reveal className="beyond-band">
          <FontAwesomeIcon icon={faTrophy} className="beyond-band__icon" />
          <h3 className="beyond-band__title">{ACADEMY.beyond.title}</h3>
          <p className="beyond-band__lead">{ACADEMY.beyond.lead}</p>
          {ACADEMY.beyond.body.map((paragraph, i) => (
            <p key={i} className="body-text">
              {paragraph}
            </p>
          ))}
          <p className="beyond-band__closing">{ACADEMY.beyond.closing}</p>
        </Reveal>

        {/* ----------------------------------------------------------- videos */}
        <Reveal className="academy-subhead">
          <h3>Inside the Academy</h3>
        </Reveal>

        <Row className="g-3 g-lg-4">
          {VIDEOS.map((video, i) => (
            <Col xs={6} lg={3} key={video.id}>
              <Reveal delay={(i % 4) * 70}>
                <button
                  type="button"
                  className="video-tile"
                  onClick={() => setVideoIndex(i)}
                  aria-label={`Play ${video.title}`}
                >
                  {/* Poster only — no <video> mounts until the clip is opened,
                      so the page never downloads footage nobody asked for. */}
                  <img
                    src={video.poster}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="video-tile__play" aria-hidden="true">
                    <FontAwesomeIcon icon={faPlay} />
                  </span>
                  <span className="video-tile__title">{video.title}</span>
                </button>
              </Reveal>
            </Col>
          ))}
        </Row>

        {/* ---------------------------------------------------------- gallery */}
        <Reveal className="academy-subhead">
          <h3>Gallery</h3>
        </Reveal>

        <div className="photo-masonry">
          {GALLERY.map((photo, i) => (
            <button
              type="button"
              key={photo.name}
              className="photo-tile"
              onClick={() => setPhotoIndex(i)}
              aria-label={`View ${photo.alt}`}
            >
              <Picture
                section="academy"
                name={photo.name}
                alt={photo.alt}
                sizes="(max-width: 575px) 46vw, (max-width: 991px) 31vw, 23vw"
              />
              <span className="photo-tile__hint" aria-hidden="true">
                View
              </span>
            </button>
          ))}
        </div>

        {/* ------------------------------------------------------------- cta */}
        <Reveal className="d-flex justify-content-center mt-5">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="cta-button cta-button--pulse"
          >
            Register Now
          </a>
        </Reveal>
      </Container>

      <Lightbox
        section="academy"
        items={GALLERY}
        index={photoIndex}
        onClose={() => setPhotoIndex(null)}
        onNavigate={setPhotoIndex}
        label="photo"
      />
      <Lightbox
        items={VIDEOS}
        index={videoIndex}
        onClose={() => setVideoIndex(null)}
        onNavigate={setVideoIndex}
        label="clip"
      />
    </section>
  );
};

export default Academy;

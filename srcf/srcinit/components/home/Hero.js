import { memo } from 'brace-jsx'
const Hero = () => {
  return (
    <section class="hero">
      <div class="col-1">
        <div class="img-bg" animate={{
          keyframes: [
          {opacity: 0},
          {opacity: 0},
          {opacity: 1},
          ],
          options: {
            duration: 1300,
            fill: 'forwards'
          },
          onviewPort: true
        }}></div>
        <div class="hero-image">
          <img src="./logo.png" alt="" />
        </div>
      </div>
      <div class="col-2">
        <div>
          <div class="doc-btns">
            <div class="why">
              <span class="bi bi-play-circle-fill"></span>
              <span> Why Brace</span>
            </div>
            <button>
              <span>Get Started</span>
              <span class="bi bi-arrow-right"></span>
            </button>
            <button>
              <span>Install</span>
            </button>
          </div>
          <div class="headline" animate={{
            keyframes: [
            {transform: 'scale(0.5)'},
            {transform: 'scale(1)'},
            ],
            options: {
              duration: 400,
            },
            onviewPort: true
          }}>The JavaScript Centered UI Library</div>
          <p class="tagline">
            Write everything in JavaScript, Compile to HTML, CSS and JS
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);

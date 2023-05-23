import { memo } from "brace-jsx"
const Content = () => {
  return (
    <section class="content">
      <div class="sponsors">
        <h3>Sponsors</h3>
        <div class="sponsors-list">
          <div>
            <div class="sponsor"></div>
            <div class="sponsor"></div>
            <div class="sponsor"></div>
            <div class="sponsor"></div>
            <div class="sponsor"></div>
            <div class="sponsor"></div>
            <div class="sponsor"></div>
            <div class="sponsor"></div>
            <div class="sponsor"></div>
            <div class="sponsor"></div>
          </div>
        </div>
      </div>
      <div class="features">
        <div>
          <h4>Performant</h4>
          <p>
            Optimized for speed and efficiency, ensuring that UI components
            render quickly and smoothly.
          </p>
        </div>
        <div>
          <h4>Reliant</h4>
          <p>
            Works consistently across different browsers and devices, providing
            a reliable experience for users.
          </p>
        </div>
        <div>
          <h4>Approachable</h4>
          <p>
            User-friendly API and clear documentation, making it easy for
            developers of all skill levels to use and customize.
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Content);

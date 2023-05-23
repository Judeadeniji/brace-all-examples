import { createData, memo } from "brace-jsx";

const showModal = createData(false);

function Header({ name }) {
  return (
    <header>
      <div class="left">
        <div class="brand">
          <div class="logo">
            <span class="bi bi-braces highlight"></span>
          </div>
          <h1>Brace&nbsp;JS</h1>
        </div>
        <div class="search">
          <span class="bi bi-search"></span>
          <input type="search" name="" id="" value="" placeholder="Search" />
        </div>
      </div>
      <div class="right">
        <div class="nav-links">
          <div class="menu-btn" on:click={() => showModal.set(!showModal())}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="menu-modal" style={{display: showModal() ? 'block' :
          'none'}} animate={{
            keyframes: [
            {
              opacity: 0.4,
              top: '50px'
            },
            {
              opacity: 1,
              top: '60px'
            },
            ],
            options: {
              duration: 100,
              fill: 'forwards',
              direction: 'alternate'
            }
          }}>
            <div class="appearance">
              <p>Appearance</p>
              <span class="bi bi-sun"></span>
            </div>
            <div class="divider"></div>
            <div class="icons">
              <span class="bi bi-github"></span>
              <span class="bi bi-twitter"></span>
            </div>
          </div>
        </div>
        <div class="nav-links lg">
          <a href="#" class="link">
            guide
          </a>
          <a href="#" class="link">
            repl
          </a>
          <a href="#" class="link">
            chat
          </a>
          <a href="#" class="link">
            contribute
          </a>
          <span class="bi bi-three-dots">
            {<div class="menu-modal">
              <div class="appearance">
                <p>Appearance</p>
                <span class="bi bi-sun"></span>
              </div>
              <div class="divider"></div>
              <div>
                <span class="bi bi-github"></span>
                <span class="bi bi-twitter"></span>
              </div>
            </div>}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;

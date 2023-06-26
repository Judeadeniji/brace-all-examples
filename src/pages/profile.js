import { createData } from "brace-jsx"
import { navigate } from "brace-jsx/router"
import { inStore } from "../services/store"

const isOn = createData(false);

document.documentElement.classList.contains('dark') ? isOn.set(true) : null

function toggleTheme() {
  isOn.update(state => !state);
    
  // Whenever the user explicitly chooses light mode;
  if (!isOn.value) {
    localStorage.xyzApexTheme = 'light'
  }
  
  // Whenever the user explicitly chooses dark mode
  if (isOn.value) {
    localStorage.xyzApexTheme = 'dark'
  }
  
 if (localStorage.xyzApexTheme === 'dark' || (!('xyzApexTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  
  // Whenever the user explicitly chooses to respect the OS preference
 // localStorage.removeItem('xyzApexTheme')
}

export default function Profile() {
  return (
    <div
      class="h-screen pt-5 bg-[#eaeaf4] bg-opacity-40 dark:bg-[#171717]"
      key="profileComponent"
    >
      <ProfileCircle />
      <Section title="Theme">
        <SectionChild title="Dark Mode">
        <div
          className={`toggle-switch ${isOn.value ? "toggle-switch-on" : "toggle-switch-off"}`}
          click$={toggleTheme}
        >
          <div className="toggle-switch-slider" />
        </div>
        </SectionChild>
      </Section>
      <Section title="Settings & Privacy">
        <SectionChildLink to="settings/account/change-password" title="Change Password">
          <div class="form-check form-switch  ms-2">
          
          </div>
        </SectionChildLink>
        <SectionChildLink to="settings/2FA" title="2FA Authentication">
          <div class="form-check form-switch  ms-2">
          
          </div>
        </SectionChildLink>
        <SectionChildLink to="/settings/log" title="View Log">
          <div class="form-check form-switch  ms-2">
          
          </div>
        </SectionChildLink>
      </Section>
      <Section title="Security">
        <SectionChildLink to="/" title="Logout" onClick={() => {
          inStore.dispatch({
            type: 'de-authenticate'
          })
        }}>
          <p class="font-medium text-[red] text-sm mr-1">
          Log Out
          </p>
        </SectionChildLink>
      </Section>
    </div>
  );
}

function ProfileCircle() {
  return (
    <div class="w-full mx-0 my-3 flex items-center justify-between">
      <div
        class="h-[125px] w-[125px] rounded-full border-4 border-white mx-auto bg-gray-50"
        style:box-shadow="0 1px 3px 0 rgba(0, 0, 0, 0.09)"
      ></div>
    </div>
  );
}

function SectionChild({ title, children }) {
  return (
      <li>
        <div class="item">
          <div class="in">
            <div class="font-medium text-[#62696a] dark:text-[#cecbce]">{title}</div>
            {children}
          </div>
        </div>
      </li>
    )
}

function SectionChildLink({ title, children, to, onClick }) {
  return (
   <li>
      <a href={to} class="item" click$preventDefault$={async (e) => {
       if (onClick) await onClick(e);
        await navigate(to);
      }}>
        <div class="in">
          <div class="font-medium text-[#62696a] dark:text-[#cecbce]">{ title }</div>
          <span class="text-primary">{children}</span>
        </div>
      </a>
    </li>
    )
}

function Section({ title, children }) {
  return (
  <div>
    <div class="listview-title mt-1">{title}</div>
    <ul class="listview image-listview text inset">
      {children}
    </ul>
  </div>
  )
}

import Screensaver from "./components/Screensaver";
import { ScreensaverProvider } from "./ScreensaverContext";
import "./globals.css";

export const metadata = {
  title: "Experts",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
        />
      </head>
      <body>
        <div className="main-container-with-border">
          <div className="main-container-inner">{children}</div>
        </div>
      </body>
    </html>
  );
}

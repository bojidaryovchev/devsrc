import GoogleSignIn from "@/components/google-sign-in";
import ScheduleMeetingButton from "@/components/schedule-meeting-button";
import SignOutButton from "@/components/sign-out-button";
import ThemeSwitcher from "@/components/theme-switcher";
import type React from "react";

const Home: React.FC = () => {
  return (
    <>
      <GoogleSignIn />

      <SignOutButton />

      <ThemeSwitcher />

      <p className="text-orange-500 dark:text-purple-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, tenetur!
      </p>

      <ScheduleMeetingButton />
    </>
  );
};

export default Home;

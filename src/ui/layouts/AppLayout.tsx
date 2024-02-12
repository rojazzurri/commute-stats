import { FunctionComponent } from "react";
import AppFooter from "./AppFooter";
import AppNavbar from "./AppNavbar";

type Props = {
  children?: React.ReactNode;
  withNavbar?: boolean;
  withFooter?: boolean;
};

const AppLayout: FunctionComponent<Props> = (props) => {
  const { children, withNavbar = true, withFooter = true } = props;

  return (
    <>
      {withNavbar && <AppNavbar />}

      <div>{children}</div>

      {withFooter && <AppFooter />}
    </>
  );
};

export default AppLayout;

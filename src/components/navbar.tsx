import { NavbarGroup, NavbarHeading, Navbar } from "@blueprintjs/core";

const NavigationBar = () => {
  return (
    <Navbar className="bp3-dark navbar">
      <NavbarGroup
        align="center"
        style={{ width: "100vw", height: "100%", justifyContent: "center" }}
      >
        <NavbarHeading style={{ fontSize: "18px" }}>
          {" "}
          Air Quality Monitoring{" "}
        </NavbarHeading>
      </NavbarGroup>
    </Navbar>
  );
};

export default NavigationBar;

import { REPL_INFRASTRUCTURE_COMMITTEE } from "@/includes//common";

const Theme = styled.div`
  position: fixed;
  inset: 73px 0px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-top: calc(-1 * var(--body-top-padding));
  background: #f4f4f4;
  .container-xl {
    padding-inline: 0px !important;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AppHeader = ({ page }) => (
  <Widget
    src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/components.organism.Navbar`}
    props={{
      page: page,
      ...props,
    }}
  />
);

const AppLayout = ({ page, children }) => {
  return (
    <Theme>
      <Container className="container-xl">
        <AppHeader page={page} />
        <ContentContainer>{children}</ContentContainer>
      </Container>
    </Theme>
  );
};

return { AppLayout };

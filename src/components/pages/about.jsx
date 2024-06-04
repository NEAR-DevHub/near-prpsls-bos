const Section = styled.div`
  padding: 1.5rem;
  @media screen and (max-width: 786px) {
    padding: 1rem;
  }

  p {
    color: #151515;
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin-bottom: 1rem;
    text-align: justify;
  }

  h4 {
    color: #151515;
    font-size: 1.3rem !important;
    font-style: normal !important;
    font-weight: 600 !important;
    line-height: 120% !important;

    margin-top: 1rem;
  }

  h4 {
    color: #151515;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 150%;
  }

  li {
    text-align: justify;
  }

  ol li {
    font-size: 1.1rem;
  }

  a {
    color: #3c697d;
    font-weight: 500 !important;
  }

  i {
    font-size: 1rem;
  }
`;

return (
  <Section>
    <h4>Introduction</h4>
    <p>
      The Infrastructure Committee, a direct response to community concerns, was
      formed in collaboration with various leaders across the NEAR ecosystem.
      The committee will swiftly address infrastructure concerns with funding
      and processes to distribute those funds. These processes handle sharing
      RFPs, submitting proposals, reviewing and voting on proposals, and getting
      funds to teams when a proposal is approved. This initiative will focus
      funds on building resilient, fast, redundant infrastructure to meet NEAR's
      thriving ecosystem's short-term and future needs.
    </p>
    <p>
      The GitHub Wiki provides information about the
      <a
        href="https://github.com/near/Infrastructure-Working-Group/wiki/Infrastructure-Committee"
        target="_blank"
        rel="noopener noreferrer"
      >
        Infrastructure Committee (IC)
      </a>{" "}
      and the{" "}
      <a
        href="https://github.com/near/Infrastructure-Working-Group/wiki/Infrastructure-Working-Group"
        target="_blank"
        rel="noopener noreferrer"
      >
        Working Group (WG)
      </a>
      , including current members.
    </p>
    <h4>Process Summary</h4>
    <p>
      The Committee actively seeks proposals from partners like you to enhance,
      upgrade, and fortify NEAR ecosystem infrastructure. To this end, the
      Committee will draft several Requests For Proposals (RFPs) that outline
      urgent or highly desired projects. We encourage you to submit proposals as
      a response to an RFP or standalone, as your contributions are crucial to
      our collective success.
    </p>
    <p>
      Generally, the process proceeds as follows;
      <ol>
        <li>
          The proposal is drafted. Working Group and Committee members are free
          to review and offer suggestions.
        </li>
        <li>
          Once everyone feels the proposal is ready, it moves to voting. The
          committee votes asynchronously and in regular committee meetings. A
          proposal is approved if it receives a majority vote from the Committee
          members.
        </li>
        <li>
          In the event of a rejection, you will be informed by an IC or WG
          member, usually via the Telegram group established. Guidance may be
          offered on how to update the proposal for resubmission.
        </li>
        <li>
          If your proposal is approved, you will move into the Funding Pipeline.
          You (or your company) will complete the KYC/B process, which involves
          providing your personal or company information for verification
          purposes. Next will be a legal working agreement, and finally, a test
          transaction will be conducted to ensure the target wallet address is
          correct.
        </li>
        <li>
          Project Management: we encourage awarded teams to create a project on
          our{" "}
          <a
            href="https://github.com/near/Infrastructure-Working-Group"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Github repo
          </a>{" "}
          where the community tracks progress on our{" "}
          <a
            href="https://github.com/orgs/near/projects/133/views/6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github project
          </a>
          . Sharing project status gives the community and ecosystem leaders
          visibility into the status of awarded projects.
        </li>
      </ol>
    </p>
    <h4>Important Links</h4>
    <p>
      The following links contain specific information about the processes of
      responding to RFPs, submitting a proposal, voting, securing funds, and
      managing the subsequent project for transparency. Please note that the
      working group will update articles as processes change. We appreciate your
      patience and understanding.
      <ul>
        <li>
          <a
            href="https://github.com/near/Infrastructure-Working-Group/wiki/Request-For-Proposals"
            target="_blank"
            rel="noopener noreferrer"
          >
            RFPs
          </a>
        </li>
        <li>
          <a
            href="https://github.com/near/Infrastructure-Working-Group/wiki/Proposal-Process-%E2%80%90-Team"
            target="_blank"
            rel="noopener noreferrer"
          >
            Submitting a Proposal
          </a>
        </li>
        <li>
          <a
            href="https://github.com/near/Infrastructure-Working-Group/wiki/Proposal-Process-%E2%80%90-Team#5-voting-on-proposals"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voting
          </a>
        </li>
        <li>
          <a
            href="https://github.com/near/Infrastructure-Working-Group/wiki/Funding-Process-%E2%80%90-Company"
            target="_blank"
            rel="noopener noreferrer"
          >
            Getting Funds
          </a>
        </li>
        <li>
          <a
            href="https://github.com/near/Infrastructure-Working-Group/wiki/Projects-&-Tasks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Managing The Project
          </a>
        </li>
      </ul>
    </p>

    <h4>Areas Of Funding</h4>
    <p>
      The Infrastructure Committee is looking for projects in the following
      areas. These areas are key to the growth and development of the NEAR
      ecosystem, so we encourage potential proposers to consider them when
      submitting their proposals.
      <ul>
        <li>Wallets</li>
        <li>Oracles</li>
        <li>RPC Nodes</li>
        <li>Bridges</li>
        <li>Onramps / Offramps</li>
        <li>Relayers</li>
        <li>Explorers</li>
        <li>Indexers</li>
        <li>Query API</li>
        <li>Data Lakes</li>
      </ul>
    </p>
    <h4>Proposal Markup</h4>
    <p>
      Please use the following markup templates when submitting the body of your
      proposal.
      <br />
      <a
        href="https://docs.google.com/document/d/1UZRfOE1JAOhsnSmp-RmL2hY7KPJbpBImKZVvPV4YJmA/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        Proposal:
        https://docs.google.com/document/d/1UZRfOE1JAOhsnSmp-RmL2hY7KPJbpBImKZVvPV4YJmA/edit?usp=sharing
      </a>
    </p>
    <h4>Evaluation Criteria</h4>
    <p>Suggestions are forthcoming.</p>
  </Section>
);

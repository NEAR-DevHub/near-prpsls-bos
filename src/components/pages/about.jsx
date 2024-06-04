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
      The Infrastructure Committee was formed in response to community concerns
      around the state of infrastructure in the NEAR Ecosystem. Not to rest on
      any laurels, various leaders across the NEAR ecosystem devised the
      Infrastructure Committee to quickly address these concerns with funding
      and processes to get those funds distributed. These processes handle
      sharing RFPs, submitting proposals, reviewing and voting on proposals, and
      getting funds to teams when a proposal is approved. These directives and
      processes form an initiative to build up resilient, fast, and redundant
      infrastructure to meet the short-term and future needs of NEAR’s thriving
      ecosystem.
    </p>
    <p>
      You can learn more about the Infrastructure Committee on the GitHub
      <a
        href="https://github.com/near/Infrastructure-Working-Group/wiki"
        target="_blank"
        rel="noopener noreferrer"
      >
        Wiki
      </a>
      . It includes information about the{" "}
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
      . These articles also list current members.
    </p>
    <h4>Process Summary</h4>
    <p>
      The Committee is looking for proposals to enhance, upgrade, and fortify
      NEAR ecosystem infrastructure. Towards this effort, the Committee will be
      drafting several Requests For proposals that outline urgent or highly
      desired projects. Partners current or new are encouraged to submit
      proposals, either as a response to an RFP, or standalone.
    </p>
    <p>
      Generally, the process proceeds as follows:
      <ol>
        <li>
          The proposal is drafted. Working Group and Committee members are free
          to review and offer suggestions.
        </li>
        <li>
          Once everyone feels the proposal is ready, the proposal moves into
          voting. The Committee can vote asynchronously between official
          meetings but most business is conducted at bi-weekly meetings.
        </li>
        <li>
          If your proposal is rejected, you will be informed by an IC or WG
          member usually via the Telegram group established. Guidance may be
          offered on the proposal on how to update the proposal for
          resubmission.
        </li>
        <li>
          If your proposal is approved, you will move into the Funding Pipeline.
          This will require you (or your company) to complete the KYC/B process
          including ID Verify (a service) followed by a Legal working agreement,
          and finally, a test transaction to ensure the target wallet address is
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
          to be tracked on our{" "}
          <a
            href="https://github.com/orgs/near/projects/133/views/6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github project
          </a>
          . This gives the community and ecosystem leaders visibility into the
          status of awarded projects.
        </li>
      </ol>
    </p>
    <h4>Important Links</h4>
    <p>
      The following links contain specific information about the processes of
      responding to RFPs, submitting a proposal, voting, securing funds, and
      managing the subsequent project for transparency.
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
      <i>
        Note: The articles above need to be updated to reflect the new process
        incoming. Getting Funds should be finished soon (now that I have a
        better grasp of how it works).
      </i>
    </p>

    <h4>Areas Of Funding</h4>
    <p>
      The Infrastructure Committee is looking for projects in the following
      areas:
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
  </Section>
);

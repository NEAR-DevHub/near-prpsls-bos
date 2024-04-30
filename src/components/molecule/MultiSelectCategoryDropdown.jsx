import { REPL_DEVHUB } from "@/includes//common";

const { href } = VM.require(`${REPL_DEVHUB}/widget/core.lib.url`);
href || (href = () => {});

const { selected, onChange, disabled, availableOptions } = props;

const [selectedOptions, setSelectedOptions] = useState(selected);
const [isOpen, setIsOpen] = useState(false);

const toggleDropdown = () => {
  setIsOpen(!isOpen);
};

useEffect(() => {
  if (JSON.stringify(selectedOptions) !== JSON.stringify(selected)) {
    setSelectedOptions(selected);
  }
}, [selected]);

useEffect(() => {
  if (JSON.stringify(selectedOptions) !== JSON.stringify(selected)) {
    onChange(selectedOptions);
  }
}, [selectedOptions]);

const Container = styled.div`
  .drop-btn {
    width: 100%;
    text-align: left;
    padding-inline: 10px;
  }

  .dropdown-toggle:after {
    position: absolute;
    top: 46%;
    right: 2%;
  }

  .dropdown-menu {
    width: 100%;
  }

  .dropdown-item.active,
  .dropdown-item:active {
    background-color: #f0f0f0 !important;
    color: black;
  }

  .disabled {
    background-color: #f8f8f8 !important;
    cursor: not-allowed !important;
    border-radius: 5px;
    opacity: inherit !important;
  }

  .disabled.dropdown-toggle::after {
    display: none !important;
  }

  .custom-select {
    position: relative;
  }

  .selected {
    background-color: #f0f0f0;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .text-wrap {
    overflow: hidden;
    white-space: normal;
  }
`;

const handleOptionClick = (option) => {
  if (!selectedOptions.some((item) => item.value === v.value)) {
    setSelectedOptions([...selectedOptions, option]);
  }
  setIsOpen(false);
};

const Item = ({ option }) => {
  return <div> {option.label}</div>;
};

return (
  <>
    {selectedOptions.map((option) => {
      return (
        <div className="d-flex gap-2 align-items-center">
          {option.label}
          <div
            className="cursor-pointer"
            onClick={() => {
              const updatedOptions = selectedOptions.filter(
                (item) => item.value !== option.value
              );
              setSelectedOptions(updatedOptions);
            }}
          >
            <i class="bi bi-trash3-fill"></i>
          </div>
        </div>
      );
    })}

    <Container>
      <div
        className="custom-select w-100"
        tabIndex="0"
        onBlur={() => setIsOpen(false)}
      >
        <div
          className={
            "dropdown-toggle bg-white border rounded-2 btn drop-btn w-100 " +
            (disabled ? "disabled" : "")
          }
          onClick={!disabled && toggleDropdown}
        >
          <div className={`selected-option`}>Select Category</div>
        </div>

        {isOpen && (
          <div className="dropdown-menu rounded-2 dropdown-menu-end dropdown-menu-lg-start px-2 shadow show w-100">
            <div>
              {availableOptions.map((option) => (
                <div
                  key={option.value}
                  className={`dropdown-item cursor-pointer w-100 my-1 ${
                    (selectedOptions ?? []).find(
                      (item) => item.value === option.value
                    )
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  <Item option={option} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  </>
);
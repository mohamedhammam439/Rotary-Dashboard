import Select from "react-select";

const MultiSelectComponent = ({Clubs}) => {
    const AllOptions = Clubs.map((club) => ({ value: club._id, label: club.name }));
  return (
    <Select
    //   defaultValue={}
      isMulti
      name="clubs"
      options={AllOptions}
      className="w-72 border rounded-lg min-h-10"
      classNamePrefix="select"
    />
  );
};

export default MultiSelectComponent;

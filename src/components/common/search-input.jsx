import { Input } from "antd";

export const SearchInput = ({ onChange }) => {
  return (
    <div>
      <label>Search</label>
      <Input
        className="search-input"
        onBlur={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

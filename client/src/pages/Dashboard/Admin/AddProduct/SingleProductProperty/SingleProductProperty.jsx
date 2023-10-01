import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useGetRequest from "../../../../../hooks/useGetRequest";

const SingleProductProperty = () => {
  const [productCategory, setProductCategory] = useState("");
  const [property, setProperty] = useState("");
  const [propertyValues, setPropertyValues] = useState([""]);

  const handleChange = event => {
    setProductCategory(event.target.value);
  };

  const { data } = useGetRequest("", "category");
  const categories = data?.payload?.category || [];

  return (
    <div className="flex-1 ">
      <div className="mt-4">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productCategory}
            label="Select Category"
            onChange={handleChange}
          >
            {categories.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex gap-4 mt-4 items-center">
        <div className="flex-1">
          {categories.map(item => {
            item?.properties.map((item, index) => {
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" key={index}>
                  {item?.propertyName}{" "}
                </InputLabel>
                <Select
                  key={index}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={productCategory}
                  label="Property Name"
                >
                  {item?.values.map((item, index) => (
                    <MenuItem key={index}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>;
            });
          })}
        </div>

        {/* <div className="flex-1">
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Property Value</InputLabel>
        <Select
          fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productCategory}
            label="Property Value"
            onChange={handleChange}
          >
            {categories.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </div> */}

        {/* <div className="flex-1">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="full-height-button" // Add a custom CSS class for the button
          >
            Add Property
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default SingleProductProperty;

//Code below is edited from the official documentation of use-places-autocomplete package.
//It leverages google API for address autocomplete/prediction
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import React from "react";

function AddressAutoComplete(props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  let initialaddress;
  try {
    initialaddress = props.initialaddress;
  } catch (e) {
    initialaddress = "";
  }
  const registerRef = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    async () => {
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          // console.log("Coordinates: ", { lat, lng });
          props.setaddress(description);
          props.setlatitude(lat);
          props.setlongitude(lng);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion, i) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={"suggestion" + i} onClick={handleSelect(suggestion)}>
          <strong key={"maintext" + i}>{main_text}</strong>{" "}
          <small key={"Secondarytext" + i}>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="md-form mb-0">
          <div ref={registerRef} id="adautocompletediv">
            <input
              value={value}
              className="form-control"
              onChange={handleInput}
              disabled={!ready}
              placeholder={initialaddress}
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && (
              <ul id="suggestion" key="suggestion">
                {renderSuggestions()}
              </ul>
            )}
          </div>
          <label htmlFor="addressAutocomplete" className="">
            Address Autocomplete
          </label>
        </div>
      </div>
    </div>
  );
}
export default AddressAutoComplete;

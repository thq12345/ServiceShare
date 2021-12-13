import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import React from "react";
import PropTypes from "prop-types";

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
          props.setaddress(description);
          props.setlatitude(lat);
          props.setlongitude(lng);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });

      getGeocode({ address: description }).then((results) => {
        console.log(results[0]);
        for (var i = 0; i < results[0].address_components.length; i++) {
          for (
            var b = 0;
            b < results[0].address_components[i].types.length;
            b++
          ) {
            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
            if (
              results[0].address_components[i].types[b] ===
              "administrative_area_level_1"
            ) {
              //this is the object you are looking for
              const state = results[0].address_components[i].long_name;
              props.setGeoState(state);
            } else if (
              results[0].address_components[i].types[b] === "postal_code"
            ) {
              const zip = results[0].address_components[i].long_name;
              console.log(zip);
              props.setZip(zip);
            }
          }
        }
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion, i) => {
      const {
        // id,
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
            <label htmlFor="addressinput">Address</label>
            <input
              value={value}
              className="form-control"
              id="addressinput"
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
          <br />
        </div>
      </div>
    </div>
  );
}

AddressAutoComplete.propTypes = {
  setGeoState: PropTypes.func,
  setZip: PropTypes.func,
  initialaddress: PropTypes.string,
  setaddress: PropTypes.func,
  setlatitude: PropTypes.func,
  setlongitude: PropTypes.func,
};
export default AddressAutoComplete;

import React from 'react'
import { useDaumPostcodePopup } from 'react-daum-postcode';
const PostCode = ({onAddressSelected, value1, value2, style}) => {
  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    const zonecode = data.zonecode;

    onAddressSelected(zonecode, fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div>
      <input
        defaultValue={value1}
        onClick={handleClick}
        style={style}
        spellCheck="false"
        readOnly
      />
      <input
        defaultValue={value2}
        onClick={handleClick}
        style={style}
        spellCheck="false"
        readOnly
      />
    </div>
  );
}

export default PostCode;
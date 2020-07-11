import React, {useState} from "react";
import {ImageType} from "../../constants";

export function UpdateImageModal({type}: {type: ImageType}) {
    const [visible, setVisible] = useState(false);
    if (visible) {
        return <h1>Modal is visible</h1>
    }
    else {
        // Do not render anything
        return <></>
    }
}
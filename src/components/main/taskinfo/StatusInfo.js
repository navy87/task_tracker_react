import React, { useState } from "react";
import RadioButton from "../../helpers/RadioButton";
import { MdBubbleChart, MdCancel, MdCheckCircle } from "react-icons/md";
const StatusInfo = () => {
    const [checked, setChecked] = useState("high");
    return (
        <div>
            <RadioButton
                id="active_status_info"
                name="status"
                render={
                    <>
                        <MdBubbleChart /> Active
                    </>
                }
                value="active"
                checked={checked.toLowerCase() === "active"}
                setChecked={setChecked}
            />
            <RadioButton
                id="finished_status_info"
                name="status"
                render={
                    <>
                        <MdCheckCircle /> Done
                    </>
                }
                value="done"
                checked={checked.toLowerCase() === "done"}
                setChecked={setChecked}
            />
            <RadioButton
                id="mid_status_info"
                name="status"
                render={
                    <>
                        <MdCancel /> Cancelled
                    </>
                }
                value="cancelled"
                checked={checked.toLowerCase() === "cancelled"}
                setChecked={setChecked}
            />
        </div>
    );
};

export default StatusInfo;

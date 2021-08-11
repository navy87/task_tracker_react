import React, { useContext, useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import InfoContainer from "../InfoContainer";
import { DeepCopy, GetToday } from "../../helpers/Helper";
import { GlobalContext } from "../../../contexts/GlobalContext";

const TrackForm = () => {
    const { selectedTask, refresh } = useContext(GlobalContext);

    const [emptyTrack] = useState({
        date: GetToday(),
        description: "",
        id: 0,
        title: "",
    });

    const [track, setTrack] = useState(DeepCopy(emptyTrack));

    useEffect(() => {
        setTrack(DeepCopy(emptyTrack));
    }, [selectedTask, emptyTrack]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Track Submitted");
        console.log(track);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(track),
        };

        const url = `http://localhost:4200/api/task/${selectedTask.id}/tracks/`;
        fetch(url, requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data));

        setTrack(DeepCopy(emptyTrack));
        refresh();
    };

    return (
        <form onSubmit={handleFormSubmit} action="/" method="post">
            <InfoContainer
                label="Date"
                htmlFor="track_info_id"
                info_render={
                    <input
                        id="track_info_id"
                        type="date"
                        name="date"
                        value={track.date}
                        required
                        onChange={(e) =>
                            setTrack({ ...track, date: e.target.value })
                        }
                    />
                }
            />
            <InfoContainer
                label="Track"
                htmlFor="track_title"
                info_render={
                    <input
                        id="track_title"
                        type="text"
                        name="title"
                        placeholder="Title"
                        required
                        value={track.title}
                        onChange={(e) =>
                            setTrack({ ...track, title: e.target.value })
                        }
                    />
                }
            />
            <InfoContainer
                label="Description"
                htmlFor="track_description"
                info_render={
                    <textarea
                        id="track_description"
                        name="description"
                        placeholder="Description"
                        required
                        value={track.description}
                        onChange={(e) =>
                            setTrack({ ...track, description: e.target.value })
                        }
                    ></textarea>
                }
            />
            <button type="submit" className="btn btn-submit">
                <MdAddCircleOutline className="btn_icon" /> Accept
            </button>
        </form>
    );
};

export default TrackForm;

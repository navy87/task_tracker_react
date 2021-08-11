// import axios from "axios";
import { useState, useEffect } from "react";
import Main from "./components/main/Main";
import SideBar from "./components/sidebar/SideBar";
import { GlobalContext } from "./contexts/GlobalContext";
import { DataContext, FilterContext } from "./contexts/SidebarContext";
import "./styles/App.css";

function App() {
    const [selectedTask, setSelectedTask] = useState();
    const [sortOrder, setSortOrder] = useState("desc");

    const [filterVisible, setFilterVisible] = useState(false);
    const [filteredPersons, setFilteredPersons] = useState(new Set());
    const [filteredPriorities, setFilteredPriorities] = useState(new Set());
    const [filteredStatuses, setFilteredStatuses] = useState(new Set());
    const [tasks, setTasks] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [people, setPeople] = useState([]);

    const [refreshData, setRefreshData] = useState(false);

    const refresh = () => {
        setRefreshData((oldRefresh) => !oldRefresh);
    };

    useEffect(() => {
        fetch("http://localhost:4200/api/task")
            .then((res) => res.json())
            .then((data) => setTasks(data));

        fetch("http://localhost:4200/api/person")
            .then((res) => res.json())
            .then((data) => setPeople(data));
    }, [refreshData, setTasks, setPeople]);

    useEffect(() => {
        if (selectedTask) {
            fetch(`http://localhost:4200/api/task/${selectedTask.id}/tracks`)
                .then((res) => res.json())
                .then((data) => setTracks(data));
        } else {
            setTracks(null);
        }
    }, [refreshData, selectedTask]);

    return (
        <GlobalContext.Provider
            value={{
                selectedTask,
                setSelectedTask,
                refresh,
                sortOrder,
                setSortOrder,
            }}
        >
            <FilterContext.Provider
                value={{
                    filterVisible,
                    setFilterVisible,
                    filteredPersons,
                    setFilteredPersons,
                    filteredPriorities,
                    setFilteredPriorities,
                    filteredStatuses,
                    setFilteredStatuses,
                }}
            >
                <DataContext.Provider
                    value={{
                        tasks,
                        setTasks,
                        people,
                        setPeople,
                        tracks,
                        setTracks,
                    }}
                >
                    <div className="App">
                        <SideBar />
                        <div id="page">
                            <div className="content">
                                <Main />
                            </div>
                        </div>
                    </div>
                </DataContext.Provider>
            </FilterContext.Provider>
        </GlobalContext.Provider>
    );
}

export default App;

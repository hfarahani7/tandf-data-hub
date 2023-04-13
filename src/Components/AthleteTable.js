import './styles/AthleteTable.css';
import React, { useState, useEffect, useMemo } from "react";
import { useTable, useFilter, useSortBy } from 'react-table';
import Plot from 'react-plotly.js';

async function FetchData(id) {
    const res = fetch("https://tf-data-hub-default-rtdb.firebaseio.com/Athletes/" + id + ".json", {
        method: "GET"
    });
    return((await res).json());
}

function GetEvents(performances) {
    const eventArr = [];

    performances.forEach(meetObject => {
        for (const eventName in meetObject.events) {
            if(!eventArr.some(e => e.Header === eventName)){
                eventArr.push({
                    "Header": eventName,
                    "accessor": eventName
                });
            }
        }
    });

    return(eventArr);
}

function GetPerformances(performances) {
    const performanceArray = [];

    performances.forEach(meetObject => {
        const temp = {};
        temp["meet"] = meetObject.meet;
        temp["date"] = meetObject.date;
        for (const eventName in meetObject.events) {
            temp[eventName] = meetObject.events[eventName]
        }
        performanceArray.push(temp);
    });
    
    return(performanceArray);
}

function PreparePlotData(performances, event) {    
    const x = [];
    const y = []; 
    performances.forEach(meetObject => {
        const tempEvents = meetObject.events;
        if(event in tempEvents) {
            y.push(tempEvents[event]);
            x.push(meetObject.date);
        }
    });

    return({
        x: x,
        y: y,
        mode: 'lines+markers',
        type: 'scatter',
        name: event,
        marker: { size: 12 }
    })
}

function AthleteTable() {
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [team, setTeamName] = useState("");
    const [performances, setPerformances] = useState([]);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    // const id = 1;

    useEffect(() => {
        FetchData(id).then(res => {
            setFirstName(res.firstName);
            setLastName(res.lastName);
            setTeamName(res.team);

            for(const obj in res) {
                if(obj != "firstName" && obj != "lastName" && obj != "team" && !performances.some(meet => meet.meet === obj)) {
                    performances.push({
                        "meet": obj,
                        "events": res[obj].events,
                        "date": res[obj].date
                    });
                }
            }

            setData(GetPerformances(performances));
            setColumns([
                {
                    Header: 'Meet',
                    accessor: 'meet'
                },
                {
                    Header: 'Date',
                    accessor: 'date',
                },
                {
                    Header: 'Events',
                    accessor: 'events',
                    columns: GetEvents(performances)
                }
            ]);
            setLoading(false);
        });
    }, []);


    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    if(loading) {
        return(<div>Loading</div>)
    }

    // const plots = [];
    // GetEvents(performances).forEach(event => {
    //     plots.push(PreparePlotData(performances, event));
    // });

    return(
        <div className="tableOuter">
            <header>
                <h1>
                    {lastName}, {firstName}
                </h1>
                <p>
                    {team}
                </p>
            </header>

            <Plot
                data={[
                    PreparePlotData(performances, "HT"),
                    {type: 'bar', x: [], y: []},
                ]}
                layout={ {width: 1000, height: 1000, title: 'Performances'} }
            />

            {/* <Plot 
                data={plots}
                layout={ {width: 1000, height: 1000, title: 'Performances'} }
            /> */}

            <table {...getTableProps()} className="tableClass">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                         ? column.isSortedDesc
                                         ? ' 🔽'
                                         : ' 🔼'
                                        : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return(
                                            <td {...cell.getCellProps()} className="cell">
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default AthleteTable;
import './styles/AthleteTable.css';
import React, { useState, useEffect, useMemo } from "react";
import { useTable, useFilter, useSortBy } from 'react-table';
import Plot from 'react-plotly.js';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

async function FetchData(id) {
    const res = fetch("https://tf-data-hub-default-rtdb.firebaseio.com/Athletes/" + id + ".json", {
        method: "GET"
    });
    return((await res).json());
}

function GetEvents(performances) {
    const eventArr = [];
    var i = 0;

    performances.forEach(meetObject => {
        for (const eventName in meetObject.events) {
            if(!eventArr.some(e => e.Header === eventName)){
                eventArr.push({
                    "Header": eventName,
                    "accessor": eventName,
                    "checked": i == 0 ? true: false
                });
            }
            i++;
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

function HandleCheck(performances, event, checked, setChecked, setPlotData) {
    setChecked(
        checked.map((ev) => 
            ev.Header == event
                ? { ...ev, checked: true}
                : {...ev, checked: false}
        )
    );

    setPlotData(PreparePlotData(performances, event));
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
    const [checked, setChecked] = useState([]);
    const [plotData, setPlotData] = useState();
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    useEffect(() => {
        FetchData(id).then(res => {
            setFirstName(res.firstName);
            setLastName(res.lastName);
            setTeamName(res.team);

            for(const obj in res) {
                if(obj != "firstName" && obj != "lastName" && obj != "team" && obj != "teamId" && !performances.some(meet => meet.meet === obj)) {
                    performances.push({
                        "meet": obj,
                        "events": res[obj].events,
                        "date": res[obj].date
                    });

                    performances.sort(function (a,b){
                        return new Date(b.date) - new Date(a.date);
                    });

                    console.log(performances);
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

            setChecked(GetEvents(performances));
            
            setLoading(false);
        }).then(() => {
            setPlotData(PreparePlotData(performances, GetEvents(performances)[0].Header));
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
                    // PreparePlotData(performances, "HT"),
                    plotData,
                    {type: 'bar', x: [], y: []},
                ]}
                layout={ {width: 500, height: 500, title: 'Performances'} }
                // style={{ width:"100%" }}
            />

            <Grid container xs={12} justifyContent="center">
                {checked.map(event =>
                    <Grid item>
                        {event.Header}
                        <Checkbox 
                            label={event.Header} 
                            checked={event.checked}
                            onChange={() => {HandleCheck(performances, event.Header, checked, setChecked, setPlotData)}}
                        />
                    </Grid>
                )}
            </Grid>

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
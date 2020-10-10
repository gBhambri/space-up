import React, { useEffect, useState } from 'react'
import './AsteroidBelt.css'
import { baseUrl, API_KEY, endpoints } from '../Endpoints/api-endpoints'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const AsteroidBelt = () => {
    const [data, setData] = useState([]);
    const [id, setID] = useState('')
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = () => {
       
        fetch(baseUrl + endpoints.getAsteriods + '?' + API_KEY)
            .then(res => res.json())
            .then((data) => {
                setData(data.near_earth_objects)
            });
    }
    const searchByID = () => {
        if (id) {
            fetch(baseUrl + endpoints.getAsteriodbyId + id + '?' + API_KEY)
                .then(res => res.json())
                .then((info) => {
                    if (info) {
                        setData([])
                        var arr = []
                        arr.push(info)
                        setData(arr)
                    }

                })
                .catch(err => {
                    setData([])
                    console.log(err)
                })
            setID('')
        }
    }
    const handleChange = (date) => {
        let newEndDate = new Date(date)
        let newStartDate = new Date(startDate)
        let SD = newStartDate.getFullYear() + '-' + (newStartDate.getMonth() + 1) + '-' + newStartDate.getDate()
        let ED = newEndDate.getFullYear() + '-' + (newEndDate.getMonth() + 1) + '-' + newEndDate.getDate()
        if (SD && ED) {
            setEndDate(date)
            fetch(baseUrl + endpoints.getAsteriodbyDate + '?start_date=' + SD + '&end_date=' + ED + '$detailed=false&' + API_KEY)
                .then(res => res.json())
                .then((info) => {
                    setData([])
                    var nearObjects = info.near_earth_objects
                    var array = []
                    for (let res in nearObjects) {
                        array.push((nearObjects[res][0]))
                    }
                    setData(array)
                })
                .catch(err => {
                    setData([])
                    console.log(err)
                })
        }
    }
    const handleStartDateChange = (date) => {
        setStartDate(date)
        setEndDate('');
        fetchData();
    }
    const dismissDate = () => {
        setEndDate('');
        setStartDate('');
        fetchData();
    }
    return (
        <div className="asteroid-container">
            <div className="search-filter">
                <div className="search-id">
                    <input className="input-box-shadow" value={id} placeholder="Search By ID" type="number" onChange={(e) => setID(e.target.value)} />
                    <img src={require('../Assets/search-icon.svg')} alt="S" onClick={searchByID} />
                </div>
                {data.length <= 1 ? <img onClick={fetchData} className='cross-icon' src={require('../Assets/times-solid.svg')} alt='k'></img> : ''}
                <div className="search-dates">
                   <div className="date-range-message">
                        <DatePicker placeholderText="Start Date" selected={startDate} dateFormat="yyyy-MM-dd" onChange={handleStartDateChange} />
                        <span>The max range between two dates is 7 days.</span>
                    </div>
                    <DatePicker placeholderText="End Date" selected={endDate} dateFormat="yyyy-MM-dd" onChange={handleChange} />
                    <img className={"dismiss-date"+( (startDate!=='' && endDate!=='') ? " d-block" : " d-none" )} alt='cross-logoo' src={require('../Assets/times-solid.svg')} onClick={dismissDate}/>
                </div>
            </div>
            <div>
            </div>
            {
                (data.length === 0)
                    ?
                    (
                        <div className="no-record-found">
                            No Data Found
                        </div>
                    )
                    :
                    (
                        <table>
                            <thead>
                                <th>Id</th> <th>Name</th> <th>Approach Date</th> <th>Orbiting Body</th> <th>Diameter (KMs)</th> <th>More Info</th>
                            </thead>
                            <tbody>
                                {
                                    data.map((tupple, index) => (
                                        <tr key={index}>
                                            <td>{tupple ? tupple.id : ''}</td>
                                            <td>{tupple ? tupple.name : ''}</td>
                                            <td>{tupple?.close_approach_data[0]?.close_approach_date_full ? tupple?.close_approach_data[0]?.close_approach_date_full : 'NA'}</td>
                                            <td>{tupple?.close_approach_data[0]?.orbiting_body ? tupple?.close_approach_data[0]?.orbiting_body : 'NA'}</td>
                                            <td>{tupple?.estimated_diameter.kilometers.estimated_diameter_max}</td>
                                            <td><a href={tupple.nasa_jpl_url} rel="noopener noreferrer" target='_blank'>{tupple?.nasa_jpl_url}</a></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    )
            }

        </div>
    )
}

export default AsteroidBelt;

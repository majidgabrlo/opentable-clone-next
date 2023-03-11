"use client"
import { partySize, times } from '../../../../data';
import DatePicker from 'react-datepicker'
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import useAvailabilities from '@/app/hooks/useAvailabilities';
import ReactLoading from 'react-loading'

type ReservationCardProps = {
    openTime: string
    closeTime: string
    slug: string
}

function ReservationCard({ closeTime, openTime, slug }: ReservationCardProps) {
    const { data, error, loading, fetchAvailabilities } = useAvailabilities()
    const [time, setTime] = useState(openTime)
    const [numberOfPeople, setNumberOfPeople] = useState('1')
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

    const filterTimeByRestaurantOpenTime = () => {

        const timesWithin: typeof times = []
        let isWithin = false

        times.forEach(time => {
            if (time.time === openTime) {
                isWithin = true
            }
            if (isWithin) {
                timesWithin.push(time)
            }
            if (time.time === closeTime) {
                isWithin = false
            }
        })

        return timesWithin

    }

    const handleFindTime = async () => {
        const day = selectedDate?.toISOString().split('T')[0]
        if (day) {
            await fetchAvailabilities({ slug, time, partySize: +numberOfPeople, day })

        }
    }

    return (
        <div className="fixed w-[15%] bg-white rounded p-3 shadow">
            <div className="text-center border-b pb-2 font-bold">
                <h4 className="mr-7 text-lg">Make a Reservation</h4>
            </div>
            <div className="my-3 flex flex-col">
                <label htmlFor="">Party size</label>
                <select value={numberOfPeople} onChange={e => setNumberOfPeople(e.target.value)} name="" className="py-3 border-b font-light" id="">
                    {partySize.map(size => <option key={size.value} value={size.value}>{size.label}</option>)}
                </select>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Date</label>
                    <DatePicker selected={selectedDate} onChange={setSelectedDate} className="py-3 border-b font-light text-reg w-28" dateFormat="MMMM d" />
                </div>
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Time</label>
                    <select value={time} onChange={e => setTime(e.target.value)} name="" id="" className="py-3 border-b font-light">
                        {filterTimeByRestaurantOpenTime().map(time => <option key={time.time + time.displayTime} value={time.time}>{time.displayTime}</option>)}
                    </select>
                </div>
            </div>
            <div className="mt-5">
                {loading ?
                    <ReactLoading className='mx-auto' type="spinningBubbles" color='navy' height={30} width={40} />
                    :
                    <button
                        className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
                        onClick={handleFindTime}
                    >
                        Find a Time
                    </button>}

                {
                    data && data.length ? <div className='mt-4'>
                        <div className='text-reg'>Select a time</div>
                        <div className="flex flex-wrap mt-2 gap-2">
                            {data.map(time => {
                                return time.available ? <button className='bg-red-500 p-2 rounded text-white'>{time.time.displayTime}</button> : <div className="bg-slate-300 w-16 p-2 rounded" />
                            })}
                        </div>
                    </div> : data?.every(time=>!time.available) && <div>There is no free time here</div>
                }
            </div>
        </div>
    )
}

export default ReservationCard
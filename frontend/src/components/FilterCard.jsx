import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: [
            "Remote (Global)",
            "United States",
            "United Kingdom",
            "Canada",
            "Germany",
            "UAE",
            "India",
            "Nigeria",
            "Australia"
        ]
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "Mobile Developer",
            "UI/UX Designer",
            "DevOps Engineer",
            "Software Engineer"
        ]
    },
    {
        filterType: "Salary (Yearly)",
        array: [
            "$10k - $30k",
            "$30k - $60k",
            "$60k - $100k",
            "$100k - $150k",
            "$150k+"
        ]
    }
]


const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard

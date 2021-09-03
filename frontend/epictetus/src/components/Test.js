import React from 'react'
import ChevronDown from './svg/ChevronDown'
import ChevronLeft from './svg/ChevronLeft'
import ChevronRight from './svg/ChevronRight'
import ChevronUp from './svg/ChevronUp'
import DotIcon from './svg/DotIcon'
import FilterIcon from './svg/FilterIcon'
import SearchIcon from './svg/SearchIcon'
import SettingsIcon from './svg/SettingsIcon'
import CustomButton from './CustomButton'
import CreateDealForm from './CreateDealForm'

export default function Test() {
    return (
       <>
           <h2  className="text-4xl font-bold pb-10 m-10" >Svg Icons exported from figma</h2> 
           <div className="flex justify-around ...">
                <ChevronDown/>
                <ChevronUp/>
                <ChevronRight/>
                <ChevronLeft/>
                <DotIcon color="#7F7A00"/>
                <FilterIcon/>
                <SearchIcon/>
                <SettingsIcon/> 
            </div>
            <h2  className="text-4xl font-bold pb-10 m-10" >Custom Buttons</h2> 
            <div className="button-box">
            <CustomButton value="custom1" />
            <CustomButton value="custom2" />
            </div>
            <div>
                <CreateDealForm/>
            </div>
        </>
    )
}

import React from 'react'
import WidgetLg from '../../components/widGet/WidGet'
import WidgetSm from '../../components/witSm/WitSm'
import ChartComponent from '../../components/chart/Char'
import "./home.css";
import Featured from '../../components/feature/Feature';

function Home() {
    
  return (
    <div className='home'>
        <Featured />
        <ChartComponent />
         <div class="homeWidgets">
       <WidgetSm />
       <WidgetLg />
      </div>
    </div>
  )
}

export default Home
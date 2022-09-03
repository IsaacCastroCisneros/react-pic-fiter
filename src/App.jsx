import { useState } from 'react'
import reactLogo from './assets/react.svg'

const OPTIONS=
[
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]


function App() 
{
  const[filterOptions,setFilterOptions]=useState(OPTIONS)
  const[selectedIndex,setSelectedIndex]=useState(0);

  const optionSelected = filterOptions[selectedIndex];

  function findOption({target})
  {
    const dummyOptions= filterOptions.map((opt,pos)=>
      {
        if(pos!==selectedIndex)return opt
        return {...opt,value:target.value}
      })

    setFilterOptions(dummyOptions)
  }

  function addStyles()
  {
    const stylesArr = filterOptions.map(opt=>
      {
        return `${opt.property}(${opt.value}${opt.unit})`
      })
    
    return stylesArr.join(' ')
  }

  return (
    <>
      <header className="block p-[.6rem] uppercase text-center bg-gradient-to-b from-cyan-500 to-indigo-700 font-bold letter tracking-[.3rem] text-[1.2rem]">
        absolute pic filter
      </header>
      <section className='flex justify-center w-[fit-content] mt-6 mx-auto rounded-[.5rem] p-[1.5rem] bg-gradient-to-b from-cyan-500 to-indigo-700 gap-[1rem]'>
        {
          filterOptions.map((opt,pos)=>
            {
               return(
                  <Button 
                  key={pos}
                  isActive={selectedIndex===pos}
                  name={opt.name} 
                  setSelectedIndex={()=>setSelectedIndex(pos)} 
                  />
               )
            })
        }
      </section>
      <Img addStyles={addStyles}>
        <Slider findOption={findOption} optionSelected={optionSelected}/>
      </Img>    
    </>
  );
}

function Button(props)
{
  const{
   name,
   setSelectedIndex,
   isActive
  }=props
  
  return(
    <button className={`bg-gradient-to-b from-pink-300 font-bold tracking-[.1rem] hover:brightness-105 transition-all duration-500 to-pink-600 block py-[.8rem] px-[1.1rem] rounded-[.5rem] ${isActive ? 'active':''}`} 
    onClick={setSelectedIndex}
    >
     {name}
    </button>
  )
}

function Img(props) 
{
  const{
   addStyles,
   children
  }=props

  return (
    <div className='flex mx-[auto] items-center w-[fit-content] justify-center relative h-[fit-content]'>
    <div className="block overflow-hidden rounded-[.5rem] w-[50rem] h-[70rem] mt-[2rem]">
      <img className="rounded-[.5rem]" src="https://safebooru.org//images/3154/dd0ff6a23b6b24af50a748d5ac84aaf7296df98b.jpg" alt="" 
       style={{filter:addStyles()}}
      />
    </div>
    {children}
  </div>
  );
}

function Slider(props) 
{
  const{
    optionSelected,
    findOption
  }=props

  return (
  <input className='rotate-[-90deg] scale-[150%] w-[20rem] absolute right-[-14rem] top-[18rem]' 
  type="range"
  value={optionSelected.value}
  min={optionSelected.range.min}
  max={optionSelected.range.max} 

  onChange={findOption}
  />);
}

export default App
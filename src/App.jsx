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
    setFilterOptions(prev=>
      {
        return prev.map((opt,pos)=>
        {
          if(pos!==selectedIndex)return opt
          return {...opt,value:target.value}
        })
      })
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
      <main className='px-[2rem] flex flex-col items-center gap-[1.5rem] mt-8'>
        <section className="flex button-container flex-wrap justify-center w-[fit-content] rounded-[.5rem] p-[1.5rem] bg-gradient-to-b from-cyan-500 to-indigo-700 gap-[1rem]">
          {filterOptions.map((opt, pos) => {
            return (
              <Button
                key={pos}
                isActive={selectedIndex === pos}
                name={opt.name}
                setSelectedIndex={() => setSelectedIndex(pos)}
              />
            );
          })}
        </section>
        <Slider 
         findOption={findOption} 
         optionSelected={optionSelected}
         styles={
          ['hidden','slider-mob']
         }
         />
        <Img addStyles={addStyles}>
          <Slider findOption={findOption} 
          optionSelected={optionSelected} 
          styles={
            [
              'rotate-[-90deg]',
              'absolute',
              'top-[18rem]',
              'right-[-13rem]'
            ]
          }
          />
        </Img>
      </main>
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
    <button className={`bg-gradient-to-b from-pink-300 font-bold tracking-[.1em] hover:brightness-105 transition-all duration-500 to-pink-600 block py-[.8em] px-[1.1em] rounded-[.5em] ${isActive ? 'active':''}`} 
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
    <div className="block rounded-[.5rem] w-[50rem] max-w-[100%] relative">
      <img className="rounded-[.5rem]" src="https://safebooru.org//images/3154/dd0ff6a23b6b24af50a748d5ac84aaf7296df98b.jpg" alt="" 
       style={{filter:addStyles()}}
      />
     {children}
    </div>
  );
}

function Slider(props) 
{
  const{
    optionSelected,
    findOption,
    styles
  }=props

  const allStyles = styles ? styles.map(style=>style) : [] 

  return (
  <input className={`${allStyles.join(' ')} scale-[150%] w-[20rem]`} /* {`${rotate||''} ${position||'relative'}  z-50 ${top||''} ${rite||''}`}   */
  type="range"
  value={optionSelected.value}
  min={optionSelected.range.min}
  max={optionSelected.range.max} 

  onChange={findOption}
  />
  );
}

export default App